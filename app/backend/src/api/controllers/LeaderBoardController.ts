import { Request, Response } from 'express';
import LeaderBoardHomeService from '../services/LeaderBoardHomeService';
import LeaderBoardAwayService from '../services/LeaderBoardAwayService';
import LeaderBoardService from '../services/LeaderBoard';

export default class LeaderBoardController {
  private _homeService: LeaderBoardHomeService;
  private _awayService: LeaderBoardAwayService;
  private _service: LeaderBoardService;

  constructor(sH: LeaderBoardHomeService, sA: LeaderBoardAwayService, s: LeaderBoardService) {
    this._homeService = sH;
    this._awayService = sA;
    this._service = s;
  }

  async leaderBoardHome(_req: Request, res: Response) {
    const allTeams = await this._homeService.leaderBoardHome();
    return res.status(200).json(allTeams);
  }

  async leaderBoardAway(_req: Request, res: Response) {
    const allTeams = await this._awayService.leaderBoardAway();
    return res.status(200).json(allTeams);
  }

  async leaderBoard(_req: Request, res: Response) {
    const allTeams = await this._service.leaderBoard();
    return res.status(200).json(allTeams);
  }
}
