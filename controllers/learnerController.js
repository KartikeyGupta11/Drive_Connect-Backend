import { User } from "../models/User.js";


export const getAllLearners = async (req, res) => {
    try {
        const learners = await User.find({ role: 'learner' });
        res.json(learners);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}