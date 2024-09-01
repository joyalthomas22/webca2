"use client";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from '../navbar/navbars';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="bg-purple-500 p-4 text-center">
        <h1 className="text-black text-2xl"> About Us </h1>
      </div>

      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-lavender min-h-[80vh] text-center">        <div className="max-w-lg bg-lavender p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl text-purple-500 mb-5">Our Story</h2>
          <p className="mb-4">
            At Twister, we are passionate about connecting people and fostering communities. Our journey began with a simple idea: to create a platform where everyone can share their stories and experiences.
          </p>
          <p className="mb-4">
            Our mission is to provide a space where users can express themselves freely and connect with others who share their interests. We believe in the power of community and strive to make Twister a place where everyone feels welcome.
          </p>
          <p className="mb-4">
            Thank you for being a part of our journey. We look forward to growing and evolving with you!
          </p>
        </div>
        <Image src="/assets/aboutus.png" width="500" height="500" alt="Social media image" className="max-w-full h-auto rounded-lg shadow-lg mt-8 md:mt-0" />
      </div>

      {/* Footer */} 
      <div className="bg-purple-500 text-white text-center p-5 mt-auto">
      </div>
    </div>
  );
}