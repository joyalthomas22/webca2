
"use client"; 

//importing data base

import { db } from "@vercel/postgres";

//import navbar
import {Navbarsign} from '../navbar/navbars';


import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the 'useRouter' hook from the 'next/router' library

export default function Signup() {
  // Define state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');

  // Validation function
  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );

    if (!urlPattern.test(profileImage)) {
      setError('Invalid URL format');
      return false;
    }
    if (!username || !password || !confirmPassword || !firstName || !lastName || !profileImage) {
      setError('All fields are required');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
const router = useRouter(); // Add this line to initialize the 'router' object
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('/api/signupHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName, profileImage }),
      });

      if (response.ok) {
        // Handle success (e.g., redirect to login page)
        console.log('User registered successfully');
        router.push('/login'); // Redirect to login page
      } else {
        // Handle error (e.g., display error message)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          setError(data.error);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  }
};
      

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-purple-500 p-4 text-center">
        <h1 className="text-black text-2xl">Twister</h1>
      </div>
<Navbarsign />
      <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-gray min-h-[80vh] text-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl text-purple-800 font-bold mb-6">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-white-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white-700">Re-type Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white-700">Profile Image URL</label>
              <input
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="w-full p-2 border border-purple-500 rounded bg-white text-black"
              />
            </div>
            <button
            
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


