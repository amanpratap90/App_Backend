import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Habit limit fields for freemium model
    allowedHabits: { type: Number, default: 2 }, // Free limit
    unlimitedUntil: { type: Date, default: null }, // 24h unlimited after watching ad
}, { timestamps: true });

export default mongoose.model('User', userSchema);
