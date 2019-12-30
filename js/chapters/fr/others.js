let script = scriptFr;

script["yaki_WhyDoYouThink"] = [
	"centered <span class='big'>Bonus</span><br><em>Ces scènes apparaissent au cours du jeu</em>",
  "aya Hein ?",
  "aya C'est faux ?",
  "shin Tout est faux !",
  "shin Tu comprends vraiment rien à tout ce que je t'ai dit ?",
  "aya J'étais assez confiante pourtant !",
  "aya Peut être que tu m'as appris les mauvaises choses",
  "shin Impossible !",
  "shin Il y a juste quelque chose qui cloche avec ton cerveau !",
  "aya Vraiment ?",
  "aya Je suppose que c'est de ma faute alors...",
  "aya ...",
  "aya Hey, Shintaro !",
  "shin Quoi ?",
  "aya Shintaro, penses-tu que le paradis existe ?",
  "shin HAH ?",
  "shin Bien sûr que non ! C'est juste un endroit imaginé par les humains.",
  "shin Si cela existe vraiment, on aurait pu le prouver facilement !",
  "aya Je vois...",
  "aya Mais je pense",
  "aya Je pense qu'il existe vraiment.",
  "shin ?",
  "aya Même si je ne pense pas que ce soit un paradis pour les bonnes personnes après leurs mort,",
  "aya Parce-que peu importe où l'on va, laisser quelqu'un est triste, non ?",
  "shin Mais pourquoi parles-tu de ça ?",
  "aya Désolée, je vais arrêter de dire des trucs étranges...",
  "aya Je pense qu'on devrait continuer de réviser.<br> Je vais poser des questions et tu réponds, d'accord ?",
  "aya Okay, Shintaro",
  "aya _ _ _ _ _ _ _ _ ?",
  "shin _ _ _ _ .",
  "aya C'est correct, comme on peut l'attendre de toi !",
  "aya Alors prochaine question !<br> _ _ _ _ _ ?",
  "shin _ _ _ ...",
  "shin Il n'y a aucun intéret à me poser des questions. Tu es celle qui devrait apprendre tout ça.",
  "aya AH ! Je suppose que tu as raison",
  "aya Alors laisse moi juste te poser quelque chose que toi seul tu sais.",
  "centered <span class='big'>Pourquoi penses tu que je suis morte ?</span>",
	"jump yaki_ItsBeenAwhile"
]

script["yaki_ItsBeenAwhile"] = [
	"centered <em>Seconde scène</em>",
  "aya Ça fait longtemps, n'est-ce pas ?",
  "hm ?",
  "aya Non, comparé à autrefois, les chances de nous rencontrer sont plus nombreuses.",
  "aya De toute manière, je suis contente de te <span class='rem'>revoir</span>",
  "Hein, de quoi veux-tu parler ?",
  "aya À en juger par ta réaction, tu as sûrement oublié ?",
  "aya C'est triste...",
  "aya Tu m'as pourtant dit autrefois que tu ne m'oublierais jamais.",
  "Euh...",
  "aya He he... Excuse moi, excuse moi...<br>Ce n'est pas grave, tu n'es pas le seul.",
  "aya Tout le monde ne se souvient de moi que petit à petit",
  "aya Car il est impossible à qui que ce soit de me connaître parfaitement dès le départ.",
  "Je ...",
  "aya Ta mémoire te revient-elle ?",
  "aya Bon, j'ai beaucoup de temps devant moi, alors ...",
  "aya Parlons encore !",
  "aya Je vais te raconter notre première rencontre.",
	"jump gameEnd-start"
]
scriptFr["gameEnd-start"] = [
	"...",
	"Vous venez de finir la démo. Vous pouvez maintenant débloquer certaines et rejouer le scénario",
	"Notez qu'en quittant le jeu ou en actualisant la page, ces déblocages disparaîtrons et vous devrez rejouer pour les re-débloquer",
	{'Choice':{
		'scenes':{
      'Text': 'Voir les scènes secrètes (Yaki)',
      'Do': 'jump yaki_WhyDoYouThink'
    },
    'modes':{
      'Text': 'Afficher les modes disponibles',
      'Do': 'jump gameEnd-modes'
    },
    'reload':{
      'Text': 'Retourner au menu (et rejouer avec les nouveaux modes)',
      'Do': 'Bon Reload !'
    }
  }},
	"end"
]
scriptFr["gameEnd-modes"] = [
	"Voici la liste des modes actuellement disponibles : <br><ul><li>Mode Commentaires</li></ul>",
	"Le <em>mode commentaire</em> surligne certains mots et affiche des commentaires des créateurs du jeu en passant la souris sur ces mots.",
	{'Choice':{
    'enable':{
      'Text': 'Activer le mode Commentaires',
      'Do': function(){
				document.querySelector("visual-novel").classList.add("hremMode");
			}
    },
    'disable':{
      'Text': 'Désactiver le mode Commentaires (par défaut)',
      'Do': function(){
				document.querySelector("visual-novel").classList.remove("hremMode");
			}
    }
  }},
	"Au départ, il y a eu un mode «fan-service» mais celui-ci a été retiré...<br>Peut être que nous ferions une version parodiée, mais ayano reste trop pure pour ça...",
	"jump gameEnd-start"
]
