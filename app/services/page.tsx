"use client";
import Image from "next/image";
import Link from "next/link";
import {Navbar} from '../navbar/navbars';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> 
   
    <div className="bg-purple-500 p-4 text-center">
        <h1 className="text-black text-2xl"> Services </h1>
    </div>

    <Navbar />
    <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-gray min-h-[80vh] text-center">
        <div className="max-w-lg">
            <h2 className="text-4xl text-purple-500 mb-5">Our Services</h2>
            <p className="mb-4">
          At Twister, we offer a variety of services to enhance your social media experience. Our goal is to provide tools and features that help you connect, share, and engage with the community.
        </p>
        <p className="mb-4">
          Our services include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Real-time messaging</li>
          <li>Photo and video sharing</li>
          <li>Customizable profiles</li>
          <li>Event creation and management</li>
          <li>Community groups and forums</li>
        </ul>
        <p className="mb-4">
          We are constantly working to improve our services and add new features based on your feedback. Our commitment is to make Twister the best platform for you to express yourself and stay connected.
        </p>
        <p className="mb-4">
          Thank you for choosing Twister. We look forward to serving you!
        </p>
      
            
        </div>
        <Image src="/assets/services.png" width="500" height="500" alt="Social media image" className="max-w-full h-auto rounded-lg shadow-lg mt-8 md:mt-0" /> 
      { /* https://www.freepik.com/icon/services_12287162 */ }
    </div>

    {/* Footer */} 
    <div className="bg-purple-500 text-white text-center p-5 mt-auto">
      </div>
      </div>
  );
}
