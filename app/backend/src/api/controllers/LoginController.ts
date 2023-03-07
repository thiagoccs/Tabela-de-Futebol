import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';

export default class LoginController {
  private _service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._service = service;
  }

  findOneUser = async (req: Request, res: Response) => {
    // console.log(req.body);

    const { email, password } = req.body;

    const userToken = await this._service.validate(email, password);

    if (userToken) return res.status(200).json({ token: userToken });
    return res.status(401).json({ message: 'Invalid email or password' });
  };

  getRole = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { role } = req.body;
    return res.status(200).json({ role: role.role });
  };
}
