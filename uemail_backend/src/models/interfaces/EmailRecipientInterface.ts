import { Instance } from 'sequelize';

export interface EmailRecipientAttributes {
    id: number,
    recipient: string,
    user_id: number,
    recipient_type: string
}

export interface EmailRecipientInstance extends Instance<EmailRecipientAttributes> {
    dataValues: EmailRecipientAttributes
}