import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardHomeService from '../services/LeaderBoardHomeService';
import LeaderBoardAwayService from '../services/LeaderBoardAwayService';

const leaderBoardHomeService = new LeaderBoardHomeService();
const leaderBoardAwayService = new LeaderBoardAwayService();
const leaderBoardHomeController = new LeaderBoardController(
  leaderBoardHomeService,
  leaderBoardAwayService,
);

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/home', (req, res) => leaderBoardHomeController.leaderBoardHome(req, res));
leaderBoardRoutes.get('/away', (req, res) => leaderBoardHomeController.leaderBoardAway(req, res));

export default leaderBoardRoutes;
