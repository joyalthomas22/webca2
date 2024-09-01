"use client"; 
import { useState } from 'react';
import Link from 'next/link';

export  function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link legacyBehavior href="/">
            <a>Twister</a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <Link legacyBehavior href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                Home
              </a>
            </Link>
            <Link legacyBehavior href="/about">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                About
              </a>
            </Link>
            <Link legacyBehavior href="/services">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                Services
              </a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                Contact
              </a>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export  function Navbarlog() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="bg-purple-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link legacyBehavior href="/">
              <a>Twister</a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link legacyBehavior href="/">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Home
                </a>
              </Link>
              <Link legacyBehavior href="/signup">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200">
                  Signup
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  export  function Navbarsign() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="bg-purple-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link legacyBehavior href="/">
              <a>Twister</a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link legacyBehavior href="/">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Home
                </a>
              </Link>
              <Link legacyBehavior href="/login">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200">
                  login
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  export  function Navbarcomment() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="bg-purple-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link legacyBehavior href="/">
              <a></a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link legacyBehavior href="/">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Home
                </a>
              </Link>
              <Link legacyBehavior href="/login">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200">
                  login
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  export  function Navbarview() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleLogout = () => {
      // Clear the session storage
      sessionStorage.removeItem('userId');
      localStorage.removeItem('authToken');
  
    };
    
  
    return (
      <nav className="bg-purple-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link legacyBehavior href="/">
              <a>Twister</a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:items-center lg:w-auto`}
          >
            <Link legacyBehavior href="/preview">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Global posts
                </a>
                </Link>
            <div className="text-sm lg:flex-grow">
              <Link legacyBehavior href="/followingpost">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Followers posts
                </a>
              </Link>
              <Link legacyBehavior href="/followers">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Followers
                </a>
                </Link>
                <Link legacyBehavior href="/following">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Following
                </a>
                </Link>
              
              <Link legacyBehavior href="/createpost">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Create the post
                </a>
                </Link>
              <Link legacyBehavior href="/login">
              <a
                onClick={handleLogout}
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200"
              >
                Logout 
              </a>
            </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  