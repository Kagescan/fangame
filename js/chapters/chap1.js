
script["chapter01-start"] = [
	function(){
		shinOSinstance.run();
		shinOSinstance.addApp("Dire bonjour !", "fa-comments", function(){
			alert("COUCOU")
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
