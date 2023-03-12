import { Request, Response } from 'express';
import LeaderBoardHomeService from '../services/LeaderBoardHomeService';
import LeaderBoardAwayService from '../services/LeaderBoardAwayService';

export default class LeaderBoardController {
  private _homeService: LeaderBoardHomeService;
  private _awayService: LeaderBoardAwayService;

  constructor(sH: LeaderBoardHomeService, sA: LeaderBoardAwayService) {
    this._homeService = sH;
    this._awayService = sA;
  }

  async leaderBoardHome(_req: Request, res: Response) {
    const allTeams = await this._homeService.leaderBoard();
    return res.status(200).json(allTeams);
  }

  async leaderBoardAway(_req: Request, res: Response) {
    const allTeams = await this._awayService.leaderBoard();
    return res.status(200).json(allTeams);
  }
}
