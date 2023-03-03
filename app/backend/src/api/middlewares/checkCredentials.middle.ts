import { Request, Response, NextFunction } from 'express';

export default function validateCredentials(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) return res.status(401).json({ message: 'Invalid email or password' });

  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

  next();
}
