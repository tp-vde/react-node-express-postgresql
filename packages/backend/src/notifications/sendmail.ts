import Mail from 'nodemailer/lib/mailer';

const nodemailer = require('nodemailer');

// Configurer le transporteur Sendmail
const transporterUnix = nodemailer.createTransport({
  sendmail: true, // Utiliser Sendmail
  newline: 'unix', // Utiliser des sauts de ligne Unix
  path: '/usr/sbin/sendmail', // Chemin vers Sendmail (par défaut sur Unix/Linux)
});

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testsvde1@gmail.com', // Remplacez par votre adresse Gmail
    pass: 'isoset99!', // Remplacez par votre mot de passe Gmail
  },
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'testsvde1@gmail.com', // Remplacez par votre adresse Gmail
    pass: 'isoset99!', // Remplacez par votre mot de passe Gmail
  },
});


// Options de l'e-mail
export const mailOptions: Mail.Options = {
  from: 'testsvde1@gmail.com', // Expéditeur
  to: '', // Destinataire
  subject: 'Test d\'envoi d\'e-mail avec Sendmail', // Sujet
  text: 'Ceci est un test d\'envoi d\'e-mail avec Sendmail.', // Corps du message (texte)
  html: '<p>Ceci est un test d\'envoi d\'e-mail avec <b>Sendmail</b>.</p>', // Corps du message (HTML)
};

export const sendMail = async (options: Mail.Options) => {
  try {
    console.log(`E-mail envoyé avec succès à ${options.to}`);
    await transporter.sendMail(options);
  } catch (e) {
    console.log(`'Erreur lors de l\'envoi de l\'email à ${options.to}: ${e}`);
  }
}