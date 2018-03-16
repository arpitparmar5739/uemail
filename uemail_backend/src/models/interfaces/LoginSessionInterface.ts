import {Instance} from 'sequelize';

export interface LoginSessionAttributes {
  id: number,
  user_id: number
}

export interface LoginSessionInstance extends Instance<LoginSessionAttributes> {
  typeValues: LoginSessionAttributes
}
