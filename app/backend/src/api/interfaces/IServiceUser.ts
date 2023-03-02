import User from '../../database/models/UserModel';

export default interface IServiceUser {
  findOneUser(email: string): Promise<User | null>
}
