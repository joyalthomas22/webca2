"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbarview } from '../navbar/navbars';

interface User {
  id: number;
  username: string;
  profile_image_url: string; // Ensure this matches the correct column name in your database
}

export default function FollowingPage() {
  const [following, setFollowing] = useState<User[]>([]);
  const [loggedUserId, setUserId] = useState<number | null>(null);
  const [followingStatus, setFollowingStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`/api/following?loggedUserId=${loggedUserId}`);
        if (response.ok) {
          const data = await response.json();
          setFollowing(data);
          const status = data.reduce((acc: { [key: number]: boolean }, user: User) => {
            acc[user.id] = true;
            return acc;
          }, {});
          setFollowingStatus(status);
        } else {
          console.error('Failed to fetch following list');
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    if (loggedUserId !== null) {
      fetchFollowing();
    }
  }, [loggedUserId]);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const handleFollow = async (userId: number) => {
    try {
      const response = await fetch('/api/follow', {
        method: followingStatus[userId] ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId: loggedUserId, followingId: userId }),
      });

      if (response.ok) {
        if (followingStatus[userId]) {
          // If unfollowing, remove the user from the state
          setFollowing((prevFollowing) => prevFollowing.filter((user) => user.id !== userId));
        } else {
          // If following, add the user to the state (you might need to fetch the user details)
          const newUser: User = await response.json();
          setFollowing((prevFollowing) => [...prevFollowing, newUser]);
        }
        setFollowingStatus((prev) => ({ ...prev, [userId]: !prev[userId] }));
        console.log('Follow status changed successfully');
      } else {
        console.error('Failed to change follow status');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-background">
      <div className="bg-purple-500 p-4 text-center shadow-lg">
        <h1 className="text-white text-4xl font-bold">Twister</h1>
      </div>

      <Navbarview />
      <div className="flex flex-col items-center justify-around p-12 min-h-[80vh] text-center">
        <div className="max-w-2xl w-full">
          {following.map((user) => (
            <div key={user.id} className="border border-gray-500 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="rounded-full h-10 w-10 flex items-center justify-center">
                    <Image src={user.profile_image_url} width="40" height="40" alt={`${user.username}'s profile`} className="rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{user.username}</h2>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`px-4 py-2 rounded-lg ${followingStatus[user.id] ? 'bg-red-500 hover:bg-red-700' : 'bg-purple-500 hover:bg-purple-700'} text-white`}
                >
                  {followingStatus[user.id] ? 'Unfollow' : 'Follow'}
                </button>
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