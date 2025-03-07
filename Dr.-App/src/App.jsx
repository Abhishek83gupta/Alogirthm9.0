import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Appoiment from './pages/Appoiment'
import My_Appoiment from './pages/My_Appoiments'
import Login from './pages/Login'
import Myprofile from './pages/Myprofile'
import Doctor from './pages/Doctor'
import Navbar from './Compoenets/common/Navbar'
import Footer from './Compoenets/common/Footer'
import Prediction from './Compoenets/prediction/Prediction'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBotButton from './Compoenets/ChatBotButton'
import LandingPage from './pages/Landing'
import NewsComponent from './pages/News'
import Mri from './pages/Mri'
import Medicine from './pages/Medicine'


function App() {


  return (
    <>
      <ToastContainer />
      <Navbar />


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/appointment" element={<Home />} />
        <Route path="/medicine" element={<Medicine/>} />
        <Route path="/mri" element={<Mri/>} />
        <Route path="/news" element={<NewsComponent/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Appoiment/:DocId" element={<Appoiment />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/My_Appoiment" element={<My_Appoiment />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Doctor/:spcefication" element={<Doctor />} />
        <Route path="/Doctor" element={<Doctor />} />

      </Routes>
       <ChatBotButton/>
      <Footer />
    </>
  )
}

export default App
