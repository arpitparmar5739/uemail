import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { UserAttributes, UserInstance } from './interfaces/UserInterface';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<UserInstance, UserAttributes> {
    let User = sequelize.define<UserInstance, UserAttributes>("User", {
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: false
        }
    });
    return User;
}