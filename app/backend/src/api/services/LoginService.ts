import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceLogin';
import JWT from '../../utils/JWT';

export default class LoginService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async validate(email: string, password: string): Promise<string | null> {
    const find = await this.model.findOne({ where: { email } });

    if (find) {
      const { password: passwordDb } = find;
      const isValidPw = bcrypt.compareSync(password, passwordDb);
      console.log(isValidPw);

      if (isValidPw) {
        const token = JWT.generateToken(find);
        return token;
      }
    }

    return null;
  }
}
