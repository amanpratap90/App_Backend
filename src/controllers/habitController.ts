import { Response } from 'express';
import Habit from '../models/Habit';
import { AuthRequest } from '../middleware/authMiddleware';

export const getHabits = async (req: AuthRequest, res: Response) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);
    } catch (error) {
        console.error('Error in getHabits:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createHabit = async (req: AuthRequest, res: Response) => {
    const { id, name, category, frequency, user } = req.body;
    // user in body is just a fallback, use req.user.id
    try {
        const habit = new Habit({
            userId: req.user.id,
            id: id,
            name: name, // Frontend sends name
            category: category,
            frequency: frequency,
            completedDays: [],
            streak: 0,
            subtasks: []
        });

        const createdHabit = await habit.save();
        // Return all habits to match frontend expectation (it usually refetches or expects list?) 
        // Actually frontend expects returning the *list* often? 
        // Let's check frontend service: `const response = await api.post... return response.data;`
        // If frontend expects list, I should return list.
        // But better REST practice is to return the created item.
        // Frontend `createHabit` returns `Habit[]`. So I MUST return the list.
        const habits = await Habit.find({ userId: req.user.id });
        res.status(201).json(habits);
    } catch (error) {
        console.error('Error in getHabits:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteHabit = async (req: AuthRequest, res: Response) => {
    try {
        // Frontend sends ID in URL: /habits/:id
        // This ID is the CUSTOM id, not _id
        await Habit.findOneAndDelete({ id: req.params.id, userId: req.user.id });
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);
    } catch (error) {
        console.error('Error in getHabits:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const toggleHabit = async (req: AuthRequest, res: Response) => {
    const { date } = req.body;
    try {
        const habit = await Habit.findOne({ id: req.params.id, userId: req.user.id });
        if (habit) {
            const index = habit.completedDays.indexOf(date);
            if (index > -1) {
                habit.completedDays.splice(index, 1);
            } else {
                habit.completedDays.push(date);
            }
            await habit.save();
            const habits = await Habit.find({ userId: req.user.id });
            res.json(habits);
        } else {
            res.status(404).json({ message: 'Habit not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
