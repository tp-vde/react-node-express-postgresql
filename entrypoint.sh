#!/bin/sh

# Démarrer NGINX en arrière-plan
nginx -g "daemon off;" &

# Démarrer le serveur Node.js
cd /app/backend
node dist/server.js  # ou le nom de votre point d'entrée principal

# Garder le conteneur en vie
tail -f /dev/null