export interface Email {
  to: string,
  cc: string,
  bcc: string,
  subject: string,
  body: string,
  sent_by: string,
  any_attachment?: boolean,
  email_type: string,
  created_at: string
}
