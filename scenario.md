# Versions à venir (objectifs)

> ***TROP D'AMBITIOOONNNNNNNNNNNNNN***

Ce fichier est un répertoire complet du scénario envisagé, en fonction des versions.

Un code de version est composé comme suit (A.b.cc):
* A \ **Version principale** : n'importe quelle version est fille d'un code. Un changement du numéro d'une version principale implique une reconstruction complête du code à partir de zéro, ou à une release finale. Ainsi, elle ne change que très rarement.
* b \ **Version beta** : Il s'agit d'une très grande mise à jour qui donne résultat à une release avec un processus de build. Un changement de numéro d'une version beta implique que assez de patchs sur la version précédente ont été suffisants.
* cc \ **Version alpha** (ou Patchs) : Il s'agit de modifications majeures telles que des ajouts de fonctionnalités. Les version alpha son créés sur une nouvelle branche git, et sont ensuite fusionnées avec la branche master. Ces versions sont créées à partir d'une succession d'ajouts mineurs.

Note : si nous suivons cette logique, alors la version 2.1.0 aurait dû être la version 3.0.0 . Seulement, aucune build n'a été faite sur la version 2.0 .

Il se peut que l'ordre des patchs puisse être changé (par exemple, les objectifs de la version 2.1.05 peuvent être interchangés avec la version 2.1.08, mais les version 2.1.06 et 2.1.07 ne seront pas modifiées).  
Par ailleurs, si une version est en attente (dessins en cours...) alors on peut se permettre de sauter l'attente et ajouter le travail en cours dans le prochain patch.

**Routes possibles :** Musiques, Manga, Novel, Animé, fanroute M-X, spin-off Seek at Mekakucity et enfin reload si possible.  
*Soit un total de 4 routes, deux routes non officielles (bonus) et une probable suite.*


## Version 2.1

> __Fait : patch 01__ : Le moteur de jeu est fonctionnel même si non terminé. Certains sprites et fonds ne sont pas finalisés (juste quelques schémas en guise de remplacement). Le script du chapitre The Old Days est fait.

__En cours : patch 02__  
* Ajout des structures conditionnelles (if else else if), et de la boucle for.
* Ajout des systèmes de sauvegarde et autres commandes.
* Ajout de la documentation.

__patch 03__  
* Ajout des fonctions (qui fonctionnent un peu comme le batch, c'est à dire avec call)
* Ajout des animations de fin.
* Mise à jour du système de worldwrap


__patch 04__  
* Début d'écriture de la Route Musiques (chapitre 1). *On passe le passage du yuukei quartet : on continue directement sur le présent.*


> **Rappel de la route musique :**
> Accessible automatiquement la première fois, et est remplacée par l'animé lorsqu'elle est finie !
> On peut par contre la rejouer à partir du menu :3
> - Shintaro perds son coca et son ordi
> - il se fait prendre dans une attaque terroriste. (jeu de RUUUUNNN) et il rencontre le mekakushi dan
> - il va au parc d'attraction (possible jeux envisageables, et possibilité de choisir). Les montagnes russes sont forcément en mode novel.
> - il se fait tuer. C'est la fin ? En fait non... C'est le début
> Event en particulier : reload.

__patch 05__
* Création des chapitres 2,3,4
* En attente des dessins.

__patch 06__
* Ajout du système de maps
* Création des sprites de maps de Shintaro et d'Ayano (en utilisant MMD et la magie du montage de l'écran vert.)
* Adaptation d'une map pour The Old Days

__patch 07__
* Création des maps de la route musique (respectivement : la chambre de Shintaro, le centre commercial étage 3 et 7, la base du mekakushi-dan - chambre de kido, le parc d'attraction [rdc, manoir, salle des glasses], et la rue près de l'air de jeu des enfants)

__patch 08__

* Ajouter les jeux...

__À faire lorsque le temps le permet__

* Utiliser Cmake

## Version 2.2

Première release :  
Une fois la route musique complêtement terminée (avec les dessins), alors la release 2.2 peut être faite.

Après avoir joué la route musique, alors choix possible avec la route manga (partir -> pas de rencontre avec ayano).  
Sinon suite sur l'animé. Mais ça, c'est pour la release 2.3.


### Patchs créés durant la 2.2 (objectifs uniquement)

L'objectif pour la version 2.3 est de faire la route complête du manga.  
- Shintaro finit par ne plus revenir en classe. Trop chiant xD
- Shintaro tombe par contre dans les escalierss *trouver pourquoi* et rencontre haruka.
- Shintaro s'enferme après la mort d'haruka
- Shintaro finit par ressortir.
- *me souviens plus trop de l'histoire, mais méfiant du Mekaku*
- rencontre d'ayano, histoire avec hibiya et tout
- Mort de momo
- flashback
- Desespoir, recherche de saeru (Mini-jeu possible : Hacking)
- Revois le mekaku
- déclaration de guerre
- tentative de plan
- mort

Event en particulier : Ayano devient yaki


## Patchs créés durant la 2.3 (objectifs uniquement)

petit commentaire de yaki (fin originale de the old days ?)...

L'objectif des patchs de la 2.3 est d'inclure la **route animé : la plus importante !!** (accessible en remplacement à la route manga)  
Même si incohérence chronologique, c'est de ce qu'il y a de plus judicieux.

- Yuukei quartet (Jeu possible : headphone actors)
- Ignorence de shintaro -> dépression (jeu : stress bomb)
Si on perds/gagne : 
--> Route XX, paire de ciseaux (mais bien détailler le moment yaki :P)
--> Route Mekaku : suite

-rêve de shintaro avec yaki (?)
- Coca clavier et tout le tralala
- Shintaro fuit et rencontre konoha
- Moment avec hibiya et l'hosto
- Retour au mekaku et enfin une vraie explication
- Vue du portrait d'ayano : retour aux souvenirs. *BOOOM*
- Suicide
- Daze
- Sauver les gens :3
Event : fin

Le jeu est considéré comme complet *des traductions sont envisageables !*


## Patchs créés durant la 2.4 (objectifs uniquement)

* route novel


## Patchs créés durant la 2.5 (objectifs uniquement)

L'objectf est de faire la __route M-X__

- Accessible après avoir fait toutes les routes
- Une fois avoir fini le jeu, yaki brise le quatrième mur et l'intéret du jeu est dévoilé :D (ENFINNNNN !!!!!)
- (Introduction de Yaki)
- On va suivre l'histoire de yoomters à la lettre (et intégrer des jeux comme la cuisine et le dessin)
Event : Bah le jeu est parfait !! Y'aura sans doute le reload à rajouter.

## Patchs créés durant la 2.6 (objectifs uniquement)

L'objectif est d'intégrer ayano en tant que personnage jouable.

Bref, un PDV d'ayano

## Patchs créés durant la 2.7 (objectifs uniquement)

L'objectif est de créer encore un spin-off : seek at mekakucity

On pourra s'inspirer des dessins officiels.


## -- Release 2.?? --

### Reload ? / traductions ?
