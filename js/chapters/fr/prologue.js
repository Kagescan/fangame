
// script
scriptFr["chapter00-start"] = [
	"centered <span class='big'>Prologue</span><br><em>The Old Days</em>",
  "show scene classroomCorridor with fadeIn duration 3s",
	"play music 02.23 with loop fade 3",
  "shin:normal <em>J'imagine que c'est normal qu'il n'y ait personne à une heure pareille...<br> Mais franchement comment se fait-il que l'école soit aussi flippante la nuit??</em>",
  "shin:normal <em>J'ai parcouru ces couloirs des milliers de fois...mais ils sont vraiment différents la nuit...</em>",
  "shin:scare1 <em>J'espère que rien de bizarre ne va m'arriver...</em>",
  "shin:angry1 <em>Aaah, non mais sérieux ! Je suis pas croyable.</em>",
  "shin:angry2 <em>Oublier mon porte monnaie en classe le premier jour du trimestre, vraiment?</em>",
	"play sound pipes.ogg",
  "shin:angry2 <em>C'est un cas désespéré...</em>",
  "shin:scare5 AAaah  ??!!!",
  "shin:scare4 ...<br>...<br>...",
  "shin:scare4 Ah...-Ah...<br>C'était quoi ça!? La plomberie...?",
  "shin:blueSight Ugh… En tout cas rien qui ne devrait me faire sursauter comme ça…",
  "shin:blueSight Il faut que j'arrête de me faire peur…! ",
  "show background classroomDoorClosed with fadeIn",
  "shin:dodge <em>Je devrais penser à autre chose… <br>Aaagh, pourquoi vais-je en classe en plus? Je déteste ça!",
  "shin:angry3 <em>En parlant de ça...</em>",
  "shin:angry3 <em>Les gars de ma nouvelle classe… ils me paraissent vraiment tous insignifiants, en fait.</em>",
  "shin:normal <em>Ils sont tous prévisibles, on dirait qu'ils ne pensent qu'à leur apparence et leur popularité, jamais à leurs notes… </em>",
  "shin:normal <em>Bon je ne fais pas beaucoup attention aux miennes non plus mais... pour être honnête je pense qu'il faut le faire exprès pour avoir des résultats aussi nuls aux premiers tests de placement.</em>",
  "shin:dodge <em>Et puis, ces gars sont super bruyants pendant les cours… J'imagine qu'ils croient que ça y rajoute de l'intêret, mais personnellement, ça me gonfle.</em>",
  "shin:facepalm <em>En plus ils pensent aller dans de grandes univeristés plus tard? Et ils se la jouent tout le temps?<br> Je n'arrive pas à les comprendre.</em>",
  "shin:dodge <em>Comment suis-je sensé suivre les cours correctement au milieu de cette bande d'idiots ?<br>Je ferais mieux d'apprendre seul chez moi au calme.</em>",
  "play sound chair.ogg",
  "shin:scare4 aAAh !?",
  "shin:scare4 <em>Ce cri de surprise est sorti de ma bouche sans que je puisse le retenir. </em>",
  "shin:scare1 <em>Je venais d'arriver devant ma classe, et je suis sûr d'avoir entendu un bruit bizarre en sortir…!</em>",
  "shin:scare1 <em>S-Se pourrait-il que quelqu'un d'autre soit là..? Aussi tard ?!</em>",
  "shin:scare2 <em>Non…<br>Ce n'est pas possible... </em>",
  "shin:scare2 <em> Mais je suis sûr d'avoir entendu quelque chose…!</em>",
  "shin:scare4 <em>Personne ne peut être là, les lumières sont éteintes…</em>",
  "shin:scare3 <em>J'espère que je n'ai pas réveillé un fantôme ou quelque créature du même genre…</em>",
  "shin:scare3 <em>Alors que je réfléchis à faire demi tour, soudain la porte-!</em>",
  "play sound door.ogg",
  "show background classroomDoorOpened",
  "show character aya shadow with rubberBand end-fadeOut",
  "show character aya please with fadeIn end-fadeOut",
  "-AAAAaah !!! !!<br>-hiiiiii !!",
  "stop music 02.23 with loop fade 3",
  "shin:scare5 PaRDOnnEz-mOi, pArdOnNez-mOi !!!<br> Ayez pitié!!",
  "show character aya question with fadeIn end-fadeOut",
  "shin:scare4 <em>Sans y réfléchir j'étais presque à genoux, mes yeux fermés aux paupières clouées par la peur… <br>Mais quelques secondes plus tard, je réalisais qu'aucun des esprits de l'école ne m'avait tué… </em>",
  "shin:scare4 <em>Une voix familière m'adressait la parole.</em>",
  "uk Eh ?",
  "uk Shintaro... -kun ?",
  "play music 01.03 with loop fade 1",
  "shin:scare4 <em>... (?)</em>",
  "shin:oh <em>Dans le noir, je distingue une fille portant l'uniforme de l'école… <br>Son visage me semble familier…</em>",
  "show character aya excited with fadeIn end-fadeOut",
  "uk Ah, j'en suis sûre !! Tu es bien Shintaro Kisaragi !",
  "shin:normal <em>Euh, c'est qui ça? Comment connait-elle mon nom?</em>",
  "uk Hé, tu ne me reconnais pas ??<br> Ayano Tateyama, on est dans la même classe !",
  "show character aya embarrassed with fadeIn end-fadeOut",
  "uk Enfin, je ne crois pas qu'on se soit déjà parlé mais…",
  "shin:normal A-ya-no Ta-te-ya-ma ?<br>... ...",
  { Choice: {
			Dialog: 'shin:oh AH !! ...',
	    c1: {
	      Text: 'Tu es celle qui a eu la pire note aux examens blancs ...!',
	      Do: 'jump chapter00-ayaWorst'
	    },
	    c2: {
	      Text: 'Tu es celle qui est assise à côté de moi !',
	      Do: 'jump chapter00-ayaNbr'
	    },
	    c3: {
	      Text: 'Qui ça ?',
	      Do: 'jump chapter00-ayaGhost'
	    }
  }}
];

// choice
  scriptFr["chapter00-ayaWorst"] = [
    'show character aya shy with fadeIn end-fadeOut',
    // aya =  Ayano
    "aya Ah, euh.. ",
    "aya C'est tout ce dont tu te souviens ?",
    "shin:normal Me serais-je trompé ?",
    'show character aya embarrassed fadeIn end-fadeOut',
    "aya Non mais... <br>Ah ah ...",
    "jump chapter00-ayaContinue"
  ];
  scriptFr["chapter00-ayaNbr"] = [
    "show character aya excited with fadeIn end-fadeOut",
    "aya Ah tu te souviens de moi! J'avais peur que tu ne me reconaisses pas...",
    "shin:blush <em>Elle m'applaudit??? Gênant-</em>",
    "show character aya smile with fadeIn end-fadeOut",
    "aya Ah, j'ai voulu te demander quelque chose en classe aujourd'hui mais tu n'as pas répondu…<br>Tu avais les mains sur le visage comme si tu étais dans tes pensées?",
    "shin:oh <em>Hm? De quoi parle-t-elle ?</em>",
    "shin:normal Ah… Désolé. j'étais probablement endormi… Je ne suis jamais très attentif en cours.",
		"aya Oh, C'est ce que je me suis dit… ne t'inquiète pas!",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
  scriptFr["chapter00-ayaGhost"] = [
    "show character aya shy with fadeIn end-fadeOut",
    "aya V-vraiment? Je te l'ai dit... Ayano! De ta classe ! Je suis même assise à côté de toi!!",
    "aya Je suis si discrète que ça?",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
// continue
scriptFr["chapter00-ayaContinue"] = [
  "...","...",
  "shin:normal <em>Aïe, gênant…<br>Je ne sais plus trop quoi dire maintenant…</em>",
  "shin:normal <em>Heureusement, Ayano brise le silence et je n'ai pas à répondre.</em>",
  "aya ... ...<br>Bref, dis-moi, que fais tu ici aussi tard ??",
  "aya Il fait déjà nuit dehors!",
  "shin:angry2 Cela ne te regarde pas.<br>Mais <em>toi</em>, que fais-tu ici ? Lumières éteintes en plus?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Euh... et bien… tu vois...",
  "aya J'ai eu de plutôt mauvaises notes récemment, alors le professeur m'a donné du travail en plus...",
	"C'est le premier jour du trimestre, non? Comment a-t-elle déjà réussi à avoir du travail supplémentaire…?",
  "shin:normal Hm... Ça n'explique pas les lumières éteintes?",
  'show character aya smile with fadeIn end-fadeOut',
  "aya Ahaha, oui…  euh...Je me suis endormie en travaillant...<br>Sans même avoir pu finir les exercices… Ahaha~",
  "shin:normal Rester plus tard était inutile alors?",
  'show character aya embarrassed with fadeIn',
  "aya Et bien oui, c'est vrai, ça n'a servi à rien au final..<br>Ah......Comment vais-je faire?",
  "aya Si je ne rends pas le devoir demain matin, je me ferais encore gronder par le professeur…",
  "shin:angry <em>Cette fille est dans une impasse, heureusement que ce n'est pas mon problème.</em>",
  "shin:angry <em>Elle est en tort car elle n'a pas fini ses devoirs. Je ne devrais pas m'en mêler.</em>",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "animated"}
	} },
  "shin:angry <em>Ignore la, récupère le porte-monnaie, et sors de cette école de tarés.</em>",
  "aya ... ? Euh, dis...",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "animated";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "rightMove"}
	} },
  'show character aya shy',
  "shin:oh <em>Ayano se place devant moi et m'empêche de passer.</em>",
  "shin:oh …? Je ne peux pas passer. Qu'est ce que tu veux?",
  'show character aya please with fadeIn end-fadeOut',
  "aya Ah,euh, désolée!!",
  "shin:normal Qu'est-ce-qu'il y a encore?<br>Allez dis!",
  "aya Shintaro-kun, tu es super intelligent, n'est-ce pas ?<br>Il me semble qu'au dernier trimestre tu as eu tout bon à chaque examen, même les épreuves terminales qui étaient si difficiles…!",
  "shin:blueSight <em>Cancre et stalkeuse ? Il y a des gens vraiment étranges dans ma classe.</em>",
  'show character aya question with fadeIn end-fadeOut',
  "shin:angry2 … Qui t'a permis de regarder ma note?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Ah… Je suis désolée!",
  "aya Comme on est à côté, je l'ai vue sans le faire exprès, pardon–!",
  "shin:blueSight Arrête de t'excuser tout le temps, c'est chiant.<br>Dis-moi clairement ce que tu veux.",
  "aya Aah...c'est que.. <br>Pourrais-tu peut-être, euh... m'aider à finir mon travail ? Juste un petit peu ?",
  "aya Juste pour aujourd'hui! Ça ne sera pas long!",
  "shin:angry1 … Là maintenant? A cette heure!?",
  'show character aya please with fadeIn end-fadeOut',
  "aya ... <br>Je t'en supplie!!",
	"shin:blush <em>Je n'aurais jamais penser voir une fille me supplier comme ça ce soir.</em>",
	"shin:blush <em>Sans y réfléchir j'acceptais.</em>",
  "shin:facepalm Hm- D-d'accord, je t'aiderais à finir.",
  "shin:normal ...Seulement cette fois, c'est compris? Ne pense pas que ça arrivera de nouveau...",
  'show character aya excited with fadeIn end-fadeOut',
  "aya A-Attends, vraiment?!",
  "shin:dodge Tu es sourde? Je viens de dire que j'allais t'aider.",
  "shin:dodge Dépêche-toi de me montrer ce que tu dois faire, qu'on en finisse.",
  "aya O-okay!",
  "hide character aya with fadeOut",
  "stop music 01.03 with fade 1",
  "show background classroomDoorOpened with fadeOut",
  "wait 1000",
  "jump chapter00-working"
];


scriptFr["chapter00-working"] = [
  "play music 01.13 with loop fade 1",
  "show scene classroomDesk with fadeIn",
	"shin:normal <em>La salle est tout de même moins sinistre quand les lumières sont allumées… Bien qu'être seulement deux dedans reste étrange.</em>",
	"shin:normal <em>Ayano me montre le travail, qui est encore sur son bureau.</em>",
  "shin:angry3 … Sérieusement?",
  "shin:normal C'est le théorème de Pythagore, et tu es incapable de l'utiliser? On l'a appris l'année dernière !",
  "shin:angry2 Comment penses-tu faire des études sans connaître les bases ?",
  "aya:heh En fait, j'avais l'impression de bien le connaître…",
  "aya:heh Mais cette année c'est comme si tout avait perdu son sens, ahah… Mon ancien professeur ne me l'a peut être pas bien appris.",
  "aya:heh Je ne comprends plus rien… C'est comme si j'avais été projetée dans une autre dimension, quelque chose comme ça! ",
  "shin:angry2 Tu es assez bizarre pour venir d'ailleurs, ça c'est sûr.",
	"aya Ah...",
  "shin:dodge … Enfin, ne perdons pas de temps, il faut finir ces exercices.",
  "shin:oh Tout d'abord sache que ce théorème s'applique sur des triangles rectangles.",
  "shin:oh Le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
  "aya:huh Okay!",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="allTriangles.svg"]').className = "animated"}
	} },
  "shin:normal Alors dis-moi, sur lequel de ces triangles l'utilises tu?",
  "jump chapter00-working-choice1",
];
scriptFr["chapter00-working-choice1"] = [
  { Choice: {
	    c1: {
	      Text: 'sur le triangle NUL',
	      Do: 'jump chapter00-working-endChoice1'
	    },
	    c2: {
	      Text: 'sur le triangle DIE',
	      Do: 'aya:oh Celui-là ?',
	      onChosen: () => {choices[0] = false},
	      Clickable: () => choices[0]
	    },
	    c3: {
	      Text: 'sur le triangle RIP',
	      Do: 'aya:oh Celui-là ?',
	      onChosen: () => {choices[1] = false},
	      Clickable: () => choices[1]
	    }
  } },
  "shin:blueSight Non.<br> Il faut y mettre du tiens!",
  "aya:heh Je fais de mon mieux…",
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
  "aya:oh Celui-là ?",
  "shin:oh Oui c'est ça !",
  "shin:oh Maintenant, il faut que tu trouves la longueur de <span class='darkgreenBg'>NL</span>, tu connais déjà <span class='brownBg'>l'hypoténuse, UL,</span> et <span class='cadetblueBg'>l'autre côté, UN</span>.",
  "aya:huh Hmm…",
  "shin:oh Quand tu appliques le théorème tu obtiens <span class='brownBg'>UL²</span> = <span class='cadetblueBg'>UN²</span> + <span class='darkgreenBg'>NL²</span>,",
  "shin:oh Il faut retourner la formule pour avoir <span class='darkgreenBg'>NL²</span> = <span class='brownBg'>UL²</span> - <span class='cadetblueBg'>UN²</span>, compris ?",
  "aya:huuh Hm-Hm…",
  "shin:oh Pour trouver NL, tu cherches la racine carrée de la somme des carrés des deux côtés, soit √(<span class='darkgreenBg'>NL</span>² ) = <span class='darkgreenBg'>NL</span> = √(<span class='brownBg'>UL</span>² - <span class='cadetblueBg'>UN</span>²)",
  "shin:oh Tu remplaces la formule par des valeurs et… <br>Ça marche!",
  "shin:normal Tu vois?<br>Tu devrais pouvoir le faire sans problème maintenant. ",
  "hide image allTriangles.svg with flipOutX",
  "show image triangle0.svg with flipInX",
  "aya:ohFuckkk Euh...<br>Je ne suis pas sûre d'avoir compris…",
	"shin:facepalm <em>Je laisse sortir un soupir d'exaspération.</em>",
  "shin:angry3 Combien de fois vais-je devoir le répéter pour que tu comprennes... ?",
  "aya:gomen Désolée…",
  "shin:angry2 Ecoutes quand je parle ok ?<br> On va pas y passer la nuit.",
  "aya:heh D'accord...",
  "shin:angry1 <em>Sérieusement, c'est quoi son problème? Il y a une limite à la connerie non?</em>",
  "aya:oh ...<br>Je crois que j'ai compris celui-là…",
  "shin:normal Oh ?",
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
			Dialog: 'Hypoténuse = BC <br>Premier côté = AC<br>Deuxième côté (on cherche sa longueur)= AB, alors :',
		  c1:{
		    Text: 'BC² = AC² - AB² so AB² = AC² - BC²',
		    Do: "aya C'est bien ça ?",
		    onChosen: () => {choices[0] = false},
		    Clickable: () => choices[0]
		  },
		  c2:{
		    Text: 'BC = AC + AB so AB = BC - AC',
		    Do: "aya C'est bien ça ?",
		    onChosen: () => {choices[1] = false},
		    Clickable: () => choices[1]
		  },
		  c3:{
		    Text: 'BC² = AC² + AB² so AB² = BC² - AC²',
		    Do: 'jump chapter00-working-endChoice2'
		  }
  } },
  "shin:blueSight Noon! Je viens de te l'expliquer!",
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
  "aya:oh C'est bien ça ?",
  "shin:oh Oui, c'est bien ça.",
  "show image triangle2.svg with fadeIn faster",
  "hide image triangle1.svg with fadeOut",
  "aya:clapclap Alors...ça devient ceci puis cela et…",
  "wait 1000",
  { Input: {
      Text: 'AB = √( 5² - 4² ) = √( 9 ) = ???',
      Validation: (input) => input=="3",
      Warning: 'Non…tu cherches la racine carrée de neuf.'
  } },
  "shin:oh Oui, bravo!<br>Ça fonctionne quand tu réfléchis un peu, tu vois?",
  "hide image triangle2.svg with flipOutX",
  "aya:hehe Haha !",
  "shin:dodge Pas besoin de rire comme ça tout le temps, tu es vraiment bizarre…",
  "aya:ohFuckkk Hein ? Bizarre ?",
  "shin:angry2 Gh… Ne me prends pas autant au sérieux non plus... t'es gênante…",
  "shin:normal Bon on a presque fini, concentre toi.",
  "aya:hehe D'accord!",
  "stop music 01.13 with fade 1",
  "show background classroomDesk with fadeOut",
  "wait 1000",
  "jump chapter00-endWorking"
];
scriptFr["chapter00-endWorking"] = [
  "play music 01.26",
  "show scene classroomWindow with fadeIn loop",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Shintaro-kun, tu es vraiment très intelligent…<br> Tu révises tous les jours?",
  "shin:normal Pas particulièrement, je n'ai lu les cours qu'une fois…",
  "show character aya excited at with fadeIn end-fadeOut",
  "aya Et tu t'en sors quand même aussi bien?<br>C'est incroyable! Tu es super fort!",
  "shin:normal Mouais, c'est pas vraiment ça. Je me souviens de tout ce que j'apprends, c'est tout... Je ne sais pas pourquoi, on dirait que je ne peux rien oublier.",
  "shin:normal Ça a toujours été comme ça.",
  "shin:normal J'imagine que je dois déjà connaître le programme par coeur, c'est pour ça que j'ai bon partout.",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya Je vois... tu as une super mémoire alors?",
  "aya Quelle chance! J'oublie toujours très vite ce que j'apprends.",
  "shin:normal Je ne sais pas si c'est vraiment une chance. Je me souviens de chaque moment, aussi insignifiant qu'il soit...",
	"Cela me tourmente de plus en plus chaque jour, ce n'est pas facile. ",
  "show character aya embarrassed at with fadeIn end-fadeOut",
  "aya Mm…",
  "shin:oh Qu'y a-t-il?",
  "show character aya normal at with fadeIn end-fadeOut",
	"aya Ah ? Je me disais…",
  "aya Si tu te souviens de chaque moment, j'espère que tu en vivras beaucoup de plaisants. Peut-être que ça te permettra d'oublier les plus désagréables?",
  "shin:dodge Oh... ",
  "show character aya question at with fadeIn end-fadeOut",
  "aya Eh ? Ça ne fonctionnerait pas ?",
  "shin:blush Et bien, non... enfin, si. Ça pourrait…",
  "shin:blush Les choses seraient bien plus simples si ça marchait comme ça…",
  "show character aya embarrassed at with fadeIn end-fadeOut",

  "aya Ah! Alors je suis sûre qu'à partir de maintenant, il t'arrivera plein de choses heureuses!",
		// OHOHOHO ReAllY ?! xD

  "shin:oh Comment peux-tu l'affirmer?",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Hehe...j'ai comme une intuition.", // ayano makes really bad predictions
  "show character aya shy at with fadeIn end-fadeOut",
  "shin:angry2 Hm... Tu as répondu à cette question? Tu ne progresseras pas beaucoup si tu continues à bavarder autant…",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Ah euh... je ne la comprends absolument pas…",
  "shin:angry2 Toi alors…",
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
  "aya Aah, tu m'as sauvée! Merci! Je n'aurais jamais pu finir ces exercices sans ton aide!",
  "shin:blueSight Même avec mon aide ça n'a pas été très rapide…",
	"shin:blueSight <em>Dire que tout ça est arrivé parce que j'avais oublié mon porte monnaie…</em>",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Haha désolée... J'essaierais de ne pas oublier ce moment!",
  "shin:dodge Vraiment ?<br> Je croyais que tu oubliais tout ce que tu apprenais?",
  "show character aya normal at with fadeIn end-fadeOut",
  "aya Si je fais de mon mieux pour ne pas oublier, ça ira.",
  "shin:normal Hm. Je suis sûr que tu auras une bonne note au prochain test si tu te souviens de ce qu'on a vu.",
  "aya Oh j'espère, <em>mais je ne parlais pas que de ça…</em>",
  "show character aya question at with fadeIn end-fadeOut",
  "shin:blush Comment ? Tu as dit quelque chose ?",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya Hein ?<br> Non ce n'est rien...hehe",
  "show character aya normal at with fadeIn end-fadeOut",
  "shin:dodge Okay… au revoir, alors. J'habite de ce côté, on doit se quitter ici.",
  "show character aya please at with fadeIn end-fadeOut",
  "aya Ah..euh... !",
  "show character aya shadow at with fadeIn",
  "aya Shintaro-kun !",
  "shin Oui ?",
  "aya A demain !",
  "shin ...<br> Oui, à demain !",
  "hide character aya with fadeOut",
  "stop music 01.32 with fade 1",
  "show background oldBridge_night with fadeOut",
  "wait 3000",
  "jump chapter01-start"
];
