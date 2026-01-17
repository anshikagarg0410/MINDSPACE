import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Exercise from './backend/models/Exercise.js';
import User from './backend/models/User.js'; // Import your User model

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Create or find a admin/dummy user to "own" these exercises
    let adminUser = await User.findOne({ email: 'admin@mindfulspace.com' });
    if (!adminUser) {
        adminUser = await User.create({
            name: 'Admin',
            email: 'admin@mindfulspace.com',
            password: 'password123' // This will be hashed by your model
        });
    }

    // 2. Read the JSON file
    const exercisesData = JSON.parse(
      fs.readFileSync('./backend/data/exercises.json', 'utf-8')
    );

    // 3. Add the user ID to every exercise object before saving
    const exercisesWithUser = exercisesData.map(ex => ({
        ...ex,
        user: adminUser._id
    }));

    await Exercise.deleteMany({}); 
    await Exercise.insertMany(exercisesWithUser);
    
    console.log("Database Seeded Successfully with User assignment!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
};

seedDB();