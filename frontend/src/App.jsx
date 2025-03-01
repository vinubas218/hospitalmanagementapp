import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Mgt from './Mgt'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mgt/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
