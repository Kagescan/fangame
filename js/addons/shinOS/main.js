/* Shintaro OS. Part of the Retaining's memories fangame
 * Copyright (c) 2017-2020 ShinProg / Kagescan
*/

// todo (low priority) : convert all this code into JS modules

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
		if (cl.contains("hide")) {
			cl.remove("hide");
			cl.add("animated", "fadeInUp", "faster");
			setTimeout(()=>{
				cl.remove("animated", "fadeInUp", "faster");
			}, 800);
		}
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
		this.skipSection.style.background = "rgba(0,0,0,0.4)";
		this.textboxComponent.style.zIndex = 12;
	},
	hideTextBox() {
		this.blurredWin.style.removeProperty("filter");
		this.skipSection.style.removeProperty("display");
		this.skipSection.style.removeProperty("background");
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
		// TODO: add read/undread states
		"Shintaro's mail box": [
				{title: "School’s Obon Festival cancelled due to extreme temperatures",
				 target: "From &lt;studentcouncil@Kxxx_School.ed.jp&gt;", date: "2 hours ago",
				 content: `<p>Hello,<br>
					Due to extreme temperatures, the School’s Obon Festival is
					unfortunately cancelled this year.</p>
					<p>Respectfully yours,<br>
					Kashiwa High School Student Council</p>`,
 				 onMounted: function () {
 				 	simpleReactionToMailFromShin(
 						"I wouldn’t have gone anyway. Why am I still getting emails from school anyway…?"
 					);
 				 }
				},
				{title: "Amezon.co.jp delivery tracking",
				 target: "From &lt;noreply@amezon.co.jp&gt;", date: "7 months ago",
				 content: `
					 <div style="background: linear-gradient(180deg, rgba(0,0,0,0) calc(50% - 1px), rgba(192,192,192,1) calc(50%), rgba(0,0,0,0) calc(50% + 1px));display: flex;align-items: center;">
					   <span style="background: #f8f8f8;font-weight: bold; font-size: 1.4em;">AMEZON</span>
					   <em style="margin-left: 20%;background: #f8f8f8;padding: 0 1rem;color: #AAA;">Confirmation of your order</em>
					 </div>
					 <h3 style="color: orange">Hello Shintaro,</h3>
					 <p>Thank you for your order on the Amezon marketplace.<br>
					   Your estimated delivery date is shown below. You can track the status
					   of your order or modify it in "Your Orders" on Amezon.co.jp
					 </p>
					 <div style="display: flex;border-top: 2px solid black;background: #DDD;align-items: center;justify-content: space-around;color: #555;">
					   <div>
					     <p>Shipping :<br><b style="color: green">February 14th, 20XX</b></p>
					     <p>Your shipping method : <br><b style="color: #000;">Fast</b></p>
					     <p style="background: orange;text-align: center;border-radius: 4px;border: 2px solid #264b99;color: #000;cursor: pointer;">Order details</p>
					   </div>
					   <div>
					     <span>Your order will be shipped to :</span>
					     <p style="color: #000;">
					       Shintaro Kisaragi<br>
					       7X, imperial Way <br>
					       277-XXXX Kashiwa-shi, JAPAN
					     </p>
					   </div>
					 </div>
					 <p></p>
					 <h3 style="color: orange;border-bottom: 2px solid #AAA;">Order details</h3>
					 <p style="font-size: 1.1rem;">Command No <span style="color: #33a8ff;">554-0258415-1142332</span><br>
					   <span style="color: #aaa;">order placed on 14 February 20XX</span>
					 </p>
					 <table style="width: 100%;border: none;">
					   <thead style="">
					     <tr>
					       <th></th>
					       <th>Info</th>
					       <th>Price</th>
					     </tr>
					   </thead>
					   <tbody style="">
					     <tr>
					       <td style="text-align: center;"><img alt="vocaloid 4, thumb" src="assets/images/vocaloidBox.jpg"></td>
					       <td>VOCALOID 4 - HATSUNE MIKU<br>
					         <em>Secondhand buy</em>
					       </td>
					       <td>USD 110.00</td>
					     </tr>
					     <tr>
					       <td style="text-align: center;"><img alt="Vocaloid for dummies, thumb" src="assets/images/vocaForDummies.jpg"></td>
					       <td>VOCALOID - FOR DUMMIES<br><em>Sold by For Dummies</em></td>
					       <td>USD 25.00</td>
					     </tr>
					     <tr>
					       <td colspan="2" style="text-align: right;">Sub-total : <br>
					         Postage and packing : <br><b>Total amount : </b>
					       </td>
					       <td>USD 135.00
					         <br>USD 5.00<br><b>USD 140.00</b><br>
					       </td>
					     </tr>
					   </tbody>
					 </table>
					 <p>If you use a mobile device, you can receive notifications on
					   the delivery of your package and track it from our mobile application amezon
					 </p>
					 <p>We hope to see you soon!<br>
					   <b style="font-size: 2rem;">AMEZON JAPAN</b>
					 </p>
					 <p><br></p>
					 `,
				 onMounted: function () {
				 	simpleReactionToMailFromShin(
						"I got a new VOCALOID2 voicebank a few months ago, even though I still haven’t finished a song.",
						"It’s not like I have anything else to do anyway. I should work on that soon."
					);
				 }
			 }
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
				{title: "Getting ready for the 2020 apocalypse !",
				 target: "From &lt;dailyNews@C-n3ws.jp&gt;", date: "1 day ago",
				 content: "",
				 onMounted: function () {
				 	simpleReactionToMailFromShin(
						"News nowadays aren’t what they used to be. I wish they were still this interesting."
					);
				 }
			  },
				{title: "New rules from the KxxxPro anime discord",
				 target: "From &lt;noreply@discord.com &gt;", date: "2 days ago",
				 content: "The medusae boss",
				 onMounted: function () {
				 	simpleReactionToMailFromShin(
						"That makes me think…",
						"I’m pretty sure there are discord servers about that multimedia series I’ve gotten into, I’ll check later. "
					);
				 }
			 }
		],
	}
}
function simpleReactionToMailFromShin(...lines) {
	// helper for performMonogatariACE; but is it really needed ?
	let code = [
		shinOSinstance.showTextBox
	];
	for (var line of lines) {
		code.push(line);
	}
	code.push(shinOSinstance.hideTextBox);
	performMonogatariACE(code);
}
function performMonogatariACE(code = [""]) {
	monogatari.script()["ACE"] = code;
	monogatari.run("jump ACE");
}
