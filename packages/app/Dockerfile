# Étape 1 : Utiliser une image de base Node.js
FROM node:21-alpine
# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app
# Étape 3 : Copier les fichiers de dépendances
COPY package.json ./
# Étape 4 : Installer les dépendances
RUN yarn install
# Étape 5 : Copier le reste du code de l'application
COPY . .
# Étape 6 : Exposer le port sur lequel l'application écoute
EXPOSE 3000
# Étape 7 : Commande pour démarrer l'application
CMD [ "yarn", "start" ]