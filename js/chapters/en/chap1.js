
scriptEn["chapter01-start"] = [
	"centered WARNING : the english translation is not finished",
	"show scene ShinDodo with fadeIn duration 3s",
	"play music 02.08 with fade 3 loop",
	"wait 2500",
	"... ...",
	"Hmmm ?<br> I sweat a lot… What kind of dream did I have last night?",
	"ugh..Probably the same as always. I won’t move forward if I keep asking myself questions like that.",
	"...",
	"show background ShinGotoPC with fadeIn",
	"Anyway, I should get on with that song I’m composing! ",
	"Let’s get back to work... I’ll never finish at the hands of Her!",
	"show background ShinGotoPC with fadeOut",
	"play sound pcBooted",
	"wait 1500",
	"show scene ShinOrdi with fadeIn",
	"Uh..Wait…",
	"I’ve been woken up by the morning sunlight...<br>The only thing that's come out of my computer speakers has been the sound of the start-up…",
	"This can only mean that…",
	"vibrate 1000",
	"<span class='rem'>She</span>’s not around yet!",
	"show background ShinOrdiHands with fadeIn",
	"I should take that opportunity!",
	"jump chapter01-shinOS"
];
scriptEn["chapter01-shinOS"] = [
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
			      <a href="#!" data-action="monogatari" data-arg="jump chapter01-mails">E-Mails</a><br>`
					);
				})
			});
			shinOSinstance.addApp("vocaloid", "fa-guitar", function(){
				monogatari.run("jump chapter01-MAO");
			});
			shinOSinstance.addApp("Legs", "fa-folder-open", function(){
				monogatari.run({'Input': {
			      'Text': 'Shintaro\'s Password?<br><em style="font-size: 12px;">(enter blank to exit)</em>',
			      'Validation': (input) => (input == "4510471" || input.trim().length<=0),
			      'Save': (input)=>{ monogatari.run((input=="4510471") ? "jump chapter01-legs" : "jump chapter01-shinOS"); },
			      'Warning': 'Incorrect Password'
			    }});
			});
		}
	},
	"<span class='hide>The PC is on.</span>",
	"jump chapter01-shinOS"
];
scriptEn["chapter01-legs"] = [
	/*show scene emptyLegs",*/
  function(){shinOSinstance.hide()},
	"WHAT",
	"shin HOW???",
	"She deleted all my private files!?",
	"...<br>AAhhh -- What is this curse...<br> I hope the same thing didn't happen to my composition files...",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];
scriptEn["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>Today, August 15th, the temperature will rise up to 30°C for the Obon festival.",
	"Try to limit your outdoor activity and stay hydrated on this national holiday.",
	"#2: <br>The number one trending idol will soon debut as an actress! She will be acting in a drama coming out right after the release of her next album!",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br>A bear has been taught to dance!",
	"shin Nothing interesting today…",
	"jump chapter01-shinOS",
];
scriptEn["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"“This website is currently undergoing maintenance.”",
	"shin The moderator is updating the forum again… I’ll have to come back later!",
	"shin <i>Or... Did I get banned?</i>",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
scriptEn["chapter01-MAO"] = [
  function(){shinOSinstance.exit()},
	"show scene shinPC with fadeIn",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"play sound pcError",
	"show image VocaloidStoppedWorking.svg center with flash",
	"wait 4000",
	"shin Oh no. Oh no no no not again! Please!",
	"shin I don’t need to sleep, eat or drink to survive, but if the computer lets me down, it’s the end. I’m gonna die I’m gonna-",
	()=>{ document.getElementById("background").style.backgroundColor = "blue"; },
	"hide image VocaloidStoppedWorking.svg with zoomOut",
	"shin AAAh thank god it didn’t delete the work!",
	/*avec une tête comme celle du manga !*/
	"shin This song is fated to go up in the niconico hall of fame. I cannot allow myself to lose this future bop.",
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"shin Uh-oh…",
	"Please! Not her...",
	"play music 01.02 with volume 15",
	"show character ene cool center with fadeIn end-fadeOut",
	"hide image enePop.svg with fadeOut",
	"ene There, there, master!",
	"show character ene superior center with fadeIn end-fadeOut",
	"ene Still working on that song you don’t have the guts to finish? Move on...you know it’s useless.",
	// hier -> remplacer par ce matin, si on a joué au jeu
	"ene Yesterday again you wouldn’t stop criticizing that new anime released last week !!!",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene “The plot is an offense to the original story!”",
	"ene “The voice actors do not match at all what I had in mind”",
	"show character ene oh center with fadeIn end-fadeOut",
	"ene And how experienced are you!",
	"shin ...",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene Ah, also... What was this : “I used to work in the animation industry.”",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene cOuld iT be thAt you’re lyiNg???<br> HAHAHAHA",
	"shin !!",
	"She’s such a pain. Why won’t she shut up!",
	"ene Maybe ‘I used to’ refers to your past life",
	"ene I guess it must...as you’ve been sitting in front of that PC for two years to the day!",
	"clear",
	"show character ene warn center with fadeIn",
	"show video shincola immersive with close",
	"ene EEEEEEEk !!",
	"show scene shinPC with shake",
	"show character ene warn center with shake",
	"ene The mouse! Get the mouse!",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh crap! Come on Shintaro save one life at least!",
	"shin Please! Work!!",
	"stop music 01.02 with fade 3",
	"hide character ene",
	"show background #000",
	"play music 8bit with fade 7",
	/*bruit de click*/
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"shin Only the right click is working!​ <br> And three letters and enter! <br> AAAAh I’m doomed!",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene You can type Totoro!",
	"shin ...",
	"ene ??",
	"shin uuuuuh…",
	"show character ene concerned center with fadeIn end-fadeOut",
	"ene ...",
	"ene Master? You can just buy it all again…",
	"shin Feeling guilty now? I was thinking about getting new equipment anyhow.",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Oh that’s awesome! The new models are great you know",
	"Urgh...such a braggart.",
	"shin Just pick one that can be delivered as quickly as possible",
	"show character ene usingPC with fadeIn end-fadeOut",
	"ene hmmm okay let’s see.",
	"ene Eh! ...",
	"shin What’s the matter now?",
	"show character ene concerned with fadeIn end-fadeOut",
	"ene It’s August 15th today...the Obon festival…<br> Nothing can be delivered within the two next days...",
	"...<br>No. I...",
	"shin <span class='shake animated'>I am really going to die today</span>.",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene Then... <br> Let’s just go out and get it!",
	"shin Excuse me!?",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene The new giant supermarket in Kashiwa is open today!",
	"ene We could also buy one of these exceptional sunscreens to fight off the heatwave!",
	"Daylight… It’s been two years since I have last been outside…",
	"It will just be for a little shopping..",
	"I am too young to die.",
	"shin ... Let's go.",
	"show scene black",
	"centered After all, what could go wrong if I go out just this morning?",
	"clear",
	"show scene icon with fadeIn",
	"wait 1500",
	"show image kagescan.svg centeredLeft with fadeIn",
	()=> tempDialogs("The french community presents you...", 2000),
	()=> tempDialogs("With the help of fans from all over the world", 2000),
	"hide image kagescan.svg centeredLeft with fadeOut",
	"show image logo.png centeredLeft with fadeIn",
	()=> tempDialogs(`The Kagerou Project Fangame <br><span style="font-size: 8px; color:#aaa;">demo ${monogatari.settings().Version}</span>`, 2000),
	()=> tempDialogs(`Programming : ShinProg (LoganTann)`, 1000),
	()=> tempDialogs(`Story : Furi, Yoomster, ShinProg, + contributors`, 1000),
	()=> tempDialogs(`Graphics :<br>Maxence Porelli <em style="font-size: 10px;">(Sprites)</em>\
	<br>Furi <em style="font-size: 10px;">(Backgrounds)</em>\
	<br>SandoSan <em style="font-size: 10px;"> (Pixel art : game logo)</em>\
	<br>ShinProg <em style="font-size: 10px;"> (Drafting, cleaning, 3D)</em>`, 4000),
	"hide image logo.png centeredLeft with fadeOut slower",
	"wait 3000",
	"centered <span style='color: black;'>Thanks for trying our demo !</span>",
	"stop music ltm8bit with fade 3",
	"show background #666 with fadeOut slow",
	"wait 3000",
	"end"
]
