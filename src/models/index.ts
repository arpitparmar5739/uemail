import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from "sequelize";

import { Sequelize, Model } from "sequelize";
import { configs } from "../../configs/Configs";

import { UserAttributes, UserInstance } from "./interfaces/UserInterface";
import { EmailAttributes, EmailInstance } from "./interfaces/EmailInterface";
import { AttachmentAttributes, AttachmentInstance } from "./interfaces/AttachmentsInterface";
import { LoginSessionAttributes, LoginSessionInstance } from "./interfaces/LoginSessionInterface";
import { EmailRecipientAttributes, EmailRecipientInstance } from "./interfaces/EmailRecipientInterface";

export interface SequelizeModels {
    User: SequelizeStatic.Model<UserInstance, UserAttributes>;
    Email: SequelizeStatic.Model<EmailInstance, EmailAttributes>;
    Attachment: SequelizeStatic.Model<AttachmentInstance, AttachmentAttributes>;
    LoginSession: SequelizeStatic.Model<LoginSessionInstance, LoginSessionAttributes>;
    EmailRecipient: SequelizeStatic.Model<EmailRecipientInstance, EmailRecipientAttributes>;
}

class Database {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = configs.getDatabaseConfig();

        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._sequelize.authenticate().then(() => {
            console.log("Connection to the database is successful :)");
        }).catch((error: Error) => {
            console.log("Could not connect to the database!\n" + error);
        });

        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && (file !== "interfaces");
        }).forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
    }

    private _setAssociations(): void {
        this._models.Attachment.belongsTo(this._models.Email);
        this._models.EmailRecipient.belongsTo(this._models.User);
        this._models.LoginSession.belongsTo(this._models.User);
    }

    getModels(): SequelizeModels {
        this._setAssociations();
        return this._models;
    }

    getSequelize(): Sequelize {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();