import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
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
      message: `Match with id: ${id} has been updated. ${homeTeamGoals} x ${awayTeamGoals}` });
  }
}
