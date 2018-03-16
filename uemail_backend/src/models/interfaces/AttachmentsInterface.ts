import {Instance} from 'sequelize';

export interface AttachmentAttributes {
  id: number,
  email_id: number,
  attachment_addr: string
}

export interface AttachmentInstance extends Instance<AttachmentAttributes> {
  dataValues: AttachmentAttributes
}
