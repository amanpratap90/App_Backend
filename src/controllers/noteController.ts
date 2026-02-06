import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware';

export const getNotes = async (req: AuthRequest, res: Response) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createNote = async (req: AuthRequest, res: Response) => {
    const { id, text, color } = req.body;
    try {
        const note = new Note({
            userId: req.user.id,
            id: id,
            text: text,
            color: color
        });
        await note.save();
        const notes = await Note.find({ userId: req.user.id });
        res.status(201).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
    try {
        await Note.findOneAndDelete({ id: req.params.id, userId: req.user.id });
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
