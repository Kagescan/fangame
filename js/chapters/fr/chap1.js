
scriptFr["chapter01-start"] = [
	"show scene ShinDodo with fadeIn duration 3s",
	"play music 02.08 with fade 3 loop",
	"wait 2500",
	"... ...",
	"Hmmm ?<br> J'ai beaucoup transpiré... Quel genre de rêve ai-je fait cette nuit ?",
	"Pff, sans doute toujours la même chose. Je n'avancerais pas si je ne fais que de me poser ce genre de questions.",
	"...",
	"show background ShinGotoPC with fadeIn",
	"Quoi qu'il en soit, il faut que je finisse la <span class='rem'>composition de ma musique !</span>",
	"Reprenons le travail... à cause d'<span class='rem'>elle</span> je n'aurai jamais fini !",
	"show background ShinGotoPC with fadeOut",
	"play sound pcBooted",
	"wait 1500",
	"show scene ShinOrdi with fadeIn",
	"Ah mais...",
	"J'ai été réveillé par la lumière du jour...<br>Mon PC a démarré rapidement et le seul son sorti des hauts parleurs a été celui du démarrage...",
	"Ce qui veut dire...",
	"vibrate 1000",
	"Qu'<span class='rem'>Ene</span> n'est pas là pour le moment !!",
	"show background ShinOrdiHands with fadeIn",
	"Je devrais en profiter !",
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
			shinOSinstance.addApp("Parcourir le web", "fa-globe-americas", function(){
				shinOSinstance.addWindow("web","fa-globe-americas", function(e){
					kageBrowser.start(e,`
						<a href="#!" data-action="monogatari" data-arg="jump chapter01-weebGame">Forum Critiques-Anime</a><br>
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-news">Informations</a><br>
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-mails">Mails</a><br>`
					);
				})
			});
			shinOSinstance.addApp("vocaloid", "fa-guitar", function(){
				monogatari.run("jump chapter01-MAO");
			});
			shinOSinstance.addApp("jambes", "fa-folder-open", function(){
				monogatari.run({'Input': {
			      'Text': 'Mot de passe de Shintaro ?<br><em style="font-size: 12px;">(entrez vide pour quitter)</em>',
			      'Validation': (input) => (input == "4510471" || input.trim().length<=0),
			      'Save': (input)=>{ monogatari.run((input=="4510471") ? "jump chapter01-legs" : "jump chapter01-shinOS"); },
			      'Warning': 'Mot de passe incorrect'
			    }});
			});
		}
	},
	"<span class='hide>Le pc est allumé</span>",
	"jump chapter01-shinOS"
];
scriptFr["chapter01-legs"] = [
	/*show scene emptyLegs",*/
  function(){shinOSinstance.hide()},
	"WHAT",
	"shin KESKE ?!",
	"Elle a supprimé tous mes fichiers privés ?!",
	"...<br>AAhhh -- Je suis maudit...<br> J'espère au moins que les fichiers de ma musique n'ont pas subi le même sort !",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];
scriptFr["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>Aujourd’hui le 15 aôut pour le festival d’obon, les températures grimperont jusqu’à 35°",
	"Prévoyez donc une activité moins importante ou même supprimée des services publics pour ce jour férié.",
	"#2: <br>L’idole si populaire en ce moment commence sa carrière d’actrice ! Elle jouera dans un drama dont la sortie est prévue peu après celle de son album",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br>Un ours apprend à danser !",
	"shin Rien d'intéressant en ce moment...",
	"jump chapter01-shinOS",
];
scriptFr["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"\"Le site est actuellement fermé. Il réouvrira une fois la programmation du nouveau forum finie.\"",
	"shin Ah, le créateur de ce site fais encore une mise à jour... Il faudra que je repasse un autre jour !",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
scriptFr["chapter01-MAO"] = [
  function(){shinOSinstance.exit()},
	"show scene shinPC with fadeIn",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"play sound pcError",
	"show image VocaloidStoppedWorking.svg center with flash",
	"wait 4000",
	"shin Oh non. Oh non non non non non pas encore ! C’est pas vrai !",
	"shin Je n’ai pas besoin de boire, manger ou dormir pour vivre mais si l’ordinateur me lâche c’est fini. Je vais mourir, je vais-",
	()=>{ document.getElementById("background").style.backgroundColor = "blue"; },
	"hide image VocaloidStoppedWorking.svg with zoomOut",
	"shin Aaaah ! Dieu merci ça n’a pas tout effacé.",
	/*avec une tête comme celle du manga !*/
	"shin Cette chanson est destinée au hall of fame de <span class='def'>niconico</span>. Je ne peux pas me permettre de perdre un tel futur succès.",
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"shin huh oh",
	"par pitié... Pas elle !!",
	"play music 01.02 with volume 15",
	"show character ene cool center with fadeIn end-fadeOut",
	"hide image enePop.svg with fadeOut",
	"ene Allons allons maître !",
	"show character ene superior center with fadeIn end-fadeOut",
	"ene Encore en train de travailler sur cette chanson que vous ne finirez jamais ?<br>Passez à autre chose, vous savez bien que ça ne sert à rien !!",
	// hier -> remplacer par ce matin, si on a joué au jeu
	"ene Déjà qu'hier vous n'aviez cessé de critiquer le nouvel animé sorti la semaine dernière !!",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene «l'histoire ne respecte pas l'oeuvre originale»",
	"ene «Le choix des doubleurs n'est pas du tout ce que j'avais imaginé»",
	"show character ene oh center with fadeIn end-fadeOut",
	"ene Dites donc, vous en faites, des choses !",
	"shin ...",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene Ah aussi !!<br>C'était quoi ça : «Il fut un temps où j'ai travailé dans l'animation. »",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Maître, vous ne seriez pas en train de mentir ?<br> HAHAHAHA",
	"shin !!",
	"Elle est si énervante !! Si seulement elle pourrait se taire !",
	"ene par «Il fut un temps», vous parliez de votre <span class='rem'>vie antérieure</span>",
	"ene parce que ça doit exactement deux ans, au mois près, que vous n'aviez pas bougé de votre PC !!",
	"clear",
	"show character ene warn center with fadeIn",
	"show video shincola immersive with close",
	"ene EEEHHH !!",
	"show scene shinPC with shake",
	"show character ene warn center with shake",
	"ene La souris ! Vite, sauvez au moins la souris !",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh merde ! Allez, Shintaro, sauve au moins une vie !",
	"shin Allez, marche !!",
	"stop music 01.02 with fade 3",
	"hide character ene",
	"show background #000",
	"play music ltm8bit with fade 7",
	/*bruit de click*/
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"shin Seul le clic droit fonctionne !​ <br> et seulement trois lettres et la touche Entrée !<br> Aaah Je suis condamné !!!",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene Vous pouvez écrire Totoro !",
	"shin ...",
	"ene ??",
	"shin ... huuuh",
	"show character ene concerned center with fadeIn end-fadeOut",
	"ene ...",
	"ene Maître ? Il suffit de tout racheter...",
	"shin Tu as honte c’est ça ? Je pensais en racheter un de toute façon.",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene C’est parfait alors ! Il y a plein de très bons nouveaux modèles vous savez !",
	"Elle se vante maintenant. pff.",
	"shin Prends celui qui sera livré le plus vite",
	"show character ene usingPC with fadeIn end-fadeOut",
	"ene hmm, okay, voyons voir...",
	"ene Ah ! Euh...",
	"shin Qu'est-ce qu'il y a ?",
	"show character ene concerned with fadeIn end-fadeOut",
	"ene Nous sommes le 15 août aujourd'hui.<br>C’est le festival d’Obon...personne ne livrera avant après demain",
	"...<br>non. Je...",
	"shin Je vais vraiment mourir aujourd’hui",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene Alors...<br>Allons en acheter un !",
	"shin Pardon ?!",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Le nouveau centre commercial géant de Kashiwa est ouvert !!",
	"ene On pourra aussi acheter ces supers tubes de crème solaire pour lutter contre la canicule !",
	"La lumière du jour...Cela fait deux ans que je ne suis pas sorti...",
	"Après tout, ce ne sera que pour faire un petit achat",
	"Je suis trop jeune pour mourir...",
	"shin ... Allons y.",
	"show scene black",
	"centered Après tout, que pourrait-il m'arriver de mal si je sors seulement ce matin ?",
	"clear",
	"show background #666 with fadeIn",
	"wait 1500",
	"show image kagescan.svg centeredLeft with fadeIn",
	()=> tempDialogs("La communauté française de Kagerou Project présente...", 2000),
	()=> tempDialogs("Avec la participation des communautés anglophones et hispaniques", 2000),
	"hide image kagescan.svg centeredLeft with fadeOut",
	"show image logo.png centeredLeft with fadeIn",
	()=> tempDialogs(`Le fangame Kagerou Project <br><span style="font-size: 8px; color:#aaa;">demo ${monogatari.settings().Version}</span>`, 2000),
	()=> tempDialogs(`Programmation : ShinProg (LoganTann)`, 1000),
	()=> tempDialogs(`Histoire : Furi, ShinProg, et autres contributeurs`, 1000),
	()=> tempDialogs(`Graphismes :<br>Maxence Porelli <em style="font-size: 10px;">(Sprites)</em>,\
	<br>ShinProg <em style="font-size: 10px;"> (modèles 3D, clean des arts officiels)</em>,\
	<br>Furi <em style="font-size: 10px;">(pont du yuukei quartet)</em>`, 4000),
	"hide image logo.png centeredLeft with fadeOut slower",
	"wait 3000",
	"centered Merci d'avoir testé notre démo !",
	"stop music ltm8bit with fade 3",
	"show background #666 with fadeOut slow",
	"wait 3000",
	"end"
]
