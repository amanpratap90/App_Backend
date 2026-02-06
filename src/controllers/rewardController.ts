import { Response } from 'express';
import User from '../models/User';
import Habit from '../models/Habit';
import { AuthRequest } from '../middleware/authMiddleware';

// Get user's current reward/limit status
export const getRewardStatus = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Count user's habits
        const habitCount = await Habit.countDocuments({ userId: req.user.id });

        // Check if unlimited access is still active
        const now = new Date();
        const isUnlimited = user.unlimitedUntil && new Date(user.unlimitedUntil) > now;

        res.json({
            currentHabits: habitCount,
            allowedHabits: user.allowedHabits || 2,
            unlimitedUntil: user.unlimitedUntil,
            isUnlimited: isUnlimited,
            canCreateHabit: isUnlimited || habitCount < (user.allowedHabits || 2)
        });
    } catch (error) {
        console.error('Error in getRewardStatus:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Grant 24-hour unlimited access after watching ad
export const grantReward = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set unlimited access for 24 hours from now
        const unlimitedUntil = new Date();
        unlimitedUntil.setHours(unlimitedUntil.getHours() + 24);

        user.unlimitedUntil = unlimitedUntil;
        await user.save();

        // Return updated status
        const habitCount = await Habit.countDocuments({ userId: req.user.id });

        res.json({
            success: true,
            message: 'Unlimited habits granted for 24 hours!',
            currentHabits: habitCount,
            allowedHabits: user.allowedHabits || 2,
            unlimitedUntil: user.unlimitedUntil,
            isUnlimited: true,
            canCreateHabit: true
        });
    } catch (error) {
        console.error('Error in grantReward:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
