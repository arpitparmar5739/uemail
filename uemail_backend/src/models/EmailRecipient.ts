import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import {
  EmailRecipientInstance, EmailRecipientAttributes
}
  from './interfaces/EmailRecipientInterface';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<EmailRecipientInstance, EmailRecipientAttributes> {
  let EmailRecipient = sequelize.define<EmailRecipientInstance, EmailRecipientAttributes>(
    "EmailRecipient", {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      recipient_type: {
        type: dataTypes.STRING,
        allowNull: false
      }
    }, { underscored: true });
  return EmailRecipient;
}
