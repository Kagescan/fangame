
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

scriptEn["chapter01-street"] = [
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

scriptEn["chapter01-walk"] = [
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
		"show background street4 with fadeIn",
		"ene You’re taking much more time than what the app planned Master...", //smirk
		"ene We’re going left at the intersection after this park!",
		"shin ...",
		"Haha… Kids these Days… How can they keep running around in this heat…?!", //animate__rotateOutDownLeft, is it possible to add a blur effect to the background ?
		"ene Goodness, Master! Stop spacing out! You’ll collapse from heatstroke! <br>Wake up! The store’s this way, we’re almost there!",
		//fadeout one Ene's line
		'jump chapter01-mall-outside'
];

scriptEn["chapter01-metro"] = [
		'stop music 01.03 with fade 5',
	"shin Let’s take the subway. I don’t think my legs can walk this much.",
	"ene You took the words right out of my mouth!",
	"show scene metro1 with fadeIn duration 4s",
	'play music 01.13 loop',
	'wait 3000',
	"ene Eugh, Master, look at that guy!",
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
	"Ene did compliment me, that was a change, but now here I am wearing an autumnal red jersey, sweaty as hell..",
	"show scene metro3 with fadeIn duration 3s",
	"As I look around I see the children she laughed at before.",
	"At least I’m not the only one feeling uncomfortable here.",
	"The boy is smiling and yet he looks anxious. His gaze keeps quickly alternating between the surroundings and the girl, who is on her phone totally ignoring him.",
	'wait 2000',//desaturate the image there
	"They’re still this way when I get off the train following Ene’s directions.",
	//fadeout
	'jump chapter01-mall-outside'
];

scriptEn["chapter01-mall-outside"] = [
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

scriptEn["chapter01-mall-angryene"] = [
	"shin You wouldn't feel any of the rides!",
	'ene Tch...<br>Master is so tactless!',
	'ene Even I have places I want to go!',
	'wait 3000s',
	'...',
	'She stopped talking, looking jaded. I don’t think I ever saw her mood change that quickly before, but oh well.',
	'Why would I go to such an expensive location with loud, obnoxious music and yelling children everywhere ?',
	'She knows I wouldn’t. It’s probably just a joke to her.',
	'I would regret taking her with me to the store if it weren’t for the fear that she might set up a bomb alarm on my computer again and wake the whole house like she had done a few days ago. ',
	'She did ask to come with me quite politely, though, and I have to admit she probably prevented me from giving up and going back home.',
	'I never use my phone at home, so I didn’t know she could transfer to other devices and access all its contents just like she can with my computer. That’s actually pretty cool.',
	"end"
];

scriptEn["chapter01-mall-enethere"] = [
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
