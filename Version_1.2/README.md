# API-Authentication VERSION 1.0

## API d’authentification basique.

### Elle permet :

- De créer un compte avec une adresse mail, un mot de passe et un nom (optionnel). Le mot de passe sera crypté avec [bcrypt] avant d’être stocké dans la base de données.
- De se connecter avec l’adresse mail et le mot de passe, puis de recevoir ID utilisateur, son nom, et un Token d’authentification [jsonwebtoken] qui expire par défaut en 24H.
- De vérifier l’authentification d’un utilisateur avec son Token.
- A l'utilisateur d’avoir accès à ses données.

### l’API va vérifier :

A la Création de compte :

- La validité du mail [email-validator]
- La validité du mot de passe [password-validator] Par défaut doit comporter entre 8 et 24 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre, un symbole spécial et aucun espace !
- Elle limitera le nombre de création de compte à 3 par tranche de 4 heurs [express-rate-limit]

A la demande de connexion :

- Elle va rechercher un compte utilisateur avec le mail envoyer, et comparer le mot de passe reçu avec celui crypté avec [bcrypt] dans la base de données.
- Elle limitera les demandes de connexion à 5 par tranche de 10 minutes. [express-rate-limit]

Pour la validation d’authentification :

- Elle va vérifier l’authenticité du token envoyé avec le headers.authorization.
- Et elle compare l’id généré par le token avec celui de l’utilisateur envoyé dans le body.
- Elle renverra un objet avec une valeur authentification = true si elle a été validé.

Pour l’accès à ses donné :

- Elle va effectuer une validation d’authentification:
- Et elle va vérifier que les données demander son bien celle de l’utilisateur identifié lors de la requête avant de renvoyer les données.

## 📚 Technologies utiliséesimage

- ![Node.js]({https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white}) [Node.js](http://nodejs.org)
- ![Express JS]({https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white}) [Express](http://expressjs.com)
- ![MongoDB]({https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white}) [MongoDB-Atlas](https://www.mongodb.com/)

### Package npm utilisés :

![NPM]({https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white}) [NPM](https://www.npmjs.com/)

- [dotenv] Gestion des variables d'environement
- [jsonwebtoken] Authentification par Bearer Token
- [bcrypt] Librairie permet le hash des mots de passes
- [express-rate-limit] Limitation des tentatives de connexion et de création de compte
- [email-validator] Vérifie la validitédes emails
- [password-validator] configuration et vérification des prérequis de mot de passe

## ⚙ Installation du backend

### Configurer les variables d'environnement

Avant de lancer ce projet, vous devrez ajouter les variables d'environnement suivantes dans un fichier .env (vérifier le typage des variables dans le fichier config/dotenvConfig.js)

[dotenv]

- PORT (Configure le port d'utilisation)
- DB_USER (identifient de connexion MongoDB)
- DB_PASSWORD (password de connexion MongoDB)
- DB_HOST (nom du cluster MongoDB)
- DB_NAME (nom de la base de donnée MongoDB)
- SALTROUNDS (nombre de salage des mots de passes pour bcrypt)
- SECRET_TOKEN (clé de codage du Token de jsonwebtoken)

### Installer les dépendances

```bash
npm install
```

### Démarrer le serveur

Start :

```bash
node server
```

Dev :

```bash
nodemon server
```

[dotenv]: https://www.npmjs.com/package/dotenv
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[bcrypt]: https://www.npmjs.com/package/bcrypt
[express-rate-limit]: https://www.npmjs.com/package/express-rate-limit
[email-validator]: https://www.npmjs.com/package/email-validator
[password-validator]: https://www.npmjs.com/package/password-validator
[//]: # "order for gitfolio"
