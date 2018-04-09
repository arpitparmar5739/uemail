type AllPresentEmails = {
  to: EmailIsPresentObject | null,
  cc: EmailIsPresentObject[] | null,
  bcc: EmailIsPresentObject[] | null
}

type EmailIsPresentObject = {
  user_id?: number;
  email_id: string;
  error?: boolean;
}

type ValidEmailPromise = [string, Promise<boolean>];

type AllEmailsToCheck = {
  to: string,
  cc?: string[],
  bcc?: string[]
};