"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let Attachment = sequelize.define("Attachment", {
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
exports.default = default_1;
