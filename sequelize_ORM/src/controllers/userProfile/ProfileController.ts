import express, { Response } from 'express';
import multer from 'multer';
import path from 'path';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import User from '../../models/Users';

export const ProfileController = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req: CustomRequest, file, cb) => {
        cb(null, `${req.user!.id}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });


ProfileController.get('/', verifyToken, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.user!.id, { attributes: { exclude: ['password'] } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


ProfileController.put('/', verifyToken, upload.single('profilePhoto'), async (req: CustomRequest, res: Response) => {
    try {
        const { name, email } = req.body;
        const profilePhoto = req.file ? req.file.path : undefined;

        const updatedData: Partial<{ name: string; email: string; profilePhoto: string }> = { name, email };
        if (profilePhoto) updatedData.profilePhoto = profilePhoto;

        const [affectedCount, updatedUsers] = await User.update(updatedData, {
            where: { id: req.user!.id },
            returning: true,

        });

        if (affectedCount === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(updatedUsers[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


ProfileController.delete('/', verifyToken, async (req: CustomRequest, res: Response) => {
    try {
        await User.destroy({ where: { id: req.user!.id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default ProfileController;
