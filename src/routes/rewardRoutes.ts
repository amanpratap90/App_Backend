import express from 'express';
import { getRewardStatus, grantReward } from '../controllers/rewardController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Get current reward/limit status
router.get('/status', protect, getRewardStatus);

// Grant 24h unlimited access (called after ad watched)
router.post('/grant', protect, grantReward);

export default router;
