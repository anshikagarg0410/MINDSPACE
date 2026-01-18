import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ExercisePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, title } = location.state || {};

  const getEmbedUrl = (url) => {
    if (!url) return null;
    // Extract video ID for standard and shortened YouTube links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` 
      : null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Unavailable</h2>
        <p className="text-gray-600 mb-6">We couldn't find a valid video URL for this exercise.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    // 1. Main Background: White
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* 2. Header: Violet (Purple) to match app theme */}
      <div className="p-4 flex items-center bg-violet-600 shadow-md">
        <button 
          onClick={() => navigate(-1)} 
          // 3. Button hover: Darker violet for interaction feedback
          className="mr-4 p-2 rounded-full hover:bg-violet-700 transition-colors text-white"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        {/* 4. Title Text: White for contrast */}
        <h1 className="text-xl font-bold text-white tracking-wide">{title || 'Exercise Session'}</h1>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        
        {/* 5. Video Container: Clean look without heavy borders */}
        <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={embedUrl}
            title={title || "Exercise Video"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ExercisePlayer;