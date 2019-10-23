
script["chapter01-start"] = [
	function(){
		shinOSinstance.run();
		shinOSinstance.addApp("Dire bonjour !", "fa-comments", function(){
			alert("HELLO !!")
		});
		shinOSinstance.addApp("vocaloid", "fa-guitar", function(){
			shinOSinstance.addWindow("vocaloid", "ça bug (?)", "fa-guitar");
		});
		shinOSinstance.addApp("jambes", "fa-folder-open", function(){
			let valeur = prompt("Mot de passe ?");
			if (valeur == "4510471"){
				shinOSinstance.addWindow("jambes", "empty... ?", "fa-folder-open");
			}
		});
		shinOSinstance.addApp("Afficher ma waifu","fa-file-image", function(){
			shinOSinstance.exit();
			monogatari.run("jump chapter01-freeze");
		});
	},
  'show scene oldBridge_night with fadeIn',
  'show character aya embarrassed center with fadeIn',
  "aya ...",
  "end"
];

script["chapter01-freeze"] = [
  'show scene oldBridge_night with fadeIn',
  'show character aya embarrassed center with fadeIn',
  "aya ça fonctionne !",
  "end"
]
