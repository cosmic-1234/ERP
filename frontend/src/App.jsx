import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage'
import CreateSO from './components/CreateSO'
import Salesitem from './components/Salesitem'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/createsalesorder' element={<CreateSO/>}/>
    </Routes>
    </BrowserRouter>
    {/* <CreateSO/>
   <Salesitem/> */}
    </>
  )
}

export default App
