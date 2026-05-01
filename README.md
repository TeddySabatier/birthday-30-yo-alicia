# Site Anniversaire - Alicia

Petite page statique front-end (HTML/CSS/JS) pour un cadeau d'anniversaire.

## Lancer en local

Option simple:

- Ouvrir `index.html` directement dans le navigateur.

Option serveur local (recommande):

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Personnalisation rapide

Dans `script.js`:

- `sisterName` pour le prenom affiche
- `birthdayMessages` pour modifier l'ordre et le texte des messages
- `driveUrl` pour changer le lien Drive

## Deploiement GitHub Pages

1. Creer un repo GitHub et pousser ce dossier.
2. Dans GitHub: `Settings` -> `Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main` et dossier `/ (root)`.
5. Sauvegarder puis attendre la publication.

Votre site sera disponible sur:

`https://<votre-utilisateur>.github.io/<nom-du-repo>/`
