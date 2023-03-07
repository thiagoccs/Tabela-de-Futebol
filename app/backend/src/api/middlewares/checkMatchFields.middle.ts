import { NextFunction, Request, Response } from 'express';

export default function validadeMathFields(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  // if (homeTeamId || awayTeamId || homeTeamGoals || awayTeamGoals) {
  //   return res.status(400).json({ message: 'All fields must be filled' });
  // }

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}
