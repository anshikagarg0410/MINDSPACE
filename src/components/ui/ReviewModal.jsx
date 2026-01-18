// src/components/ui/ReviewModal.jsx
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, exerciseId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { getAuthHeader } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/exercises/${exerciseId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ rating, comment })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit review');
      }

      alert('Review submitted successfully!');
      setRating(0);
      setComment('');
      onReviewSubmitted(); // Refresh parent data
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
        
        <form onSubmit={handleSubmit}>
          {/* Star Rating Selector */}
          <div className="flex gap-2 mb-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                {star <= rating ? (
                  <StarIcon className="w-8 h-8 text-yellow-400" />
                ) : (
                  <StarIconOutline className="w-8 h-8 text-gray-300" />
                )}
              </button>
            ))}
          </div>

          {/* Comment Area */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
              rows="4"
              placeholder="How did this exercise make you feel?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 disabled:bg-violet-300"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;