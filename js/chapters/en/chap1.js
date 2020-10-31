
scriptEn["chapter01-start"] = [
	"show scene ShinDodo with fadeIn duration 6s",
	"play sound ding.ogg",
	"play music 02.08 with fade 3 loop",
	"wait 5000",
	"… …",
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
	"Uh… Wait a second…",
	"play sound ding.ogg",
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
	"Instead of my glorious stash, an empty folder greets me.",
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
	function(){shinOSinstance.showTextBox()},
	"show scene #171b21",
	"stop music 02.08 with fade 3 loop",
	"play music 01.13 with fade 3 loop",
	"That’s where she came from.",
	"It’s been a year now.",
	function(){
		shinOSinstance.hideTextBox();
		shinOSinstance.hide();
	},
	"show scene flashback with flash",
	// todo : hide image after 800 ms in a secure way
	"I was naive enough to click on every shady link I could find on the internet.",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	"show scene shinPC with fadeIn",
	"show image enePop.svg center",
	"wait 500",
	"What the...",
	"hide image enePop.svg",
	"show character ene old0 with fadeIn end-fadeOut",
	"wait 1000",
	"show character ene old1 with fadeIn end-fadeOut",
	"…",
	"A... girl? What sort of program is this? <br>No app other than my email seems to be running though…",
	"…",
	"show character ene old2 with fadeIn end-fadeOut",
	"Wait.",
	"What if this was one of those top secret programs ?",
	"show character ene old4 with fadeIn end-fadeOut",
	"What if this cute girl needs my help to save a mysterious world I don’t even know about yet because, <br>this is the pilot episode of an amazing shōnen series and I’m the hero and–",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene -N-nice to meet you... ",
	"She looks so...human. This is so high-tech.",
	"show character ene old4 with fadeIn end-fadeOut",
	{'Choice':{ 'Dialog': 'Maybe she has voice recognition? I should try talking to her.',
    'Ask her what she is':{
      'Text': 'Ask her what she is',
      'Do': 'jump chapter01-eneOriginsAskWhoIsShe'
    },
    'Ask her for a mission':{
      'Text': 'Ask her for a mission',
      'Do': 'shin I-I’ll do whatever you want! Um… Give me  whatever mission or quest you have! '
    },
    'Offer my help':{
      'Text': 'Offer my help',
      'Do': 'shin Do you... need any help?'
    }
  }},
	"show character ene old5 with fadeIn end-fadeOut",
	"ene Haha! What’s with that?",
	"show character ene old4 with fadeIn end-fadeOut",
	"ene I don’t need much, but...",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene From today onward, please treat me well, <span class='rem'>Master</span>...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered Looking back, I’m still not sure which part of this makes me cringe most.",
	"centered I was such an idiot then… ",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Since that day, Ene has occupied my computer daily and disturbs me non-stop. ",
	"She seems to be asleep right now, though. Or would the better term be offline?",
	"Despite knowing her for a year now, I hardly actually know anything about her.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
	"jump chapter01-shinOS"
];
scriptEn["chapter01-eneOriginsAskWhoIsShe"] = [
	"shin Hey, um...what are you?",
	"show character ene old2 with fadeIn end-fadeOut",
	"ene Hmmm…",
	"The girl stares at me for a moment.",
	"show character ene old3 with fadeIn end-fadeOut",
	"ene I don’t really know myself but...",
	"show character ene old5 with fadeIn end-fadeOut",
	"ene From today onward, please treat me well, Master...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered She was shy at the beginning, but in no time she gained confidence and started constantly pestering me about everything.",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Now she surveys most of my isolated life and constantly ruins my privacy, and yet still doesn’t want to tell me about her past.",
	"At least I now know her name,",
	"<span class='rem'>Ene</span>.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
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
	"hide image enePop.svg with fadeOut",
	"Of course, no one listens to my pleas, and especially not the source of my agony...",
	"play music 01.02 with volume 15",
	"$ _layered ene rh1 smileb lh2 with center fadeIn end-fadeOut",
	"ene There, there, master!",
	"$ _layered ene rh1 smuga lh4 with center fadeIn end-fadeOut",
	"ene Still working on that song you don’t have the guts to finish?",
	"<span class='rem'>Ene…</span>",
	"This cheeky… cyber girl? <br>That’s what she calls herself, but she’s worse than a computer virus, in my opinion.",
	"Despite that she calls me “Master”, which was NOT my idea, she has been giving me nothing but grief since she appeared in my computer a year ago.",
	"No matter what I do, I can’t seem to get rid of her, so I just have to deal with her every day like this while she torments me.",
	"$ _layered ene rh3 laugha lh4 with center fadeIn end-fadeOut",
	"ene Move on already...You know it’s useless.",
	// hier -> remplacer par ce matin, si on a joué au jeu (pas encore fait)
	"$ _layered ene rh3 smileb lh1 with center fadeIn end-fadeOut",
	"ene Yesterday, instead of working on your song, you went on those anime forums again and wouldn’t stop criticizing that new anime released last week!!!",
	"$ _layered ene - thinka - with center fadeIn end-fadeOut",
	"ene “The plot is an offense to the original story!”",
	"$ _layered ene - thinkb lh4 with center fadeIn end-fadeOut",
	"ene “The voice actors do not match at all to what I had in mind”",
	"$ _layered ene rh3 laugha - with center fadeIn end-fadeOut",
	"ene And how experienced are <span class='rem'>you</span>, huh, Master?",
	"shin ...",
	"$ _layered ene - thinkb - with center fadeIn end-fadeOut",
	"ene Ah, also... What was this : “I used to work in the animation industry.”",
	"$ _layered ene rh3 laugha - with center fadeIn end-fadeOut",
	"ene Could it be, perhaps… thAt you’re lyiNg????!<br> AHAHAHA!!! So lame!!!",
	"$ _layered ene - lh2 laughb  with center fadeIn end-fadeOut",
	"shin Gh–!!",
	"I grit my teeth and try my best to ignore her. She’s such a pain. <br>Why won’t she shut up?!",
	"$ _layered ene rh1 - smilec with center fadeIn end-fadeOut",
	"ene Maybe ‘I used to’ refers to your past life",
	"$ _layered ene rh1 smugb lh3 with center fadeIn end-fadeOut",
	"ene I guess it must...as you’ve been sitting in front of that PC for two years to the day!",
	"Aaaagh, she’s so annoying–!!!",
	"shin SHUT UP!",
	"clear",
	"$ _layered ene rh3 fright lh2 with center fadeIn end-fadeOut",
	"show video shincola immersive with close",
	"show scene shinPC with shake",
	"$ _layered ene - - - with center fadeIn end-fadeOut",
	"ene UWAAAAAAH!!! Master, the mouse! Get the mouse!",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh crap!!!",
	"I grab a wad of tissues and my mouse and desperately press them together.",
	"<span class='rem'>Come on, Shintaro, save one life at least!</span>",
	"shin Please! Work!!",
	"[...]",
	"$ _layered ene rh1 lh2 shocked with center fadeIn end-fadeOut",
	"ene Uwa, only the right click is working. Try your keyboard…?",
	"stop music 01.02 with fade 3",
	"hide character ene",
	"show background #000",
	"play sound keyboardtyping.ogg",
	"My fingers tap desperately, but…",
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"$ _layered ene lh3 laughb rh1 with center fadeIn end-fadeOut",
	"ene Only three letters, huh?",
	"shin Aah, I’m doomed...!",
	"$ _layered ene lh2 laugha rh2 with center fadeIn end-fadeOut",
	"ene Master~ At least there’s this?<br> You can type Totoro!",
	"shin ...",
	"$ _layered ene lh2 smilec rh1 with center fadeIn end-fadeOut",
	"ene ..................",
	"shin uuuuuh…",
	"$ _layered ene lh1 normala rh1 with center fadeIn end-fadeOut",
	"shin It’s over, it’s all over...",
	"$ _layered ene empty normala back with center fadeIn end-fadeOut",
	"ene ...",
	"$ _layered ene - normalb - with center fadeIn end-fadeOut",
	"ene Master?",
	"I look up from my void of despair and at Ene. Is she… sorry?",
	"$ _layered ene - guilty - with center fadeIn end-fadeOut",
	"ene You can just buy new ones, right?",
	"shin What, are you feeling guilty now?",
	"$ _layered ene lh1 smuga rh1 with center fadeIn end-fadeOut",
	"ene Hrm…",
	"shin … Whatever, I guess. I was thinking about getting new equipment anyway.",
	"$ _layered ene lh1 smileb rh2 with center fadeIn end-fadeOut",
	"ene Oh that’s awesome! The new models are great you know!",
	"shin Urgh… You cheered up quickly, haven’t you? ",
	"shin Just pick some models that can be delivered as quickly as possible",
	"$ _layered ene lh1 thinka rh4 with center fadeIn end-fadeOut",
	"ene Hmmm~ Okay, let’s see!",
	"$ _layered ene lh2 thinkb rh4 with center fadeIn end-fadeOut",
	"ene … … … … … … <br>Eh!",
	"shin What’s the matter now?",
	"$ _layered ene lh2 normala rh1 with center fadeIn end-fadeOut",
	"ene It’s impossible.",
	"shin … What do you mean, it’s impossible?",
	"$ _layered ene lh2 normalb rh1 with center fadeIn end-fadeOut",
	"play music ltm8bit with loop fade 7",
	"ene It’s August 14th today… It’s the Obon festival…<br> Nothing can be delivered within the next two days.",
	"$ _layered ene - normala - with center fadeIn end-fadeOut",
	"shin …<br>No… There has to be something, anything?!",
	"$ _layered ene lh3 laugha rh1 with center fadeIn end-fadeOut",
	"ene Nooope~!",
	"shin <span class='shake animated'>I am really going to die today.</span>",
	"$ _layered ene lh3 smilec rh3 with center fadeIn end-fadeOut",
	"ene Say, Master~ I have a great idea! Why don’t we just go out and get it?",
	"shin -... Hah? Excuse me?",
	"$ _layered ene lh3 smileb rh1 with center fadeIn end-fadeOut",
	"ene Even though it’s the holiday, the district's new giant mall structure is open today! I’m sure they have top-notch models for you!",

	// layered à finir ---------------------------------------
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene We could also buy sunscreen to fight off the heatwave! Though I wouldn’t be needing that, hehe!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilea center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"Daylight… It’s been two years since I have last been outside, so the thought of going outside just seems impossible…",
	"But being unable to use my computer for two whole days… That sounds like hell itself.",
	"It will just be for a little shopping…",
	"I am too young to die.",
	"shin Let's go.",
	"show scene black",
	"centered After all, what could go wrong if I go out just this morning?",
	"centered Today, and just today! After today, I will never go out again!",
	"clear",
	"jump chapter01-demoEnd"
];

scriptEn["chapter01-demoEnd"] = [
	"show scene icon with fadeIn",
	"wait 1500",
	"show image kagescan.svg centeredLeft with fadeIn",
	()=> tempDialogs("The French community presents...", 2000),
	()=> tempDialogs("With the help of fans from all over the world", 2000),
	"hide image kagescan.svg centeredLeft with fadeOut",
	"show image logo.png centeredLeft with fadeIn",
	()=> tempDialogs(`A Kagerou Project Fangame <br><span style="font-size: 8px; color:#aaa;">demo ${monogatari.settings().Version}</span>`, 2000),
	"hide image logo.png centeredLeft with fadeOut",
	"centered <span style='color: black;'>Thank you for playing the demo of this kagerou project fangame!</span>",
	"You should use the game save button now, unless you want to start over when the next part of the game comes out, to try out new things...",
	"Please have a look at the game credits and trivia page if you can, and join the discord server to follow the game's progression or even contribute to the next parts!",
	"If you wish, you can now have a quick look at the beginning of the next part we're currently working on. Note however that it is not finished at all and will probably be edited a lot before the full chapter comes out.",
	"stop music ltm8bit with loop fade 3",
	"jump chapter01-demolinks",
];
scriptEn["chapter01-demolinks"] = [
	{"Choice":{
		"discord":{
			"Text": "Retaining's memories discord server",
			"Do": ()=>{ window.open("https://discord.gg/QNqTVuR", "_blank"); },
		},
		"webpage" :{
			"Text": "Game webpage",
			"Do": ()=>{ window.open("https://kagescan.legtux.org/fangame/", "_blank"); },
		},
		"menu" :{
			"Text": "Back to the game menu",
			"Do": "end"
		},
		"next" :{
			"Text": "Play an extra part (English only)",
			"Do": "jump chapter01-street"
		}
	}},
	// make some dialogs seems to fix a crash
	"Please have a look at the game credits and trivia page if you can, and join the discord server to follow the game's progression or even contribute to the next parts!",
	"If you wish, you can now have a quick look at the beginning of the next part we're currently working on. Note however that it is not finished at all and will probably be edited a lot before the full chapter comes out.",
	"jump chapter01-demolinks",
];




// additional part
// Do not translate

scriptEn["chapter01-street"] = [
  "play music 01.03 with fade 3 loop",
  "show scene street with fadeIn duration 2s",
  "Somehow, it feels strange...",
	"Is it because I haven’t gone outside in so long or is the heat getting to my head?",
  "The city’s changed so much since the last time I walked these streets...",
	"shin Hey Ene, what's the way to the store?",
	"ene:smilec There are several routes available, but they all have the same ETA! <br>Why don’t you choose one yourself, Master?",
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
	"ene:smuga That’s probably good for you, seeing how you haven’t moved at a~l~l in the last two years. Can your body even handle it?",
	"shin Shut up! I’m sure even I can manage this distance...",
	"ene:smuga If that’s what you say, Master!",
	"show background street2 with fadeIn",
	"shin Ugh, it’s probably for the best… It’s so hot out, though...",
	"ene:normalb The weather report this morning said that we’re having one of the worst heat waves seen in years! <br>You should be careful of heat stroke!",
	"shin Ugh, another worry to add onto the list…",
	"ene:smilec Aaah~ I miss your computer’s fans already!",
	"shin What? Do you really feel heat, or are you just messing around…?",
	"ene:smilea I can imagine! Just by the sunlight, I can tell that it’s hot! I don’t envy you at all, Master!",
	"I groan and tug lightly at the collar of my shirt, which was already starting to get damp with sweat.",
	"Despite the intense heat, I knew I’d make a fool of myself if I were to take off the red jersey I’m wearing. <br>Where was I supposed to put it, around my waist? That’d just make me look like some sort of city tourist…!",
	"Even though it’s the first time in two years that people besides my mom and sister would be seeing me, I hadn’t given much thought about my choice of clothing for this one-time adventure of mine.",
	"Looking through my closet and seeing all those items I used to wear after school hurt like an old scar remembering its past wound.",
	"Surprisingly, Ene seemed genuine when she complimented my look. I guess she was still a bit ashamed of ruining my keyboard. ",
	"show background street3 with fadeIn",
	"Well, she’s back to normal now. And by that, I mean noisy.",
	"wait 1000",
	"ene:normalb Hey master, isn't that your sister? Momo-chan!",
	"shin Huh?! Where?!",
	"I duck behind a street pole without thinking. <br>Momo ...?!",
	"She can’t see me here, outside for the first time in two years…! <br>She’d definitely make fun of me!",
	"ene:smilec Look ! I’m pretty sure it’s her on that big screen!!",
	"shin Eh ? Oh right…",
	"Phew… This cyber girl is giving me a scare even outside...",
	"shin The news told she’s making her TV debut today.",
	"ene:smilea Oh that’s pretty cool!  Must be hard, being a teen idol.",
	"shin Yeah, she comes home late sometimes, and that dumbass got herself back in summer classes again with her grades...",
	"ene:smileb Eh~ Will she be okay, I wonder?",
	"It’s green, better cross the road. I don’t wanna melt here.",
	//if we get a crossfade effect later we can actually make the light go green
	"show background street4 with fadeIn end-fadeOut",
	"ene:smugb You’re taking much more time than what the app planned, Master… Could it be you’re slower than the average pedestrian? You know, that’s not that surprising!! Ahaha!", //smirk
	"shin Ugh, shut up… It’s too damn hot for me to walk any faster, okay..?",
	"ene:smileb Okaaay~ By the way, we’re turning left at the intersection after this park!",
	"shin ...",
	"I look over at the playground, which some kids are playing on...",
	"Haha… Kids these Days… How can they keep running around in this heat…?!", //animate__rotateOutDownLeft, is it possible to add a blur effect to the background ?
	"ene:shock Goodness, Master! Stop spacing out! You’ll collapse from heatstroke! <br>Wake up! The store’s this way, we’re almost there! Go go! Fighting!!",
	//fadeout one Ene's line
	//'jump chapter01-mall-outside'
	"show background #000",
	"clear",
	"wait 3000",
	"This is the end, <br>Thank you for playing this little extra bit!",
	"end"
];

scriptEn["chapter01-metro"] = [
		'stop music 01.03 with fade 5',
	"shin Let’s take the subway. I don’t think my legs can walk this much.",
	"ene:laugha You took the words right out of my mouth!",
	"show scene metro1 with fadeIn duration 4s",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	'play music 01.13 loop',
	'wait 3000',
	"ene:smuga Eugh, Master, look at that guy!",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"I look back at the direction that she’s pointing from the subway platform. {pause:300}By one of the turnstiles, there’s a young boy with a panicked expression on his face. {pause:200}It seems like he doesn’t know how it works, as if he has never seen one before.",
	"ene:laughb He has such a hopeless expression on his face... Kind of reminds me of you, Master!",
	"shin Oi!",
	"I bite my tongue and look at the boy, whose panic is clearing growing. Maybe he’s not from around here…?",
	'show scene metro2 with fadeIn',
	'Before I can even move, a girl around his age marches from the station platform and speaks sharply to him before tapping the turnstile with a subway card.',
	'It beeps and lets him through, and he sheepishly follows the girl down the platform...', //fade to black/fadeout I tried many ways but I cannot seem to make it work
	'show background #000',
	'stop music 01.13 with fade 3',
	'After Ene makes fun of the poor kid again, the train eventually arrives and I get on.',
	'play music 01.31 loop',
	'...',
	'wait 2000',
	"This place is so crowded...Guess I should have gone by foot in the end.",
	"The train is filled with a constant loud muttering, and a sweaty fog so thick I could pass out.",
	"Before I went out, looking through my closet, full of all the clothes I used to wear before isolating, was so painful that I just took the first things my hands reached for.",
	"show image redjersey.png with fadeIn duration 4s",
	"Ene did compliment me–that was a change–but now here I am now, wearing an autumnal red jersey and sweaty as hell.",
	"hide image jersey with fadeOut",
	"show scene metro3 with fadeIn duration 3s end-fadeOut",
	"As I look around, I see the boy  Ene had laughed at before and his companion.",
	"At least I’m not the only one feeling uncomfortable here.",
	"The boy is smiling, and yet he looks anxious. His gaze keeps quickly alternating between his surroundings and the girl, who is on her phone and totally ignoring him.",
	'wait 2000',
	"They two are still like that when I, following Ene’s directions, get off the subway car.",
	//fadeout
	//'jump chapter01-mall-outside'
	"clear",
	"show background #000",
	"wait 3000",
	"This is the end, <br>Thank you for playing this little extra bit!",
	"end"
];

scriptEn["chapter01-mall-outside"] = [
	'show scene storeoutside with fadeIn duration 3s',
	'wait 3200',
	'ene:smilec Huah~ ! We’re here! <br>It looks even bigger than in the photos!',
	'ene:smilea According to its website’s homepage, this building has the most high-tech security system of the whole prefecture! Can you imagine ?',
	'ene:smileb And there are nine floors!',
	'ene:shock Oh, and look at that! <br>On the roof!!',
	'ene:smilec That’s the amusement park!!',
	'Ah… That famous amusement park…',
	'ene:smilec I WANNA GO!!',
	'ene:laugha Master, let’s go, let’s go, lets go!',
	//shakey text effect woohoo
	'shin Gah, shut up ! No way in hell am I going to a place like that!',
	'shin What would you do if we went anyway?',
		{"Choice":{
			"angry":{
				"Text": "It’s useless since you can’t even feel any of the rides!",
				"Do": "jump chapter01-mall-angryene"
			},
			"notangry" :{
				"Text": "Would it even be fun if you can’t feel any of the rides ?",
				"Do": "jump chapter01-mall-enethere"
			}
		}}
];

scriptEn["chapter01-mall-angryene"] = [
	"shin It’s useless since you can’t even feel any of the rides!",
	'ene:guilty Tch...<br>Master is so tactless!',
	'ene:thinka Even I have places I want to go!',
	'...',
	'wait 3000',
	'Looking jaded, she stops talking. I don’t think I’ve ever seen her mood change that quickly before, but oh well.',
	'Why would I go to such an expensive location with loud, obnoxious music constantly playing and yelling children running around everywhere?',
	'She knows I wouldn’t. It’s probably just a joke to her.',
	'I would regret taking her with me to the store if it weren’t for the fear that she might set up a bomb-like alarm on my computer again and wake the whole household like she had done just a few days ago.',
	'My mom and sister got really angry with me for that, even though it wasn’t my fault…!',
	'She did ask to come with me quite politely, though, and I have to admit she probably prevented me from giving up and going back home.',
	'I never use my phone at home, so I didn’t know she could transfer to other devices and access all its contents just like she can with my computer. That’s pretty cool, at least.',
	//bg change
	'wait 3000',
	'Now the department store standing before me is indeed enormous, and, after I make my way through the sea of parking spaces that surround it, I finally reach the entrance.',
	'As I thought when Ene mentioned the building’s nine levels, this building looks just like a boss tower in some RPG video game. ',
	"Already overwhelmed, I step inside.",
	'The inside is just as striking as the outside, and it has a sharp design that mixes corridors, alleys of various goods that go in every direction, stairs that seem inaccessible...and people.',
	'Lots of people, as if they didn’t have anything better to do this holiday. <br> {pause:800} I really don’t fit in.',
	'shin Hey, Ene…',
	'shin Where’s the electronics section ?',
	'...',
	'Hmpf... She’s still upset from before…?',
	'Was what I said really that bad? <br>It is useless to go to the amusement park for her, isn’t it?',
	'...',
	'wait 2000',
  'My throat feels sore.',
	'I should get a drink before I collapse from heatstroke.',
	'I walk towards the vending machines I noticed at the other end of the line, but then, suddenly, it feels as if every customer decided to block specifically my way.',
	'I skillfully dodge a family with a trolley full of groceries, only to almost get knocked down by an anxious-looking student still in uniform and holding multiple bags of crisps.',
	'Around me are endless alleys filled with regular people in the hurry of their normal, busy lives. <br>All of it emitting noise, {pause:500} noise, {pause:500} noise.',
	'Feeling dizzy, I look at my phone and wish for Ene’s voice in my earphones, as annoying as it might be, to get me out of the rumbling mud of cacophony that I’m drowning in.',
	'She’s still apparently ignoring me. I guess she really was upset. <br>Not like I care.',
	"show character salesgirl ah with fadeIn end-fadeOut",
	'uk –Aah!',
	'shin –Aaaah!!!',
	'Before I could put my phone back into my pocket, I, not looking at my surroundings, had run into somebody.',
	"show character salesgirl talk with fadeIn end-fadeOut",
	'Keep calm, Shintaro. You just have to apologise and go get a fresh drink.',
	'uk I am very sorry, sir. May I help you?',
	'It’s a store assistant; she seems surprisingly young, and she’s quite pretty.',
  'Wait, no, that’s not what I’m supposed to be thinking about!',
	'salesgirl …?',
	'Are you alright?',
	'Drinks. Soda. New keyboard.',
	'salesgirl …',
	"show character salesgirl smileb with fadeIn end-fadeOut",
	'shin Ah- I- <br>Forgive me…',
	'shin I need to get to–Ugh, no–',
	'shin C-Could you please tell me the way to the electronics department?',
	"show character salesgirl smilea with fadeIn end-fadeOut",
	'salesgirl Oh, um, of course!',
	'salesgirl The electronics department is on the seventh floor, alley number five. <br>The elevators right there will bring you close to the alley.',
	'shin …',
	'shin Thank you.',
	'Oh, damn it.',
	"end"
];

scriptEn["chapter01-mall-enethere"] = [
	'shin Would you feel any of the rides?',
	'ene:thinkb I...<br>...',
	'ene:smuga I’d still be able to laugh at your deformed, scared face.',
	'ene:smugb Watching you be scared out of your mind is really fun, Master~',//le smirk
	'shin Gh… Stop messing around. <br>Something like an amusement park wouldn’t scare me, but I’m still not going. There’d be too many people.',
	'ene:thinka ...<br>Fine, then.',
	'Looking jaded, she stops talking. I don’t think I’ve ever seen her mood change that quickly before, but oh well.',
	'Why would I go to such an expensive location with loud, obnoxious music constantly playing and yelling children running around everywhere?',
	'She knows I wouldn’t. It’s probably just a joke to her.',
	'I would regret taking her with me to the store if it weren’t for the fear that she might set up a bomb-like alarm on my computer again and wake the whole household like she had done just a few days ago.',
	'My mom and sister got really angry with me for that, even though it wasn’t my fault…!',
	'She did ask to come with me quite politely, though, and I have to admit she probably prevented me from giving up and going back home.',
	'I never use my phone at home, so I didn’t know she could transfer to other devices and access all its contents just like she can with my computer. That’s pretty cool, at least.',
	"end"
]
