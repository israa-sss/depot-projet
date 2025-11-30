1. Nom et description du projet
Ce projet est un jeu Memory interactif, développé en une seule page web (index.html) en utilisant uniquement HTML, CSS et JavaScript pur.
Le joueur doit retourner des cartes et retrouver les paires correspondantes.
Le jeu propose 3 niveaux de difficulté, un compteur de temps, un compteur de coups, un système de meilleurs scores locaux, et plusieurs boutons de contrôle (Mélanger, Redémarrer, Montrer toutes les cartes).

L’objectif était de créer une application intuitive, fluide, responsive et agréable à utiliser.
2. Technologies utilisées
HTML5 – Structure de la page
CSS3 – Mise en forme, animations, grille responsive, style moderne
JavaScript (Vanilla) –
Gestion du jeu
Mélange des cartes
Compteur du temps + coups
Mécanique de flip 3D
LocalStorage pour les meilleurs scores
Sélection de difficulté
Affichage dynamique
3. Fonctionnalités principales
-Retourner les cartes (animation flip 3D)
-Trouver les paires identiques
-3 niveaux :
Facile : 8 paires
Moyen : 16 paires
Difficile : 32 paires
-Statistiques:
Compteur de temps
Compteur de coups
Calcul automatique du score
 -Meilleurs scores
 Enregistrement automatique dans LocalStorage
Affichage des 2 meilleurs scores (classement local)
-Contrôles
Bouton Redémarrer
Bouton Mélanger
Bouton Montrer toutes les cartes
Sélecteur de difficulté
Effets sonores ON/OFF
-Design
Fond animé (vidéo en arrière-plan)
Thème sombre + couleurs pastel
Interface responsive (mobile & desktop)
4. Lien GitHub Pages 
https://israa-sss.github.io/Israa_Smida-jeu-des-cartes/
5. Nouveautés explorées / Ce que j’ai appris
Pendant ce projet, j’ai découvert et approfondi :
-Manipulation avancée du DOM (création dynamique d’éléments)
-Utilisation de LocalStorage pour stocker les scores
-Gestion du temps avec setInterval
-Logique de jeu (état des cartes, paires trouvées…)
-Systèmes d’animation via CSS (transform, perspective, transition)
-Grille responsive avec CSS Grid
-Création d’un fond vidéo en plein écran
8. Difficultés rencontrées
Gestion du flip des cartes et synchronisation entre JavaScript et CSS
Résoudre le bug du timer qui démarrait à +1 seconde
Empêcher le joueur de cliquer sur d'autres cartes pendant que deux cartes sont retournées
Problème d’affichage des meilleurs scores (JSON + LocalStorage)
9. Solutions apportées
Utilisation d’un verrou logique lockBoard pour désactiver les clics temporaires
Réinitialisation correcte du timer :
Encodage/décodage JSON dans LocalStorage : 
--résolution des problèmes avec test et recherche
10. Conclusion
Ce projet m’a permis de renforcer mes compétences en HTML, CSS et JavaScript pur et d’améliorer ma logique de programmation.
