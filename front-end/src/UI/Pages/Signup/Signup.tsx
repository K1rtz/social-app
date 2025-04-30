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
    <form onSubmit={handleSubmitForm}>
        <div>
            <label className='label p-2'>
                <span className="text-base label-text text-gray-300"> Full Name </span>
            </label>
            <input type="text" placeholder="fullname" className=" bg-purple-300/20 input  w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={inputs.fullName}
            onChange={(e)=> setInputs({ ...inputs, fullName: e.target.value})}
            />
        </div>
        <div>
            <label className='label p-2'>
                <span className="text-base label-text text-gray-300"> Username </span>
            </label>
            <input type="text" placeholder="username" className=" bg-purple-300/20 input  w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={inputs.username}
            onChange={(e)=> setInputs({ ...inputs, username: e.target.value})}
            />
        </div>
        <div>
            <label className='label p-2'>
                <span className="text-base label-text text-gray-300"> Password </span>
            </label>
            <input type="password" placeholder="enter password" className="input bg-purple-300/20 w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={inputs.password}
            onChange={(e)=> setInputs({ ...inputs, password: e.target.value})}
            />
        </div>
        <div>
            <label className='label p-2'>
                <span className="text-base label-text text-gray-300"> Confirm Password </span>
            </label>
            <input type="password" placeholder="repeat password" className="input bg-purple-300/20 w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={inputs.confirmPassword}
            onChange={(e)=> setInputs({ ...inputs, confirmPassword: e.target.value})}
            />
        </div>

        <GenderCheckbox 
        selectedGender={inputs.gender}
        onCheckBoxChange={handleCheckboxChange}
        />

        <div>
            <button className='btn btn-block btn-sm mt-4 h-11 text-[1.1rem]' disabled = {loading}> {loading? 'Loading...' : 'Sign Up'} </button>
        </div>
        <Link to="/login">
        <a href="#" className='text-sm hover:underline hover:text-blue-200 mt-0 inline-block'> Already have an account?</a>
        </Link>
        
    </form>
    </div>
</div> 
</div>
 )
}

export default Signup