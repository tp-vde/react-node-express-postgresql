## Organisation de l'application :
✅ React + TypeScript pour le frontend

✅ Node.js + Express pour le backend

✅ [Knex](https://knexjs.org/guide/).js pour l'ORM 

✅ PostgreSQL comme base de données

✅ pgAdmin4 pour la gestion de la base

✅ Docker pour l'orchestration

Cette organisation permet de maintenir un code propre, modulaire et facile à maintenir. 
Elle facilite également la collaboration entre les développeurs front-end et back-end tout en offrant une structure évolutive pour l’ajout de nouvelles fonctionnalités.

### 1. Séparation Front-end et Back-end
- Front-end (React) :
Ce code est dédié à l'interface utilisateur et aux interactions.
- Back-end (Node.js + Express) :
Ce code gère la logique métier, l'accès aux données et expose des API RESTful pour communiquer avec le front-end.
- Base de données (PostgreSQL) :
Elle est accessible via le back-end avec le query builder Knex.
### 2. Structure des Répertoires
La structure de ce projet est une organisation en monorepo , car le projet n'est pas trop gros:


/reactnodeexpresspostgresql
/package
│
├── /app                # Code React
│   ├── /public
│   ├── /src
│   │   ├── /components    # Composants réutilisables
│   │   ├── /pages         # Vues/pages de l'application
│   │   ├── /services      # Appels API, gestion de la logique côté client pour interagir avec le back-end
│   │   ├── /assets        # Images, icônes, etc.
│   │   ├── /styles        # Fichiers CSS ou SASS
│   │   └── index.js       # Point d'entrée de l'application
│   └── package.json       # Dépendances et scripts spécifiques au client
|   └── Dockerfile       
│
├── /backend               # Code Node.js/Express
│   ├── /config            # Configuration (connexion à la DB, variables d'environnement, etc.)
│   ├── /controllers       # Logique des actions pour chaque route
│   ├── /middlewares       # Gestion des middlewares (authentification, logs, etc.)
│   ├── /models            # Schémas ou modèles de données (avec ORM ou accès direct à PostgreSQL)
│   ├── /routes            # Définition des routes et liaison avec les contrôleurs
│   ├── /utils             # Fonctions utilitaires
│   ├── app.js             # Point d'entrée du serveur Express
│   └── package.json       # Dépendances et scripts spécifiques au serveur
│   └── Dockerfile   
|
└── README.md              # Documentation du projet

### 3. Gestion de la Communication
- API RESTful :
Le back-end expose des endpoints que le front-end consomme via des appels HTTP (fetch, axios, etc.).
- Sécurisation :
Pensez à implémenter des middlewares pour l'authentification, la validation des données et la gestion des erreurs.

### 4. Environnements et Configuration
- Variables d'environnement :
Utilisez des fichiers .env pour gérer les variables sensibles (connexions DB, clés API, etc.).
- Configuration par environnement :
Organisez des configurations spécifiques pour le développement, la production, etc.


### 5. Outils et Déploiement
Scripts de démarrage et build :
Utilisez des scripts dans vos package.json pour lancer le client et le serveur (ex. npm run dev pour le développement, npm run build pour la production).
Hot Reloading / Watchers :
Utilisez des outils comme nodemon pour le serveur et la configuration intégrée de Create React App pour le front-end.
Gestion des dépendances :
Assurez-vous que les dépendances sont correctement isolées entre le client et le serveur.

#### Récupération sur gitlab et premier lancement du projet sur son poste:
1- Installer Doker desktop: [Download Docker Desktop](https://desktop.docker.com/win/main/amd64/181591/Docker%20Desktop%20Installer.exe).
2- Lancer les commandes `yarn install` puis `yarn tsc`

#### Lancer l'application
1- Construire et démarrer les conteneurs avec la commande : `docker-compose up --build` 
2- Exécuter les migrations avec la commande : `docker-compose exec backend yarn migrate` ( ! optionnel)
3️- Accéder aux services
Frontend : http://localhost:3000
Backend API : http://localhost:7007
pgAdmin : http://localhost:8082
(Email : postgres@bg.com, Password : password)
PostgreSQL : Accessible via localhost:5432


3- Démarrer les services avec Docker Compose: `docker-compose up --build`

## la commande CMD `docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres` permet d'obtenir l'adresse IP d'une instance. Exp: postgres.

#### Pour arrêter les services, utilisez la commande suivante : `docker-compose down`

####  Pour supprimer également les volumes (y compris les données de PostgreSQL) : `docker-compose down -v`

### procedure manuelle pour créer une base de données:
Dans le terminal du Docker desktop, tapez la commande : `psql -U postgres` puis `CREATE DATABASE vde_database ;`;
Dans le terminal VsCode pour miger les scripts de la bdd avec la commande : `yarn --cwd packages\backend knex migrate:latest`.

-   Pour lancer le backend taper les commandes  : `yarn install , yarn tsc, yarn tsc,  puis yarn start`
-   Faire les test du CRUD avec le curl ou postman


# Migrations
La commande `yarn knex init` (l'option -x ts pour le typescript) permet de creer le fichier de configuration knexfile.ts qui contient nos différentes configurations de la base de données. Une fois que vous avez un fichier knexfile.js/.ts, vous pouvez utiliser l'outil de migration pour créer des fichiers de migration vers le répertoire spécifié (migrations par défaut). 
!!! Supprimer le bloc `sqlite3` avant d'exécuter la nouvellemigration.
La création de nouveaux fichiers de migration peut être réalisée en exécutant la commande `yarn --cwd packages\backend knex migrate:make table_name`. 
!!! 


## Generate a JWT Secret : 
Le lien `https://jwtsecret.com/generate` permet de generer une Clé secrète pour JWT
<!-- ///////////////////////////
Nettoyage complet (le plus simple)
docker system prune -a --volumes
docker system prune -a --volumes --force

Erreur : exec /app/entrypoint.sh: no such file or directory => assurez-vous que le fichier entrypoint.sh utilise des fins de ligne Unix (LF) et non Windows (CRLF).
yarn cache clean --force
rm -rf node_modules yarn.lock  # (Sous Linux/macOS)
chmod 755 nodce_modules
rmdir /s /q node_modules & del yarn.lock  # (Sous Windows CMD)
ou
cmd.exe /c "@for /d /r . %d in (node_modules) do @if exist %d (echo "%d" && rd "%d" /s /q)" 
yarn install

yarn config set registry https://yarn.npmjs.org

Les droits d’exécution : chmod +x packages/backend/entrypoint.sh 
"start": "cross-env PORT=3000 react-scripts start",
npm audit fix --force
##################################

Arrêtez tous les conteneurs :
docker-compose down

Nettoyez les volumes (attention : supprime les données) :
docker-compose down -v

Reconstruisez et relancez :
docker-compose build --no-cache
docker-compose up -d

Vérifiez l'état :
docker-compose ps

Accédez au conteneur en mode interactif :
docker-compose run --service-ports api bash

docker-compose build  puis docker-compose up backend

docker-compose build --no-cache backend


Vérifier les processus en cours : # Dans votre conteneur => docker-compose exec app netstat -tulnp
Forcer l'arrêt du processus : docker-compose exec app pkill -f "node.*7007"
-->
