"use client";

import { useState } from 'react';
import Link from 'next/link';
import { loginWithEmail } from '@/utils/supabase';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
	
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    if (!emailPattern.test(email)) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }

    // Validate password (for demonstration, you can add more complex validation)
    if (!password) {
      setPasswordInvalid(true);
    } else {
      setPasswordInvalid(false);
    }

    // If both email and password are valid, you can proceed with authentication
    if (!emailInvalid && !passwordInvalid) {
      if (!loginWithEmail(email, password))
        setInvalidCredentials(true);
    }
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="email" className="block text-white">Email</label>
              <input
                type="text"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mb-1 py-2 px-3 rounded-lg ${emailInvalid ? 'bg-red-100' : 'bg-gray-100'} text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500`}
              />
            </div>
            {emailInvalid && (
              <p className="text-red-600 text-sm">Please enter a valid email.</p>
            )}

            <div className="mt-4 mb-1">
              <label htmlFor="password" className="block text-white">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mb-1 py-2 px-3 rounded-lg ${passwordInvalid ? 'bg-red-100' : 'bg-gray-100'} text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500`}
              />
            </div>
            {passwordInvalid && (
              <p className="text-red-600 text-sm">Please enter a valid password.</p>
            )}

						{invalidCredentials && (
              <p className="text-red-600 text-sm">Invalid login credentials</p>
            )}

            <div className="mt-4 mb-1 text-sm">
              <p>Don't have an account?{' '}
                <Link href="/signup" className="text-blue-500">
                  Sign up here
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
