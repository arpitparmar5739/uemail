"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let User = sequelize.define("User", {
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
exports.default = default_1;
