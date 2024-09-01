"use client";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from '../navbar/navbars';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="bg-purple-500 p-4 text-center">
        <h1 className="text-black text-2xl"> Contacts </h1>
      </div>

      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-gray min-h-[80vh] text-center">
        <div className="max-w-lg">
          <h2 className="text-4xl text-purple-500 mb-5">Our Contacts</h2>
          <p className="mb-4">
            Here are some of our key contacts:
          </p>
          <ul className="list-disc list-inside mb-4">
          
            <li>Joyal - (123) 456-7890</li>

            <li>Pooks - (234) 567-8901</li>

            <li>Berrey - (345) 678-9012</li>

          </ul>
          <p className="mb-4">
            Feel free to reach out to any of our contacts for more information or assistance.
          </p>
        </div>
        <Image src="/assets/contactus.png" width="500" height="500" alt="Social media image" className="max-w-full h-auto rounded-lg shadow-lg mt-8 md:mt-0" />
      </div>

      {/* Footer */} 
      <div className="bg-purple-500 text-white text-center p-5 mt-auto">
      </div>
    </div>
  );
}