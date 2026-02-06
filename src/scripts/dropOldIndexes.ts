import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dropOldIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/habitflow');
        console.log('MongoDB Connected');

        const db = mongoose.connection.db;

        if (!db) {
            throw new Error('Database connection not established');
        }

        // Drop old 'id' index from users collection
        try {
            await db.collection('users').dropIndex('id_1');
            console.log('✓ Dropped id_1 index from users collection');
        } catch (error: any) {
            if (error.code === 27) {
                console.log('✓ Index id_1 does not exist (already clean)');
            } else {
                throw error;
            }
        }

        console.log('✓ Database cleanup complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dropOldIndexes();
