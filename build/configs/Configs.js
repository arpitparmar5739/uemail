"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerConfig_1 = require("./ServerConfig");
const DatabaseConfig_1 = require("./DatabaseConfig");
class Config {
    constructor() {
        this._databaseConfig = DatabaseConfig_1.databaseConfig;
        this._serverConfig = ServerConfig_1.serverConfig;
    }
    getDatabaseConfig() {
        return this._databaseConfig;
    }
    getServerConfig() {
        return this._serverConfig;
    }
}
exports.configs = new Config();
