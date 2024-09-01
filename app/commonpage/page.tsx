"use client";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from '../navbar/navbars';

const posts = [
  {
    id: 1,
    user: "Joyal",
    content: "Enjoying the beautiful sunset!",
    imageUrl: "/assets/sunset.jpg",
  },
  {
    id: 2,
    user: "Aloy",
    content: "Had a great time hiking today.",
    imageUrl: "/assets/hiking.jpg",
  },
  {
    id: 3,
    user: "Joart",
    content: "Just finished a new painting.",
    imageUrl: "/assets/painting.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-purple-500 p-4 text-center shadow-lg">
        <h1 className="text-white text-4xl font-bold">Twister</h1>
      </div>

      <Navbar />
      <div className="flex flex-col items-center justify-around p-12 bg-gray-100 min-h-[80vh] text-center">
        <div className="max-w-2xl w-full">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                  {post.user.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{post.user}</h2>
                </div>
              </div>
              <p className="mb-4">{post.content}</p>
              <Image src={post.imageUrl} width="500" height="500" alt="Post image" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */} 
      <div className="bg-purple-500 text-white text-center p-5 mt-auto shadow-lg">
        <p>&copy; 2023 Twister. All rights reserved.</p>
      </div>
    </div>
  );
}