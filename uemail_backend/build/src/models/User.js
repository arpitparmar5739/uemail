"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let User = sequelize.define("User", {
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
        }
    }, { underscored: true });
    return User;
}
exports.default = default_1;
