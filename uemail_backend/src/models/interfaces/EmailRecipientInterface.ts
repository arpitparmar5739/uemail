import { Instance } from 'sequelize';

export interface EmailRecipientAttributes {
  id?: number,
  user_id: number,
  email_id: number,
  recipient_type: string
}

export interface EmailRecipientInstance extends Instance<EmailRecipientAttributes> {
  dataValues: EmailRecipientAttributes
}
