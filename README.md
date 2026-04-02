# MovieTreasures

Application web de catalogue de films construite avec React. Explorez 55 films, découvrez 57 experts critiques, gérez votre watchlist personnelle et trouvez votre film du soir.

## Stack technique

- **React 19** + **Vite 8**
- **React Router v7** — navigation, routes dynamiques, page 404
- **Framer Motion** — transitions de pages, animations, cards 3D flip
- **Three.js / @react-three/fiber** — champ de particules WebGL en fond
- **CSS Modules** — styles scopés par composant
- **Context API** — authentification globale (`AuthContext`)
- **localStorage** — watchlist persistée par utilisateur

## Fonctionnalités

- Catalogue de **55 films** et **57 experts**, triés alphabétiquement
- Recherche, filtrage par genre et tri (note / année) sur films et experts
- **Watchlist** personnelle avec stats (genres favoris, progression)
- **Authentification** avec 4 comptes fictifs — watchlist isolée par compte
- **Film du jour** — change chaque jour de façon déterministe
- **Partage** d'une fiche film (copie l'URL dans le presse-papier)
- **Films en commun** sur les profils experts (comparé à votre watchlist)
- Bouton "Je me lance" — film aléatoire instantané
- Toast notifications, bouton retour en haut, barre de progression du scroll
- Raccourci clavier `/` pour focus la recherche
- Titres de page dynamiques par route
- Page 404 custom

## Structure

```
src/
├── components/       # MovieCard, UserProfile, BackToTop, Toast, ProtectedRoute
├── context/          # AuthContext — gestion auth + comptes fictifs
├── hooks/            # useWatched, useTilt, usePageTitle, useScrollToTop
├── pages/            # Home, AllFilms, AllExperts, FilmDescription, UserDescription,
│                     # Watchlist, Login, Contact, NavBar, NotFound
├── utils/            # stats.js — génération déterministe des données
└── data.js           # Source unique : films, utilisateurs, genres, drapeaux
```

## Lancer le projet

```bash
npm install
npm run dev
```

## Comptes de démo

| Email | Mot de passe |
|---|---|
| alice@movietreasures.com | alice123 |
| bob@movietreasures.com | bob123 |
| carol@movietreasures.com | carol123 |
| admin@movietreasures.com | admin123 |
