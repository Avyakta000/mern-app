import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, } from 'react-router-dom';
import Swal from 'sweetalert2';


const SideBar = () => {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    const logout = () => {
        const val = localStorage.getItem('token');
        console.log('logout process')
        if (!val) {
            return Swal.fire('Oops...', 'Token does not exist !', 'error')
        }
        console.log(val, '---token')
        localStorage.removeItem('token');
        Swal.fire({
            position: "center",
            icon: "success",
            title: "logged out successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/login")
        console.log('Logged out successfully');

    }

    const signInGoogle = async () => {
        console.log('google btn clicked')
        window.location.href = 'http://localhost:5000/auth/google'; //redirecting user to the server
    }



    return (
        <div className='bg-[#ff59cd] h-screen rounded border-gray-300  sticky top-0 xl:w-1/4 md:2/5 w-3/5'>
            <h2 className="text-center text-2xl text-white font-semibold m-4">Admin Panel</h2>

            <div className=" flex flex-col justify-center items-center gap-4  p-4 ">

                <Link


                    to={"/"}
                    className="py-2 px-4  underline-offset-8 hover:underline text-white  focus:outline-none"
                >
                    Home
                </Link>
                <Link


                    to={"/banner"}
                    className="py-2 px-4  underline-offset-8 hover:underline text-white  focus:outline-none"
                >
                    Banner
                </Link>
                <Link
                    to={"/login"}

                    className="py-2 px-4  underline-offset-8 hover:underline text-white  focus:outline-none"
                >
                    Login
                </Link>

                <Link
                    to={"/signup"}

                    className=" py-2 px-4 underline-offset-8 hover:underline   rounded-md  text-white focus:outline-none "
                >
                    Signup
                </Link>

                <button
                    // to = {"/logout"}
                    onClick={logout}

                    className=" py-2 px-4 underline-offset-8 hover:underline  rounded-md  text-white focus:outline-none  "
                >
                    Logout
                </button>




            </div>
        </div>
    )
}

export default SideBar
