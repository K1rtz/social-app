import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import useSignUp from '../../../hooks/useSignUp';
import { Link } from "react-router-dom";


function Signup() {

    const {loading, signup} = useSignUp();

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const handleCheckboxChange = (gender: "male" | "female" | "other") =>{
        setInputs({ ...inputs, gender })
    }


    const handleSubmitForm = (e : React.FormEvent) => {
        e.preventDefault();
        signup(inputs);
    }

  return (
    <div className='p-4 h-screen flex items-center justify-center'>

    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
    <div className="h-full w-full p-6 bg-purple-400/10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md border border-gray-100">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Sign up</h1>
    <form onSubmit={handleSubmitForm} className="flex flex-col space-y-4">
  <div>
    <label className="text-sm text-gray-300 mb-1 block">Full Name</label>
    <input
      type="text"
      placeholder="Full name"
      className="bg-purple-300/20 w-full h-10 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      value={inputs.fullName}
      onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
    />
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">Username</label>
    <input
      type="text"
      placeholder="Username"
      className="bg-purple-300/20 w-full h-10 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      value={inputs.username}
      onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
    />
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">Password</label>
    <input
      type="password"
      placeholder="Enter password"
      className="bg-purple-300/20 w-full h-10 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      value={inputs.password}
      onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
    />
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">Confirm Password</label>
    <input
      type="password"
      placeholder="Repeat password"
      className="bg-purple-300/20 w-full h-10 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
      value={inputs.confirmPassword}
      onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
    />
  </div>

  <GenderCheckbox selectedGender={inputs.gender} onCheckBoxChange={handleCheckboxChange} />

  <button
    className="btn btn-block btn-sm mt-2 h-11 text-[1.1rem] bg-purple-600 hover:bg-purple-700 text-white"
    disabled={loading}
  >
    {loading ? "Loading..." : "Sign Up"}
  </button>

  <Link to="/login" className="text-sm hover:underline text-gray-300 hover:text-purple-300 text-center mt-2">
    Already have an account?
  </Link>
</form>

    </div>
</div> 
</div>
 )
}

export default Signup