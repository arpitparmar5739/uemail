import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { EmailInstance, EmailAttributes } from './interfaces/EmailInterface';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<EmailInstance, EmailAttributes> {
    let Email = sequelize.define<EmailInstance, EmailAttributes>("Email", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        to: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        cc: {
            type: dataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        bcc: {
            type: dataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        subject: {
            type: dataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        body: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        sent_by: {
            type: dataTypes.STRING,
            allowNull: false
        },
        any_attachment: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        email_type: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: "primary"
        }
    });
    return Email;
}