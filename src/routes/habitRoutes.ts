import express from 'express';
import { getHabits, createHabit, deleteHabit, toggleHabit } from '../controllers/habitController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/', getHabits);
router.post('/', createHabit);
router.delete('/:id', deleteHabit);
router.patch('/:id/toggle', toggleHabit);

export default router;
