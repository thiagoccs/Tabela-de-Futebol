import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);
const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardController.leaderBoardHome(req, res));

export default leaderBoardRoutes;
