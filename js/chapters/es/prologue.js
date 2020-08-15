// script
scriptEs["chapter00-start"] = [
	"centered <span class='big'>prólogo</span><br><em>The Old Days</em>",
  "show scene classroomCorridor with fadeIn duration 3s",
	"play music 02.23 with loop fade 3",
  "shin:normal <em>Supongo que es normal que nadie esté aquí tan tarde...<br> Pero carajo, ¿cómo puede que la escuela sea tan aterradora en la noche?</em>",
  "shin:normal <em>ya he pasado tantas veces por estos pasillos antes... Pero en la noche, se ven tan diferentes y lúgubre...</em>",
  "shin:scare1 <em>Espero no encontrar nada siniestro...</em>",
  "shin:angry1 <em>Aaah, ¡vamos! ¡No puedo creer que esté aquí en primer lugar!</em>",
  "shin:angry2 <em>Olvidar mi billetera en el salón el primer día de clases, ¿en serio?</em>",
  "shin:angry2 <em>No tengo remedio..</em>",
  "bruit <em class='animated jello'>flock~</em>",
  "shin:scare5 ¡¡¡¿¿ AAaah ??!!!",
  "shin:scare4 ...<br>...<br>...",
  "shin:scare4 Ah...-Ah...<br>¡¿Qué fue eso?! El lavadero, ¿quizás...?",
  "shin:blueSight Ugh... Incluso aunque fuera eso, no es nada por lo que asustarse...",
  "shin:blueSight ¡Necesito dejar de sobresaltarme por algo como eso...! ",
  "show background classroomDoorClosed with fadeIn",
  "shin:dodge <em>Debería en lugar de eso intentar distraerme con algo más... Aaagh, ¿por qué decidí ir a la escuela en medio de la noche? ¡Ni siquiera me gusta la escuela!",
  "shin:angry3 <em>Hablando de eso...</em>",
  "shin:angry3 <em>Mis compañeros... No me importan mucho, a decir verdad.</em>",
  "shin:normal <em>Ellos son tan predecibles, sólo les importa su apariencia, su estúpida popularidad y no sus notas... </em>",
  "shin:normal <em>No es como que me importen, pero, en mi opinión, deberían  haber intentado no ser tan mediocres evitando tener tan bajas puntuaciones en sus exámenes preliminares.</em>",
  "shin:dodge <em>También, son tan ruidosos, incluso durante las clases... Supongo que algunos podrían pensar que lo pasaría por alto, pero, me parecen tan insoportables.</em>",
  "shin:facepalm <em>¿Y así creen que irán a la preparatoria el próximo año? ¿Incluso miran a llegar a más?<br> No los entiendo.</em>",
  "shin:dodge <em>¿Cómo se supone que que trabaje con tremendos idiotas?<br>Probablemente sería mejor si estuviera estudiando en casa.</em>",
  "bruit <em class='animated shake'>[chair noises]</em>",
  "shin:scare4 ¡¿ Eek !?",
  "shin:scare4 <em>Ese sonido sorpresivo salió de mi boca antes que pudiera retenerlo. </em>",
  "shin:scare1 <em>Estoy parado fuera de mi salón ¡y juro que oí algo que provenía desde adentro...!</em>",
  "shin:scare1 <em>¡¿H-Hay alguien ahí?! ¡¿Desde cuándo?!</em>",
  "shin:scare2 <em>Espera, espera, espera...<br>Eso no tendría sentido... </em>",
  "shin:scare2 <em>Pero, ¡estoy seguro que oí algo...!</em>",
  "shin:scare4 <em>Incluso si fuera eso, las luces están apagadas...</em>",
  "shin:scare3 <em>No me digas que hay un fantasma o algo así...</em>",
  "shin:scare3 <em>Estoy considerando volver con el rabo entre las piernas y abandonar esto ahora; pero antes, debo decidir sobre esta puerta, ¡quiera o no–!</em>",
  "show background classroomDoorOpened",
  "show character aya shadow with rubberBand end-fadeOut",
  "bruit <em class='animated wobble'>[Door opening sound]</em>",
  "show character aya please with fadeIn end-fadeOut",
  "¡¡¡¡¡ -AAAAaah !!!!!<br>¡¡ -EEEEeeeeek !!",
  "stop music 02.23 with loop fade 3",
  "shin:scare5 Perdón, ¡¡¡perdón!!!<br>Por favor, ¡¡ten piedad de mí!!",
  "show character aya question with fadeIn end-fadeOut",
  "shin:scare4 <em>Me encontré rogando sin siquiera pensarlo, mis ojos deben estar llorosos por el miedo... Pero, unos segundos después, me di cuenta que no había sido asesinado por el fantasma de la escuela... </em>",
  "shin:scare4 <em>De repente, oí una voz familiar.</em>",
  // ayano name = ??
  "uk ¿ Eh ?",
  "uk ¿ Shintaro... -kun ?",
  "play music 01.03 with loop fade 1",
  "shin:scare4 <em>... (?)</em>",
  "shin:oh <em>Una chica que vestía el uniforme escolar apareció frente a mí en medio de la oscuridad... <br>Creo que he visto esa cara en algún lugar...</em>",
  "show character aya excited with fadeIn end-fadeOut",
  "uk Ah, ¡¡Es cierto!! ¡Eres Shintaro Kisaragi!",
  "shin:normal <em>Espera, ¿quién eres? ¿Cómo sabes mi nombre?</em>",
  "uk Oye, ¿no me reconoces?<br> Soy Ayano Tateyama, ¡tu compañera de clases!",
  "show character aya embarrassed with fadeIn end-fadeOut",
  "uk O sea, no hemos hablado nunca, pero...",
  "shin:normal ¿A-ya-no Ta-te-ya-ma?<br>... ...",
  { Choice: {
			Dialog: 'shin:¡¡oh¡¡ AH !! ...',
	    c1: {
	      Text: '¡Eres la chica que tuvo las peores notas en el examen de simulacro...!',
	      Do: 'jump chapter00-ayaWorst'
	    },
	    c2: {
	      Text: '¡Eres la chica que se sienta junto a mí!',
	      Do: 'jump chapter00-ayaNbr'
	    },
	    c3: {
	      Text: '¿Quién?',
	      Do: 'jump chapter00-ayaGhost'
	    }
  }}
];

// choice
  scriptEs["chapter00-ayaWorst"] = [
    'show character aya shy with fadeIn end-fadeOut',
    // aya =  Ayano
    "aya Ah, um... ",
    "aya ¿Es así como me recuerdas?",
    "shin:normal ¿pero me equivoco?",
    'show character aya embarrassed fadeIn end-fadeOut',
    "aya No , es cierto, pero... <br>Ah ah ...",
    "jump chapter00-ayaContinue"
  ];
  scriptEs["chapter00-ayaNbr"] = [
    "show character aya excited with fadeIn end-fadeOut",
    "aya Ah, ¡así que me recuerdas! Estaba preocupada que fuera sólo una desconocida para ti...",
    "shin:blush <em>¿¿¿Ella me está felicitando por eso??? Awkward-</em>",
    "show character aya smile with fadeIn end-fadeOut",
    "aya Ah, hoy intenté preguntarte algo, pero no me respondiste<br>Tenías tu cara en tu rostro y parecía que te habías perdido en tus pensamientos?",
    "shin:oh <em>¿Hm? ¿De que está hablando?</em>",
    "shin:normal Ah… perdón. Probablemente estaba dormido… No presto mucha atención en clases.",
		"aya Oh, pensé que quizás había pasado eso... ¡No te preocupes!",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
  scriptEs["chapter00-ayaGhost"] = [
    "show character aya shy with fadeIn end-fadeOut",
    "aya ¿E-En serio? ¡Soy tu compañera de clases! Es más, ¡¡me siento junto a ti!!",
    "aya ¿Soy así de invicible?",
    "show character aya embarrassed with fadeIn end-fadeOut",
    "jump chapter00-ayaContinue"
  ];
// continue
scriptEs["chapter00-ayaContinue"] = [
  "...","...",
  "shin:normal <em>Ouch. Bueno, esto es incómodo…<br> Ni siquiera sé qué decir ahora...</em>",
  "shin:normal <em>Por suerte, Ayano decidió romper el silencio.</em>",
  "aya ... ...<br>Bueno, de cualquier modo, ¿qué estás haciendo aquí tan tarde?",
  "aya ¡Está muy oscuro afuera!",
  "shin:angry2 No son tus asuntos.<br>¿Qué estás <em>tú</em> haciendo aquí? ¿Y con todas las luces apagadas?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Er... Bueno... Verás...",
  "aya Mis notas más recientes no han sido muy buenas, así que el profesor me dio tarea extra.",
	"Es sólo que es el primer día de clase, ¿no? ¿Cómo es que ella podría tener tarea extra...?",
  "shin:normal Y eso no explica por qué las luces estaban apagadas.",
  'show character aya smile with fadeIn end-fadeOut',
  "aya Ahaha, sí…  Umh... Me quedé dormida mientras estudiaba...<br>Y sin siquiera entrar a la prep.... Ahaha~",
  "shin:normal Así que no valió la pena quedarse despues de clases, ¿no?",
  'show character aya embarrassed with fadeIn',
  "aya Bueno, es cierto, parece que esto fue un sin sentido, ¿huh?<br>Ah... ¿Qué debería hacer?",
  "aya Si no termino esta tarea para mañana, el profesor se enojará conmigo...",
  "shin:angry <em>Bueno, ella parece que está en una desafortunada situación, pero por suerte, no es mi problema.</em>",
  "shin:angry <em>Ella es la que está perdida por no acabar su tarea. No me pienso involucrar.</em>",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "animated"}
	} },
  "shin:angry <em>Sólo la ignoraré, iré por mi billetera, y me largaré de esta escuela.</em>",
  "¿Aya ... ? Um, disculpa...",
	{ Function: {
			Apply: function(){
				document.querySelector('[data-character="aya"]').className = "animated";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-character="aya"]').className = "rightMove"}
	} },
  'show character aya shy',
  "shin:oh <em>Ayano se paró frente a mí, bloqueándome el paso al salón.</em>",
  "shin:oh... Estás en mi camino. ¿Necesitas algo?",
  'show character aya please with fadeIn end-fadeOut',
  "aya Ah,um, ¡¡perdona...!!",
  "shin:normal ¿Qué pasa?<br> Sólo muévete a un lado.",
  "aya Um… Shintaro-kun, eres muy inteligente, ¿verdad?<br>Recuerdo que siempre tienes las mejores notas en cada examen, ¡incluso en los finales! Que fueron muy complicados...",
  "shin:blueSight <em>¿Tonta y además stalker? Realmente hay gente muy rara en la clase...</em>",
  'show character aya question with fadeIn end-fadeOut',
  "shin:angry2 ¿...Quién te dijo que podías ver mis notas?",
  'show character aya shy with fadeIn end-fadeOut',
  "aya Um… ¡Lo siento!",
  "aya Sólo lo supe porque me siento junto a ti, perdona–",
  "shin:blueSight Deja de disculparte. Es tan molesto.<br>Sólo dime que quieres...",
  "aya Er...Esto... <br>Podrías quizás, um... ¿Ayudarme a terminar mi tarea? ¿Sólo un poquito?",
  "aya ¡sólo por hoy! ¡No tomará mucho!",
  "shin:angry1 ...Quieres decir ¿ahora ? ¿¡Justo ahora!?",
  'show character aya please with fadeIn end-fadeOut',
  "aya Por favor... um... ¡Te lo ruego!",
	"shin:blush <em>Lo último que pensé fue que alguna chica me rogaría por ayuda hoy.</em>",
	"shin:blush <em>Y sin darme cuenta, me encontré aceptado.</em>",
  "shin:facepalm Uh– B-Bueno, Te ayudaré a estar preparada.",
  "shin:normal ....Pero sólo hoy, ¿entendiste? No esperes que esto se haga una costumbre...",
  'show character aya excited with fadeIn end-fadeOut',
  "aya E-Espera, ¡¿de verdad?!",
  "shin:dodge ¿Acaso no tienes orejas? Te dije que te ayudaré.",
  "shin:dodge Apúrate y muéstrame qué estabas haciendo, para que acabemos esto rápido",
  "aya ¡O-okay!",
  "hide character aya with fadeOut",
  "stop music 01.03 with fade 1",
  "show background classroomDoorOpened with fadeOut",
  "wait 1000",
  "jump chapter00-working"
];


scriptEs["chapter00-working"] = [
  "play music 01.13 with loop fade 1",
  "show scene classroomDesk with fadeIn",
	"shin:normal <em>El salón se ve menos siniestro con las luces encendidas... Aunque todavía se ve raro con sólo dos de nosotros aquí, supongo.</em>",
	"shin:normal <em>Ayano me muestra los ejercicios, todavía están sobre su escritorio.</em>",
  "shin:angry3 ... ¿Es en serio?",
  "shin:normal ¡Esto es sólo el teorema de Pitágoras! ¿Me estás diciendo que no puedes ni siquiera aplicarlo apropiadamente? ¡¿En serio estás en el último año?!",
  "shin:angry2 ¿Cómo esperas pasar el examen de ingreso a la preparatoria sin siquiera saber algo tan básico?",
  "aya:heh Tenía mucha confianza de poder hacerlo, antes...",
  "aya:heh Pero este año de repente dejó de tener sentido, ehehe… ¿Supongo que mi anterior maestro me dio la fórmula incorrecta?",
  "aya:heh Y ahora no entiendo nada de nada... Es como que si me hubieran puesto en una realidad alterna, ¡o algo así! ",
  "shin:angry2 Eres tan rara que podrías venir de alguna, eso es seguro.",
	"aya Ah...",
  "shin:dodge ... De cualquier modo, no malgastes más mi tiempo y empecemos esto ya.",
  "show image allTriangles.svg with fadeIn",
  "shin:oh Primero que nada, este teorema sólo funciona con los triángulos con un ángulo recto.",
  "shin:oh El cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.",
  "aya:huh ¡Okay!",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="allTriangles.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="allTriangles.svg"]').className = "animated"}
	} },
  "shin:normal Dime, a cuál de estos triángulos le aplicarías eso?",
  "jump chapter00-working-choice1"
];
scriptEs["chapter00-working-choice1"] = [
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
  "shin:blueSight Nope.<br> Vamos, ¡debes oirme!",
  "aya:heh Lo estoy intentando...",
  "jump chapter00-working-choice1"
]
scriptEs["chapter00-working-endChoice1"] = [
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
  "aya:oh Um, ¿ese?",
  "shin:oh Sí, ¡es correcto!",
  "shin:oh Ahora, encuentra el  largo de <span class='darkgreenBg'>NL</span>, tú ya tienes <span class='brownBg'>la hipotenusa, UL;</span> and <span class='cadetblueBg'>el otro cateto, UN</span>.",
  "aya:huh Er...",
  "shin:oh Y entonces aplicas el teorema, <span class='brownBg'>UL²</span> = <span class='cadetblueBg'>UN²</span> + <span class='darkgreenBg'>NL²</span>,",
  "shin:oh Sólo mueves esto para tener <span class='darkgreenBg'>NL²</span> = <span class='brownBg'>UL²</span> - <span class='cadetblueBg'>UN²</span>, ¿entiendes?",
  "aya:huuh Hm-Hm...",
  "shin:oh Y encuentras NL, Tienes que encontrar el cuadrado de ambos lados, así que √(<span class='darkgreenBg'>NL</span>² ) = <span class='darkgreenBg'>NL</span> = √(<span class='brownBg'>UL</span>² - <span class='cadetblueBg'>UN</span>²)",
  "shin:oh Entonces sólo quedan poner los valores...<br>¡Y listo!",
  "shin:normal ¿Ves?<br>Deberías poder hacer este problema ahora. ",
  "hide image allTriangles.svg with flipOutX",
  "show image triangle0.svg with flipInX",
  "aya:ohFuckkk Er...<br>No estoy segura de entender...",
	"shin:facepalm <em>Suspiré por la desesperación</em>",
  "shin:angry3 ¿Cuántas veces debo repetir esto para que lo entiendas... ?",
  "aya:gomen Perdona..",
  "shin:angry2 Sólo inténtalo más, ¿podrías?<br> No quiero estar aquí toda la noche...",
  "aya:heh Es cierto...",
  "shin:angry1 <em>En serio, ¿cuál es su problema? ¿Acaso no ha un límite para la estupidez humada?</em>",
  "aya:oh ...<br>Creo que... entiendo de este",
  "shin:normal ¿Eh?",
	{ Function: {
			Apply: ()=>{
				document.querySelector('[data-image="triangle0.svg"]').className = "rightMove";
				return true;
			},
			Reverse: ()=>{document.querySelector('[data-image="triangle0.svg"]').className = "animated"}
	} },
  "jump chapter00-working-choice2"
];
scriptEs["chapter00-working-choice2"] = [
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
  "shin:blueSight ¡vamos, te lo acabo de enseñar!",
  "jump chapter00-working-choice2"
]
scriptEs["chapter00-working-endChoice2"] = [
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
  "aya:oh ¿es eso?",
  "shin:oh Tienes razón, Así es como se hace.",
  "show image triangle2.svg with fadeIn faster",
  "hide image triangle1.svg with fadeOut",
  "aya:clapclap Y entonces...Se vuelven esto y esto...",
  "wait 1000",
  { Input: {
      Text: 'AB = √( 5² - 4² ) = √( 9 ) = ???',
      Validation: (input) => input=="3",
      Warning: 'No...you’re looking for the square root of 9…'
  } },
  "shin:oh Sí, ¡lo hiciste!<br>Funciona cuando lo intentas, ¿ves?",
  "hide image triangle2.svg with flipOutX",
  "aya:hehe ¡Haha!",
  "shin:dodge No necesitas reir todo el tiempo, ya eres muy rara...",
  "aya:ohFuckkk ¿Uh? ¿Muy rara?",
  "shin:angry2 Gh… No me tomes tan en serio... En serio eres molesta...",
  "shin:normal De cualquier modo, con eso ya podrías entender los otros ejercicios, así que apúrate.",
  "aya:hehe ¡ Sí !",
  "stop music 01.13 with fade 1",
  "show background classroomDesk with fadeOut",
  "wait 1000",
  "jump chapter00-endWorking"
];
scriptEs["chapter00-endWorking"] = [
  "play music 01.26",
  "show scene classroomWindow with fadeIn loop",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Shintaro-kun, eres muy listo...<br> ¿Estudias en casa diario?",
  "shin:normal No realmente, sólo ya he leído cada lección una vez...",
  "show character aya excited at with fadeIn end-fadeOut",
  "aya ¿y eres así de bueno?<br>¡Eso es incredible! Eres muy inteligente después de todo!",
  "shin:normal Um... Creo que es más que eso. Recuerdo todo lo que aprendí... No sé por qué, pero parece que no puedo olvidar nada.",
  "shin:normal Siempre he sido así.",
  "shin:normal Supongo que incluso sé el curriculum de memoria, por eso tengo buenas notas.",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya Ya veo... ¿Eso significa que debes tener una increíble memoria entonces?",
  "aya ¡Que gran don! Yo siempre olvido lo que aprendo muy rápidamente.",
  "shin:normal No es la gran cosa, cada insignificante evento, incluso aunque sean desagradables, se quedan en mi mente...",
	"Cada vez me siento más y más abrumado, es un poco difícil de soportar con el paso del tiempo. ",
  "show character aya embarrassed at with fadeIn end-fadeOut",
  "aya Mm...",
  "shin:oh ¿Qué pasa?",
  "show character aya normal at with fadeIn end-fadeOut",
	"aya ¿Uh? Sólo estaba pensando...",
  "aya Si tú recuerdas cada momento de tu vida, espero que puedas formar muchos recuerdo agradables y así quizás puedas dejar de preocuparte de tus malas memorias.",
  "shin:dodge Oh... ",
  "show character aya question at with fadeIn end-fadeOut",
  "aya Eh, ¿quizás también podría funcionar de ese modo?",
  "shin:blush Er, no... Quiero decir, sí. Es una posibilidad...",
  "shin:blush Las cosas serían más simples si pudiera librarme de eso...",
  "show character aya embarrassed at with fadeIn end-fadeOut",

  "aya ¡Ah! ¡Estoy segura que cosas maravillosas te pasarán de aquí en adelante!",
		// OHOHOHO ReAllY ?! xD

  "shin:oh ¿Cómo podría decirlo?",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Hehe... Es sólo un presentimiento.", // ayano haves really bad predictions
  "show character aya shy at with fadeIn end-fadeOut",
  "shin:angry2 Huh... Ahora, ¿ya has respondido esta pregunta? No serás mejor si continúas hablando...",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Ah er… No tengo idea de qué hacer...",
  "shin:angry2 Gosh, tu en serio eres única en tu clase...",
  "hide character aya with fadeOut",
  "stop music 01.26 with fade 1",
  "show background classroomWindow with fadeOut",
  "wait 1000",
  "jump chapter00-leaveSchool"
];


scriptEs["chapter00-leaveSchool"] = [
  "show scene oldBridge_night",
  "play music 01.32 with fade 1",
  "show character aya shy with fadeIn",
  "aya Aah, ¡gracias por salvarme! ¡No habría entendido nada sin tu ayuda!",
  "shin:blueSight Juro que incluso con mi ayuda, esto tomó mucho más de lo que esperé...",
	"shin:blueSight <em>No puedo creer que quedé atorado aquí por olvidar mi billetera...</em>",
  "show character aya smile at with fadeIn end-fadeOut",
  "aya Haha perdona… ¡Pero intentaré recordar este momento lo más que pueda!",
  "shin:dodge ¿Por qué eso?<br> ¿No dijiste que siempre olvidabas todo?",
  "show character aya normal at with fadeIn end-fadeOut",
  "aya Por eso daré lo mejor que pueda para no olvidar este día y para que todo salga bien.",
  "shin:normal Hm. Estoy seguro que podrás tener buenas notas en el próximo examen si lo intentas.",
  "aya Oh sí, es cierto, <em>pero no estaba hablando sólamente de los estudios...</em>",
  "show character aya question at with fadeIn end-fadeOut",
  "shin:blush ¿Eh? ¿Qué dijiste?",
  "show character aya shy at with fadeIn end-fadeOut",
  "aya ¿Uh?<br> No nada... hehe",
  "show character aya normal at with fadeIn end-fadeOut",
  "shin:dodge Okay… Adiós entonces. Yo vivo haci allá, así que me iré por este camino.",
  "show character aya please at with fadeIn end-fadeOut",
  "aya Ah... ¡eh...!",
  "show character aya shadow at with fadeIn",
  "aya ¡Shintaro-kun!",
  "shin ¿Sí?",
  "aya ¡Te veo mañana!",
  "shin ...<br> Sí, te veré mañana",
  "hide character aya with fadeOut",
  "stop music 01.32 with fade 1",
  "show background oldBridge_night with fadeOut",
  "wait 3000",
  "jump chapter01-start"
];
