
scriptEn["chapter01-start"] = [
	"show scene ShinDodo with fadeIn duration 3s",
	"play music 02.08 with fade 3 loop",
	"wait 2500",
	"… …",
	// [Ding! sound effect] !!
	"I sweat a lot…",
	"I feel like I just had a dream… What was it about?",
	"ugh… It probably doesn’t matter anyway. I won’t move forward if I keep asking myself questions like that.",
	"...",
	"show background ShinGotoPC with fadeIn",
	"Anyway, I should get to work.",
	"That song isn’t going to compose itself.",
	"show background ShinGotoPC with fadeOut",
	"play sound pcBooted",
	"wait 1500",
	"show scene ShinOrdi with fadeIn",
	"I’ve hardly gotten any work done thanks to her–",
	// [another ding! sound effect]
	"Uh… Wait a second…",
	"Instead of a blaring alarm, the morning sun woke me up today<br>In fact, the only thing that's come out of my computer speakers has been the sound of the start-up…",
	"This can only mean that…",
	"vibrate 1000",
	"<span class='rem'>She</span>’s not around yet!",
	"show background ShinOrdiHands with fadeIn",
	"I should take advantage of this!",
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
			      <a href="#!" data-action="builtin" data-arg="mailClient">E-Mails</a><br>`
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
	"clear",
	"…?!",
	"Instead of my glorious stash, an empty folder greets me."
	"shin HOW???",
	"I found myself shouting without realizing. She deleted all my private files!?",
	"...<br>AAhhh -- What is this curse...<br> I hope the same thing didn't happen to my composition files...",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];
scriptEn["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>Today, August 14th, the temperature will rise up to 30°C. Today is the second day of the Obon festival.",
	"Try to limit your outdoor activity and stay hydrated on this national holiday.",
	"#2: <br>The number one trending idol will soon debut as an actress! She will be acting in a drama coming out right after the release of her next album!",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br>A bear has been taught how to dance!",
	"shin So nothing interesting today, as usual…",
	"jump chapter01-shinOS",
];
scriptEn["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"“This website is currently undergoing maintenance.” Huh.",
	"shin The moderator is updating the forum again… <span class='rem'>I’ll have to come back later</span>, I guess.",
	"shin <i>Or... Did I get banned?</i>",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
scriptEn["chapter01-eneOrigins"] = [
  function(){shinOSinstance.hide()},
	"Ah oui... Ce mail. Je m'en souviens comme si c'était hier !!",
	"ene tst",
	"test",
	"jump chapter01-shinOS"
];
scriptEn["chapter01-MAO"] = [
  function(){shinOSinstance.exit()},
	"show scene shinPC with fadeIn",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"play sound pcError",
	"show image VocaloidStoppedWorking.svg center with flash",
	"wait 4000",
	"shin Oh no. Oh no, no, no! Not again! Please!",
	"I don’t even dare click my mouse–I can’t do anything but beg at my computer screen!",
	"shin I don’t need to sleep, eat or drink to survive, but if  my computer goes down, I go with it!",
	"shin I’m gonna die, I’m gonna–!",
	()=>{ document.getElementById("background").style.backgroundColor = "blue"; },
	"hide image VocaloidStoppedWorking.svg with zoomOut",
	"shin Aaah!!",
	"I quickly check over everything.",
	"shin Thank goodness nothing got deleted.",
	/*avec une tête comme celle du manga !*/
	"shin This song is fated to go up in the niconico hall of fame, after all. I cannot allow myself to lose this future bop.",
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"shin Uh-oh…",
	"Please! This moment of quiet was so great ! Please, not <span class='rem'>her</span>…!",
	"Of course, no one listens to my please, and especially not the source of my agony...",
	"play music 01.02 with volume 15",
	"show character ene cool center with fadeIn end-fadeOut",
	"hide image enePop.svg with fadeOut",
	"ene There, there, master!",
	"show character ene superior center with fadeIn end-fadeOut",
	"ene Still working on that song you don’t have the guts to finish?",
	"<span class='rem'>Ene…</span>",
	"This cheeky… cyber girl? That’s what she calls herself, but she’s worse than a computer virus, in my opinion.",
	"Despite that she calls me “Master”, which was NOT my idea, she has been giving me nothing but grief since she appeared in my computer a year ago.",
	"No matter what I do, I can’t seem to get rid of her, so I just have to deal with her every day like this while she torments me.",
	"ene Move on already...You know it’s useless.",
	// hier -> remplacer par ce matin, si on a joué au jeu (pas encore fait)
	"ene Yesterday, instead of working on your song, you went on those anime forums again and wouldn’t stop criticizing that new anime released last week !!!",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene “The plot is an offense to the original story!”",
	"ene “The voice actors do not match at all to what I had in mind”",
	"show character ene oh center with fadeIn end-fadeOut",
	"ene And how experienced are <span class='rem'>you</span>, huh, Master?",
	"shin ...",
	"show character ene quote center with fadeIn end-fadeOut",
	"ene Ah, also... What was this : “I used to work in the animation industry.”",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Could it be, perhaps… thAt you’re lyiNg????!<br> AHAHAHA!!! So lame!!!",
	"shin Gh–!!",
	"I grit my teeth and try my best to ignore her. She’s such a pain. Why won’t she shut up?!",
	"ene Maybe ‘I used to’ refers to your past life",
	"ene I guess it must...as you’ve been sitting in front of that PC for two years to the day!",
	"Aaaagh, she’s so annoying–!!!",
	"shin SHUT UP!",
	"clear",
	"show character ene warn center with fadeIn",
	"show video shincola immersive with close",
	"ene EEEEEEEK!!!!",
	"show scene shinPC with shake",
	"show character ene warn center with shake",
	"ene UWAAAAAAH!!! Master, the mouse! Get the mouse!",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh crap!!!",
	"I grab a wad of tissues and my mouse and desperately press them together.",
	"<span class='rem'>Come on, Shintaro, save one life at least!</span>"
	"shin Please! Work!!",
	"[...]",
	"ene Uwa, only the right click is working. Try your keyboard…?",
	"stop music 01.02 with fade 3",
	"hide character ene",
	"show background #000",
	"play music 8bit with fade 7",
	"My fingers tap desperately, but…",
	/*bruit de click*/
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"shin Only three letters, huh? Aah, I’m doomed...!",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene Master~ At least there’s this?<br> You can type Totoro!",
	"shin ...",
	"ene ..................",
	"shin uuuuuh…",
	"shin It’s over, it’s all over...",
	"show character ene concerned center with fadeIn end-fadeOut",
	"ene ...",
	"ene Master?",
	"I look up from my void of despair and at Ene. Is she… sorry?",
	"ene You can just buy new ones, right?",
	"shin What, are you feeling guilty now?",
	"ene Hrm…",
	"shin … Whatever, I guess. I was thinking about getting new equipment anyway.",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Oh that’s awesome! The new models are great you know!",
	"shin Urgh… You cheered up quickly, haven’t you? ",
	"shin Just pick some models that can be delivered as quickly as possible",
	"show character ene usingPC with fadeIn end-fadeOut",
	"ene Hmmm~ Okay, let’s see!",
	"ene … … … … … … <br>Eh!",
	"shin What’s the matter now?",
	"ene It’s impossible.",
	"shin … What do you mean, it’s impossible?",
	"show character ene concerned with fadeIn end-fadeOut",
	"ene It’s August 14th today… It’s the Obon festival…<br> Nothing can be delivered within the next two days.",
	"shin …<br>No… There has to be something, anything?!",
	"ene Nooope~!",
	"shin <span class='shake animated'>I am really going to die today</span>.",
	"show character ene yay center with fadeIn end-fadeOut",
	"ene Say, Master~ I have a great idea! Why don’t we just go out and get it?",
	"shin -... Hah? Excuse me?",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Even though it’s the holiday, the new giant mall structure in Kashiwa is open today! I’m sure they have top-notch models for you!",
	"ene We could also buy sunscreen to fight off the heatwave! Though I wouldn’t be needing that, hehe!",
	"Daylight… It’s been two years since I have last been outside, so the thought of going outside just seems impossible…",
	"But being unable to use my computer for two whole days… That sounds like hell itself.",
	"It will just be for a little shopping…",
	"I am too young to die.",
	"shin Let's go.",
	"show scene black",
	"centered After all, what could go wrong if I go out just this morning?",
	"centered Today, and just today! After today, I will never go out again!",
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
