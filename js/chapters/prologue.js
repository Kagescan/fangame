


  /*
  'show character scene #000000 with fadeIn',
  "centered ",
  "centered ",
  "centered ",
  "centered ",*/

// système scolaire japonais : 13-16 ans collège. 16-18 lycée et la rentrée est en aout. Donc le suicide d'ayano c'est 4 mois après l'entrée au lycée de Shintaro; il a 16 ans.
script["chapter00-start"] = [
  'show scene oldBridge_night with fadeIn',
  'show character aya embarrassed center with fadeIn',
  "aya Je vois... Alors ça veut dire que, Shintaro-kun, ta mémoire est incroyable, c'est ça ?<br> La chance...<br> J'oublie toujours très rapidement tout ce que j'apprends...",
  "J'imagine que c'est normal qu'il n'y ait personne à une heure pareille.<br> Mais franchement,comment ça se fait que l'école soit si flippante la nuit?",
  "J'espère que rien de chelou ne va apparaitre...",
  "Raah...Sérieux !!",
  "Que j'oublie mon porte feuille en classe dès le premier jour de ce trimestre... <br>J'ai vraiment la poisse...",
  "bruit flock~",
  "shin WAAHHHHH ??!!!",
  "shin ...<br>...<br>...",
  "shin Ah...-Ah...<br>C'était quoi, ça ? Les robinets ?",
  "shin Ne te surprend pas comme ça, putain !",
  "Pff... Pourquoi je dois me rendre en <span>classe, pire endroit de l'univers,</span> et de nuit !<br> Et en parlant de ça... ",
  "Les gars de ma nouvelle classe... Ils avaient tous l'air de crétins finis.",
  "La moyenne de la classe pour l'examen de début d'année était incroyablement basse...<br> Enfin, si ce n'est que ça, ça irait...",
  "Mais il n'arrêtent pas de faire du bruit pour déranger le cours !",
  "Dire qu'ils comptent se rendre au lycée l'année prochaine... <br> Pitoyable.",
  "C'est pas croyable. Qu'est-ce que je pourrait gagner avec des types pareils ?<br> C'est bien mieux de passer mon temps à feuilleter mes manuels scolaires chez moi.",
  "bruit *bruit de chaises*",
  "shin EH ?! C-C'était quoi ce bruit ???<br>Il y a quelqu'un à une heure pareille ?",
  "Attends, attends, attends...",
  "C'est vraiment trop bizarre !!! Même si il y avait quelqu'un, aucune lumière n'est allumée...",
  "E-Et puis ce bruit, à l'instant, il vient de ma classe!!",
  "M-Me-Me dites pas que c'est un fantôme ou un truc du genre...<br> L-laissez moi tranquille !!!",
  'show character aya shadow center with fadeIn',
  "bruit *porte coulissante*",
  'show character aya please center with fadeIn',
  "-Whaaaaaaah !!<br>-OUAAAHAAHAHAHA !! Hiiii !!",
  "shin Pardonnez moi ! Pardonnez moi !<br>L-Laissez moi la vie sau~auve !!",
  'show character aya question center with fadeIn',
  "??? :<br> Hum ?",
  "??? :<br> Shintaro... -kun ?",
  "shin ... (?)",
  "J'ai l'impression d'avoir déjà vu ce visage quelque part...",
  'hide character aya with fadeOut',
  'show character aya excited center with fadeIn',
  "uk Ah j'en suis sûre, tu es bien Shintaro Kisaragi !",
  "Mais que se passe-il ?! Je comprends plus rien !! C'est qui ?!",
  "uk Hé, tu ne me reconnais pas ?<br> Ayano Tateyama !",
  'hide character aya with fadeOut',
  'show character aya embarrassed center with fadeIn',
  "uk Enfin,j'ai beau dire ça mais je crois bien que l'on a encore jamais parlé ensemble...",
  "shin Aya...no Tateyama... ?<br>... ...",
  {'Choice':{ 'Dialog': 'shin AH MAIS... ! T\'es...',
    'Celle qui a eu la pire moyenne de la classe !!':{
      'Text': 'Celle qui a eu la pire moyenne de la classe !!',
      'Do': 'jump chapter00-ayaWorst'
    },
    'Celle qui es à côté de moi !!':{
      'Text': 'Celle qui es à côté de moi !!',
      'Do': 'jump chapter00-ayaNbr'
    },
    'Qui ?!':{
      'Text': 'Qui ?!',
      'Do': 'jump chapter00-ayaGhost'
    }
  }}
];
// choice
  script["chapter00-ayaWorst"] = [
    'show character aya shy center with fadeIn',
    "aya Ah !Heu...",
    "aya C'est tout ce dont tu te rappelles de moi ?",
    "shin J'ai raison ?",
    'show character aya shy embarrassed fadeIn',
    "aya Oui, tu as raison, mais bon...<br>Ah ah ...",
    "jump chapter00-ayaContinue"
  ];
  script["chapter00-ayaNbr"] = [
    'show character aya excited center with fadeIn',
    "aya Super, tu me reconnais donc ! J'ai cru passer pour une inconnue...",
    "Elle a commencé à m'applaudir... Je me sens gêné !",
    'show character aya smile center with fadeIn',
    "aya Ah par contre j'ai voulu te demander quelque chose en cours mais tu ne me répondais pas...<br> Tu mettais ta main sur ton visage comme si tu réfléchissais ?",
    "Hein ? De quoi parle-elle ?<br>Ah...",
    "shin j'étais en train de dormir",
    'show character aya embarrassed center with fadeIn',
    "jump chapter00-ayaContinue"
  ];
  script["chapter00-ayaGhost"] = [
    'show character aya shy center with fadeIn',
    "aya V-Vraiment ? M-Mais je suis la personne juste à côté de toi !!",
    "aya Je suis si discète que ça ?",
    'show character aya embarrassed center with fadeIn',
    "jump chapter00-ayaContinue"
  ];
// continue
script["chapter00-ayaContinue"] = [
  "s'ensuit après cette discussion un silence gênant...",
  "aya -- ...<br>Mais le plus important, qu'est-ce que tu fait là à une heure pareille ?",
  "aya Il fait déjà noir dehors !",
  "shin Ça ne concerne que moi.<br>Et toi, qu'est-ce que tu fais ici à cette heure ?<br>Sans lumière en plus !",
  'show character aya shy center with fadeIn',
  "aya Euhh... Eh bien... C'est que... Tu vois...",
  "aya Comme mes dernières notes étaient un peu juste, le prof m'a donné du travail supplémentaire.",
  "shin Et donc ?",
  'show character aya smile center with fadeIn',
  "aya Euh... En restant pour travailler, sans m'en rendre compte, je me suis endormie.<br>Sans même avoir terminée mes devoirs... Hihi ~",
  "shin Ça valait le coup de rester après les cours ?",
  'show character aya embarrassed center with fadeIn',
  "aya Eh bien... C'est vrai, cela n'a aucun sens, n'est-ce pas ?<br>Hum~... Qu'est-ce que je peux faire ?",
  "aya Si je ne lui rend pas demain matin, le prof va encore m’engueuler...",
  "Qu'est-ce qu'elle a celle-là ? Elle est trop chiante...",
  "Elle est de toute manière en tort pour ne pas avoir fait son boulot. C'est pas mes oignons.",
  "Je dois me dépêcher de récupérer mon portefeuille et partir d'ici en l'ignorant.",
  'show character aya question center with fadeIn',
  "aya ... ?",
  "Elle m'empêche de passer ?",
  'show character aya please center with fadeIn',
  "aya Hé euh... Excuse moi !",
  "shin ... <br>Hum ?<br>Qu'est-ce qu'il y a ?",
  "aya Shintaro-kun, tu es super intelligent, n'est-ce pas ?<br>T'as encore eu 100 à la dernière interro !",
  "embêtante mais aussi stalkeuse... Il y a vraiment des gens étranges dans ma classe",
  'show character aya question center with fadeIn',
  "shin Eh ? Qui t'as permis de regarder ma note ?",
  'show character aya shy center with fadeIn',
  "aya Hum? Euh... Désolée !",
  "shin Qu'est-ce qu'il y a ?<br>Dis moi clairement ce que tu veux.",
  "aya Oh... Hum... C'est que... <br>Est-ce que tu pourrais, juste un peu, m'aider à étudier...",
  {'Conditional': {
    'Condition': ()=> storage.fanservice,
    'True': 'v Étudier... Au sens propre ou au sens figuré ?<br>non non non non... Shintaro, retires ces analogies sexuelles de ta tête.',
    'False': 'shin hein ?'
  }},
  "aya Juste pour aujourd'hui ! Pas pour très longtemps !",
  "shin Tu veux dire maintenant ?!",
  'show character aya please center with fadeIn',
  "aya S'il te plaît... E-Euh... Je t'en supplie...",
  "shin Me supplier ?<br>Urrm~ ! C'est bon, j'ai compris je veux bien t'aider à finir tes devoirs...<br>... Mais c'est juste pour aujourd'hui !",
  "end"
]
//script["chapter00-start"]
