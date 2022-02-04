import AppError from '@shared/errors/AppError';
import nodemailer from 'nodemailer';
import handlebarsMailTemplate from './HanddlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateDate: IParseMailTemplate;
}
export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateDate,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new handlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Api teste.',
        address: from?.email || 'testeapi@igor.com',
      },
      to: {
        name: to?.name,
        address: to?.email,
      },
      subject,
      html: await mailTemplate.parse(templateDate),
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
