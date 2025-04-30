import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin';
import { Link } from "react-router-dom";


const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const {loading, login} = useLogin();

    const handleLoginForm = (e: React.FormEvent) =>{
        e.preventDefault();
        login(inputs.username, inputs.password);
    }
  return (
    <div className='p-4 h-screen flex items-center justify-center'>

        <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
            <div className="h-full w-full p-6 bg-purple-400/10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md border border-gray-100">
                <h1 className='text-3xl font-semibold text-center text-gray-300'>Log In</h1>
            <form onSubmit={handleLoginForm}>
                <div>
                    <label className='label p-2'>
                        <span className="text-base label-text text-gray-300"> Username </span>
                    </label>
                    <input type="text" placeholder="username" className=" bg-purple-300/20 input  w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value = {inputs.username}
                    onChange={(e)=>{ setInputs({...inputs, username: e.target.value})}}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className="text-base label-text text-gray-300"> Password </span>
                    </label>
                    <input type="password" placeholder="Enter password" className="input bg-purple-300/20 w-full h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value = {inputs.password} 
                    onChange={(e)=>{ setInputs({...inputs, password: e.target.value})}}

                    />
                </div>
                <div>
                    <button className='btn btn-block btn-sm mt-6 h-11 text-[1.1rem]' disabled= {loading}> {loading ? "Loading..." : "Login"} </button>
                </div>
                <Link to="/signup">
                <a href="#" className='text-sm hover:underline hover:text-blue-200 mt-0 inline-block'> Don't have an account?</a>
                </Link>
                
            </form>
            </div>
        </div>
        </div>
    )
}

export default Login