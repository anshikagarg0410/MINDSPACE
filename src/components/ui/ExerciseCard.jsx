import React from 'react';

const ExerciseCard = ({ imageSrc, title, duration, category, difficulty, benefits,videoUrl }) => {
  // Determine the color class for the difficulty badge
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-700',
    'Intermediate': 'bg-orange-100 text-orange-700',
    'Advanced': 'bg-red-100 text-red-700',
  }[difficulty] || 'bg-gray-100 text-gray-700';

  const handleStartExercise = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("No video available for this exercise.");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
      
      {/* Exercise Image/Media Placeholder */}
      <div className="h-40 w-full overflow-hidden">
        {/* In a real app, this would use a proper <img> tag */}
        <img src={imageSrc} alt={title} className="w-full h-full object-cover"/>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title and Duration */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">🕒</span>
            <span>{duration} min</span>
          </div>
        </div>
        
        {/* Badges: Category and Difficulty */}
        <div className="flex space-x-2 mb-4">
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{category}</span>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColor}`}>{difficulty}</span>
        </div>

        {/* Description/Benefits Preview */}
        <p className="text-sm text-gray-600 mb-4">{benefits}</p>

        {/* Action Button */}
        <div className="mt-auto">
          <button onClick={handleStartExercise} className="w-full py-2 px-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors duration-200 flex items-center justify-center">
            <span className="mr-2">▶</span>
            Start Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;