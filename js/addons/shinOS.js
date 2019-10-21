/* Shintaro OS. Part of the Retaining's memories fangame
 * Copyright (c) 2017-2019 ShinProg / Kagescan
*/

let shinOSinstance = {
	run(){
		this.container = document.getElementById("gamePlugins");
		this.container.classList.add("shinOs");
		this.container.classList.remove("hide");
		this.container.innerHTML = `
		<div id='shinOsWinContainer'>
			<div id='shinOsDesktop'></div>
			<div id='shinOsWindows'></div>
		</div>
		<div id='shinOsBottomBar'>
			<div id='shinOsStartMenu'></div>
			<div id='shinOsAppsNav'></div>
		</div>
		`;
	this.allCallbacks = [];
		this.windowContainer = document.getElementById("shinOsWinContainer");
		document.getElementById("shinOsDesktop").addEventListener("click", function(c){
			let e = c.target;
			if (e.dataset.type=="icon"){
				console.log(shinOSinstance.allCallbacks, parseInt(e.dataset.i))
				shinOSinstance.allCallbacks[parseInt(e.dataset.i)]();
				//shinOSinstance.addWindow(e.dataset.title);
			}
		});
		console.log("shinOs démarré");
	},
	toggle(){
		this.container.classList.toggle("hide");
	},
	exit(){
		this.container.classList.add("hide");
		this.container.classList.remove("shinOs");
		this.container.innerHTML = "";
		console.log("ShinOS éteint");
	},
	addWindow(t){
		console.log(t);
		/*desk = this.windowContainer;
		var newDiv = document.createElement("div");*/
	},
	addApp(t, callback){
		let desktopIcons = document.getElementById("shinOsDesktop");
		let newIcon = document.createElement("div");
		let i = this.allCallbacks.length;
		newIcon.innerHTML = t;
		newIcon.dataset.title = t;
		newIcon.dataset.type = "icon";
		newIcon.dataset.i = i;
		desktopIcons.appendChild(newIcon);
		this.allCallbacks[i] = callback;
	}
}