

import Exercise from '../models/Exercise.js'; // 💡 NEW IMPORT - Model

const getExercises = async (req, res) => {
    try {
        // You would typically filter by a common field like category OR filter the user's progress.
        // For simplicity now, we just fetch all exercises (but restrict the route to logged-in users).
        const exercises = await Exercise.find(); 
        res.json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ message: "Failed to fetch exercises" });
    }
};

export default {
    getExercises,
};