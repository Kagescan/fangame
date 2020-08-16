scriptEs["chapter01-start"] = [
	"show scene ShinDodo with fadeIn duration 6s",
	"play music 02.08 with fade 3 loop",
	"wait 5000",
	"play sound ding.ogg",
	"... ...",
	"Estoy sudando mucho...",
	"Me siento como si hubiera tenido un sueño... ¿pero sobre qué fue?",
	"ugh… Probablemente ni siquiera importe. No avanzaré si me sigo haciendo preguntas como esta.",
	"...",
	"show background ShinGotoPC with fadeIn",
	"Como sea, debería volver al trabajo.",
	"La canción no se compondrá sola.",
	"show background ShinGotoPC with fadeOut",
	"play sound pcBooted",
	"wait 1500",
	"show scene ShinOrdi with fadeIn",
	"Casi no he avanzado mi trabajo gracias a ella–",
	"Uh... Espera un segundo...",
	"play sound ding.ogg",
	"En lugar de una alarma estridente, la luz de la mañana fue la que me levantó hoy.<br>Es más, la única cosa que vino desde mi computadora fue el sondido del encendido...",
	"Esto sólo puede significar que...",
	"vibrate 1000",
	"<span class='rem'>¡Ella</span> no está aquí!",
	"show background ShinOrdiHands with fadeIn",
	"¡Debo tomar ventaja de esto!",
	"jump chapter01-shinOS"
];
scriptEs["chapter01-shinOS"] = [
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

// TODO: Use reversible functions

scriptEs["chapter01-legs"] = [
	/*show scene emptyLegs",*/
  function(){shinOSinstance.hide()},
	"clear",
	"¡¿...?!",
	"En lugar de mi gloriosa carpeta, sólo veo un fólder vacío.",
	"Shin ¿¿¿CÓMO???",
	"Me encontré gritando sin darme cuenta. ¡¿Pero a caso ella borró todos mis archivos privados!?",
	"...<br>AAhhh -- Qué es esta horrible maldición...<br> Espero que esto mismo no le haya pasado a mis archivos de la composición...",
	/* +1 achievement DOSSIERS_VOLÉS */
	"jump chapter01-shinOS"
];

scriptEs["chapter01-news"] = [
  function(){shinOSinstance.hide()},
	"#1: <br>Hoy, 14 de Agosto, la temperatura será mayor a los 30°C. Es el segundo día del festibal Obon.",
	"Intente limitar sus actividades en el exterior y manténgase hidratado en esta celebración nacional.",
	"#2: <br>¡La idol número uno en popularidad pronto debutará como actriz! ¡Ella estará actuandado en una novela que se estrenará luego del estreno de su próximo álbum!",
	/* +1 achivement mais pour plus tard (chap 1.2) : une famille connue ?*/
	"#3: <br> ¡Un oso ha aprendido cómo bailar!",
	"shin No hay nada interesante que ver, como siempre...",
	"jump chapter01-shinOS",
];
scriptEs["chapter01-weebGame"] = [
  function(){shinOSinstance.hide()},
	"“Esta página web está temporalmente en mantenimiento.” Huh.",
	"shin El moderador está actualizando el foro otra vez... <span class='rem'>Tendré que entrar luego</span>, supongo.",
	"shin <i>O... ¿me habrán bloqueado?</i>",
	/* +1 achivement : Revenez plus tard*/
	"jump chapter01-shinOS"
];
scriptEs["chapter01-eneOrigins"] = [
	function(){shinOSinstance.showTextBox()},
	"show scene #171b21",
	"stop music 02.08 with fade 3 loop",
	"play music 01.13 with fade 3 loop",
	"Es por donde ella vino.",
	"Ya ha pasado un año.",
	function(){
		shinOSinstance.hideTextBox();
		shinOSinstance.hide();
	},
	"show scene flashback with flash",
	// todo : hide image after 800 ms in a secure way
	"Yo era tan ingenuo en aquel entonces como para darle click a cada link turbio que podría enceontrar en internet.",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	"show scene shinPC with fadeIn",
	"show image enePop.svg center",
	"wait 500",
	"Que cara...",
	"hide image enePop.svg",
	"show character ene old0 with fadeIn end-fadeOut",
	"wait 1000",
	"show character ene old1 with fadeIn end-fadeOut",
	"...",
	"Una... ¿chica? ¿Qué clase de programa es este? Ni una app, fuera de mi e-mail, parece que puede procesarlo...",
	"...",
	"show character ene old2 with fadeIn end-fadeOut",
	"Espera.",
	"¿Qué si este es uno de esos programas ultra secretos?",
	"show character ene old4 with fadeIn end-fadeOut",
	"Qué si esta linda chica necesita mi ayuda para salvar un mundo desconocido que no conozco todavía porque<br>es este el- episodio piloto de una incfreíble serie shonen y yo soy el héroe y-",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene U-Un placer conocerte... ",
	"Ella parece tan ...humana. Que alta tecnología.",
	{'Choice':{ 'Dialog': '¿Quizás tenga reconocimiento de voz? Debería intentar hablar con ella.',
    'Ask her what she is':{
      'Text': 'Le preguntaré qué es ella',
      'Do': 'jump chapter01-eneOriginsAskWhoIsShe'
    },
    'Ask her for a mission':{
      'Text': 'Le preguntaré su misión',
      'Do': 'shin I-I’ll do whatever you want ! Um… Give me  whatever mission or quest you have ! '
    },
    'Offer my help':{
      'Text': 'Le ofreceré mi ayuda',
      'Do': 'shin Do you... need any help ?'
    }
  }},
	"show character ene old5 with fadeIn end-fadeOut",
	"ene ¡Ja, Ja! ¿Qué clase de pregunta es esa?",
	"show character ene old6 with fadeIn end-fadeOut",
	"ene No necesito mucho, pero...",
	"show character ene old4 with fadeIn end-fadeOut",
	"ene Desde hoy en adelante, por favor, trátame bien, <span class='rem'>amo</span>...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered Mirando hacia atrás..., todavía no estoy seguro cual es la parte que me da más cringe.",
	"centered Fui tan idiota en aquel momento... ",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Desde aquel entonce Ene ha ocupado mi computadora diariamente y no ha parado de molestarme. ",
	"Ella parece que se ha quedado dormida, supongo. ¿O quizás el término correcto es que está fuera de servicio?",
	"Aunque la conozca ya por un año, me cuesta mucho recordar algo que sepa de ella.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
	"jump chapter01-shinOS"
];
scriptEs["chapter01-eneOriginsAskWhoIsShe"] = [
	"shin Hey, um... ¿Qué eres tú?",
	"show character ene old2 with fadeIn end-fadeOut",
	"ene Hmmm...",
	"La chica me observó por un momento.",
	"show character ene old3 with fadeIn end-fadeOut",
	"ene Yo no sé qué soy, pero...",
	"show character ene old5 with fadeIn end-fadeOut",
	"ene Desde ahora en adelante, por favor trátame bien, amo...",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
	"show scene #171b21",
	"centered Ella era muy tímica al principio, pero no paso mucho tiempo hasta que ganó confinza y empezó a molestarme en todo.",
	function () {
		shinOSinstance.show();
		shinOSinstance.showTextBox();
	},
	"Ahora ella pregunta sobre cada aspecto de mi aislada vida y constantemente invade mi privacidad, y aún así no parece que quiera decirme nada acerca de su pasado.",
	"Al menos sé su nombre,",
	"<span class='rem'>Ene</span>.",
	function () {
		shinOSinstance.hideTextBox();
	},
	"play music 02.08 with fade 3 loop",
	"stop music 01.13 with fade 3 loop",
	"jump chapter01-shinOS"
];
scriptEs["chapter01-MAO"] = [
  function(){shinOSinstance.exit()},
	"show scene shinPC with fadeIn",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"play sound pcError",
	"show image VocaloidStoppedWorking.svg center with flash",
	"wait 4000",
	"shin Oh no. Oh no, no, ¡no! ¡No otra vez! ¡Por favor!",
	"Ni siquiera  me atreví a dar click con el mouse–. ¡No puedo hacer nada más que mirar la pantalla de mi computadora!",
	"shin No necesito dormir, comer o tomar agua para sobrevivir, pero si mi computadora se muere, ¡me iré con ella!",
	"shin ¡Moriré!, ¡Voy a–!",
	()=>{ document.getElementById("background").style.backgroundColor = "blue"; },
	"hide image VocaloidStoppedWorking.svg with zoomOut",
	"shin ¡¡Aaah!!",
	"chequearé todo rápidamente.",
	"shin Gracias a Dios nada se borró.",
	/*avec une tête comme celle du manga !*/
	"shin Esta canción está destinada al muro de la fama de niconico, después de todo. No me puedo permitir perder este éxito.",
	"stop music 02.08 with fade 3",
	()=>{ document.getElementById("background").style.backgroundColor = "red"; },
	"show image enePop.svg center",
	"play sound pcError",
	"shin Uh-oh...",
	"Por favor! ¡Este momento era grandioso! Por favor, no<span class='rem'>ella</span>...!",
	"hide image enePop.svg with fadeOut",
	"Por supuesto, nadie oiría mis plegarias, especialmente si no son provocados por mi agonía...",
	"play music 01.02 with volume 15",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Aquí, aquí, maestro!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smuga center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene ¿Todavía trabajando en esa canción que no tienes las agallas de terminar?",
	"<span class='rem'>Ene...</span>",
	"Esta “fabulosa... chica cibernética” como se llama a sí misma, pero que es peor que un virus de computadora en mi opinión",
	"a pesar que me llame “amo”, que NO fue mi idea, no me ha dado nada más que dolor desde que apareción en mi computadora y en mi vida desde hace un año.",
	"No importa lo que haga, parece que no puedo deshacerme de ella, así que tendré que soportar todos los días de mi vida su horrible tormento.",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene Supéralo ya... Sabes que eso es inútil.",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	// hier -> remplacer par ce matin, si on a joué au jeu (pas encore fait)
	"ene Ayer, en lugar de avanzar tu canción, te fuiste a esos foros de anime otra vez ¡¡¡y no parabas de criticar ese nuevo anime que se estrenó la semana pasada!!!",
	"show character ene thinka center with fadeIn end-fadeOut",
	"ene “¡La trama es una ofensa para la historia original!”",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh4 with fadeIn end-fadeOut",
	"ene “Los actores de voz no encajan tan bien como lo imaginé”",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Y qué tanta experiencia tienes <span class='rem'>tú</span>, huh, ¿maestro?",
	"shin ...",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Ah, y también... ¿Qué con esto?: “Solía trabajar en la industria de la animación.”",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh4 center with fadeIn end-fadeOut",
	"ene A caso podría ser que... ¡¿¿¿ tú estuvieras mintiendo ????!<br> ¡¡¡AHAHAHA!!! ¡¡¡Que lamentable!!!",
	"show character ene laughb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"shin ¡¡Gh–!!",
	"Apreté mis dientes e intenté lo mejor que pude en ignorarla. Ella es tan problemática.<br> ¡¿Por qué no se calla?!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Quizás ese ‘solía’ se refiere a tu vida pasada",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smugb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene Supongo que debe... ¡considerando que has estado sentado frente a tu computadora por dos años!",
	"Aaaagh, ¡¡¡ella es tan molesta–!!!",
	"shin ¡CÁLLATE!",
	"clear",
	"show character ene fright center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"show video shincola immersive with close",
	"show scene shinPC with shake",
	"show character ene fright center with shake end-fadeOut",
	"show character enef lh2 center with shake end-fadeOut",
	"show character eneb rh3 center with shake end-fadeOut",
	"ene UWAAAAAAH!!! Maestro, ¡el mouse! ¡Mueve el mouse!",
	()=>{ document.getElementById("background").style.backgroundColor = "black"; },
	"shin Oh ¡¡¡mierda!!!",
	"Agarré un puñado de servilletas y mi mouse, y desesperadamente los precioné entre ellos.",
	"<span class='rem'>Vamos, Shintaro, salva esta vida al menos!</span>",
	"shin ¡Por favor! ¡¡Funciona!!",
	"[...]",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene shocked center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Uwa, sólo funciona el click derecho. ¿Intentaste con el teclado?",
	"stop music 01.02 with fade 3",
	"hide character enef",
	"hide character eneb",
	"hide character ene",
	"show background #000",
	"play music ltm8bit with fade 7",
	"play sound keyboardtyping.ogg",
	"Mis dedos tecleaban desesperadamente, pero…",
	"centered rottotorrrorooro",
	"centered totoro",
	"centered toto roto<span class='censored'>to</span>",
	"show background shinPC with fadeIn",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laughb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"shin Sólo tres teclas, ¿huh? Aah, estoy condenado...!",
	"show character eneb rh2 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Maestro~ al menos queda esto,<br> ¡tú puedes escribir Totoro!",
	"shin ...",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene ..................",
	"shin Uuuuuh…",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"shin Es todo, es el final...",
	"hide character enef",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"ene ...",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene normalb center with fadeIn end-fadeOut",
	"ene ¿Maestro?",
	"Miré hacia el vacío de mi desesperación y a Ene. Acaso ella... ¿lo siente?",
	"show character eneb back center with fadeIn end-fadeOut",
	"show character ene guilty center with fadeIn end-fadeOut",
	"ene Tú puedes simplemente comprar unos nuevos, ¿verdad?",
	"shin ¿Qué pasa? ¿Te sientes mal por mí?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smuga center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Hrm...",
	"shin  ...Como sea, supongo. Estuve pensando sobre tener un nuevo equipo de cualquier modo.",
	"show character eneb rh2 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Oh ¡que genial! ¡Los nuevos modelos son grandiosos!",
	"shin Urgh… me animaste muy rápico, ¿sabes? ",
	"shin ...Sólo selecciona algún modelo que pueda llegar rápido por delivery",
	"show character eneb rh4 center with fadeIn end-fadeOut",
	"show character ene thinka center with fadeIn end-fadeOut",
	"show character enef lh1 center with fadeIn end-fadeOut",
	"ene Hmmm~ Okay, ¡déjame ver!",
	"show character eneb rh4 center with fadeIn end-fadeOut",
	"show character ene thinkb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene … … … … … … <br>¡Eh!",
	"shin ¿Qué pasa ahora?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Es imposible...",
	"shin ¿...A qué te refieres con que es imposible?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normalb center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene Hoy es 14 de Agosto... Es el festival Obon...<br> Nada puede enviarse por al menos dos días.",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene normala center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"shin ...<br>No... Tiene que haber algo, ¡cualquier cosa!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"ene ¡Nooope~!",
	"shin <span class='shake animated'>Yo en serio moriré.</span>",
	"show character ene smilec center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"show character eneb rh3 center with fadeIn end-fadeOut",
	"ene Dime Maestra~ ¡porque tengo una grandiosa idea! ¿Por qué no salimos y los compramos?",
	"shin -... ¿Ah? ¿Disculpa?",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smileb center with fadeIn end-fadeOut",
	"show character enef lh3 center with fadeIn end-fadeOut",
	"show character ene cool center with fadeIn end-fadeOut",
	"ene Aunque son las vacaciones, ¡el nuevo mall en Mekakucity está abierto ahora! ¡Estoy segura que tienen modelos de primera categoría!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene laugha center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"ene ¡Podríamos comprar un protector solar para pelear la ola de calor! ¡Aunque yo no lo necesito, hehe!",
	"show character eneb rh1 center with fadeIn end-fadeOut",
	"show character ene smilea center with fadeIn end-fadeOut",
	"show character enef lh2 center with fadeIn end-fadeOut",
	"Daylight… Han pasado dos años desde que estuve afuera, así que la idea de salir me parece imposible...",
	"pero no poder usar mi computadoras por dos largos días... Eso suena como el infierno.",
	"Será sólo una pequeña compra...",
	"Soy muy joven como para morirme.",
	"shin Vamos.",
	"show scene black",
	"centered Después de todo, ¿qué podría ir mal si salgo esta mañana?",
	"centered ¡Hoy y sólo por hoy! Después de este día, ¡nunca más saldré de nuevo!",
	"clear",
	"jump chapter01-demoEnd"
]


// additional part
// Do not translate

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
	"jump chapter01-demolinks",
];
scriptEn["chapter01-demolinks"] = [
	"stop music ltm8bit with loop fade 3",
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
}}},
	"jump chapter01-demolinks",
];

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
	"show background street4 with fadeIn end-fadeOut",
	"ene You’re taking much more time than what the app planned Master...", //smirk
	"ene We’re going left at the intersection after this park!",
	"shin ...",
	"Haha… Kids these Days… How can they keep running around in this heat…?!", //animate__rotateOutDownLeft, is it possible to add a blur effect to the background ?
	"ene Goodness, Master! Stop spacing out! You’ll collapse from heatstroke! <br>Wake up! The store’s this way, we’re almost there!",
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
	"ene You took the words right out of my mouth!",
	"show scene metro1 with fadeIn duration 4s",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.filter = "grayscale(100%)";
	},
	'play music 01.13 loop',
	'wait 3000',
	"ene Eugh, Master, look at that guy!",
	function() {
		let visualContainer = document.querySelector(`div[data-content="visuals"]`);
		visualContainer.style.removeProperty("filter");
	},
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
	"show image redjersey.png with fadeIn duration 4s",
	"Ene did compliment me, that was a change, but now here I am wearing an autumnal red jersey, sweaty as hell..",
	"hide image jersey with fadeOut",
	"show scene metro3 with fadeIn duration 3s end-fadeOut",
	"As I look around I see the children she laughed at before.",
	"At least I’m not the only one feeling uncomfortable here.",
	"The boy is smiling and yet he looks anxious. His gaze keeps quickly alternating between the surroundings and the girl, who is on her phone totally ignoring him.",
	'wait 2000',
	"They’re still this way when I get off the train following Ene’s directions.",
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
	'wait 3000',
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
