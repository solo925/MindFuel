import express, { Response } from 'express';
import { CustomRequest } from '../../middlewares/Authmidlewares/IsAuthenticated';
import Report from '../../models/Report';

export const ReportController = express.Router();

// Create a new report
ReportController.post('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { habitId, goalId, recommendationId, content } = req.body;
        const userId = req.user!.id; // Using the ID from the verified token

        const report = await Report.create({
            userId,
            habitId,
            goalId,
            recommendationId,
            content,
        });

        res.status(201).json({ message: 'Report created successfully', data: report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve all reports for the authenticated user
ReportController.get('/', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;

        const reports = await Report.findAll({ where: { userId } });
        if (reports.length > 0) {
            res.status(200).json(reports);
        } else {
            res.status(404).json({ message: 'No reports found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an existing report
ReportController.put('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const reportId = req.params.id;
        const { content } = req.body;
        const userId = req.user!.id;

        const report = await Report.findOne({ where: { id: reportId, userId } });

        if (!report) {
            res.status(404).json({ message: 'Report not found' });
            return;
        }

        report.content = content || report.content;

        await report.save();
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a report
ReportController.delete('/:id', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const reportId = req.params.id;
        const userId = req.user!.id;

        const report = await Report.findOne({ where: { id: reportId, userId } });

        if (!report) {
            res.status(404).json({ message: 'Report not found' });
            return;
        }

        await report.destroy();
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default ReportController;
