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
}
