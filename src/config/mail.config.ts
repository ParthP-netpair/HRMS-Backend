import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import getEnv from './env.config';
import Mail, { Attachment } from 'nodemailer/lib/mailer';
import logger from '../helpers/logger';

type Props = {
  toMail: string;
  template: string;
  subject: string;
  from?: string;
  attachments?: Attachment[];
};

/**
 *
 * @param toMail Address to send an email to.
 * @param template Email template to send.
 * @param subject Email subject.
 * @returns info
 */

const sendMailService: (props: Props) => Promise<SMTPTransport.SentMessageInfo> = async props => {
  try {
    const { toMail, template, from, subject, attachments } = props;
    const transportOpts = {
      host: String(getEnv('SMTP_EMAIL_HOST')),
      port: Number(getEnv('SMTP_EMAIL_PORT')),
      secure: getEnv('SMTP_EMAIL_SECURE') === 'true',
      auth: {
        user: getEnv('SMTP_EMAIL_USER'),
        pass: getEnv('SMTP_EMAIL_PASSWORD'),
      },
    };
    const transporter = nodemailer.createTransport(transportOpts);

    const payload: Mail.Options = {
      from: getEnv('SMTP_EMAIL_FROM'),
      to: toMail,
      subject: subject ?? 'Hi',
      html: template,
    };
    if (attachments) payload.attachments = attachments;

    const info = await transporter.sendMail(payload);

    return info;
  } catch (err) {
    logger.error('Error in sendMailService: ' + err?.message, { data: err, log: 'error' });
    return err;
  }
};

export default sendMailService;
