import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async findOneUser(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(password);

    const selectedUser = await this._service.findOneUser(email);
    if (selectedUser) return res.status(200).json(selectedUser);
    return res.status(401).json({ message: 'usuário não cadastrado' });
  }
}
