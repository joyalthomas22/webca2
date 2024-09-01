"use client";
import { Navbarlog } from '../navbar/navbars';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && loginSuccess) {
      router.push('/preview');
    }
  }, [isClient, loginSuccess, router]);

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('/api/loginHandler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          console.log('Login successful');
          const data = await response.json();
          sessionStorage.setItem('user', JSON.stringify(data));
          sessionStorage.setItem('userId', data.id); 
          setLoginSuccess(true);
        } else {
          const data = await response.json();
          setError(data.error);
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
      <Navbarlog />
      <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-gray min-h-[80vh] text-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl text-purple-800 font-bold mb-6">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded bg-white text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded bg-white text-black"
                required
              />
            </div>
            <button type="submit" className="bg-purple-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}