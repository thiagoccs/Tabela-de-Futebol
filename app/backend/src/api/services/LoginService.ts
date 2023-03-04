import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceLogin';
import JWT from '../../utils/JWT';

export default class LoginService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async validate(email: string, password: string): Promise<string | null> {
    const findUser = await this.model.findOne({ where: { email } });

    if (findUser && bcrypt.compareSync(password, findUser.password)) {
      const token = JWT.generateToken(findUser);
      return token;
    }

    return null;
  }
}
