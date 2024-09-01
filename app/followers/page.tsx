"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbarview } from '../navbar/navbars';

interface User {
  id: number;
  username: string;
  profile_image_url: string;
  follower_count: number;
}

export default function FollowersPage() {
  const [followers, setFollowers] = useState<User[]>([]);
  const [loggedUserId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/api/followers?loggedUserId=${loggedUserId}`);
        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
        } else {
          console.error('Failed to fetch followers list');
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    if (loggedUserId !== null) {
      fetchFollowers();
    }
  }, [loggedUserId]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-custom-background">
      <div className="bg-purple-500 p-4 text-center shadow-lg">
        <h1 className="text-white text-4xl font-bold">Twister</h1>
      </div>

      <Navbarview />
      <div className="flex flex-col items-center justify-around p-12 min-h-[80vh] text-center">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">Followers: {followers.length}</h2>
          {followers.map((user) => (
            <div key={user.id} className="border border-gray-500 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="rounded-full h-10 w-10 flex items-center justify-center">
                    <Image src={user.profile_image_url} width="40" height="40" alt={`${user.username}'s profile`} className="rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{user.username}</h2>
                    <p className="text-gray-600">Followers: {user.follower_count}</p>
                  </div>
                </div>
              </div>
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