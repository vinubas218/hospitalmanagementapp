import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Mgt = () => {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [patientList, setPatientList] = useState([])
  const [message, setMessage] = useState('')

  const add = async () => {
    if (!name || !age || !gender) {
      setMessage("Add your details first.")
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      const response = await axios.post("https://hospitalmanagement-uz3g.onrender.com/api/patients", {
        name,
        age,
        gender
      })

      console.log("Success", response.data)
      setPatientList([...patientList, response.data.patientDetails])
      setName('')
      setAge('')
      setGender('')

      setMessage("Patient added successfully.");
      setTimeout(() => setMessage(''), 3000);
    }
    catch {
      console.log("Error")
    }
  }

  const remove = async (id) => {
    try {
      const response = await axios.delete(`https://hospitalmanagement-uz3g.onrender.com/api/patients/${id}`)
      console.log("Delete response:", response.data);

      setPatientList((patientList) => patientList.filter(patient => patient._id !== id))

      setMessage("Patient details removed successfully.");
      setTimeout(() => setMessage(''), 3000);
    }
    catch {
      console.log("Deletion unsuccessful.")
    }
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("https://hospitalmanagement-uz3g.onrender.com/api/patients");
        setPatientList(response.data.patients); 
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    
    fetchPatients();
  }, []); 

  return (
    <div className=' min-h-screen'>
      <div className='py-10 px-10 text-center flex-col justify-center'>
        <p className='text-3xl pb-5 '>JKL Hospital Management App</p>
        <div className='flex justify-center gap-10 bg-blue-400 p-3 rounded-xl  cursor-pointer'>
          <p className='text-xl'>Appointments</p>
        </div>
      </div>
      {message && (
        <div className="fixed top-5 right-6 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-[800px] mx-auto">
        <div className=' p-6 border-gray-200 h-[350px]  border rounded-xl w-[400px] shadow-xl '>
          <p className=' pb-6 text-xl'>Add New Patient</p>
          <div className='flex flex-col'>
            <div className='inline-flex items-center gap-4 pb-6'>
              <label className=''>Name</label>
              <input
                type="text"
                id='name'
                className='border border-gray-300 rounded px-3 py-1 w-full focus:border-blue-400 outline-none transition-all duration-200'
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='inline-flex items-center gap-7.5 pb-6'>
              <label>Age</label>
              <input
                type="number"
                id='age'
                className='border border-gray-300 rounded px-3 py-1 w-full focus:border-blue-400 outline-none transition-all duration-200'
                value={age}
                onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className='inline-flex items-center gap-4 pb-9'>
              <label>Gender</label>
              <select
                type="text"
                id='gender'
                className='border border-gray-300 rounded px-3 py-1 w-full focus:border-blue-400 outline-none transition-all duration-200'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className=' w-[100px] p-1.5 rounded-md bg-blue-200 items-center inline-flex '>
            <button className='cursor-pointer' onClick={add}>Add Patient</button>
          </div>
        </div>

        <div className='p-5 border-gray-200 h-[350px] overflow-auto border rounded-xl w-[400px] shadow-xl'>
          <p className='pb-5 text-xl'>Patients({patientList.length})</p>
          {
            patientList.length === 0 ? (
              <p>No patients yet.</p>
            )
              :
              (
                <div className="flex flex-col gap-3">
                  {patientList.map((patient) => (
                    <div key={patient._id} className='border border-gray-200 p-2 w-full rounded-xl mx-auto'>
                      <p className='font-bold'>{patient.name}</p>
                      <p className=''>Age: {patient.age}</p>
                      <p>Gender: {patient.gender}</p>
                      <div className='flex justify-end cursor-pointer'>
                        <p onClick={() => remove(patient._id)} className=' rounded-md p-1 bg-blue-200'>Delete</p>
                      </div>
                    </div>
                  ))
                  }
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Mgt
