import {serverConfig, ServerConfig} from "./ServerConfig";
import {databaseConfig, DatabaseConfig} from "./DatabaseConfig";

class Config {
    private _databaseConfig: DatabaseConfig;
    private _serverConfig: ServerConfig;

    constructor() {
        this._databaseConfig = databaseConfig;
        this._serverConfig = serverConfig;
    }

    public getDatabaseConfig(): DatabaseConfig {
        return this._databaseConfig;
    }

    public getServerConfig(): ServerConfig {
        return this._serverConfig;
    }
}

export const configs = new Config();