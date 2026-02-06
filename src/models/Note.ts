import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    id: { type: String, required: true }, // Custom frontend ID
    topicId: { type: String, required: true }, // Groups notes by topic
    topic: { type: String, required: true }, // Topic name (e.g., "Math", "Physics")
    text: { type: String, required: true }, // Note description/content
    color: { type: String, default: '#ffffff' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
