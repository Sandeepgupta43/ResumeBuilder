import Home from './Home'
import Form from './Form'
import { Link, Route, Routes } from 'react-router-dom'
import MyPdf from '../PdfFile/MyPdf'
import CustomJob from '../customJob/CustomJob'

function Navbar() {
  return (
    <div >
        <div className='bg-gray-200 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-around items-center flex h-16 align-middle rounded-md'>
            <Link to="/" className='hover:bg-blue-400 transition'>Home</Link> 
            <Link to="/customJob">Custom Job</Link>
            <Link to="/resume">Resume</Link> 
            
           
        </div>

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/resume' element={<Form />}/>
            <Route path='/customJob' element={<CustomJob />} />
            <Route path='/pdf' element={<MyPdf />} />
        </Routes>
    </div>
  )
}

export default Navbar