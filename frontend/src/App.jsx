import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage'
import CreateSO from './components/CreateSO'
import Salesitem from './components/Salesitem'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Creatematerial from './components/Creatematerial'
import Createcustomer from './components/Createcustomer'
import Createdelivery from './components/Createdelivery'
import Createinvoice from './components/Createinvoice'
// import TEST from './components/TEST'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/createsalesorder' element={<CreateSO/>}/>
    <Route path='/addmaterial' element={<Creatematerial/>}/>
    <Route path='/addcustomer' element={<Createcustomer/>}/>
    <Route path='/createdelivery' element={<Createdelivery/>}/>
    <Route path='/createinvoice' element={<Createinvoice/>}/>
    </Routes>
    </BrowserRouter>
    {/* <TEST/> */}
    {/* <CreateSO/>
   <Salesitem/> */}
    </>
  )
}

export default App
