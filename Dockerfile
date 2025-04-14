# Étape de construction pour le backend
FROM node:21-alpine AS backend-builder
WORKDIR /app

# Copier les fichiers nécessaires pour le backend
COPY package.json yarn.lock ./
COPY packages/backend/package.json packages/backend/
COPY packages/app/package.json packages/app/

# Installer toutes les dépendances (y compris devDependencies)
RUN yarn install --frozen-lockfile --production=false

# Copier le reste des fichiers backend
COPY packages/backend packages/backend
COPY tsconfig.json .

# Construire le backend
RUN yarn --cwd packages/backend build

# Étape de construction pour le frontend
FROM node:21-alpine AS frontend-builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY --from=backend-builder /app/package.json /app/yarn.lock ./
COPY --from=backend-builder /app/packages/app/package.json packages/app/

# Installer les dépendances du frontend
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers frontend
COPY packages/app packages/app
COPY tsconfig.json .

# Construire le frontend
RUN yarn --cwd packages/app build

# Étape pour les dépendances de production
FROM node:21-alpine AS production-deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/backend/package.json packages/backend/
RUN yarn install --frozen-lockfile --production

# Image de production
FROM nginx:alpine

# Configurer Nginx pour le frontend
COPY --from=frontend-builder /app/packages/app/build /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les dépendances de production
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=production-deps /app/packages/backend/node_modules ./packages/backend/node_modules

# Copier le backend construit
COPY --from=backend-builder /app/packages/backend/dist ./backend/dist
COPY --from=backend-builder /app/packages/backend/migrations ./backend/migrations
COPY --from=backend-builder /app/packages/backend/package.json ./backend/
COPY app-config.yaml ./backend/

# Installer NGINX 
RUN apk add --no-cache nginx (serveur Web)

# Installer Node.js pour exécuter le backend
RUN apk add --no-cache nodejs

# Copier les fichiers de configuration partagés
# COPY app-config.yaml .
COPY config config

WORKDIR /backend

# Exposer les ports
EXPOSE 7007 3000

# Commande pour démarrer à la fois Nginx et le backend Node.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]