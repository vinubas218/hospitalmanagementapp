require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const app = express()
app.use(cors({ origin: ["https://hospitalmanagementapp-o4sa.onrender.com" , "http://localhost:5173"]}));
app.use(express.json())

const db = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
})
const patientModel = mongoose.model("patient", userSchema)


app.post("/api/patients",async (req, res) => {
    try {
        const {name, age, gender} = req.body

        const patient = new patientModel({name, age, gender})
        await patient.save()

        console.log("Patient Added")
        res.status(201).json({patientDetails: patient})
    }
    catch {
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.delete("/api/patients/:id", async(req, res) => {
    try {
        const { id } = req.params
        const patient = await patientModel.findByIdAndDelete(id)
        console.log(patient)
        res.status(201).json({message: "Patient details deleted."})
    }
    catch {
        res.status(500).json({error: "Internal Server Error"})    }
})

app.get('/api/patients', async (req, res) => {
    try {
      const patients = await patientModel.find(); 
      res.json({ patients });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
const connected = async () => {
    try {
        await mongoose.connect(db)
        console.log("DB connection Success")
    }
    catch {
        console.log("DB connection Unsuccess")
        process.exit(1)
    }
}

app.listen(process.env.PORT, async () => {
    await connected()
    console.log(`Server running on port ${process.env.PORT}` )
})