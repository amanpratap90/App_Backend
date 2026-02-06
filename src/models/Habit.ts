import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    id: { type: String, required: true }, // Custom frontend ID
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    frequency: { type: [String], default: ['Daily'] },
    completedDays: { type: [String], default: [] },
    streak: { type: Number, default: 0 },
    subtasks: [{ id: String, title: String, completed: Boolean }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Habit', habitSchema);
