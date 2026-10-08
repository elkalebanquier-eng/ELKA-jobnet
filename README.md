# KUMA — histoires animées

KUMA est un prototype mobile-first qui transforme une histoire écrite en storyboard animé **sans IA obligatoire** : le texte est découpé localement en scènes, les actions sont détectées par mots-clés et le personnage est dessiné/animé sur un canvas.

## Fonctions incluses

- Saisie d'une histoire en français.
- Découpage automatique en scènes à partir de la ponctuation.
- Détection locale d'actions : courir, tomber, sourire, parler, sauter.
- Personnage vectoriel dessiné sur Canvas : visage expressif, cheveux, vêtements, mains et chaussures.
- Poses animées locales synchronisées avec la scène : courir, tomber, sourire, parler et sauter.
- Lecture, navigation scène par scène et export vidéo WebM depuis le navigateur.
- Voix locale avec `SpeechSynthesis` en secours.
- Route serverless Speechify optionnelle : la clé reste côté serveur.
- Interface responsive pensée comme une application mobile.

## Choix technique du personnage

Le personnage est dessiné directement en JavaScript Canvas avec des formes vectorielles, puis animé image par image par `requestAnimationFrame`. Cette approche est plus légère et plus rapide que charger Pyodide/Python dans chaque navigateur : aucune IA, aucun service externe et aucun gros runtime ne sont nécessaires pour l'animation. Python pourra être ajouté plus tard comme outil de rendu hors ligne pour produire des exports avancés, sans alourdir l'application mobile.

## Développement local

Le prototype statique peut être lancé avec n'importe quel serveur HTTP :

```bash
python3 -m http.server 4173
```

Puis ouvrir `http://localhost:4173`.

## Speechify sécurisé

Ne jamais écrire la clé dans `index.html`, dans un fichier JavaScript client ou dans un commit. Pour un déploiement avec fonctions serverless (par exemple Vercel), ajouter dans les variables d'environnement du projet :

- `SPEECHIFY_API_KEY`
- `SPEECHIFY_VOICE_ID` (optionnel, valeur par défaut `henry`)

La route `api/speechify.js` lit ces variables côté serveur. Si elle n'est pas disponible, le bouton utilise automatiquement la voix native du navigateur.

Pour GitHub Actions, enregistrer la clé dans **Settings → Secrets and variables → Actions**, jamais dans le dépôt. GitHub Pages peut héberger l'interface statique, mais il ne peut pas exécuter directement la route serverless Speechify ; il faudra alors garder la route sur un hébergeur de fonctions et configurer l'URL d'API côté déploiement.

## Déploiement GitHub + Vercel

GitHub reste le dépôt source et Vercel déploie automatiquement chaque push sur `main`. L'application est pensée pour Vercel : les fichiers statiques sont servis à la racine et `api/speechify.js` devient une fonction serverless.

Projet Vercel : https://elka-jobnet.vercel.app/

Dans **Vercel → Project Settings → Environment Variables**, ajouter `SPEECHIFY_API_KEY` et, facultativement, `SPEECHIFY_VOICE_ID`. Ne jamais mettre la clé dans GitHub ou dans le navigateur. Après ajout d'une variable, relancer un déploiement Vercel.
