"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
    }, { underscored: true });
    User.beforeCreate((user) => {
        user.dataValues.password = bcrypt.hashSync(user.dataValues.password, saltRounds);
    });
    return User;
}
exports.default = default_1;
