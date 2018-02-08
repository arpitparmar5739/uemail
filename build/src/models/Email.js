"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let Email = sequelize.define("Email", {
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
exports.default = default_1;
