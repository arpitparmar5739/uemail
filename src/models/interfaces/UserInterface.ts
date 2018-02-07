import { Instance } from 'sequelize';

export interface UserAttributes {
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes
}