export interface DatabaseConfig {
    username: string,
    password: string,
    database: string,
    host: string,
    port: number,
    dialect: string,
    operatorsAliases: boolean
}

export const databaseConfig: DatabaseConfig = {
    username: "root",
    password: "Windows10",
    database: "uemail",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    operatorsAliases: false
};