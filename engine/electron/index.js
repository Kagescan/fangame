/**
 * =======================================
 * Monogatari Electron Configuration
 * =======================================
 **/

'use strict';

/* global require */
/* global process */
/* global __dirname */

const { app, BrowserWindow } = require ('electron');
const path = require ('path');
const url = require ('url');
const { ipcMain } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow ({

		// Title that will be shown in the window (Your game's title)
		title: '',

		// Set the minimal window size
		minWidth: 640,
		minHeight: 360,


		// Set the initial window size
		width: 960,
		height: 540,

		// If resize is disabled, the resolution chooser will show in
		// the settings screen.
		resizable: true,

		// Other settings
		enableLargerThanScreen: false,
		center: true,

		// Full Screen options
		fullscrenable: true,

		// Set an icon for the window
		icon: __dirname + '/assets/icons/icon_128x128.png',

		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			// contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join (app.getAppPath (), '/engine/electron/preload.js')
		}
	});

	// and load the index.html of the app.
	win.loadURL (url.format(
		{
			pathname: path.join(__dirname, '/../../index.html'),
			protocol: 'file:',
			slashes: true
		}
	));

	// Emitted when the window is closed.
	win.on ('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});

	const { screen } = require ('electron');
	const [ minWidth, minHeight ] = win.getMinimumSize ();
	const { width: maxWidth, height: maxHeight } = screen.getPrimaryDisplay ().workAreaSize;

	ipcMain.on ('window-info-request', (event, args) => {
		const { title, resizable } = args;

		if (title) {
			win.setTitle (title);
		}

		if (resizable === false) {
			win.setResizable (false);
		}

		event.sender.send ('window-info-reply', {
			resizable,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight
		});
	});

	ipcMain.on ('resize-request', (event, args) => {
		const { width, height, fullscreen } = args;

		const fullScreenCapable = !win.isFullScreen () && win.isFullScreenable ();

		win.setResizable (true);
		if (fullscreen && fullScreenCapable) {
			win.setFullScreen(true);
		} else if (fullscreen === false) {
			win.setFullScreen (false);
			win.setSize (width, height, true);
		}
		win.setResizable (false);

		event.sender.send ('resize-reply', {
			fullscreen: fullscreen && fullScreenCapable,
			width,
			height
		});
	});

	ipcMain.on ('quit-request', (event, args) => {
		win.destroy ();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on ('ready', createWindow);

// Quit when all windows are closed.
app.on ('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit ();
	}
});

app.on ('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow ();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.