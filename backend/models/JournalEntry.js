

import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
    // 💡 NEW: Link to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    emoji: { type: String, required: true },
    mood: { type: String, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: [String], default: [] },
}, { timestamps: true }); // Mongoose handles created/updated time

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);

export default JournalEntry;