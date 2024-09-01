import Image from "next/image";
import Link from "next/link";
import { Navbar } from './navbar/navbars';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-background bg-cover bg-center">
      {/* Header */}
      <div className="bg-purple-500 p-4 text-center bg-opacity-90">
        <h1 className="text-black text-2xl">welcome</h1>
      </div>

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-around p-12 bg-transparent min-h-[80vh] text-center">
        <div className="max-w-lg">
          <h2 className="text-4xl text-purple-500 mb-5">
            See what is happening in this twisted world right now
          </h2>
          <p className="text-xl mb-8">
            Join Twister today and start sharing your thoughts with the twisted world.
          </p>

          {/* Sign Up and Login Links */}
          <Link legacyBehavior href="./signup">
            <a className="inline-block px-6 py-3 bg-blue-500 text-white text-lg rounded-full transition-colors hover:bg-blue-600">
              Sign Up
            </a>
          </Link>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-500 text-white text-lg rounded-full ml-4 transition-colors hover:bg-blue-600"
          >
            Login
          </a>
        </div>

        {/* Image Section */}
        <Image
          src="/assets/logo.png"
          width={500}
          height={500}
          alt="Social media image"
          className="max-w-full h-auto rounded-lg shadow-lg mt-8 md:mt-0"
        />
      </div>

      {/* Footer */}
      <div className="bg-purple-500 text-white text-center p-5 mt-auto bg-opacity-90">
        {/* Footer content can be added here if needed */}
      </div>
    </div>
  );
}
