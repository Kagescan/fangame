/* Shintaro OS. Part of the Retaining's memories fangame
 * Copyright (c) 2017-2019 ShinProg / Kagescan
*/
function isDescendantOfDatasetType(name, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node.dataset.type == name) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}
let shinOSinstance = {
	run(){
		this.container = document.getElementById("gamePlugins");
		this.container.classList.add("shinOs");
		this.container.classList.remove("hide");
		this.container.innerHTML = `
		<div id='shinOsWinContainer'>
			<div id='shinOsWindows'></div>
			<div id='shinOsDesktop'></div>
		</div>
		<div id='shinOsBottomBar'>
			<div id='shinOsStartMenu'>Shintaro</div>
			<div id='shinOsAppsNav'></div>
			<div id='shinOsClock'>8:30<br>08/15/20XX</div>
		</div>
		`;
		/*this.allCallbacks = [];
		document.getElementById("shinOsDesktop").addEventListener("click", function(c){
			let e = c.target;
			if (isDescendantOfDatasetType(e,"icon")){
				shinOSinstance.allCallbacks[parseInt(e.dataset.i)]();
				//shinOSinstance.addWindow(e.dataset.title);
			}
		});*/
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
	addWindow(title, content, icon){
		let win = document.createElement("div"), taskIcon = document.createElement("div");
		win.classList.add("active");
		win.innerHTML = `
		<div class='title'>
			<a href='#'><i class="fas fa-times-circle"></i></a>
			<span>${title}</span>
			<i class="fas ${icon}"></i>
		</div>
		<div class='content'>${content}</div>`;
		win.firstElementChild.firstElementChild.addEventListener('click', ()=>{ shinOSinstance.closeWindow(title); });
		taskIcon.innerHTML = `<i class="fas ${icon}"></i>`;
		taskIcon.classList.add("active");
		taskIcon.dataset.title = win.dataset.title = title;
		taskIcon.addEventListener('click', ()=>{ console.log("foobar") });
		document.getElementById("shinOsWindows").appendChild(win);
		document.getElementById("shinOsAppsNav").appendChild(taskIcon);
	},
	closeWindow(title){
		console.log(`#shinOsAppsNav [data-title=${title}]`);
		document.querySelector(`#shinOsAppsNav div[data-title=${title}]`).remove();
		document.querySelector(`#shinOsWindows div[data-title=${title}]`).remove();
	},
	addApp(title, icon="fa-file-image", callback){
		let desktopIcons = document.getElementById("shinOsDesktop");
		let newIcon = document.createElement("div");
		//let index = this.allCallbacks.length;
		newIcon.innerHTML = `<i class="fas ${icon}"></i><span>${title}</span>`;
		//newIcon.dataset.title = title;
		//newIcon.dataset.type = "icon";
		//newIcon.dataset.i = index;
		desktopIcons.appendChild(newIcon);
		newIcon.onclick = callback;
	}
}
