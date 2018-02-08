import { Instance } from 'sequelize';

export interface EmailAttributes {
    id: number,
    subject: string,
    sentby: string,
    recievedby: string,
    mailtype: string,
    anyattachment: string
}

export interface EmailInstance extends Instance<EmailAttributes> {
    dataValues: EmailAttributes
}