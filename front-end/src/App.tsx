import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './UI/Pages/Home/Home'
import Login from './UI/Pages/Login'
import Signup from './UI/Pages/Signup/Signup'
import { useAuthContext } from './context/AuthContext'
import { Toaster } from "react-hot-toast"


function App() {
  const {authUser, isLoading} = useAuthContext();

  if(isLoading){
    console.log("WAITING")
    return null;
  }

  return (
    <>    
      <Routes>
        <Route path="/Home" element={ authUser ? <Home/> : <Navigate to={"/Login"}/>} /> 
        <Route path="/Signup" element={ !authUser ?  <Signup/> : <Navigate to={"/Home"}/> }/>
        <Route path="/Login" element={ !authUser ?  <Login/> : <Navigate to={"/Home"}/> }/>
      </Routes>
      <Toaster/>
      {/* <h1 className='text-red-500 text-6xl '>hello world</h1> */}
    </>
  )
}

export default App
