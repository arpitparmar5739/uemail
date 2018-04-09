import { Instance } from 'sequelize';

export interface EmailAttributes {
  id: number,
  to: string,
  cc: string,
  bcc: string,
  subject: string,
  body: string,
  sentby: string,
  any_attachment: string,
  email_type: string
}

export interface EmailInstance extends Instance<EmailAttributes> {
  dataValues: EmailAttributes
}
