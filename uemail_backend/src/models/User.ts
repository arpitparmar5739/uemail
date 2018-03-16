import * as bcrypt from 'bcrypt';
import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import {UserAttributes, UserInstance} from './interfaces/UserInterface';

const saltRounds = 10;

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<UserInstance, UserAttributes> {
  let User = sequelize.define<UserInstance, UserAttributes>("User", {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: dataTypes.STRING,
      allowNull: true
    }
  }, {underscored: true});

  User.beforeCreate((user: UserInstance) => {
    user.dataValues.password = bcrypt.hashSync(user.dataValues.password, saltRounds);
  });

  return User;
}
