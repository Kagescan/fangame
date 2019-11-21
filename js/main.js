
// Define the music used in the game.
monogatari.assets ('music', {
	'01.02': "01.02.OsanpoBiyori.mp3",
	'01.03': '01.03.NEETstandingUnderTheBlazingSun.ogg',
	'01.13': '01.13.ThatDayIWasInTheCity.ogg',
	'01.22': '01.22.inAdaze.ogg',
	'01.26': '01.26.OccasionallyRememberingTheOldDays.ogg',
	'01.32': '01.32.BlurringSunset.ogg',
	'02.08': '02.08.PaintedSentaiRakugakiRanger.mp3',
	'ltm8bit': 'ltm8bit.mp3'
});

// Define the sounds used in the game.
monogatari.assets ('sounds', {
	pcBooted: 'startup.ogg',
	pcError: 'error.ogg'
});

// Define the videos used in the game.
monogatari.assets ('videos', {
	shincola: "shincola.mp4"
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
	'shinPC': 'PC.png',
	'classroomCorridor': 'classroomCorridor.jpg',
	'classroomDesk': 'classroomDesk.jpg',
	'classroomDoorClosed': 'classroomDoorClosed.jpg',
	'classroomDoorOpened': 'classroomDoorOpened.jpg',
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
    directory: 'ayano',
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
		color: '#aaaaff',
		directory: 'ene',
    sprites:{ // Images Identifier for the "Show" statement.
      cool: "cool.png",
      concerned: "concerned.png",
      oh: "oh.png",
      superior: "superior.png",
      usingPC: "usingPC.png",
      warn: "warn.png",
      yay: "yay.png",
			quote: "quote.png"
    }
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

scriptFr["Start"] = ["jump chapter00-start"];
scriptEn["Start"] = ["jump chapter01-start"];

monogatari.script ({
	'English': scriptEn,
	'Français': scriptFr
});

const { $_ready, $_ } = Monogatari;
$_ready (() => {
	monogatari.init('#monogatari');
});

/* Custom Commands */
var tempDialogs = (text, toWait=1000, animIn="fadeIn", animOut="fadeOut") =>
  new Promise ((resolve) => {
			const e = document.createElement ('centered-dialog');
			monogatari.element().find('[data-screen="game"]').append(e);
			monogatari.element().find('[data-component="text-box"]').hide();
			e.ready (() => {
				e.style.left = "75%";
				e.content ('wrapper').html (text);
				e.classList.add(animIn);
				setTimeout (function (){
					e.classList.remove(animIn);
					e.classList.add(animOut);
					setTimeout(function(){
						e.remove();
						resolve();
					}, 1000);
				}, toWait);
			});
		});
