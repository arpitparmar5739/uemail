"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    let LoginSession = sequelize.define("LoginSession", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, { underscored: true });
    return LoginSession;
}
exports.default = default_1;
