import express, { Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { CustomRequest, verifyToken } from '../../middlewares/Authmidlewares/IsAuthenticated';
import User from '../../models/Users';
import { asyncHandler } from '../../middlewares/errorHandler';


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

ProfileController.get('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByPk(req.user!.id, { attributes: { exclude: ['password'] } });
    if (!user) {
        return next(new Error('User not found')); 
    }
    res.json(user);
}));

ProfileController.put('/', verifyToken, upload.single('profilePhoto'), asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    const profilePhoto = req.file ? req.file.path : undefined;

    const updatedData: Partial<{ name: string; email: string; profilePhoto: string }> = { name, email };
    if (profilePhoto) updatedData.profilePhoto = profilePhoto;

    const [affectedCount, updatedUsers] = await User.update(updatedData, {
        where: { id: req.user!.id },
        returning: true,
    });

    if (affectedCount === 0) {
        return next(new Error('User not found')); 
    }

    res.status(200).json(updatedUsers[0]);
}));

ProfileController.delete('/', verifyToken, asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await User.destroy({ where: { id: req.user!.id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        return next(new Error('Server error')); 
    }
}));

export default ProfileController;
