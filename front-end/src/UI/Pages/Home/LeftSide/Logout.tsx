import React from 'react'
import useLogout from '../../../../hooks/useLogout';

const Logout = () => {
    const {logout} = useLogout();

    return (
        <div className="pt-6 flex items-center justify-center text-gray-400 hover:text-red-400 cursor-pointer"
        onClick={logout}
        >
            <i className="bi bi-box-arrow-left mr-2 text-2xl"></i>
            Log out
        </div>  
    )
}

export default Logout