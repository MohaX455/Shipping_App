PLAN GLOBAL DU PROJET
PHASE 1 — Définition de l’architecture backend

Objectif : créer la structure technique stable avant d’écrire la moindre API.

1.1 Choisir l’architecture backend

Architecture choisie :

Modular Domain Architecture

Structure cible :

src
│
├── app
│   └── api
│       └── (routes Next.js)
│
├── modules
│   ├── auth
│   ├── users
│   ├── travelers
│   ├── senders
│   ├── locations
│   ├── faq
│   ├── benefits
│   ├── query
│   └── payments
│
├── models
│
├── lib
│   ├── db
│   ├── auth
│   ├── upload
│   └── utils
│
├── middleware
│
└── types

Pourquoi cette architecture :

séparation claire des responsabilités

backend scalable

proche de ce que font les SaaS modernes

1.2 Organiser les routes API Next.js

Toutes les routes seront dans :

src/app/api

Exemple :

api
 ├ auth
 │  ├ login
 │  │  └ route.ts
 │  └ register
 │     └ route.ts
 │
 ├ users
 │  ├ [id]
 │  │  └ route.ts
 │  └ profile-image
 │     └ route.ts
 │
 ├ travelers
 │
 ├ senders
 │
 ├ locations
 │
 └ pages
1.3 Définir les modules backend

D’après ton Express api.js, les modules réels sont :

auth
users
travelers
senders
locations
faq
benefits
pages
query
payments

Chaque module contiendra :

module
 ├ controller.ts
 ├ service.ts
 ├ repository.ts
 └ validation.ts
1.4 Migrer les modèles MongoDB

Les modèles actuels Express seront conservés.

Ils seront déplacés dans :

src/models

Base utilisée :

MongoDB

via Mongoose

PHASE 2 — Infrastructure backend

Objectif : mettre en place les outils backend communs.

2.1 Connexion à MongoDB

Créer :

src/lib/db.ts

Responsabilité :

connexion MongoDB

singleton connection

gestion erreurs

2.2 Gestion JWT

Ton Express utilise JWT.

Créer :

src/lib/auth/jwt.ts

Fonctions :

generateToken
verifyToken
getUserFromToken

Utilise la librairie :

jsonwebtoken

2.3 Middleware Auth

Créer :

src/middleware/auth.ts

Responsabilités :

vérifier JWT

protéger les routes

2.4 Middleware API Key

Créer :

src/middleware/apiKey.ts

Responsabilité :

protéger certaines routes publiques.

2.5 Upload d’images

Ton Express utilise :

Multer

Dans Next.js on utilisera :

formData()

Créer :

src/lib/upload/uploadImage.ts

Responsabilités :

valider image

sauvegarder fichier

retourner URL

PHASE 3 — Migration du module AUTH

C’est le premier module à migrer.

Routes :

POST /api/auth/register
POST /api/auth/login

Architecture :

modules/auth
 ├ auth.controller.ts
 ├ auth.service.ts
 ├ auth.repository.ts

Responsabilités :

Controller
→ gérer la requête HTTP

Service
→ logique métier

Repository
→ accès MongoDB

PHASE 4 — Migration USERS

Routes :

GET /api/users/:id
POST /api/users/profile-image

Fonctionnalités :

récupérer utilisateur

update image

PHASE 5 — Migration TRAVELERS

Routes principales :

POST /api/travelers/info
POST /api/travelers/info/update
GET /api/travelers
GET /api/travelers/:id

Fonctionnalités :

créer traveler

modifier traveler

lister travelers

PHASE 6 — Migration SENDERS

Routes :

POST /api/senders/info
POST /api/senders/upload
GET /api/senders/:id
PHASE 7 — Migration LOCATIONS

Routes :

GET /api/locations
GET /api/countries
GET /api/states
GET /api/cities

Bibliothèque utilisée :

country-state-city

PHASE 8 — Migration CONTENT (pages statiques)

Comme tu l’as précisé :

le contenu des pages sera statique

Donc ces routes peuvent disparaître :

/home-page
/about-page
/sender-page
/traveler-page

Le contenu sera directement dans le frontend.

PHASE 9 — Migration FAQ

Routes :

GET /api/faqs
PHASE 10 — Query Form

Routes :

POST /api/query

Fonction :

envoyer message contact.

PHASE 11 — Paiement

Route :

POST /api/payments/confirm

Paiement utilisé :

PayPal

PHASE 12 — Sécurité

Ajouter :

validation des inputs

rate limiting

protection upload

gestion erreurs globales

PHASE 13 — Tests backend

Tester :

auth

CRUD travelers

upload images

JWT

PHASE 14 — Suppression du backend Express

Quand tout est migré :

supprimer :

backend/
Résumé simple

Le projet sera construit en 14 étapes principales :

1️⃣ architecture backend
2️⃣ routes API
3️⃣ connexion MongoDB
4️⃣ JWT
5️⃣ middleware auth
6️⃣ upload image
7️⃣ module auth
8️⃣ module users
9️⃣ module travelers
10️⃣ module senders
11️⃣ module locations
12️⃣ FAQ + query
13️⃣ sécurité
14️⃣ suppression Express