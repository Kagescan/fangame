/**
 * =======================================
 * Engine Settings
 *
 * Do not modify the ones marked with a *
 * Unless you know what you are doing
 * =======================================
 **/

'use strict';
/* global Monogatari */

const monogatari = Monogatari.default;
let preload = false;
if (typeof(window.location.search) !== 'undefined')
	preload = window.location.search == "?preload";
monogatari.settings({
	'Name': 'Retaining\'s Memories',
	'Version': '2.99.0',
	'Label': 'Start',
	'Slots': 10,
	'MultiLanguage': true, // Change to true for a MultiLanguage GameScreen.
	'MainScreenMusic': '01.22', // Music for the Main Menu.
	'ShowMainScreen': true, // Turn main menu on/off; Default: true *
	'Preload': preload, // Turn image preloading on/off, Default: true
	'AutoSave': 0, // Time interval between autosaves (In Minutes). 0 = Off
	'ServiceWorkers': true, // Enable service workers; Default: true *
	'TypeAnimation': true,

	// Prefix for the Save Slots in Local Storage.
	'SaveLabel': 'Save',
	'AutoSaveLabel': 'AutoSave',

	// The Aspect Ratio your background images are on. This only has effect on
	// web deployed novels if forceAspectRatio flag is on.
	'AspectRatio': '16:9',

	// Force aspect ratio, it will make all images to comply with aspect ratio.
	// Values: 'None' (don't force), 'Visuals' (force only visuals)
	// or 'Global' (force all game)
	'ForceAspectRatio': 'None',

	// Enables or disables the typing text animation in NVL dialogs for the
	// whole game.
	'NVLTypeAnimation': true,

	// Enables or disables the typing animation for the narrator.
	// If the previous property was set to false, the narrator won't shown
	// the animation even if this is set to true.
	'NarratorTypeAnimation': true,

	// Enables or disables the typing animation for the special centered
	// character. If the TypeAnimation property was set to false, the centered
	// character won't shown the animation even if this is set to true.
	'CenteredTypeAnimation': true,

	// Force some orientation on mobile devices. If this setting is set either
	// to portrait or landscape, a warning message will be displayed so the
	// player rotates its device.
	// Possible values: any, portrait or landscape.
	'Orientation': 'landscape',

	// Allow players to skip through the game. Similar to the auto play feature,
	// skipping will allow players to go through the game really fast.
	// If this value is set to 0, no skipping will be allowed but if it's set
	// to a higher number, skipping will be allowed and that value will be taken
	// as the speed in milliseconds with which the game will skip through the script
	'Skip': 100,

	// Define the directories where the assets are located. The root directory is
	// the holder for the other asset specific directories, this directories are
	// used when retrieving the files on the game.
	'AssetsPath': {
		'root': 'assets',
		'characters': 'characters',
		'icons': 'icons',
		'images': 'images',
		'music': 'music',
		'scenes': 'scenes',
		'sounds': 'sounds',
		'ui': 'ui',
		'videos': 'videos',
		'voices': 'voices',
		'gallery': 'gallery'
	},

	// Name of the Splash Screen Label. If a name is given and a label with that
	// name exists on the game's script, it will be used to show a splash screen
	// right after the loading screen.
	'SplashScreenLabel': '_SplashScreen',

	// Define what storage engine should be used to save the game data. *
	// Adapters Available:
	// - LocalStorage: This one is used by default
	// - SessionStorage: Same as LocalStorage but will be cleared when the page
	// 					 is closed.
	// - IndexedDB: The information is saved using the IndexedDB web API
	// - RemoteStorage: The information will be sent and retrieved from a given
	//					URL Endpoint providing a REST API.
	'Storage': {
		'Adapter': 'LocalStorage',
		'Store': 'GameData',
		'Endpoint': ''
	}
});

// Initial Settings
monogatari.preferences ({
	'Language': 'Français',
	'Volume': {
		'Music': 1,
		'Voice': 1,
		'Sound': 1,
		'Video': 1
	},
	'Resolution': '1280x720',
	'TextSpeed': 10,
	'AutoPlaySpeed': 5
});

// change text box html structure
monogatari.component('text-box').template (() => `
	<div id='customCharacterName'>
			<span data-ui="who" data-content="character-name"></span>
	</div>
	<div data-content="wrapper">
		<div data-content="side-image">
			<img data-ui="face" alt="" data-content="character_expression">
		</div>
		<div data-content="text">
			<p data-ui="say" data_content="dialog"></p>
		</div>
	</div> `);
