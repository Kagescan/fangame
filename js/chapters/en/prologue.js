
// script
scriptEn["chapter00-start"] = [
	"centered <span class='big'>Prologue</span><br><em>The Old Days</em>",
  "show scene classroomCorridor with fadeIn duration 3s",
	"play music 02.23 with loop fade 3",
  "shin:normal <em>I guess it’s normal that nobody’s here at such a late hour...<br> But damn, how come the school is so scary at night?</em>",
  "shin:normal <em>I’ve gone through these hallways so many times already… But at nighttime, they seem really different and eerie...</em>",
  "shin:scare1 <em>I hope I won’t run into anything creepy...</em>",
  "shin:angry1 <em>Aaah, come on! I can’t believe that I’m even here to begin with!</em>",
  "shin:angry2 <em>Forgetting my wallet in class on the first day after midterms, really?</em>",
	"play sound pipes.ogg",
  "shin:angry2 <em>I really am hopeless..</em>",
  "shin:scare5 AAaah  ??!!!",
  "shin:scare4 ...<br>...<br>...",
  "shin:scare4 Ah...-Ah...<br>What was that ? The pipes  maybe...?",
  "shin:blueSight Ugh… Even if it’s just that, it’s nothing to be scared about…",
  "shin:blueSight I need to stop freaking myself out like this…! ",
  "show background classroomDoorClosed with fadeIn",
  "shin:dodge <em>I should just try to distract myself with something else… Aaagh,  why did I decide to go to school at nighttime? I don’t even like school!",
  "shin:angry3 <em>Speaking of school, though...</em>",
  "shin:angry3 <em>My classmates… I don’t really care much for them, to be honest.</em>",
  "shin:normal <em>They’re all super predictable, only caring about their looks and popularity and not so much their grades… </em>",
  "shin:normal <em>Not that I really care about my own, but, in my opinion, you really have to try to be bad to get such low scores on your preliminary exams.</em>",
  "shin:dodge <em>Also, they’re damn noisy, even during lessons… I guess some people would think that would spice things up, but I just find it annoying.</em>",
  "shin:facepalm <em>And they really think they’ll get to high school? And they’re looking forward to it?<br> I just can’t understand them.</em>",
  "shin:dodge <em>How am I expected to work among such idiots?<br>It’d probably be better if I just stayed at home and studied there.</em>",
  "play sound chair.ogg",
  "shin:scare4 Eek !?",
  "shin:scare4 <em>That startled noise came out of my mouth before I could even stop myself. </em>",
  "shin:scare1 <em>I had stepped right outside my classroom, and I swear I just heard something coming from inside…!</em>",
  "shin:scare1 <em>I-Is there somebody here?! At this time?!</em>",
  "shin:scare2 <em>Wait, wait, wait…<br>That makes no sense... </em>",
  "shin:scare2 <em>But I’m sure I heard something…!</em>",
  "shin:scare4 <em>Even if there was, the lights are off…</em>",
  "shin:scare3 <em>Don’t tell me that’s a ghost or something like that…</em>",
  "shin:scare3 <em>I’m considering just turning tail and leaving right there, but before I can make a decision the door, suddenly–!</em>",
  "play sound door.ogg",
  "show background classroomDoorOpened",
  "show character aya shadow with rubberBand end-fadeOut",
  "show character aya please with fadeIn end-fadeOut",
  "-AAAAaah!!<br>-EEEEeeeeek!!",
  "stop music 02.23 with loop fade 3",
  "shin:scare5 FOrgiVe mE, fOrGive mE !!!<br>Please, have mercy!!",
  "show character aya question with fadeIn end-fadeOut",
  "shin:scare4 <em>I found myself pleading without even thinking, my eyes shut tight in fear… But a few seconds later, I realized that I wasn’t killed already by a school ghost… </em>",
  "shin:scare4 <em>Suddenly, I heard a familiar voice.</em>",
  "uk Eh?",
  "uk Shintaro... -kun?",
  "play music 01.03 with loop fade 1",
  "shin:scare4 <em>... (?)</em>",
  "shin:oh <em>A girl wearing the school uniform stands in front of me in the darkness… <br>I think I’ve seen that face somewhere…</em>",
  "show character aya excited with fadeIn end-fadeOut",
  "uk Ah, that’s right!! You’re Shintaro Kisaragi!",
  "shin:normal <em>Wait, who is this? How does she know my name?</em>",
  "uk Hey, don’t you recognise me??<br> I’m Ayano Tateyama, your classmate!",
  "show character aya embarrassed with fadeIn end-fadeOut",
  "uk I mean, I don’t think we’ve ever talked, but…",
  "shin:normal A-ya-no Ta-te-ya-ma?<br>... ...",
  { Choice: {
			Dialog: 'shin:oh AH!!...',
	    c1: {
	      Text: 'You’re that girl who got the worst grade at the mock exams...!',
	      Do: 'jump chapter00-ayaWorst'
	    },
	    c2: {
	      Text: 'You’re that girl who sits next to me!',
	      Do: 'jump chapter00-ayaNbr'
	    },
	    c3: {
	      Text: 'Who?',
	      Do: 'jump chapter00-ayaGhost'
	    }
  }}
];

// choice
  scriptEn["chapter00-ayaWorst"] = [
    'show character aya shy with fadeIn end-fadeOut',
    // aya =  Ayano
    "aya Ah, um.. ",
    "aya Is that all you remember?",
    "shin:normal Am I wrong ?",
    'show character aya embarrassed fadeIn end-fadeOut',
    "aya No you're not but... <br>Ah ah ...",
    "jump chapter00-ayaContinue"
  ];
  scriptEn["chapter00-ayaNbr"] = [
    "show character aya excited with fadeIn end-fadeOut",
    "aya Ah, so you do remember! I was afraid I’d be a stranger to you..",
    "shin:blush <em>She’s clapping to congratulate me??? Awkward-</em>",
    "show character aya smile with fadeIn end-fadeOut",
    "aya Ah, today I tried to ask you something in class but you didn’t answer…<br>You had your hand on your face and looked like you were lost in thought?",
    "shin:oh <em>Hm? What is she talking about?</em>",
    "shin:normal Ah… Sorry. Most likely I was sleeping… I don’t pay attention much in class anyway.",
		"aya Oh, I thought maybe that was the case… Don’t worry about it!",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
  scriptEn["chapter00-ayaGhost"] = [
    "show character aya shy with fadeIn end-fadeOut",
    "aya R-really ? I’m your classmate! In fact, I sit right next to you!!",
    "aya Am I that invisible?",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
// continue
scriptEn["chapter00-ayaContinue"] = [
  "...","...",
  "shin:normal <em>Ouch, well this is awkward…<br>I don’t even know what to say now…</em>",
  "shin:normal <em>Thankfully, Ayano decides to break the silence herself.</em>",
  "aya ... ...<br>Well, anyway, what are you doing here at such a late hour?",
  "aya It’s dark outside!",
  "shin:angry2 That’s none of your business.<br>What are <em>you</em> doing here? And with the lights turned off?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Er… Well… You see…",
  "aya My recent grades weren’t very good, so the teacher gave me extra work.",
	"It’s just the first day of term, isn’t it? How in the world did she already get extra work…?",
  "shin:normal That doesn’t explain why the lights were off?",
  'show character aya smile with fadeIn end-fadeOut',
  "aya Ahaha, yeah…  Um...I fell asleep as I was working...<br>Without even finishing the prep… Ahaha~",
  "shin:normal Was it even worth staying after class, then?",
  'show character aya embarrassed with fadeIn',
  "aya Well, it’s true, it seems like that was pointless after all, huh?<br>Ah......What should I do?",
  "aya If I don’t finish this by class time tomorrow, the teacher will get mad at me again…",
  "shin:angry <em>Well, she seems to be in an unfortunate situation, but thankfully for me it’s not my business.</em>",
  "shin:angry <em>She’s the one in the wrong for not finishing her work. I shouldn’t meddle.</em>",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "animated"}
	} },
  "shin:angry <em>Let’s just ignore her, get that wallet, and get the hell out of this school.</em>",
  "aya ... ? Um, excuse me...",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "animated";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "rightMove"}
	} },
  'show character aya shy',
  "shin:oh <em>Ayano steps in front of me, blocking the way into the classroom.</em>",
  "shin:oh …? You’re in the way. What do you want?",
  'show character aya please with fadeIn end-fadeOut',
  "aya Ah,um, sorry!!",
  "shin:normal What is it?<br> Just spit it out already.",
  "aya Um… Shintaro-kun, you’re really smart right?<br>I remember last term you got full marks on every exam, even the final ones which were really hard…!",
  "shin:blueSight <em>A dunce and a stalker? There really are strange people in my class.</em>",
  'show character aya question with fadeIn end-fadeOut',
  "shin:angry2 … Who said that you could look at my grades?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Um… I’m sorry!",
  "aya I just noticed, since we sit next to each other, sorry–",
  "shin:blueSight Stop apologizing, it’s annoying.<br>Just tell me what you want...",
  "aya Er...The thing is.. <br>Could you maybe, um... Help me finish the homework ? Just a little ?",
  "aya Just for today! It won’t be long !",
  "shin:angry1 … You mean, right now ? At this hour !?",
  'show character aya please with fadeIn end-fadeOut',
  "aya Please… um...I beg you !",
	"shin:blush <em>The last thing I expected was for a girl to beg me for anything today.</em>",
	"shin:blush <em>Without thinking, I found myself agreeing.</em>",
  "shin:facepalm Uh– A-Alright, I’ll help you get the prep done.",
  "shin:normal ....But only today, got it? Don’t expect me to make a habit out of this...",
  'show character aya excited with fadeIn end-fadeOut',
  "aya W-Wait, really ?!",
  "shin:dodge Do you have ears? I just said that I’ll help you.",
  "shin:dodge Hurry up and show me what you’re working on, so we can get this over with",
  "aya O-okay!",
  "hide character aya with fadeOut",
  "stop music 01.03 with fade 1",
  "show background classroomDoorOpened with fadeOut",
  "wait 1000",
  "jump chapter00-working"
];


scriptEn["chapter00-working"] = [
  "play music 01.13 with loop fade 1",
  "show scene classroomDesk with fadeIn",
	"shin:normal <em>The classroom looks a lot less sinister with the lights back on… It’s still odd with just the two of us in it, though.</em>",
	"shin:normal <em>Ayano shows me the prepwork, still laid out on her desk.</em>",
  "shin:angry3 … Is this for real ?",
  "shin:normal This is just the Pythagoras’ theorem; you’re telling me that you can’t even apply it properly now? We were taught this last year !",
  "shin:angry2 How are you expecting to pass the high school entrance exam without even knowing the basics ?",
  "aya:heh I was pretty confident about it before, actually…",
  "aya:heh But this year it suddenly stopped making sense, ehehe… I guess my previous teacher taught me the formula incorrectly?",
  "aya:heh And now I just don’t understand anything anymore… It’s like I was put in another reality, or something! ",
  "shin:angry2 You’re weird enough to come from one, that’s for sure.",
	"aya Ah...",
  "shin:dodge … Anyway, let’s not waste any more time and get started already.",
  "show image allTriangles.svg with fadeIn",
  "shin:oh First of all, this theorem only works with right-angled triangles.",
  "shin:oh The square of the hypotenuse is equal to the sum of the square of the other two sides.",
  "aya:huh Okay!",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="allTriangles.svg"]').className = "animated"}
	} },
  "shin:normal So tell me, on which of these triangles would you apply it to?",
  "jump chapter00-working-choice1"
];
scriptEn["chapter00-working-choice1"] = [
  { Choice: {
	    c1: {
	      Text: 'on the NUL triangle',
	      Do: 'jump chapter00-working-endChoice1'
	    },
	    c2: {
	      Text: 'on the DIE triangle',
	      Do: 'aya:oh Um that one ?',
	      onChosen: () => {choices[0] = false},
	      Clickable: () => choices[0]
	    },
	    c3: {
	      Text: 'on the RIP triangle',
	      Do: 'aya:oh Um that one ?',
	      onChosen: () => {choices[1] = false},
	      Clickable: () => choices[1]
	    }
  } },
  "shin:blueSight Nope.<br> Come on you need to listen to me !",
  "aya:heh I’m trying…",
  "jump chapter00-working-choice1"
]
scriptEn["chapter00-working-endChoice1"] = [
	{ Function: {
			Apply: ()=>{
				reverseChoices = [].concat(choices); // ayano can't control the time ;)
				choices.fill(true);
	    	document.querySelector('[data-image="allTriangles.svg"]').className = "animated";
				return true;
			},
			Reverse: ()=>{
				choices = reverseChoices;
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
			}
	} },
  "aya:oh Um that one ?",
  "shin:oh Yes that’s right !",
  "shin:oh Now, you have to find the length of <span class='darkgreenBg'>NL</span>, You already have <span class='brownBg'>the hypotenuse, UL,</span> and <span class='cadetblueBg'>the other side, UN</span>.",
  "aya:huh Er…",
  "shin:oh And when you apply the theorem, <span class='brownBg'>UL²</span> = <span class='cadetblueBg'>UN²</span> + <span class='darkgreenBg'>NL²</span>,",
  "shin:oh You move it around to have<span class='darkgreenBg'>NL²</span> = <span class='brownBg'>UL²</span> - <span class='cadetblueBg'>UN²</span>, get it ?",
  "aya:huuh Hm-Hm…",
  "shin:oh And to find NL, you have to find the square root of both sides, so that √(<span class='darkgreenBg'>NL</span>² ) = <span class='darkgreenBg'>NL</span> = √(<span class='brownBg'>UL</span>² - <span class='cadetblueBg'>UN</span>²)",
  "shin:oh Then all you have to do is put in the values…<br>And it works!",
  "shin:normal See ?<br>You should be able to do this other problem now. ",
  "hide image allTriangles.svg with flipOutX",
  "show image triangle0.svg with flipInX",
  "aya:ohFuckkk Er...<br>I’m not sure I get it…",
	"shin:facepalm <em>I sigh in exasperation</em>",
  "shin:angry3 How many times am I going to have to repeat this for you to understand... ?",
  "aya:gomen Sorry…",
  "shin:angry2 Just try harder, will you ?<br> I don’t want to be stuck here all night.",
  "aya:heh Right...",
  "shin:angry1 <em>Seriously, what’s her problem ? Isn’t there a limit to human stupidity ?</em>",
  "aya:oh ...<br>I think I understand this one…",
  "shin:normal Eh ?",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="triangle0.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="triangle0.svg"]').className = "animated"}
	} },
  "jump chapter00-working-choice2"
];
scriptEn["chapter00-working-choice2"] = [
  { Choice: {
			Dialog: 'Hypotenuse = BC <br>Side one = AC<br>side two (we’re looking for its length)= AB, so :',
		  c1:{
		    Text: 'BC² = AC² - AB² so AB² = AC² - BC²',
		    Do: 'aya Is that it ?',
		    onChosen: () => {choices[0] = false},
		    Clickable: () => choices[0]
		  },
		  c2:{
		    Text: 'BC = AC + AB so AB = BC - AC',
		    Do: 'ayaIs that it ?',
		    onChosen: () => {choices[1] = false},
		    Clickable: () => choices[1]
		  },
		  c3:{
		    Text: 'BC² = AC² + AB² so AB² = BC² - AC²',
		    Do: 'jump chapter00-working-endChoice2'
		  }
  } },
  "shin:blueSight Nope. Come on I just told you!",
  "jump chapter00-working-choice2"
]
scriptEn["chapter00-working-endChoice2"] = [
	{ Function: {
			Apply: ()=>{
				reverseChoices = [].concat(choices);
				choices.fill(true);
				return true;
			},
			Reverse: ()=>{ choices = reverseChoices; }
	} },
  "show image triangle1.svg with fadeIn",
  "hide image triangle0.svg with fadeOut",
  "aya:oh Is that it ?",
  "shin:oh You’re right, this is how it goes.",
  "show image triangle2.svg with fadeIn faster",
  "hide image triangle1.svg with fadeOut",
  "aya:clapclap And so...it becomes this and then…",
  "wait 1000",
  { Input: {
      Text: 'AB = √( 5² - 4² ) = √( 9 ) = ???',
      Validation: (input) => input=="3",
      Warning: 'No...you’re looking for the square root of 9…'
  } },
  "shin:oh Yes, you did it !<br>It works when you really try, see ?",
  "hide image triangle2.svg with flipOutX",
  "aya:hehe Haha !",
  "shin:dodge You don’t need to laugh all the time, you really are a freak…",
  "aya:ohFuckkk Uh ? A freak ?",
  "shin:angry2 Gh… You don’t need to take me so seriously... You’re such a pain…",
  "shin:normal Anyway after that you’re almost finished, so hurry up.",
  "aya:hehe Yes !",
  "stop music 01.13 with fade 1",
  "show background classroomDesk with fadeOut",
  "wait 1000",
  "jump chapter00-endWorking"
];
scriptEn["chapter00-endWorking"] = [
  "play music 01.26",
  "show scene classroomWindow with fadeIn loop",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Shintaro-kun, you’re so smart…<br> Do you study at home every day ?",
  "shin:normal Not really, I’ve only read each lesson once…",
  "show character aya excited at with fadeIn end-fadeOut",
  "aya and you’re still this successful ?<br>That’s incredible ! You’re really smart after all!",
  "shin:normal Um… I think it’s more than that. I remember everything I learn... I don’t know why, I just can't seem to forget anything.",
  "shin:normal It’s always been like that.",
  "shin:normal I guess I already know the curriculum by heart, that’s why I get full marks.",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya I see... So this means you have an incredible memory, then ?",
  "aya What a gift! I always forget what I learn very quickly.",
  "shin:normal It’s not really such a good thing. Every little insignificant event, even unpleasant, stays in my mind...",
	"I get more and more overwhelmed every day, it’s quite hard to bear. ",
  "show character aya embarrassed at with fadeIn end-fadeOut",
  "aya Mm…",
  "shin:oh What is it ?",
  "show character aya normal at with fadeIn end-fadeOut",
	"aya Uh ? I was just thinking…",
  "aya If you remember every single moment, I hope you can live many pleasant days. Maybe then you could eventually stop worrying over the bad ones ?",
  "shin:dodge Oh... ",
  "show character aya question at with fadeIn end-fadeOut",
  "aya Eh ? Can it not work that way ?",
  "shin:blush Er, no... I mean, yeah . I suppose it could…",
  "shin:blush Things would be a lot easier for me it it would just work out like that…",
  "show character aya embarrassed at with fadeIn end-fadeOut",

  "aya Ah! Then I’m sure a lot of wonderful things will happen to you from now on !",
		// OHOHOHO ReAllY ?! xD

  "shin:oh How can you tell ?",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Hehe...Just a feeling.", // ayano haves really bad predictions
  "show character aya shy at with fadeIn end-fadeOut",
  "shin:angry2 Huh... Now, have you answered this question ? You won’t get better if you keep chatting…",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Ah er… I have no clue what it’s about…",
  "shin:angry2 Gosh, you’re truly one of a kind…",
  "hide character aya with fadeOut",
  "stop music 01.26 with fade 1",
  "show background classroomWindow with fadeOut",
  "wait 1000",
  "jump chapter00-leaveSchool"
];


scriptEn["chapter00-leaveSchool"] = [
  "show scene oldBridge_night",
  "play music 01.32 with fade 1",
  "show character aya shy with fadeIn",
  "aya Aah, thank you for saving me ! I wouldn’t have been able to understand anything and finish the prep without your help !",
  "shin:blueSight I swear even with my help it took you quite long…",
	"shin:blueSight <em>I can’t believe I got dragged into all of this just because I forgot my wallet…</em>",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Haha sorry… but I will try to remember this moment at least !",
  "shin:dodge Why is that ?<br> Didn’t you say you forget everything ?",
  "show character aya normal at with fadeIn end-fadeOut",
  "aya I’ll do my best not to forget today, so it’ll be okay.",
  "shin:normal Hm. I’m sure you can get a good grade on the next test if you do.",
  "aya Oh yeah that’s right, <em>but I wasn’t talking about the studies only…</em>",
  "show character aya question at with fadeIn end-fadeOut",
  "shin:blush Eh ? Did you say something ?",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya Uh ?<br> No nothing...hehe",
  "show character aya normal at with fadeIn end-fadeOut",
  "shin:dodge Okay… Bye, then. I live over there, so I’m going this way.",
  "show character aya please at with fadeIn end-fadeOut",
  "aya Ah..er... !",
  "show character aya shadow at with fadeIn",
  "aya Shintaro-kun !",
  "shin Yeah ?",
  "aya See you tomorrow !",
  "shin ...<br> Yes, see you tomorrow !",
  "hide character aya with fadeOut",
  "stop music 01.32 with fade 1",
  "show background oldBridge_night with fadeOut",
  "wait 3000",
  "jump chapter01-start"
];
