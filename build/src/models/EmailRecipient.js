"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let EmailRecipient = sequelize.define("EmailRecipient", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        recipient: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        recipient_type: {
            type: dataTypes.STRING,
            allowNull: false
        }
    });
    return EmailRecipient;
}
exports.default = default_1;
