"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const SequelizeStatic = require("sequelize");
const Configs_1 = require("../../configs/Configs");
class Database {
    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = Configs_1.configs.getDatabaseConfig();
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._sequelize.authenticate().then(() => {
            console.log("Connection to the database is successful :)");
        }).catch((error) => {
            console.log("Could not connect to the database!\n" + error);
        });
        this._models = {};
        fs.readdirSync(__dirname).filter((file) => {
            return (file !== this._basename) && (file !== "interfaces");
        }).forEach((file) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[model.name] = model;
        });
        Object.keys(this._models).forEach((modelName) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
        this._config();
    }
    _config() {
        this._models.Attachment.belongsTo(this._models.Email);
        this._models.EmailRecipient.belongsTo(this._models.User);
        this._models.LoginSession.belongsTo(this._models.User);
    }
    getModels() {
        return this._models;
    }
    getSequelize() {
        return this._sequelize;
    }
}
const database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
