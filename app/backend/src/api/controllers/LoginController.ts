import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';

export default class LoginController {
  private _service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async findOneUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const selectedUserCpt = await this._service.validate(email, password);

    if (selectedUserCpt) return res.status(200).json({ token: selectedUserCpt });
    return res.status(401).json({ message: 'Invalid email or password' });
  }
}
