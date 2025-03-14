import Mail from 'nodemailer/lib/mailer';

const nodemailer = require('nodemailer');

// Configurer le transporteur Sendmail
const transporterUnix = nodemailer.createTransport({
  sendmail: true, // Utiliser Sendmail
  newline: 'unix', // Utiliser des sauts de ligne Unix
  path: '/usr/sbin/sendmail', // Chemin vers Sendmail (par défaut sur Unix/Linux)
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testsvde1@gmail.com', // Remplacez par votre adresse Gmail
    pass: 'isoset99!', // Remplacez par votre mot de passe Gmail
  },
});

// Options de l'e-mail
const options: Mail.Options = {
  from: 'testsvde1@gmail.com', // Expéditeur
  to: 'vianney_mb@yahoo.fr', // Destinataire
  subject: 'Test d\'envoi d\'e-mail avec Sendmail', // Sujet
  text: 'Ceci est un test d\'envoi d\'e-mail avec Sendmail.', // Corps du message (texte)
  html: '<p>Ceci est un test d\'envoi d\'e-mail avec <b>Sendmail</b>.</p>', // Corps du message (HTML)
};

export const sendMail = async () => {
  try {
    console.log(`E-mail envoyé avec succès à ${options.to}`);
    await transporter.sendMail(options);
  } catch (e) {
    console.log(`'Erreur lors de l\'envoi de l\'email à ${options.to}: ${e}`);
  }
}