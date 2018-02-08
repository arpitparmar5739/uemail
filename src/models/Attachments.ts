import * as SequelizeStatic from 'sequelize';
import { Sequelize, DataTypes } from "sequelize";
import { AttachmentInstance, AttachmentAttributes } from './interfaces/AttachmentsInterface';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
    SequelizeStatic.Model<AttachmentInstance, AttachmentAttributes> {
    let Attachment = sequelize.define<AttachmentInstance, AttachmentAttributes>(
        "Attachment", {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            email_id: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            attachment_addr: {
                type: dataTypes.TEXT,
                allowNull: false
            }
        });
    return Attachment;
}