// système scolaire japonais : 13-16 ans collège. 16-18 lycée et la rentrée est en avril. Donc le suicide d'ayano c'est 4 mois après l'entrée au lycée de Shintaro; il a 16 ans.
// Minor storage that will be used in this script :
let choices = [true, true], reverseChoices = [true, true];
// script
scriptFr["chapter00-start"] = [
	"centered <span class='big'>Prologue</span><br><em>The Old Days</em>",
  "show scene classroomCorridor with fadeIn duration 3s",
  "shin:normal <em>J'imagine que c'est normal qu'il n'y ait personne à une heure pareille.<br> Mais franchement,comment ça se fait que l'école soit si flippante la nuit ?</em>",
  "shin:scare1 <em>J'espère que rien de chelou ne va apparaitre...</em>",
  "shin:angry1 <em>Raah...Sérieux !!</em>",
  "shin:angry2 <em>Que j'oublie mon porte-feuille en classe dès le premier jour de ce trimestre... <br>J'ai vraiment la poisse...</em>",
  "bruit <em class='animated jello'>flock~</em>",
  "shin:scare5 WAAHHHHH ??!!!",
  "shin:scare4 ...<br>...<br>...",
  "shin:scare4 Ah...-Ah...<br>C'était quoi, ça ? Les robinets ?",
  "shin:blueSight Ne te surprend pas comme ça, putain !",
  "show background classroomDoorClosed with fadeIn",
  "shin:dodge <em>Pff... Pourquoi je dois me rendre en <span class='hrem' data-comment='Shintaro, tu n`as pas encore découvert le daze...'>classe, pire endroit de l'univers,</span> et de nuit !<br> Et en parlant de ça...</em>",
  "shin:angry3 <em>Les gars de ma nouvelle classe... Ils avaient tous l'air de crétins finis.</em>",
  "shin:normal <em>La moyenne de la classe pour l'examen de début d'année était incroyablement basse...<br> Enfin, si ce n'est que ça, ça irait...</em>",
  "shin:dodge <em>Mais il n'arrêtent pas de faire du bruit pour déranger le cours !</em>",
  "shin:facepalm <em>Dire qu'ils comptent se rendre au lycée l'année prochaine... <br> Pitoyable.</em>",
  "shin:dodge <em>C'est pas croyable. Qu'est-ce que je pourrait gagner avec des types pareils ?<br> C'est bien mieux de passer mon temps à feuilleter mes manuels scolaires chez moi.</em>",
  "bruit <em class='animated shake'>bruit de chaises</em>",
  "shin:scare4 <em>EH ?! C-C'était quoi ce bruit ???<br>Il y a quelqu'un à une heure pareille ?</em>",
  "shin:scare1 <em>Attends, attends, attends...</em>",
  "shin:scare2 <em>C'est vraiment trop bizarre !!! Même si il y avait quelqu'un, aucune lumière n'est allumée...</em>",
  "shin:scare4 <em>E-Et puis ce bruit, à l'instant, il vient de ma classe !!</em>",
  "shin:scare3 <em>M-Me-Me dites pas que c'est un fantôme ou un truc du genre...<br> L-laissez moi tranquille !!!</em>",
  "show background classroomDoorOpened",
  "show character aya shadow with rubberBand end-fadeOut",
  "bruit <em class='animated wobble'>porte coulissante</em>",
  "show character aya please with fadeIn end-fadeOut",
  "-Whaaaaaaah !!<br>-OUAAAHAAHAHAHA !! Hiiii !!",
  "shin:scare5 Pardonnez moi ! Pardonnez moi !<br>L-Laissez moi la vie sau~auve !!",
  "show character aya question with fadeIn end-fadeOut",
  // ayano name = ??
  "uk Hum ?",
  "uk Shintaro... -kun ?",
  "play music 01.03 with loop fade 1",
  "shin:scare4 <em>... (?)</em>",
  "shin:oh <em>J'ai l'impression d'avoir déjà vu ce visage quelque part...</em>",
  "show character aya excited with fadeIn end-fadeOut",
  "uk Ah j'en suis sûre, tu es bien Shintaro Kisaragi !",
  "shin:normal <em>C'est qui, elle ?! Comment elle me connais ?</em>",
  "uk Hé, tu ne me reconnais pas ?<br> Ayano Tateyama !",
  "show character aya embarrassed with fadeIn end-fadeOut",
  "uk Enfin,j'ai beau dire ça mais je crois bien que l'on a encore jamais parlé ensemble...",
  "shin:normal Aya...no Tateyama... ?<br>... ...",
  { Choice: {
			Dialog: 'shin:oh AH MAIS... ! T\'es...',
	    c1: {
	      Text: 'Celle qui a eu la pire moyenne de la classe !!',
	      Do: 'jump chapter00-ayaWorst'
	    },
	    c2: {
	      Text: 'Celle qui es à côté de moi !!',
	      Do: 'jump chapter00-ayaNbr'
	    },
	    c3: {
	      Text: 'Qui ?!',
	      Do: 'jump chapter00-ayaGhost'
	    }
  }}
];
// choice
  scriptFr["chapter00-ayaWorst"] = [
    'show character aya shy with fadeIn end-fadeOut',
    // aya =  Ayano
    "aya Ah ! Heu...",
    "aya C'est tout ce dont tu te rappelles de moi ?",
    "shin:normal J'ai raison ?",
    'show character aya embarrassed fadeIn end-fadeOut',
    "aya Oui, tu as raison, mais bon...<br>Ah ah ...",
    "jump chapter00-ayaContinue"
  ];
  scriptFr["chapter00-ayaNbr"] = [
    "show character aya excited with fadeIn end-fadeOut",
    "aya Super, tu me reconnais donc ! J'ai cru passer pour une inconnue...",
    "shin:blush <em>Elle a commencé à m'applaudir... Je me sens gêné !</em>",
    "show character aya smile with fadeIn end-fadeOut",
    "aya Ah par contre j'ai voulu te demander quelque chose en cours mais tu ne me répondais pas...<br> Tu mettais ta main sur ton visage comme si tu réfléchissais ?",
    "shin:oh <em>Hein ? De quoi parle-elle ?<br>Ah...</em>",
    "shin:normal j'étais en train de dormir",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
  scriptFr["chapter00-ayaGhost"] = [
    "show character aya shy with fadeIn end-fadeOut",
    "aya V-Vraiment ? M-Mais je suis la personne juste à côté de toi !!",
    "aya Je suis si discète que ça ?",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
// continue
scriptFr["chapter00-ayaContinue"] = [
  "...","...",
  "shin:normal <em>Aille...<br>Le blanc...</em>",
  "aya -- ...<br>Mais le plus important, qu'est-ce que tu fait là à une heure pareille ?",
  "aya Il fait déjà noir dehors !",
  "shin:angry2 Ça ne concerne que moi.<br>Et toi, qu'est-ce que tu fais ici à cette heure ?<br>Sans lumière en plus !",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Euhh... Eh bien... C'est que... Tu vois...",
  "aya Comme mes dernières notes étaient un peu juste, le prof m'a donné du travail supplémentaire.",
  "shin:normal Et donc ?",
  'show character aya smile with fadeIn end-fadeOut',
  "aya Euh... En restant pour travailler, sans m'en rendre compte, je me suis endormie.<br>Sans même avoir terminée mes devoirs... Hihi ~",
  "shin:normal Ça valait le coup de rester après les cours ?",
  'show character aya embarrassed with fadeIn',
  "aya Eh bien... C'est vrai, cela n'a aucun sens, n'est-ce pas ?<br>Hum~... Qu'est-ce que je peux faire ?",
  "aya Si je ne lui rend pas demain matin, le prof va encore m’engueuler...",
  "shin:angry <em>Qu'est-ce qu'elle a celle-là ? Elle est trop chiante...</em>",
  "shin:angry <em>Elle est de toute manière en tort pour ne pas avoir fait son boulot. C'est pas mes oignons.</em>",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "animated"}
	} },
  "Je dois me dépêcher de récupérer mon portefeuille et partir d'ici en l'ignorant.",
  "aya ... ?",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "animated";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "rightMove"}
	} },
  'show character aya shy',
  "shin:oh <em>Elle m'empêche de passer ?</em>",
  'show character aya please with fadeIn end-fadeOut',
  "aya Hé euh... Excuse moi !",
  "shin:normal ... <br>Hum ?<br>Qu'est-ce qu'il y a ?",
  "aya Shintaro-kun, tu es super intelligent, n'est-ce pas ?<br>T'as encore eu 100 à la dernière interro !",
  "shin:blueSight <em>Embêtante mais aussi stalkeuse... Il y a vraiment des gens étranges dans ma classe.</em>",
  'show character aya question with fadeIn end-fadeOut',
  "shin:angry2 Eh ? Qui t'as permis de regarder ma note ?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Hum? Euh... Désolée !",
  "shin:blueSight Qu'est-ce qu'il y a ?<br>Dis moi clairement ce que tu veux.",
  "aya Oh... Hum... C'est que... <br>Est-ce que tu pourrais, juste un peu, m'aider à finir mes exercices...",
  "aya Juste pour aujourd'hui ! Pas pour très longtemps !",
  "shin:angry1 Tu veux dire maintenant ?!",
  'show character aya please with fadeIn end-fadeOut',
  "aya S'il te plaît... E-Euh... Je t'en supplie...",
  "shin:facepalm Me supplier ?<br>Urrm~ ! C'est bon, j'ai compris je veux bien t'aider à finir tes devoirs...<br>... Mais c'est juste pour aujourd'hui !",
  'show character aya excited with fadeIn end-fadeOut',
  "aya A-Ah !! Sérieux ??!",
  "shin:dodge Je te dis que je voulais bien t'aider.",
  "shin:dodge Allez, dépêche toi si tu veux commencer !",
  "aya Oui !",
  "hide character aya with fadeOut",
  "stop music 01.03 with fade 1",
  "show background classroomDoorOpened with fadeOut",
  "wait 1000",
  "jump chapter00-working"
];


scriptFr["chapter00-working"] = [
  "play music 01.13 with loop fade 1",
  "show scene classroomDesk with fadeIn",
  "shin:angry3 Sérieux ??",
  "shin:normal Tu n'arrive même pas à faire le théorème de Pythagore alors que t'étais censé le maîtriser l'année dernière ?!",
  "shin:angry2 Comment veux-tu passer ton examen d'entrée au lycée si tu ne connais même pas les bases ?",
  "aya:heh J'étais assez confiante pourtant !",
  "aya:heh Peut être que mes anciens profs m'ont fait apprendre des choses fausses. <br>J'y comprends rien, ils parlent comme s'ils venaient d'une autre planète !",
  "shin:angry2 Pas Moyen ! C'est vraiment toi qui as un problème !",
  "shin:dodge Bref, ne perdons pas de temps ! Reprenons depuis le début !",
  "show image allTriangles.svg with fadeIn",
  "shin:oh Déjà, ça se fait sur un triange rectangle. Et la longeur de l'hypothénuse est la somme des carrés des deux autres côtés.",
  "aya:huh Hu~um !",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="allTriangles.svg"]').className = "animated"}
	} },
  "shin:normal Sur lequel des triangles le théorème s'applique ?",
  "jump chapter00-working-choice1"
];
scriptFr["chapter00-working-choice1"] = [
  { Choice: {
	    c1: {
	      Text: 'sur le triange NUL',
	      Do: 'jump chapter00-working-endChoice1'
	    },
	    c2: {
	      Text: 'sur le triangle DIE',
	      Do: 'aya:oh Eh bien... Celui là ?',
	      onChosen: () => {choices[0] = false},
	      Clickable: () => choices[0]
	    },
	    c3: {
	      Text: 'sur le triangle RIP',
	      Do: 'aya:oh Eh bien... Celui là ?',
	      onChosen: () => {choices[1] = false},
	      Clickable: () => choices[1]
	    }
  } },
  "shin:blueSight Non, c'est pas bon.<br>Si tu veux progresser, il faut bien m'écouter et y donner un peu du tiens!",
  "aya:heh je fais de mon mieux...",
  "jump chapter00-working-choice1"
]
scriptFr["chapter00-working-endChoice1"] = [
	{ Function: {
			Apply: ()=>{
				reverseChoices = [].concat(choices); // ayano can't control the time ;)
				choices.fill(true);
	    	document.querySelector('[data-image="allTriangles.svg"]').className = "animated";
				return true;
			},
			Reverse: ()=>{
				choices = reverseChoices;
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
			}
	} },
  "aya:oh Eh bien... Celui là ?",
  "shin:oh Oui, c'est bien !",
  "shin:oh Maintenant il te manque <span class='darkgreenBg'>NL</span>, mais tu connais <span class='brownBg'>l'hypoténuse (UL)</span> et <span class='cadetblueBg'>l'autre côté (UN)</span>.",
  "aya:huh hm...",
  "shin:oh Et comme <span class='brownBg'>UL²</span> est égal à <span class='cadetblueBg'>UN²</span> + <span class='darkgreenBg'>NL²</span>,",
  "shin:oh Tu peux échanger les valeurs, donc <span class='brownBg'>UL²</span> = <span class='cadetblueBg'>UN²</span> + <span class='darkgreenBg'>NL²</span> deviens <span class='darkgreenBg'>NL²</span> = <span class='brownBg'>UL²</span> - <span class='cadetblueBg'>UN²</span>, non ?",
  "aya:huuh Hum~... Hum?",
  "shin:oh Et si on remet les bonnes valeurs...",
  "shin:normal Tu vois, ça fonctionne !<br>Tu peux répondre à l'autre exercice, non ?",
  "hide image allTriangles.svg with flipOutX",
  "show image triangle0.svg with flipInX",
  "aya:ohFuckkk Hu--<br>Hein ? Je vois pas du tout où tu veux en venir !",
  "shin:angry3 Raaah !<br>Combien de fois je vais devoir te l'expliquer avant que tu ne comprennes ?!",
  "aya:gomen Désolée...",
  "shin:angry2 Fais un effort, tu veux ?<br>À ce rythme, on aura pas fini avant le matin!",
  "aya:heh Hum... C'est vrai...",
  "shin:angry1 <em>Sérieusement, c'est qui celle-là ?<br>Il y a une limite à la connerie, normalement !</em>",
  "aya:oh ...<br>Mais je crois avoir compris pour ici...",
  "shin:normal Ha ?",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="triangle0.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="triangle0.svg"]').className = "animated"}
	} },
  "jump chapter00-working-choice2"
];
scriptFr["chapter00-working-choice2"] = [
  { Choice: {
			Dialog: 'Hypoténuse = BC <br>Côté 1 = AC<br>Côté 2 (celui qu\'on cherche)= AB, donc :',
		  c1:{
		    Text: 'BC² = AC² - AB² donc AB² = AC² - BC²',
		    Do: 'aya Ça deviens ça...<br> <br>puis ça,non?',
		    onChosen: () => {choices[0] = false},
		    Clickable: () => choices[0]
		  },
		  c2:{
		    Text: 'BC = AC + AB donc AB = BC - AC',
		    Do: 'aya Ça deviens ça...<br> <br>puis ça,non?',
		    onChosen: () => {choices[1] = false},
		    Clickable: () => choices[1]
		  },
		  c3:{
		    Text: 'BC² = AC² + AB² donc AB² = BC² - AC²',
		    Do: 'jump chapter00-working-endChoice2'
		  }
  } },
  "shin:blueSight Non, c'est pas bon.<br>Si tu veux progresser, il faut bien m'écouter et y donner un peu du tiens!",
  "jump chapter00-working-choice2"
]
scriptFr["chapter00-working-endChoice2"] = [
	{ Function: {
			Apply: ()=>{
				reverseChoices = [].concat(choices);
				choices.fill(true);
				return true;
			},
			Reverse: ()=>{ choices = reverseChoices; }
	} },
  "show image triangle1.svg with fadeIn",
  "hide image triangle0.svg with fadeOut",
  "aya:oh Ça deviens ça...<br>puis ça,non?",
  "shin:oh Hum ? C'est pas trop mal !<br>C'est ça, c'est ce qu'il faut faire !",
  "show image triangle2.svg with fadeIn faster",
  "hide image triangle1.svg with fadeOut",
  "aya:clapclap Et donc ça devient ça... Et puis on obtient ça ?!",
  "wait 1000",
  { Input: {
      Text: 'AB = √( 5² - 4² ) = √( 9 ) = ???',
      Validation: (input) => input=="3",
      Warning: 'Non ! Il faut calculer la racine carrée de 9...'
  } },
  "shin:oh C'est bon, tu as bon !<br>Tu vois que tu peux le faire quant tu t'y mets...",
  "hide image triangle2.svg with flipOutX",
  "aya:hehe Hihi !",
  "shin:dodge Pas la peine de rire autant... T'est vraiment glauque...",
  "aya:ohFuckkk Hum ? Glauque ?",
  "shin:angry2 Ne le prends pas sérieusement !<br>Ce que tu peux être chiante...<br>Allez, après avoir fait ça, tu as presque terminé. Dépêche-toi de finir.",
  "aya:hehe Oui !",
  "stop music 01.13 with fade 1",
  "show background classroomDesk with fadeOut",
  "wait 1000",
  "jump chapter00-endWorking"
];
scriptFr["chapter00-endWorking"] = [
  "play music 01.26",
  "show scene classroomWindow with fadeIn loop",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Shintaro-kun, tu es vraiment intelligent. Tu étudie chez toi tout les jours ?",
  "shin:normal Pas particulièrement. Je n'ai lu les manuels qu'une seule fois.",
  "show character aya excited at with fadeIn end-fadeOut",
  "aya Et tu réussit quand même à ce point ?!<br>Incroyable... Tu est vraiment intelligent.",
  "shin:normal Hum... Plus qu'intelligent... Je ne sais pas pourquoi mais une fois que j'ai appris quelque chose, je ne l'oublie plus.<br>Depuis toujours...",
  "shin:normal Et comme j'ai déjà appris par cœur tout les manuels, je m'en sort aux interros.",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya Je vois... Alors ça veut dire que, Shintaro-kun, ta mémoire est incroyable, c'est ça ?<br>La chance... J'oublie toujours très rapidement tout ce que j'apprends...",
  "shin:normal C'est pas forcément une bonne chose. De toutes les choses les plus insignifiantes au plus désagréables, je retiens tout.<br>A me soucier de choses sans importance jour après jour, c'est loin d'être facile à vivre...",
  "show character aya embarrassed at with fadeIn end-fadeOut",
  "aya Huuum~...",
  "shin:oh Qu'est-ce qu'il y a ?",
  "show character aya normal at with fadeIn end-fadeOut",
  "aya ...-- Hum ? C'est juste que, je me suis dit que si tu ne pouvait pas oublier les mauvais moments, j'espérais qu'il t'arrive plein de bons moments...<br>Tu finiras par ne plus te préoccuper des choses désagréables, non ?",
  "shin:dodge Rooh~...",
  "show character aya question at with fadeIn end-fadeOut",
  "aya Oh ? Eh bien... Ou alors ça ne marche pas comme ça ?",
  "shin:blush Hein ? Heu... Non... Je suppose que ça va...<br>De cette manière, ça a l'air plutôt simple à vivre.",
  "show character aya embarrassed at with fadeIn end-fadeOut",
  "aya Ah ! Oui ! Je suis sûre qu'à partir de maintenant, <span class='hrem' data-comment='HOHOHO ... T`es pas encore prêt, shintaro !'>plein de bonnes choses vont t'arriver !</span>",
  "shin:oh Comment peux-tu me dire ça ?",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Hihi! <span class='hrem' data-comment='Mauvaise intuition je dirais...'>Par intuition...</span>",
  "show character aya shy at with fadeIn end-fadeOut",
  "shin:angry2 Et donc, tu l'as résolu, ce problème ? Si tu ne fais que de parler, tu ne vas pas le finir.",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Hum! Ah... Hum... Je crois que j'ai rien compris...",
  "shin:angry2 Toi alors...",
  "hide character aya with fadeOut",
  "stop music 01.26 with fade 1",
  "show background classroomWindow with fadeOut",
  "wait 1000",
  "jump chapter00-leaveSchool"
];


scriptFr["chapter00-leaveSchool"] = [
  "show scene oldBridge_night",
  "play music 01.32 with fade 1",
  "show character aya shy with fadeIn",
  "aya Tu m'as vraiment sauvée. Si tu n'avais pas été là, je n'aurais sûrement pas pu finir.",
  "shin:blueSight Mais même avec moi, tu as pris trop de temps. Je te jure...<br>Et dire que j'était juste venu récupérer mon porte-feuille.<br>J'ai vraiment la poisse...",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Ah... Je suis vraiment désolée... Mais je n'oublierai jamais cette soirée !",
  "shin:dodge Qu'est-ce que tu as ?<br>Tu ne m'avais pas dit que tu oublierai toujours tout ce que tu apprenais ?",
  "show character aya normal at with fadeIn end-fadeOut",
  "aya Aujourd'hui, je ferai de mon mieux pour ne pas oublier, alors ça devrait aller.",
  "shin:normal Hum. Si tu te rappelles de ce que tu as vu aujourd'hui,<br>Tu devrais avoir une assez bonne note à la prochaine interro.",
  "aya Ça aussi, c'est vrai, mais... Je ne parlais pas que des études.",
  "show character aya question at with fadeIn end-fadeOut",
  "shin:blush Oh ? Tu as dit quelque chose ?",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya --Hum?? haha !!...<br>R-Rien du tout !!",
  "show character aya normal at with fadeIn end-fadeOut",
  "shin:dodge Je vois... À plus. J'habite par là donc je tourne ici.",
  "show character aya please at with fadeIn end-fadeOut",
  "aya Ha... Hum !! À bientôt !",
  "show character aya shadow at with fadeIn",
  "aya ...<br>Hé ! Shintaro-kun !",
  "shin Oui ?",
  "aya À demain !",
  "shin ...<br>Oui... À demain !",
  "hide character aya with fadeOut",
  "stop music 01.32 with fade 1",
  "show background oldBridge_night with fadeOut",
  "wait 1000",
  "jump chapter01-start"
];
