# Étape 1 : Image de build
FROM node:21-alpine AS builder

# Crée un répertoire de travail
WORKDIR /app

# Copie tous les fichiers nécessaires depuis la racine
COPY package.json yarn.lock tsconfig.json ./
COPY .gitpod.yml servers.json README.md CONTRIBUTING.md app-config.yaml start.sh ./

# Copie les packages (app + backend)
COPY packages/app ./packages/app
COPY packages/backend ./packages/backend

# Installation des dépendances à la racine
RUN yarn install --frozen-lockfile

# Build du frontend
RUN yarn --cwd packages/app build


# # Étape de construction pour le backend
# FROM node:21-alpine AS backend-builder

# WORKDIR /app

# # Copier les fichiers nécessaires pour le backend
# COPY package.json yarn.lock ./
# COPY packages/backend/package.json packages/backend/
# RUN yarn install --frozen-lockfile --production=false

# COPY package.json yarn.lock tsconfig.json ./
# COPY .gitpod.yml servers.json README.md ./

# # Copier tout le code du backend
# COPY packages/backend packages/backend
# # Builder le backend (si nécessaire pour TypeScript)
# RUN cd packages/backend && yarn build

# # Étape 2: Builder pour le frontend React
# FROM node:21-alpine AS frontend-builder

# WORKDIR /app

# # Copier les fichiers nécessaires pour le frontend
# COPY package.json yarn.lock ./
# COPY packages/app/package.json packages/app/package.json
# RUN yarn install --frozen-lockfile --production=false

# # Copier tout le code frontend
# COPY packages/app packages/app
# RUN cd packages/app && yarn build

# Étape finale: Image de production
FROM node:21-alpine

WORKDIR /app

# Installer les dépendances de production pour le backend
COPY --from=builder /app .

# Expose les ports
EXPOSE 3000
EXPOSE 7007 

# Commande par défaut (modifiable via docker-compose)
CMD ["yarn", "start"]