"use client";
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { Navbarview } from '../navbar/navbars';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const validateForm = () => {
      if (!title || !content || !pictureUrl) {
          setError('Title, content and picture are required');
          return false;
      }
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
      );
  
      if (!urlPattern.test(pictureUrl)) {
        setError('Invalid URL format');
        return false;
      }
      setError('');
      return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
          try {
              const response = await fetch('/api/createposts', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({  userId, title, content, pictureUrl}),
              });

              if (response.ok) {
                  console.log('Post created successfully');
                  setSuccess(true);
                  router.push('/preview'); // Navigate to posts page after successful creation
              } else {
                  const data = await response.json();
                  setError(data.error);
              }
          } catch (error) {
              console.error('An unexpected error occurred:', error);
              setError('An unexpected error occurred. Please try again.');
          }
      }
  };
  
  return (

    <div className="flex flex-col min-h-screen">
    <div className="bg-purple-500 p-4 text-center">
      <h1 className="text-black text-2xl">Twister</h1>
    </div>
    <Navbarview />
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">

      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full  text-gray-700 px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full  text-gray-700 px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pictureUrl" className="block text-gray-700 font-bold mb-2">Picture URL</label>
          <input
            type="url"
            id="pictureUrl"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            className="w-full  text-gray-700 px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">
          Create Post
        </button>
      </form>
    </div>
    </div>
  );
}