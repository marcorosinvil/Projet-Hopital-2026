# Projet 03 - Site web de l’Hôpital ITAC

## Présentation
Ce projet académique est un site web complet pour un hôpital fictif nommé **Hôpital ITAC**. Il a été conçu pour répondre aux exigences du projet ITAC en utilisant uniquement du HTML et du CSS, avec une approche responsive, sémantique et facile à maintenir.

## Structure du projet
- `index.html` : page d’accueil
- `a-propos.html` : présentation de l’établissement
- `services.html` : liste des services et tableau des horaires de consultation
- `medecins.html` : page des médecins et spécialistes
- `rendez-vous.html` : formulaire de prise de rendez-vous avec validation HTML5
- `urgences.html` : informations d’urgence et consignes
- `contact.html` : coordonnées et heures d’ouverture
- `css/style.css` : styles partagés et responsive
- `README.md` : documentation du projet

## Technologies utilisées
- HTML5 sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- CSS moderne avec variables (`:root`)
- Responsive design pour mobile, tablette et desktop
- Formulaire HTML5 avec validation (`required`, `type="date"`, `type="time"`)

## Styles principaux
Le fichier CSS utilise uniquement trois couleurs définies dans `:root` :
- `--bleu` : couleur principale
- `--blanc` : couleur de fond et sections claires
- `--gris` : couleur de fond général

Il contient également des styles dédiés pour :
- les tableaux (`<table>`)
- les formulaires (`<form>`, `<input>`, `<select>`)
- la navigation et les cartes de contenu

## Membres du groupe
- Marco Rosinvil
- Lesperance Billardo
-Rene Mike Frade Lourdchel

## Instructions de déploiement
1. Cloner ou copier l’ensemble des fichiers dans un dossier.
2. Ouvrir `index.html` dans un navigateur moderne.
3. Pour un test local plus complet, exécuter un serveur local si nécessaire :
   - avec Python 3 : `python -m http.server 8000`
   - puis visiter `http://localhost:8000`

## Remarques
- Chaque page contient la même barre de navigation pour une expérience fluide.
- Le design est épuré, centré sur l’accessibilité et la clarté de l’information.
- Ce projet est prêt à être étendu avec des fonctionnalités JavaScript ou un backend selon les besoins futurs.
