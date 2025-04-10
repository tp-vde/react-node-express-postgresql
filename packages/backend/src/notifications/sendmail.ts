import Mail from 'nodemailer/lib/mailer/index.js';
import nodemailer from 'nodemailer';
import { ConfigReader } from '../config/ConfigReader.js';
import { fileConfig } from '../config/paths.js';
import SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';


interface IEmail {
  transporter: nodemailer.Transporter<SendmailTransport.SentMessageInfo, SendmailTransport.Options>,
  mailOptions: Mail.Options
} ;

const config = new ConfigReader(fileConfig());
const emailOptions = config?.getOptional('backend.email') as IEmail;


// // Configurer le transporteur Sendmail
// const transporterUnix = nodemailer.createTransport({
//   sendmail: true, // Utiliser Sendmail
//   newline: 'unix', // Utiliser des sauts de ligne Unix
//   path: '/usr/sbin/sendmail', // Chemin vers Sendmail (par défaut sur Unix/Linux)
// });

export const transporter = nodemailer.createTransport(emailOptions.transporter);

// Options de l'e-mail
export const mailOptions: Mail.Options = emailOptions.mailOptions;

export const sendEmail = async (options: Mail.Options) => {
  try {
    console.log(`E-mail envoyé avec succès à ${options.to}`);
    await transporter.sendMail(options);
  } catch (e) {
    console.log(`'Erreur lors de l\'envoi du mail à ${options.to}: ${e}`);
  }
}