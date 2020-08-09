
// Define the music used in the game.
monogatari.assets ('music', {
	'01.02': "01.02.OsanpoBiyori.mp3",
	'01.03': '01.03.NEETstandingUnderTheBlazingSun.ogg',
	'01.13': '01.13.ThatDayIWasInTheCity.ogg',
	'01.22': '01.22.inAdaze.ogg',
	'01.26': '01.26.OccasionallyRememberingTheOldDays.ogg',
	'01.31': '01.31.koyasudo.mp3',
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
	"allTriangles" : "allTriangles.svg",
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
	'classroomWindow': 'classroomWindow.jpg',
	'street': 'street1.png',
	'street2': 'street2.png',
	'street3': 'street3.png',
	'street4': 'street4.png',
	'metro1': 'metro1.png',
	'metro2': 'metro2.png',
	'metro3': 'metro3.png',
	'storeoutside': 'storeoutside.png',
	'flashback': 'flashback-min.svg',
	'icon': 'icon.svg'
});


// Define the Characters
monogatari.characters ({
	'shin' : {
		name: 'Shintaro Kisaragi',
		color: '#ff0000',
		directory: 'shintaro',
		expressions: {
			normal: "F-normal.png",
			angry1: "F-angry1.png",
			angry2: "F-angry2.png",
			angry3: "F-angry3.png",
			blueSight: "F-blueSight.png",
			blush: "F-blush.png",
			dodge: "F-dodge.png",
			facepalm: "F-facepalm.png",
			oh: "F-oh.png",
			scare1: "F-scare1.png",
			scare2: "F-scare2.png",
			scare3: "F-scare3.png",
			scare4: "F-scare4.png",
			scare5: "F-scare5.png"
		}
	},
	'aya' : {
		name: 'Ayano Tateyama',
		color: '#ffaaaa',
    directory: 'ayano',
    sprites:{ // Images Identifier for the "Show" statement.
			normal: "cool.png",
			embarrassed: "embarrassed.png",
			excited: "clapclap.png",
			please: "please.png",
			question: "what.png",
			shadow: "shadow.png",
			shy: "shy.png",
			smile: "smile.png"
    },
    expressions: { // Side images identifiers to show on dialogs when the character speaks with a colon and side image name, like e:Smiling
			clapclap: "F-clapclap.png",
			gomen: "F-gomen.png",
      heh: "F-heh.png",
      hehe: "F-hehe.png",
      huh: "F-huh.png",
      huuh: "F-huuh.png",
      oh: "F-oh.png",
      ohFuckkk: "F-ohFuckkk.png"
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
      neutral: "neutral.png",
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
scriptEn["Start"] = ["jump chapter00-start"];

monogatari.script ({
	'English': scriptEn,
	'Français': scriptFr
});

const { $_ready, $_ } = Monogatari;
$_ready( function() {
	// var Init
	const gp = document.getElementById("gamePlugins");
	// Local functions
	const init = function(){
		gp.innerHTML = ""
		gp.className = "hide"
		monogatari.init("#monogatari");
	}
	const langageSelected = function(lg) {
		document.getElementById("firstRunLgSelect").className = "hide";
		document.getElementById("firstRunLgMsg").className = lg.substr(0,2).toLowerCase();
		if (lg=="Español") {
			lg="English";
		}
		monogatari.preference("Language", lg);
		monogatari.localize();
	}

	// stuff
	monogatari.Storage.contains ('Settings')
	.then (init)   // if contains
	.catch(() => { // else
		document.getElementById("gamePlugins").classList.remove("hide");
		// buttons event
		for (const button of document.querySelectorAll("#firstRunLgSelect>button")) {
			button.addEventListener("click", (e)=>{
				langageSelected(e.target.innerText)
			} );
		}
		document.querySelector("#backBtn").addEventListener("click", ()=>{
			document.getElementById("firstRunLgSelect").classList.remove("hide");
			document.getElementById("firstRunLgMsg").className = "hide";
		});
		document.querySelector("#startBtn").addEventListener("click", init);
	});
});

/* Custom Commands */
var tempDialogs = (text, toWait=1000, animIn="fadeIn", animOut="fadeOut") =>
  new Promise ((resolve) => {
			const e = document.createElement ('centered-dialog');
			monogatari.element().find('[data-screen="game"]').append(e);
			monogatari.element().find('[data-component="text-box"]').hide();
			e.ready (() => {
				e.style.left = "75%";
				e.style.color = "black";
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
var jump = (to) => monogatari.run(`jump ${to}`);
var doTrueReset = () => localStorage.clear();
var doRestart = () => window.location.reload();
