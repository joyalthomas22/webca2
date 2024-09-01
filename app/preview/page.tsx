
"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Navbarview } from '../navbar/navbars';
import { useRouter } from 'next/navigation';
interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  picture_url: string;
  created_at: string;
  username: string;
  profile_image_url: string;
}

export default function GlobalView() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loggedUserId, setUserId] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [followingStatus, setFollowingStatus] = useState<{ [key: number]: boolean }>({});


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/viewing');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        console.error('An unexpected error occurred :', error);
        setError('An unexpected error occurred Please try again');
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Retrieve user ID from session storage
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    if (loggedUserId !== null) {
      posts.forEach((post) => {
        checkIfLiked(post.id, loggedUserId);
        checkIfFollowing(post.user_id, loggedUserId);
      });
    }
  }, [posts, loggedUserId]);

  useEffect(() => {
    posts.forEach((post) => {
      fetchLikeCount(post.id);
    });
  }, [posts]);

  const handleLike = async (postId: number) => {
    try {
      const response = await fetch('/api/like', {
        method: likedPosts[postId] ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, loggedUserId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
        setLikeCounts((prev) => ({ ...prev, [postId]: data.count }));
        console.log('Post like  status changed successfully');
      } else {
        console.error('Failed to like the post');
      }
    } catch (error) {
      console.error('An unexpected error occurred :', error);
    }
  };

  const checkIfLiked = async (postId: number, loggedUserId: number) => {
    try {
      const response = await fetch(`/api/like?postId=${postId}&loggedUserId=${loggedUserId}&check=true`);
      const data = await response.json();
      setLikedPosts((prev) => ({ ...prev, [postId]: data.liked }));
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };
  const fetchLikeCount = async (postId: number) => {
    try {
      const response = await fetch(`/api/like?postId=${postId}&count=true`);
      const data = await response.json();
      setLikeCounts((prev) => ({ ...prev, [postId]: data.count }));
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };
  const checkIfFollowing = async (userId: number, loggedUserId: number) => {
    try {
      const response = await fetch(`/api/follow?followerId=${loggedUserId}&followingId=${userId}&check=true`);
      const data = await response.json();
      setFollowingStatus((prev) => ({ ...prev, [userId]: data.following }));
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };
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
        setFollowingStatus((prev) => ({ ...prev, [userId]: !prev[userId] }));
        console.log('Follow status changed successfully');
      } else {
        console.error('Failed to change follow status');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };
  const handleComment = (userId: number,postUserID: number) => {
    sessionStorage.setItem('postId', String(userId));
    sessionStorage.setItem('postUserID', String(postUserID));
    router.push('/comment');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-purple-500 p-4 text-center">
        <h1 className="text-black text-2xl">Twister - Global View</h1>
      </div>
      <Navbarview />
      <div className="flex flex-col items-center justify-around p-12 bg-gray min-h-[80vh] text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Image
                  src={post.profile_image_url}
                  width={40}
                  height={40}
                  alt="Profile image"
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">{post.username}</h2>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
              <img src={post.picture_url} alt={post.title} className="mb-2 w-full h-64 object-cover rounded" />
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm mt-2">{new Date(post.created_at).toLocaleString()}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`px-4 py-2 rounded-lg ${likedPosts[post.id] ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                >
                  {likedPosts[post.id] ? 'Unlike' : 'Like'}
                </button>
                <div className="flex items-center">
                  <span className="bg-purple-500 text-white px-4 py-2 rounded-lg ">{likeCounts[post.id] || 0} Likes</span>
                </div>

                <button
                  onClick={() => handleFollow(post.user_id)}
                  className={`px-4 py-2 rounded-lg ${followingStatus[post.user_id] ? 'bg-red-500 hover:bg-red-700' : 'bg-purple-500 hover:bg-purple-700'} text-white`}
                >
                  {followingStatus[post.user_id] ? 'Unfollow' : 'Follow'}
                </button>
                <button
                  onClick={() => handleComment(post.id,post.user_id)}
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}