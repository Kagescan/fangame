/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

/*/ Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});*/

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {
	'01.02': "01.02.OsanpoBiyori.mp3",
	'01.22': '01.22inAdaze.ogg',
	'02.08': '02.08.PaintedSentaiRakugakiRanger.mp3'
});

// Define the voice files used in the game.
monogatari.assets ('voice', {

});

// Define the sounds used in the game.
monogatari.assets ('sound', {
	'pcBooted': 'startup.ogg',
	'pcError': 'error.ogg'
});

// Define the videos used in the game.
monogatari.assets ('video', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'oldBridge_night': "ltmNight.jpg",
	'ShinDodo': 'ShinDodo.jpg',
	'ShinGotoPC': 'ShinGotoPC.jpg',
	'ShinOrdi': 'ShinOrdi.jpg',
	'ShinOrdiEyes': 'ShinOrdiEyes.jpg',
	'ShinOrdiHands': 'ShinOrdiHands.jpg',
	'shinPC': 'PC.png'
});


// Define the Characters
monogatari.characters ({
	'shin' : {
		name: 'Shintaro Kisaragi',
		color: '#ff0000'
	},
	'aya' : {
		name: 'Ayano Tateyama',
		color: '#ffaaaa',
    directory: 'Ayano',
    sprites:{ // Images Identifier for the "Show" statement.
      normal: "cool.png",
      excited: "clapclap.png",
      embarrassed: "embarrassed.png",
      question: "what.png",
      smile: "smile.png",
      please: "please.png",
      shadow: "shadow.png",
      shy: "shy.png"
    },
    expressions: { // Side images identifiers to show on dialogs when the character speaks with a colon and side image name, like e:Smiling
      Smiling: "shadow.png"
    }
	},
	'ene' : {
		name: 'Ene',
		color: '#aaaaff'
	},
  'bruit' : {
    name: 'bruit',
    color: '#aaaaaa'
  },
  'uk' : {
    name: '???',
    color: '#aaaaaa'
  }
});

script["Start"] = ["jump chapter01-start"];

monogatari.script (script);
