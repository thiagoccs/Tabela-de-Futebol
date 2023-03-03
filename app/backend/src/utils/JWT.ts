import * as _jsonwebtoken from 'jsonwebtoken';
import User from '../database/models/UserModel';

const JWT = <any>_jsonwebtoken;
const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = {
  algorithm: 'HS256',
};

const generateToken = (payload: User) => {
  try {
    return JWT.sign(payload.dataValues, SECRET, jwtConfig);
  } catch (error) {
    throw new Error('Fail to generate token');
  }
};

const decripytToken = (token: string) => {
  if (!token) {
    throw new Error('Undefined Token');
  }

  try {
    return JWT.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

export default {
  generateToken,
  decripytToken,
};
