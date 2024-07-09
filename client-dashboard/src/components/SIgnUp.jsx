import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const signInGoogle = async () => {
    console.log('google btn clicked')
    window.location.href = 'http://localhost:5000/auth/google'; //redirecting user to the server
  }

  const navigator = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, 'signup')
      if (res.ok) {
        localStorage.setItem('token', data.authToken);
        console.log('Registered successfully');
        navigator("/")

      } else {
        console.error(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 w-full rounded flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#ff59cd] text-white py-2 rounded hover:bg-white hover:text-[#ff59cd]">
            Sign Up
          </button>

          <button
            // to = {"/logout"}
            onClick={signInGoogle}

            className="w-full py-2 no-underline text-black-400 px-4 hover:text-pink hover:border-pink-400 flex flex-row items-center justify-center gap-2 text-md border-2  rounded-md  focus:outline-none  "
          >
            <FcGoogle /> <span className=''>Sign in with Google</span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
