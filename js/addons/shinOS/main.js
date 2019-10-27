/* Shintaro OS. Part of the Retaining's memories fangame
 * Copyright (c) 2017-2019 ShinProg / Kagescan
*/
/*function isDescendantOfDatasetType(name, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node.dataset.type == name) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}*/
var shinOSinstance = {
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
		this.started = true;
		console.log("shinOs démarré");
		/*this.allCallbacks = [];
		document.getElementById("shinOsDesktop").addEventListener("click", function(c){
			let e = c.target;
			if (isDescendantOfDatasetType(e,"icon")){
				shinOSinstance.allCallbacks[parseInt(e.dataset.i)]();
				//shinOSinstance.addWindow(e.dataset.title);
			}
		});*/
	},
	show(){
		this.container.classList.remove("hide");
	},
	hide(){
		this.container.classList.add("hide");
	},
	exit(){
		this.container.classList.add("hide");
		this.container.classList.remove("shinOs");
		this.container.innerHTML = "";
		this.started = false;
		console.log("ShinOS éteint");
	},
	addWindow(title, icon, callback){
		let win = document.createElement("div"), taskIcon = document.createElement("div");
		win.classList.add("active");
		win.innerHTML = `<div class='title'>  <a href='#'><i class="fas fa-times-circle"></i></a>  <span>${title}</span>  <i class="fas ${icon}"></i></div>    <div class='content'></div>`;
		win.firstElementChild.firstElementChild.addEventListener('click', ()=>{ shinOSinstance.closeWindow(title); });
		taskIcon.innerHTML = `<i class="fas ${icon}"></i>`;
		taskIcon.classList.add("active");
		taskIcon.dataset.title = win.dataset.title = title;
		taskIcon.addEventListener('click', ()=>{ console.log("icône cliquée") });
		document.getElementById("shinOsWindows").appendChild(win);
		document.getElementById("shinOsAppsNav").appendChild(taskIcon);
    callback(win.lastElementChild);
	},
	closeWindow(title){
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




var kageBrowser = {
  hi: "Pas d'éléments",
  history: [{title: "page d'acceuil", url: "home"}],
  start(e, hi=""){
    this.container = e;
    if (hi!="") this.hi = hi;
    e.innerHTML = `
      <div id='kageBrowserSearchbar'>
        <div> <span id='kageBrowserHomebtn'><i class='fas fa-home'></i></span> </div>
        <div> <input name='search' title='Rechercher sur le web'></input> <a title='Rechercher'><i class='fas fa-search'></i></a> </div>
      </div>
      <div id='kageBrowserPageContent'> </div>`;
    this.pageContent = e.querySelector("#kageBrowserPageContent");
    e.querySelector("#kageBrowserHomebtn").addEventListener("click", (e)=>{ kageBrowser.home(); });
    this.home();
  },
  home(){
    console.log("home");
    this.pageContent.innerHTML = `<p>Sites les plus visités</p> <div id='kageBrowserHighlights'> ${this.hi} </div>`;
    this.container.querySelectorAll("#kageBrowserHighlights a").forEach(function(a){
      a.addEventListener("click", function(event){
        event.preventDefault();
        if (a.dataset.action == "monogatari"){
          monogatari.run(a.dataset.arg);
        }
      });
    });
  }
}
