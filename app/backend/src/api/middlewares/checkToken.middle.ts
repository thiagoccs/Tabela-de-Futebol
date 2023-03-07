import { Request, Response, NextFunction } from 'express';
import JWT from '../../utils/JWT';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const validateUser = JWT.decripytToken(authorization);

  if (!validateUser) return res.status(401).json({ message: 'Token must be a valid token' });

  req.body.role = validateUser;

  next();
}
