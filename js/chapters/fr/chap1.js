
scriptFr["chapter01-start"] = [
	"show scene ShinDodo with fadeIn duration 6s",
	"play sound ding.ogg",
	"play music 02.08 with fade 3 loop",
	"wait 5000",
	"… …",
	"J'ai beaucoup transpiré...",
	"Quel genre de rêve ai-je fait cette nuit?",
	"Hmpf... Ça importe peu. Je n'irai pas loin en me posant ce genre de questions.",
	"...",
	"show background ShinGotoPC with fadeIn",
	"Il faut que je bosse un peu.",
	"Personne ne finira cette chanson à ma place.",
	"show background ShinGotoPC with fadeOut",
	"play sound pcBooted",
	"wait 1500",
	"show scene ShinOrdi with fadeIn",
	"A cause d'elle, je n'avance jamais...",
	"Mais attends...",
	"play sound ding.ogg",
	"Je n'ai pas été réveillé par une alerte à la bombe, mais par les rayons du soleil...<br>et le seul son qui est sorti de mon ordinateur a été celui du démarrage,",
	"Ce qui voudrait dire...",
	"vibrate 1000",
	"qu'<span class='rem'>elle</span> n'est pas là!",
	"show background ShinOrdiHands with fadeIn",
	"Je devrais en profiter!",
	"jump chapter01-shinOS"
];
scriptFr["chapter01-shinOS"] = [
	"show background ShinOrdiEyes",
	function(){
		monogatari.skip(false);
		if (shinOSinstance.started){
			shinOSinstance.show();
		} else {
			shinOSinstance.run();
			shinOSinstance.addApp("Web Browser", "fa-globe-americas", function(){
				shinOSinstance.addWindow("web","fa-globe-americas", function(e){
					kageBrowser.start(e,`
						<a href="#!" data-action="monogatari" data-arg="jump chapter01-weebGame">Anime Reviewer's Forum</a><br>
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-news">news</a><br>
			      <a href="#!" data-action="builtin" data-arg="mailClient">E-Mails</a><br>`
					);
				})
			});
			shinOSinstance.addApp("vocaloid", "fa-guitar", function(){
				monogatari.run("jump chapter01-MAO");
			});
			shinOSinstance.addApp("Legs", "fa-folder-open", function(){
				monogatari.run({'Input': {
			      'Text': 'Mot de passe de Shintaro<br><em style="font-size: 12px;">(appuyez sur entrée pour fermer)</em>',
			      'Validation': (input) => (input == "4510471" || input.trim().length<=0),
			      'Save': (input)=>{ monogatari.run((input=="4510471") ? "jump chapter01-legs" : "jump chapter01-shinOS"); },
			      'Warning': 'Mot de passe incorrect'
			    }});
			});
		}
	},
	"<span class='hide>The PC is on.</span>",
	"jump chapter01-shinOS"
];

// TODO: Use reversible functions

scriptFr["chapter01-legs"] = [
	/*show scene emptyLegs",*/
  function(){shinOSinstance.hide()},
	"clear",
	"…?!",
	"A la place de ma suprême réserve, je trouve un dossier vide.",
	"shin QU'EST-CE QUE??",
	"Sans m'en rendre compte, je venais de crier. Elle a osé supprimer mes documents personnels!?",
	"...<br>AAhhh -- J'ai la poisse...<br> J'espère que mes fichiers de composition n'ont pas subi le même sort.",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];

scriptFr["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>C'est le deuxième jour du festival Obon. Aujourd'hui, les températures monteront jusqu'à 30°.",
	"Limitez vos activités en plein air, et n'oubliez pas de bien vous hydrater.",
	"#2: <br>L'idole n°1 du classement commence sa carrière d'actrice! Elle jouera dans un drama dont la sortie est prévue peu après celle de son nouvel album!",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br>On a appris à un ours à danser!",
	"shin Rien d'intéressant ce matin...",
	"jump chapter01-shinOS",
];
scriptFr["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"“Notre site est actuellement en maintenance.” Hm.",
	"shin Le créateur de ce site fait souvent des mises à jour. <span class='rem'>Je repasserai plus tard.</span>",
	"shin <i>Ou alors...se pourrait-il qu'il m'ait banni?</i>",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
scriptFr["chapter01-eneOrigins"] = [
	function(){shinOSinstance.showTextBox()},
	"show scene #171b21",
	"stop music 02.08 with fade 3 loop",
	"play music 01.13 with fade 3 loop",
	"C'est par là qu'elle est arrivée.",
	"CA fait un an, maintenant.",
	function(){
		shinOSinstance.hideTextBox();
		shinOSinstance.hide();
	},
	"show scene flashback with flash",
	// todo : hide image after 800 ms in a secure way
	"J'étais assez naïf pour cliquer sur tous les liens douteux qu'internet me proposait.",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	"show scene shinPC with fadeIn",
	"show image enePop.svg center",
	"wait 500",
	"Qu'est-ce que...",
	"hide image enePop.svg",
	"show character ene old0 with fadeIn end-fadeOut",
	"wait 1000",
	"show character ene old1 with fadeIn end-fadeOut",
	"…",
	"Une...fille? Quel est ce programme? <br>Seule ma page de mails semble être ouverte...",
	"…",
	"show character ene old2 with fadeIn end-fadeOut",
	"Attends.",
	"Et si c'était un de ces programmes top secrets?",
	"show character ene old4 with fadeIn end-fadeOut",
	"Et si cette jolie fille avait besoin de mon aide pour sauver un monde dont je ne connais pas encore l'existence, <br>parce que je suis dans le premier épisode d'une série shōnen dont je suis le héros et-",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene -H-heureuse de vous rencontrer.",
	"Elle a l'air si...humaine. Ce doit être quelque chose de très high-tech.",
	"show character ene old4 with fadeIn end-fadeOut",
	{'Choice':{ 'Dialog': "Peut être qu'elle a une fonction de reconnaissance vocale. Je devrais essayer de lui parler.",
    'Demander qui elle est':{
      'Text': "Demander ce qu'elle est",
      'Do': 'jump chapter01-eneOriginsAskWhoIsShe'
    },
    'Demander une mission':{
      'Text': 'Demander une mission',
      'Do': 'shin J-je ferais ce que tu voudras! Tu peux me donner la mission...! ou quête ou ce que tu veux! ',
    },
    'Offer my help':{
      'Text': "Proposer de l'aide",
      'Do': "shin Je peux t'aider?",
    }
  }},
	"show character ene old5 with fadeIn end-fadeOut",
	"ene Haha! Comment ça?",
	"show character ene old4 with fadeIn end-fadeOut",
	"ene Je n'ai pas besoin de grand chose mais...",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene A partir d'aujourd'hui, prenez soin de moi s'il vous plaît, <span class='rem'>Maître</span>...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered En y repensant, je ne sais toujours pas quel moment était le plus gênant dans cette rencontre.",
	"centered J'étais vraiment stupide.",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Ene occupe mon ordinateur depuis ce jour, et me harcèle sans arrêt. ",
	"Il semblerait qu'elle soit endormie en ce moment, ou devrais-je dire offline? Je ne sais pas.",
	"Bien qu'elle soit ici depuis un an, je ne sais presque rien d'elle.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
	"jump chapter01-shinOS"
];
scriptFr["chapter01-eneOriginsAskWhoIsShe"] = [
	"shin Salut, euh...dis moi, <br>Qu'est ce que tu es exactement?",
	"show character ene old2 with fadeIn end-fadeOut",
	"ene Hmmm…",
	"La fille m'observe un cours moment avant de répondre.",
	"show character ene old3 with fadeIn end-fadeOut",
	"ene Je n'en suis pas tout à fait sûre moi-même mais...",
	"show character ene old5 with fadeIn end-fadeOut",
	"ene A partir d'aujourd'hui, prenez soin de moi s'il vous plaît, <span class='rem'>Maître</span>...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered Elle paraissait timide au début, mais en un rien de temps elle a pris confiance et a commencé à m'embêter dès qu'elle y trouve prétexte.",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Maintenant, elle surveille toutes mes activités en ligne et détruit ma vie privée, sans pour autant vouloir m'en dire plus sur son passé.",
	"Je connais au moins son nom,",
	"<span class='rem'>Ene</span>.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
	"jump chapter01-shinOS"
];
scriptFr["chapter01-MAO"] = [
  function(){shinOSinstance.exit()},
	"show scene shinPC with fadeIn",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"play sound pcError",
	"show image VocaloidStoppedWorking.svg center with flash",
	"wait 4000",
	"shin Oh non. Oh non, non, non! Pitié! Pas ça!",
	"Je n'ose même pas cliquer– Je ne peux que supplier l'écran d'ordinateur.",
	"shin Je n'ai pas besoin de manger, boire ou dormir pour survivre, mais si l'ordinateur me lâche, c'est la mort!",
	"shin Je vais mourir, je vais-!",
	()=>{ document.getElementById("background").style.backgroundColor = "blue"; },
	"hide image VocaloidStoppedWorking.svg with zoomOut",
	"shin Aaah!!",
	"Je vérifie la dernière version du fichier.",
	"shin Dieu merci c'était sauvegardé.",
	/*avec une tête comme celle du manga !*/
	"shin Cette chanson est destinée au hall of fame de nico nico douga, après tout. Je ne peux pas me permettre de perdre un tel futur succès.",
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"shin Uh-oh...",
	"Non...! Ce moment de tranquilité commençait à peine! Par pitié, pas <span class='rem'>elle</span>…!",
	"hide image enePop.svg with fadeOut",
	"Evidemment, personne ne vient me tirer de là, et surtout pas la personne causant ma présente agonie.",
	"play music 01.02 with volume 15",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Allons, allons maître!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smuga center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene Encore en train de travailler sur cette chanson que vous êtes incapable de finir?",
	"<span class='rem'>Ene…</span>",
	"Cette insolente...cyber-girl? <br>C'est comme ça qu'elle se présente, mais pour être honnête elle est pire qu'un virus informatique.",
	"Bien qu'elle m'appelle “Maître”, ce qui n'est PAS mon idée, elle ne m'apporte que des problèmes depuis qu'elle est arrivée il y a un an.",
	"Quoi que je fasse, je ne trouve aucun moyen de m'en débarasser, alors je fais de mon mieux pour supporter ses insultes quotidiennes.",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene Passez à autre chose...Vous savez que vous n'y arriverez jamais.",
	// hier -> remplacer par ce matin, si on a joué au jeu (pas encore fait)
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Hier encore à la place de travailler sur votre chanson, vous avez passer des heures à critiquer un nouvel anime sur un forum d'illettrés!",
	"show character ene thinka center with fadeIn end-fadeOut",
	"ene “L'histoire ne respecte pas l'oeuvre originale!”",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh4 with fadeIn end-fadeOut",
	"ene “Le choix des doubleurs n'est pas du tout ce que j'avais imaginé!”",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Mais il est vrai que <span class='rem'>vous</span> avez tant d'expérience...",
	"shin ...",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Dites-moi qu'était ce “Il fut un temps où je travaillais dans l'animation...”",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene Se pourrait-il que vous ayez menti?<br> Haha! C'est pitoyable!",
	"show character ene laughb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"shin Gh–!!",
	"Je serre les dents et fait de mon mieux pour l'ignorer. Cette fille est une vraie plaie. <br>Putain elle pourrait pas la fermer?!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene J'imagine que ‘Il fut un temps’ parle d'une de vos vies antérieures...",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smugb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene Ca doit être ça, puisque cela fait deux ans presque exactement que vous êtes cloîtré ici!",
	"Aaaagh, j'en peux plus!",
	"shin FERME LA!",
	"clear",
	"show character ene fright center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"show video shincola immersive with close",
	"show scene shinPC with shake",
	"show character ene fright center with shake end-fadeOut",
	"show character enef lh2 center with shake end-fadeOut",
	"show character eneb rh3 center with shake end-fadeOut",
	"ene UWAAAAAAH!!! Maître, la souris! Sauvez la souris!",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh merde!!!",
	"J'attrappe quelques mouchoirs et les collent à ma souris.",
	"<span class='rem'>Allez Shintaro Sauve au moins une vie!</span>",
	"shin Allez! Fonctionne s'il te plaît!!",
	"[...]",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene shocked center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Uwa, seul le clic droit fonctionne. Essayez le clavier?",
	"stop music 01.02 with fade 3",
	"hide character enef",
	"hide character eneb",
	"hide character ene",
	"show background #000",
	"play music ltm8bit with loop fade 7",
	"play sound keyboardtyping.ogg",
	"Mes mains parcourent le clavier frénétiquement mais...",
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laughb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene Seulement trois lettres hein?",
	"shin Aah, c'est foutu!",
	"show character eneb rh2 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Maître~ Vous pouvez écrire Totoro?<br> C'est déjà ça!",
	"shin ...",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene ..................",
	"shin uuuuuh…",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"shin C'est la fin, c'est vraiment la fin...",
	"hide character enef",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"ene ...",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene normalb center with fadeIn end-fadeOut",
	"ene Maître?",
	"Je sors de mon désespoir et regarde Ene. Serait-elle embarrassée?",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene guilty center with fadeIn end-fadeOut",
	"ene Vous pouvez en racheter de nouveaux n'est ce pas...?",
	"shin Parce que tu t'en soucies maintenant?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smuga center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Hrm…",
	"shin … Passons. Je pensais acheter du nouveau matériel de toute façon.",
	"show character eneb rh2 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Oh parfait! Les nouveaux modèles sont supers vous savez?",
	"shin Urgh… Il en faut peu pour que tu reprennes confiance...",
	"shin Choisis les modèles qui seront livrés le plus rapidement, ça suffira.",
	"show character eneb rh4 center with fadeIn end-fadeOut",
	"show character ene thinka center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Hmmm~ Okay, voyons voir...",
	"show character eneb rh4 center with fadeIn end-fadeOut",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene … … … … … … <br>Eh!",
	"shin Qu'est-ce qu'il y a encore?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Ce n'est pas possible.",
	"shin … Comment ça, ce n'est pas possible?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normalb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene C'est le 14 Août aujourd'hui, avec le festival Obon,<br> rien ne peut être livré avant deux jours.",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"shin …<br>Il n'y a vraiment aucune solution plus rapide?!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene Nooon~!",
	"shin <span class='shake animated'>Je vais vraiment mourir aujourd'hui./span>",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Dites maître, j'ai une idée...Pourquoi ne sortirions-nous pas les acheter?",
	"shin -... quoi? vraiment?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene Bien qu'on soit un jour férié, le nouveau centre commercial géant du quartier est ouvert aujourd'hui!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene On pourra acheter de la crème solaire pour résister au soleil de canicule! <br>Bien que je n'en aurai pas besoin, hehe!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilea center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"La lumière du jour... Cela fait deux ans que je ne suis pas sorti, envisager d'aller dehors me paraît impossible.",
	"Mais ne pas pouvoir utiliser mon ordinateur pendant deux jours, c'est la mort assurée.",
	"Juste pour un peu de shopping…",
	"Je suis trop jeune pour mourir ici.",
	"shin Allons-y.",
	"show scene black",
	"centered Après tout, que pourrait-il arriver si je sors ce matin?",
	"centered C'est juste pour aujourd'hui!Après ce jour, je ne sortirais plus jamais!",
	"clear",
	"jump chapter01-demoEnd"
];

scriptFr["chapter01-demoEnd"] = [
	"show scene icon with fadeIn",
	"wait 1500",
	"show image kagescan.svg centeredLeft with fadeIn",
	()=> tempDialogs("La communauté française présente...", 2000),
	()=> tempDialogs("avec l'aide de fans des quatres coins de la Terre", 2000),
	"hide image kagescan.svg centeredLeft with fadeOut",
	"show image logo.png centeredLeft with fadeIn",
	()=> tempDialogs(`Un fangame du Kagerou Project <br><span style="font-size: 8px; color:#aaa;">demo ${monogatari.settings().Version}</span>`, 2000),
	"hide image logo.png centeredLeft with fadeOut",
	"centered <span style='color: black;'>Merci d'avoir joué à cette démo!</span>",
	"Je te conseille d'utiliser le bouton de sauvegarde maintenant, à moins que tu ne veuilles recommencer à zéro quand la partie suivante sortira, pour tester de nouvelles choses...",
	"Jettes un oeil à la page aux crédits et anecdotes du jeu si tu peux, et rejoins le serveur discord du jeu (anglais) si tu veux suivre son développement ou alors contribuer à la suite!",
	"Si tu veux, tu peux maintenant tester un tout petit bout de la partie suivante. Cependant elle n'est pas terminée, disponible qu'en anglais et sera probablement beaucoup édité d'ici la sortie du chapitre.",
	"jump chapter01-demolinks",
];
scriptFr["chapter01-demolinks"] = [
	"stop music ltm8bit with loop fade 3",
	{"Choice":{
		"discord":{
			"Text": "Serveur discord",
			"Do": ()=>{ window.open("https://discord.gg/QNqTVuR", "_blank"); },
		},
		"webpage" :{
			"Text": "Page web du jeu",
			"Do": ()=>{ window.open("https://logantann.github.io/demo/kagepro2/en/", "_blank"); },
		},
		"menu" :{
			"Text": "Menu du jeu",
			"Do": "end"
		},
		"next" :{
			"Text": "Début de la partie suivante(English only)",
			"Do": "jump chapter01-street"
}}},
	"jump chapter01-demolinks",
];




// additional part
// Do not translate

scriptFr["chapter01-street"] = [
  "play music 01.03 with fade 3 loop",
  "show scene street with fadeIn duration 2s",
  "Somehow, it feels strange...",
	"Is it because I haven’t gone outside in so long or is the heat getting to my head ?",
  "The city’s changed so much since the last time I walked these streets...",
	"shin Hey Ene, what's the way to the store?",
	"ene There are several routes available, but they all have the same ETA! <br>Why don’t you choose one yourself, Master?",
	  {"Choice":{
			"walk":{
				"Text": "Let's go by foot.",
				"Do": "jump chapter01-walk"
			},
			"metro" :{
			"Text": "Let's take the subway.",
			"Do": "jump chapter01-metro"
		}
	}}
];

scriptFr["chapter01-walk"] = [
	"shin Let’s go by foot… It’s not too far away, after all, and that way I don’t have to be around a lot of people…",
	"ene That’s probably good for you, seeing how you haven’t moved at a~l~l in the last two years. Can your body even handle it?",
	"shin Shut up! I’m sure even I can manage this distance...",
	"ene If that’s what you say, Master!",
	"show background street2 with fadeIn",
	"shin Ugh, it’s probably for the best… It’s so hot out, though...",
	"ene The weather report this morning said that we’re having one of the worst heat waves seen in years! <br>You should be careful of heat stroke!",
	"shin Ugh, another worry to add onto the list…",
	"ene Aaah~ I miss your computer’s fans already!",
	"shin What? Do you really feel heat, or are you just messing around…?",
	"ene I can imagine! Just by the sunlight I can tell that it’s hot! I don’t envy you at all, Master!",
	"I groan and tug lightly at the collar of my shirt, which was already starting to get damp with sweat.",
	"I’d make a fool of myself if I were to take off the red jersey I’m wearing.",
	"Even though it’s the first time in two years people would see me, I didn’t give much thought to my choice of clothes for going outside. <br>Looking at all those items I used to wear at school in the closet brought back bitter memories. ",
	"Surprisingly, Ene seemed genuine when she complimented my look. I guess she was still a bit ashamed of ruining my keyboard. ",
	"show background street3 with fadeIn",
	"Well she’s back to normal now.",
	"wait 1000",
	"ene Hey master, isn't that your sister? Momo-chan!",
	"shin Huh?! Where?!",
	"I duck behind a street pole without thinking. <br>Momo ...?!",
	"She can’t see me here, outside for the first time in two years…! <br>She’d definitely make fun of me!",
	"ene Look ! I’m pretty sure it’s her on that big screen!!",
	"shin Eh ? Oh right…",
	"Phew… This cyber girl is giving me a scare even outside...",
	"shin The news told she’s making her TV debut today.",
	"ene Oh that’s pretty cool!  Must be hard, being a teen idol.",
	"shin Yeah, she comes home late sometimes, and that dumbass got herself back in summer classes again with her grades...",
	"It’s green, better cross the road. I don’t wanna melt here.",
	//if we get a crossfade effect later we can actually make the light go green
	"show background street4 with fadeIn end-fadeOut",
	"ene You’re taking much more time than what the app planned Master...", //smirk
	"ene We’re going left at the intersection after this park!",
	"shin ...",
	"Haha… Kids these Days… How can they keep running around in this heat…?!", //animate__rotateOutDownLeft, is it possible to add a blur effect to the background ?
	"ene Goodness, Master! Stop spacing out! You’ll collapse from heatstroke! <br>Wake up! The store’s this way, we’re almost there!",
	//fadeout one Ene's line
	//'jump chapter01-mall-outside'
	"show background #000",
	"clear",
	"wait 3000",
	"This is the end, <br>Thank you for playing this little extra bit!",
	"end"
];

scriptFr["chapter01-metro"] = [
		'stop music 01.03 with fade 5',
	"shin Let’s take the subway. I don’t think my legs can walk this much.",
	"ene You took the words right out of my mouth!",
	"show scene metro1 with fadeIn duration 4s",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	'play music 01.13 loop',
	'wait 3000',
	"ene Eugh, Master, look at that guy!",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"By one of the turnstiles, there’s a young boy with a panicked expression on his face. <br>It seems like he doesn’t know how it works, as if he never saw any before.",
	"ene He has such a hopeless expression on his face... Kind of reminds me of you, Master!",
	"shin Oi!",
	"I bite my tongue and look at the boy, whose panic is clearing growing. Maybe he’s not from around here…?",
	'show scene metro2 with fadeIn',
	'Before I can even move a girl around his age marches from the station platform and speaks sharply to him before tapping the turnstile with a subway card.',
	'It beeps and lets him through, and he sheepishly follows the girl down the platform...', //fade to black/fadeout I tried many ways but I cannot seem to make it work
	'show background #000',
	'stop music 01.13 with fade 3',
	'After Ene makes fun of his behaviour again while waiting on the platform, the train eventually arrives and I get on.',
	'play music 01.31 loop',
	'...',
	'wait 2000',
	"This place is so crowded...Guess I should have gone by foot in the end.",
	"The train is filled with a constant loud muttering, and a sweaty fog so thick I could pass out.",
	"Looking at the closet with all the clothes I used to wear before isolating was so painful that I just took the first items my hands reached for. ",
	"show image redjersey.png with fadeIn duration 4s",
	"Ene did compliment me, that was a change, but now here I am wearing an autumnal red jersey, sweaty as hell..",
	"hide image jersey with fadeOut",
	"show scene metro3 with fadeIn duration 3s end-fadeOut",
	"As I look around I see the children she laughed at before.",
	"At least I’m not the only one feeling uncomfortable here.",
	"The boy is smiling and yet he looks anxious. His gaze keeps quickly alternating between the surroundings and the girl, who is on her phone totally ignoring him.",
	'wait 2000',
	"They’re still this way when I get off the train following Ene’s directions.",
	//fadeout
	//'jump chapter01-mall-outside'
	"clear",
	"show background #000",
	"wait 3000",
	"This is the end, <br>Thank you for playing this little extra bit!",
	"end"
];

scriptFr["chapter01-mall-outside"] = [
	'show scene storeoutside with fadeIn duration 3s',
	'wait 3200',
	'ene Huah~ ! We’re here! <br>It looks even bigger than in the photos!',
	'ene According to its website’s homepage, this building has the most high-tech security system of the whole prefecture! Can you imagine ?',
	'ene And there are nine floors!',
	'ene Oh, and look at that! <br>On the roof!!',
	'ene That’s the amusement park!!',
	'Ah… That famous amusement park…',
	'ene I WANNA GO!!',
	'ene Master, let’s go, let’s go, lets go!',
	//shakey text effect woohoo
	'shin Gah, shut up ! No way in hell am I going to a place like that!',
	'shin Would it even be fun for you?',
		{"Choice":{
			"angry":{
				"Text": "You wouldn't feel any of the rides!",
				"Do": "jump chapter01-mall-angryene"
			},
			"notangry" :{
				"Text": "Would you feel any of the rides?",
				"Do": "jump chapter01-mall-enethere"
			}
		}}
];

scriptFr["chapter01-mall-angryene"] = [
	"shin You wouldn't feel any of the rides!",
	'ene Tch...<br>Master is so tactless!',
	'ene Even I have places I want to go!',
	'wait 3000',
	'...',
	'She stopped talking, looking jaded. I don’t think I ever saw her mood change that quickly before, but oh well.',
	'Why would I go to such an expensive location with loud, obnoxious music and yelling children everywhere ?',
	'She knows I wouldn’t. It’s probably just a joke to her.',
	'I would regret taking her with me to the store if it weren’t for the fear that she might set up a bomb alarm on my computer again and wake the whole house like she had done a few days ago. ',
	'She did ask to come with me quite politely, though, and I have to admit she probably prevented me from giving up and going back home.',
	'I never use my phone at home, so I didn’t know she could transfer to other devices and access all its contents just like she can with my computer. That’s actually pretty cool.',
	"end"
];

scriptFr["chapter01-mall-enethere"] = [
	'shin Would you feel any of the rides?',
	'ene I...<br>...',
	'ene You would.',
	'ene and I’d laugh at your deformed, scared face.',//le smirk
	'shin Gh… Stop messing around. <br>This wouldn’t scare me, but I’m not going. There’d be too many people.',
	'ene ...<br>Fine then.',
	'She stopped talking, looking jaded. I don’t think I ever saw her mood change that quickly before, but oh well.',
	'Why would I go to such an expensive location with loud, obnoxious music and yelling children everywhere ?',
	'She knows I wouldn’t. It’s probably just a joke to her.',
	'I would regret taking her with me to the store if it weren’t for the fear that she might set up a bomb alarm on my computer again and wake the whole house like she had done a few days ago. ',
	'She did ask to come with me quite politely, though, and I have to admit she probably prevented me from giving up and going back home.',
	'I never use my phone at home, so I didn’t know she could transfer to other devices and access all its contents just like she can with my computer. That’s actually pretty cool.',
	"end"
]
