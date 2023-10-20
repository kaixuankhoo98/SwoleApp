"use client";

import { useState } from "react";
import Link from 'next/link';
import { supabase } from "@/utils/supabase";
import Main from "@/components/Main";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  const [userExists, setUserExists] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailInvalid(true);
      return;
    }

    if (!(password === reenteredPassword)) {
      setPasswordsDoNotMatch(true);
      return;
    }
    
    setEmailInvalid(false);
    setPasswordsDoNotMatch(false);

    console.log({
      email: email,
      password: password,
    });
    // Call supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    console.log('data', data);
    console.log('error', error);
    if (!error && data.user.id && data.user.aud && !data.session) {
      setUserExists(true);
    }
  }

  return (
    <Main>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
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
                className="w-full mb-1 py-2 px-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4 mb-1">
              <label htmlFor="password" className="block text-white">Re-enter Password</label>
              <input
                type="password"
                id="reenteredPassword"
                placeholder="Re-enter password..."
                value={reenteredPassword}
                onChange={(e) => setReenteredPassword(e.target.value)}
                className={`w-full mb-1 py-2 px-3 rounded-lg ${passwordsDoNotMatch ? 'bg-red-100' : 'bg-gray-100'} text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500`}
              />
            </div>
            {passwordsDoNotMatch && (
              <p className="text-red-600 text-sm">Passwords do not match.</p>
            )}

            {userExists ? (
              <div className="mt-4 mb-1 text-sm" >
                <p className="text-red-500 text-sm">
                  Email already in use. {' '}
                  <Link href="/login" className="text-red-800">
                    Sign In?
                  </Link>
                </p>
              </div>
            ) : (
              <div className="mt-4 mb-1 text-sm" >
                <p>Already have an account?{' '}
                  <Link href="/login" className="text-blue-500">
                    Log in here
                  </Link>
                </p>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Main>
  )
}

export default Signup
