import { Instance } from 'sequelize';

export interface UserAttributes {
    id: number,
    username: string,
    password: string,
    firstname: string,
    lastname: string
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes
}