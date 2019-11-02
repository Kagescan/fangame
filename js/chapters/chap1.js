script["chapter01-start"] = [
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
	"Je n'ai été réveillé que par la lumière du jour...<br>Mon PC a démarré rapidement... et le seul son sorti des hauts parleurs a été celui du démarrage !",
	"Ce qui veut dire...",
	"vibrate 1000",
	"Qu'<span class='rem'>Ene</span> n'est pas là pour le moment !!",
	"show background ShinOrdiHands with fadeIn",
	"Je devrais en profiter !",
	"jump chapter01-shinOS"
];
script["chapter01-shinOS"] = [
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
						<a href="#!" data-action="monogatari" data-arg="jump chapter01-weebGame">Forum Critiques-Anime</a>
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-news">Informations</a>
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-mails">Mails</a>`
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
script["chapter01-legs"] = [
	/*show scene emptyLegs",*/
  function(){shinOSinstance.hide()},
	"WHAT",
	"shin KESKE ?!",
	"Elle a supprimé tous mes fichiers privés ?!",
	"...<br>AAhhh -- Je suis maudit...<br> J'espère au moins que les fichiers de ma musique n'ont pas subi le même sort !",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];
script["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>Aujourd’hui le 15 aôut pour le festival d’obon, les températures grimperont jusqu’à 35°",
	"#2: <br>L’idole si populaire en ce moment commence sa carrière d’actrice ! Elle jouera dans un drama dont la sortie est prévue peu après celle de son album",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br>Un ours apprend à danser !",
	"shin Rien d'intéressant en ce moment...",
	"jump chapter01-shinOS",
];
script["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"\"Le site est actuellement fermé. Il réouvra une fois la programmation du nouveau forum finie.\"",
	"shin Ah, le créateur de ce site fais encore une mise à jour... Il faudra que je repasse un autre jour !",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
script["chapter01-MAO"] = [
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
	"jump chapter01-MAO-doSave"
];
script["chapter01-MAO-doSave"] = [
	/*Afficher ShinOS. Il y a un bouton play, on peut écouter la musique de shintaro. Aussi un bouton sauvegarder...*/
	function(){ //si le game engine possède sa propre fonction confirm, alors on l'utilise, sinon on prend celle du navigateur
		if (confirm("sauvegarder ?"))
			monogatari.run("jump chapter01-MAO-continue");
	},
	"Bon, je ne dois pas oublier de sauvegarder mon travail !!",
	"jump chapter01-MAO-doSave"
];

script["chapter01-MAO-continue"] = [
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"wait 2000",
	"shin huh oh",
	"par pité... Pas elle !!",
	"play music 01.02 with fade 3 loop",
	"ene Allons allons maître !",
	"hide image enePop.svg with fadeOUt",
	"ene Encore en train de travailler sur cette chanson que vous ne finirez jamais ?<br>Passez à autre chose, vous savez bien que ça ne sert à rien !!",
	//"show scene MAO-clickClose",
	/* avec une tête comme celle du manga , temblement d'écran*/
	"vibrate 1000",
	"shin EH !! Non, arrête tes conneries !",
	/*Cinématique de l'animé AHHHHHHHHHHHHHHHHHHHHHHHH*/
	//"show scene MAO-keyboard",
	"play sound pcError",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh merde ! non non non non non Ne me laisse pas tomber comme ça !",
	"ene La souris ! sauvez la souris !",
	"stop music 01.02 with fade 3",
	/*bruit de click*/
	"show background black",
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"shin Seul le clic droit fonctionne !​ <br> et seulement trois lettres et la touche Entrée !<br> Aaah Je suis condamné !!!",
	"ene Vous pouvez écrire Totoro !",
	/*tête de la dépression*/
	"ene ... ?",
	"shin ... huuuh",
	"ene ...",
	"ene Maître ? Il suffit de tout racheter...",
	"shin Tu as honte c’est ça ? Je pensais en racheter un de toute façon.",
	"ene C’est parfait alors ! Il y a plein de très bons nouveaux modèles vous savez !",
	"Elle se vante maintenant. pff.",
	"shin Prends celui qui sera livré le plus vite",
	"ene C’est le festival d’Obon...personne ne livrera avant après demain",
	"...<br>non. Je...",
	"shin Je vais vraiment mourir aujourd’hui",
	"ene Alors...<br>Allons en acheter un !",
	"shin Pardon ?!",
	"ene Le nouveau centre commercial géant de Kashiwa est ouvert !!",
	"ene On pourra aussi acheter ces supers tubes de crème solaire pour lutter contre la canicule !",
	"La lumière du jour...Cela fait deux ans que je ne suis pas sorti...",
	"je suis trop jeune pour mourir...",
	"shin ... Allons y.",
	"show scene black",
	"centered Après tout, que pourrait-il m'arriver de mal si je sors seulement ce matin ?",
	"end"
]
