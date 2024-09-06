"use client";
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbarview } from '../navbar/navbars';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  username: string;
  profile_image_url: string;
}

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

const CommentPage = () => {
  const [newComment, setNewComment] = useState('');
  const [loggedUserId, setUserId] = useState<number | null>(null);
  const [postUserID, setPostUserID] = useState<number | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPostId = sessionStorage.getItem('postId');
    if (storedPostId) {
      setPostId(Number(storedPostId));
    }
  }, []);

  useEffect(() => {
    const storedPostUserId = sessionStorage.getItem('postUserID');
    if (storedPostUserId) {
      setPostUserID(Number(storedPostUserId));
    }
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/commenthandler?postId=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/commentPostRetriever?postId=${postId}&postUser=${postUserID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const postData = await response.json();
        setPosts(postData);
        console.log(postData);
      } else {
        console.error('Failed to fetch post');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };
  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);
  console.log('postId:', postId);
  console.log('userId:', loggedUserId);
  console.log('content:', newComment);
  const handleAddComment = async () => {
    try {
      
      const response = await fetch('/api/commenthandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ postId: postId, userId: loggedUserId, content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
      } else {
        console.error('Failed to add comment');
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
        <h2 className="text-xl font-bold mb-4">Post</h2>
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
          </div>
        ))}
        <div className="border border-gray-500 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 pb-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="rounded-full h-8 w-8 flex items-center justify-center">
                  <Image src={comment.profile_image_url} width={32} height={32} alt={`${comment.username}'s profile`} className="rounded-full" />
                </div>
                <div className="ml-2">
                  <h3 className="text-md font-bold">{comment.username}</h3>
                </div>
              </div>
              <p className="text-white">{comment.content}</p>
              <p className="text-white text-sm mt-1">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border rounded"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleAddComment}
              className="mt-2 w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-purple-500 text-white text-center p-5 mt-auto shadow-lg">
      <p>&copy; 2023 Twister. All rights reserved.</p>
    </div>
  </div>
  );
};

export default CommentPage;