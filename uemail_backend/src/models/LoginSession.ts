import * as SequelizeStatic from 'sequelize';
import { Sequelize, DataTypes } from 'sequelize';
import { LoginSessionInstance, LoginSessionAttributes } from './interfaces/LoginSessionInterface';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<LoginSessionInstance, LoginSessionAttributes> {
  let LoginSession = sequelize.define<LoginSessionInstance, LoginSessionAttributes>("LoginSession", {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, { underscored: true });
  return LoginSession;
}
