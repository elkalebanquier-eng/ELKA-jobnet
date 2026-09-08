# KAYAWOTO — Version web

Le fichier `index.html` est une version web responsive de l’application. Il peut être ouvert depuis Safari sur iPhone après publication sur un hébergement HTTPS.

## Publication rapide

Publier le contenu de ce dossier sur un hébergement statique comme Netlify, Vercel, GitHub Pages ou un serveur web classique. Le fichier principal doit rester nommé `index.html`.

L’adresse doit commencer par `https://` afin que l’authentification, les imports JavaScript et les téléchargements de médias fonctionnent correctement dans Safari.

## Présentation sur iPhone

Ouvrir le lien HTTPS dans Safari. Pour une présentation plein écran, utiliser **Partager → Sur l’écran d’accueil**. Les métadonnées iPhone sont déjà intégrées dans `index.html`.

## Important

La version web utilise la configuration du projet connecté pour l’authentification, les données et les médias. Ne pas publier le projet complet ni les règles d’accès dans un dépôt public sans vérifier les autorisations. Pour Google Sign-In sur le domaine web, ajouter le domaine de publication dans les domaines autorisés de la console d’authentification.
