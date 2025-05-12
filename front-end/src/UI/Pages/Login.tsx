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
    <div className="p-4 h-screen flex items-center justify-center">
  <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div className="w-full p-6 bg-purple-400/10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md border border-gray-100 shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-300 mb-6">Log In</h1>

      <form onSubmit={handleLoginForm} className="flex flex-col space-y-4">
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

        <button
          className="btn btn-block btn-sm h-11 text-[1.1rem] bg-purple-600 hover:bg-purple-700 text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <Link
          to="/signup"
          className="text-sm hover:underline text-gray-300 hover:text-purple-300 text-center mt-1"
        >
          Don't have an account?
        </Link>
      </form>
    </div>
  </div>
</div>
    )
}

export default Login