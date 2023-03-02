import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async findOneUser(email: string): Promise<User | null> {
    const selectedUser = await this.model.findOne({ where: { email } });
    return selectedUser;
  }
}
