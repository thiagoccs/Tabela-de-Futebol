import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';
import TeamService from '../services/TeamService';

const teamService = new TeamService();

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    // console.log(req.body);

    const allMatches = await this._service.findAll();

    if (req.query.inProgress) {
      const result = allMatches
        .filter((match) => match.inProgress.toString() === req.query.inProgress);
      return res.status(200).json(result);
    }

    return res.status(200).json(allMatches);
  }

  async changeMatchProgress(req: Request, res: Response) {
    const { id } = req.params;

    await this._service.finishedMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async changeGoalsMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._service.updateGoalsMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({
      message: `Match with id: ${id} has been updated. ${homeTeamGoals} x ${awayTeamGoals}`,
    });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await teamService.findById(homeTeamId);
    const awayTeam = await teamService.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const match = await this._service.createNewMath(req.body);

    return res.status(201).json(match);
  }
}
