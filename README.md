# test-affluence

## Test technique backend

Pour notre service de réservation, nous avons besoin de savoir si une créneau est
disponible à la réservation ou non pour une salle donnée.
Tu disposes d'un service qui interagit avec la base de données pour récupérer les
informations nécessaires pour déterminer si une salle est disponible : ses horaires et les
réservations déjà enregistrées.

### Consigne
Développe un endpoint REST qui prend en paramètre une date/heure et qui vérifie si la salle
est disponible ou non en fonction des horaires d'ouverture et des réservation déjà
enregistrées. Les horaires d'ouverture et les réservations déjà enregistrées sont disponibles
à l'aide d'un service interne. Ce service est disponible à cette adresse avec les consignes
pour le déployer.


Une fois que l'endpoint aura déterminé si la salle est disponible ou non, celui-ci devra
retourner la réponse dans le format suivant :

● Si la salle est disponible
{
"available": true
}
● Si la salle n'est pas disponible (car fermée ou déjà réservée)
{
"available": false
}


### Contraintes techniques
Tu dois utiliser node avec du typescript pour développer cette API. Les paramètres d'entrée
doivent être validés pour vérifier que les données saisies soient valides. Dans ce contexte,
seule la ressource avec l'ID 1337 est disponible pour la date d'aujourd'hui.



## Test technique frontend
Nous souhaitons proposer une interface web à nos utilisateurs afin qu'ils puissent réserver
des salles de manière autonome.
Tu disposes d'une API qui te permet de savoir si une salle est disponible et de la réserver si
c'est le cas. Cette API est disponible à cette adresse avec les consignes pour le déployer.

### Consigne
Après avoir déployé l'API, tu dois construire une interface avec deux fonctionnalités
principales :
● Dans un premier temps, l'utilisateur choisi la date pour laquelle il souhaite vérifier les
disponibilités l'aide d'un datepicker puis clique sur un bouton "Valider"
○ Si la date sélectionnée n'est pas disponible, on lui affiche un message lui
indiquant qu'il ne peut pas réserver pour la date en question
● Si la date sélectionnée est disponible, on affiche à l'utilisateur un timepicker de début
et un timepicker de fin pour lui permettre de saisir son créneau de réservation. Une
fois sa saisie terminée, il clique sur un bouton "Réserver"
○ Si le créneau saisi n'est pas disponible, on lui affiche un message lui
indiquant qu'il ne peut pas réserver pour le créneau en question.
○ Si le créneau saisi est disponible, on lui affiche un message de succès en
retirant tous les éléments de saisie.

### Contraintes techniques
Tu dois utiliser Angular 7+ pour développer cette interface. Dans ce contexte, seule la
ressource avec l'ID 1337 est disponible pour la date d'aujourd'hui.
