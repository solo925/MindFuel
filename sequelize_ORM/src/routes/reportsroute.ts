import express from 'express';
import ReportController from '../controllers/Reports/ReportsController';

const ReportRoute = express.Router();

ReportRoute.use('/', ReportController);

export default ReportRoute;