/* Shintaro OS. Part of the Retaining's memories fangame
 * Copyright (c) 2017-2020 ShinProg / Kagescan
*/

// OPERATING SYSTEM CODE / API ---------------------------------------------- //
var shinOSinstance = {
	run(){
		this.container = document.getElementById("gamePlugins");
		this.container.classList.add("shinOs");
		this.container.innerHTML = `
		<div id='shinOsWinContainer'>
			<div id='shinOsWindows'></div>
			<div id='shinOsDesktop'></div>
		</div>
		<div id='shinOsBottomBar'>
			<div id='shinOsStartMenu'>Shintaro</div>
			<div id='shinOsAppsNav'></div>
			<div id='shinOsClock'>8:30<br>08/14/20XX</div>
		</div>
		`;
		this.started = true;
		this.show();
	},
	show(){
		let cl = this.container.classList;
		cl.remove("hide");
		cl.add("animated", "fadeInUp", "faster");
		setTimeout(()=>{
			cl.remove("animated", "fadeInUp", "faster");
		}, 800);
	},
	hide(finished = function(){}){
		let cl = this.container.classList;
		cl.add("animated", "fadeOutUp", "faster");
		setTimeout(()=>{
			cl.remove("animated", "fadeOutUp", "faster");
			cl.add("hide");
			finished();
		}, 800);
	},
	exit(){
		this.hide(()=>{
			this.container.classList.remove("shinOs");
			this.container.innerHTML = "";
			this.started = false;
			console.log("ShinOS éteint");
		});
	},
	addWindow(title, icon, callback){
		let taskIcon = document.createElement("div");
		let win = document.createElement("div");
		let winTitle = document.createElement("div");
		let winContent = document.createElement("div");
		let winSkipSection = document.createElement("div");

		winTitle.classList.add("title");
		winTitle.innerHTML = `
			<a href='#'><i class="fas fa-times-circle"></i></a>
			<span>${title}</span>  <i class="fas ${icon}"></i>`;
		winTitle.firstElementChild.addEventListener('click', ()=>{ shinOSinstance.closeWindow(title); });
		winSkipSection.classList.add("skipSection");
		winSkipSection.addEventListener("click", () => {monogatari.run("next");} );
		winContent.classList.add("content");
		win.append(winTitle, winSkipSection, winContent);
		win.classList.add("active", "animated", "zoomIn", "faster");

		taskIcon.innerHTML = `<i class="fas ${icon}"></i>`;
		taskIcon.classList.add("active");
		taskIcon.dataset.title = win.dataset.title = title;
		taskIcon.addEventListener('click', ()=>{ console.log("icône cliquée") });
		taskIcon.classList.add("active", "animated", "flipInX", "faster");

		setTimeout(()=>{
			win.classList.remove("animated", "zoomIn", "faster");
			taskIcon.classList.remove("animated", "flipInX", "faster");
		}, 800);
		document.getElementById("shinOsWindows").appendChild(win);
		document.getElementById("shinOsAppsNav").appendChild(taskIcon);
    callback(winContent);
    //callback(win.lastElementChild);
	},
	closeWindow(title){
		let win = document.querySelector(`#shinOsWindows div[data-title=${title}]`);
		let taskIcon = document.querySelector(`#shinOsAppsNav div[data-title=${title}]`);
		win.classList.add("animated", "zoomOut", "fast");
		taskIcon.classList.add("animated", "flipOutX", "faster");
		setTimeout(()=>{
			win.remove();
			taskIcon.remove();
		}, 800);
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
	},
	showTextBox() {
		// !! will work only on the active windows, but since the OS still don't
		//    handle multiples windows, that's not a problem...
		this.blurredWin = document.querySelector("#shinOsWindows .active");
		this.skipSection = document.querySelector("#shinOsWindows .skipSection");
		this.textboxComponent = document.querySelector(`text-box`);
		this.showTextBoxEnabled = true;
		this.blurredWin.style.filter = "blur(4px)";
		this.skipSection.style.display = "block";
		this.textboxComponent.style.zIndex = 12;
		// IDEA: maybe making a transition for the blur + brightness effect
	},
	hideTextBox() {
		this.blurredWin.style.removeProperty("filter");
		this.skipSection.style.removeProperty("display");
		this.textboxComponent.style.zIndex = 10;
		this.showTextBoxEnabled = false;
	}
}


// BROWSER CODE --------------------------------------------------------------//

var kageBrowser = {
  hi: "Pas d'éléments",
  history: [{title: "page d'acceuil", url: "home"}],

  start(e, hi=""){
		// Shintaro OS still don't have an api to chance the window's title
		document.querySelector(`div[data-title="web"]>.title>span`).innerText = "Web Browser";
    this.container = e;
    if (hi!="") this.hi = hi;
		e.id = "kageBrowserContainer";
    e.innerHTML = `
      <div id='kageBrowserSearchbar'>
        <a id='kageBrowserHomebtn' title='return to the Home Page'><i class='fas fa-home'></i></a>
        <div> <input name='search' title='Search on the web'></input>
				<a title='Rechercher'><i class='fas fa-search'></i></a> </div>
      </div>
      <div id='kageBrowserPageContent'> </div>`;
    this.pageContent = e.querySelector("#kageBrowserPageContent");
		this.searchbar = e.querySelector(`input[name="search"]`);
    e.querySelector("#kageBrowserHomebtn").addEventListener("click", (e)=>{ kageBrowser.home(); });
    this.home();
  },
  home(){
		if (this.pageContent.id !== "kageBrowserPageContent") {
			this.pageContent.id = "kageBrowserPageContent";
		}
		if (this.searchbar.value !== "") {
			this.searchbar.value = "";
		}
    this.pageContent.innerHTML = `<p>Top Sites</p> <div id='kageBrowserHighlights'> ${this.hi} </div>`;
    this.container.querySelectorAll("#kageBrowserHighlights a").forEach(function(a){
      a.addEventListener("click", function(event){
        event.preventDefault();
        if (a.dataset.action == "monogatari"){
          monogatari.run(a.dataset.arg);
        } else if (a.dataset.action == "builtin") {
					let type = typeof kageBrowser[a.dataset.arg];
        	if (type === "function") {
						kageBrowser[a.dataset.arg]();
					}
        }
      });
    });
  },

	// MAILER CLIENT
	mailClient() {
		this.searchbar.value = "shintaro.kisaragi@outerlook.jp";
		this.pageContent.innerHTML = `
		  <div id="mail_boxes">
		  </div>
		  <div id="mail_msgs">
		  </div>`;
		this.pageContent.id="mailClient";

		const sideMenu = document.getElementById("mail_boxes");
		const boxesList = document.createElement("div");
		const msgsList = document.getElementById("mail_msgs");
		const backBtn = document.createElement("a");
		this.msgsList  =  msgsList; // Make it global

		for (const box_name in this.mailList) {
			const boxButton = document.createElement("div");
			boxButton.innerText = box_name;
			boxButton.addEventListener("click", function () {
				kageBrowser.showMailBox(boxButton);
			});
			boxesList.append(boxButton);
		}

		backBtn.innerText = "Quit the mail client";
		backBtn.id="exitMailer";
		backBtn.addEventListener("click", function(){kageBrowser.home()});

		// creating an empty element will center backBtn
		sideMenu.append(boxesList, backBtn, document.createElement("span"));
		this.showMailBox(boxesList.firstElementChild);
	},
	showMailBox(mailbox_el) {
		this.msgsList.className = "list";

		const mailbox_id = mailbox_el.innerText;
		const oldActive = document.querySelector("#mail_boxes .active");
		if (oldActive) {
			oldActive.classList.remove("active");
		}
		mailbox_el.classList.add("active");

		const mailboxContent = this.mailList[mailbox_id];
		this.msgsList.innerHTML = "";
		for (const i in mailboxContent) {
			const mailBtn = document.createElement("div");
			mailBtn.innerHTML = `
			    <div> <span class="target">${mailboxContent[i].target}</span>
			     <br> <span>${mailboxContent[i].title}</span> </div>
			    <span class="date">${mailboxContent[i].date}</span>
				`;
			mailBtn.addEventListener("click", function () {
				kageBrowser.showMessage(mailboxContent[i], mailbox_el);
			});
			this.msgsList.append(mailBtn);
		}
	},
	showMessage(content, mailbox) {
		this.msgsList.className = "preview";
		const header = document.createElement("div");
		const backBtn = document.createElement("button");
		const title = document.createElement("h2");
		const descr = document.createElement("em");
		const message = document.createElement("div");

		backBtn.innerText = "Go Back";
		backBtn.addEventListener("click", ()=> {kageBrowser.showMailBox(mailbox)} );
		title.innerText = content.title;
		message.innerHTML = content.content;
		descr.innerHTML = `${content.target} ${content.date}`;
		this.msgsList.innerHTML = "";
		header.append(backBtn, title, descr);
		this.msgsList.append(header, message);

		if (typeof content["onMounted"] === "function") {
			content.onMounted();
		}
	},
	mailList: {
		"Shintaro's mail box": [
				{ title: "School’s Obon Festival cancelled due to extreme temperatures",
				  target: "From &lt;  club@Kxxx_School.ed.jp&gt;", date: "2 hours ago",
					content: ""
				},
				{title: "Amezon.co.jp delivery tracking",
				 target: "From &lt;noreply@amezon.co.jp&gt;", date: "6 hours ago",
				 content: ""}
		],
		"Spams": [
				{ title: "Test",
				  target: "From &lt;unknown&gt;", date: "1 year ago",
				  content: `<button id="mail_attm">目を覚ます.doc</button>
						Important message from XX.`,
					onMounted: () => {
						document.getElementById("mail_attm").addEventListener (
							"click", () => { monogatari.run("jump chapter01-eneOrigins"); }
						);
					}
				}
		],
		"Drafts": [
		],
		"Sent": [
				/*{title: "a mail sent", target: "", date: "", content: ""}*/
		],
		"Deleted": [
				{title: "Getting ready for the apocalypse !",
				 target: "From &lt;dailyNews.C-n3ws.jp&gt;", date: "1 day ago",
				 content: ""
			  },
				{title: "New rules from the KxxxPro anime discord",
				 target: "From &lt;noreply.discord.com &gt;", date: "2 days ago",
				 content: "The medusae boss"
			 }
		],
	}
}
