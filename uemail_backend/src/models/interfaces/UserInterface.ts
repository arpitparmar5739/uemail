import {Instance} from 'sequelize';

export interface UserAttributes {
  id: number,
  username: string,
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phone: string
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes
}
