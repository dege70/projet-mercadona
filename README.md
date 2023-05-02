# Application web Mercadona
Cette application web permet aux utilisateurs de consulter les promotions en cours dans les magasins Mercadona, et aux administrateurs d'ajouter des produits à la base de données et de créer des promotions pour ces produits. L'application utilise un front-end en React et un back-end en Flask, et utilise une base de données PostgreSQL pour stocker les données.

## Installation
Pour exécuter l'application localement, vous devez d'abord cloner le projet depuis GitHub :

`git clone https://github.com/dege70/projet-mercadona`

Ensuite, vous devez créer un environnement virtuel pour Python et installer les dépendances à partir du fichier **requirements.txt** :

`python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt`

Enfin, vous pouvez exécuter l'application en exécutant le fichier **app.py** :

`export FLASK_APP=app.py
export FLASK_ENV=development
flask run`

L'application sera accessible à l'adresse **http://localhost:5000**.

##Déploiement

Si vous souhaitez déployer l'application sur une plateforme en ligne comme Heroku, voici les étapes à suivre :

1. Créez un compte sur Heroku et créez un nouveau projet.
2. Configurez les variables d'environnement pour votre application en utilisant l'interface Heroku ou la ligne de commande Heroku.
3. Ajoutez les fichiers **Procfile** et **runtime.txt** à la racine de votre projet (voir ci-dessus).
4. Poussez votre code vers GitHub.
5. Dans l'interface Heroku, connectez-vous à votre compte GitHub et sélectionnez votre projet.
6. Activez la fonctionnalité de déploiement automatique pour votre projet et sélectionnez la branche **main**.
7. Déployez votre application.

## Sécurité
Pour protéger les données de l'application, j'ai utilisé des mesures de sécurité telles que le cryptage des mots de passe. Pour stocker les mots de passe des utilisateurs, j'ai utilisé la méthode de cryptage SHA-256 avec un sel (ou « salt ») aléatoire pour chaque mot de passe. Cette méthode rend les mots de passe stockés plus difficiles à décrypter en cas d'attaque.

J'ai également mis en place des mesures de sécurité pour protéger les données utilisateur, telles que l'utilisation de HTTPS pour toutes les communications avec le serveur et la mise en place d'un système d'autorisation pour limiter l'accès aux fonctions d'administration de l'application.

## Architecture
Le front-end de l'application est construit avec React et utilise une architecture de composants. Les composants sont organisés dans des dossiers en fonction de leur rôle et de leur fonctionnalité.

Le back-end de l'application est construit avec Flask et utilise une architecture en couches. Le code est organisé en modules en fonction de leur rôle dans l'application, tels que l'authentification, la gestion des produits et des promotions, et la gestion de la base de données.

Contact
Si vous avez des questions ou des commentaires sur cette application, n'hésitez pas à me contacter.