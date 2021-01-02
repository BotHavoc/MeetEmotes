const branch = "main";
const version = "0.1.2";

function getversion() {
	return version;
}

function putEmote(e) {
	chrome.tabs.sendMessage(tab.id, {emote: e}, function(response) {
		console.log(response.msg);
	});
}

function getMessage(){
		$.getJSON(
		    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/' + branch + '/messages.json', 
		    function(data) {
				$("#message").html(data[version])
			}
		);
}

function emoteurl(str, dir){
	return `<img class="emotes" style="vertical-align:middle;height:20px;" title="` + str +`" src='https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/` + branch + `/emotes/` + dir + `' />`;
}

function newBundle(hdr){
	return "<p><b>" + hdr + "</b></p>";
}

function newEmotes(str){
	return `<p class="dc">` + str + `</p>`;
}

function refreshEmotes() {
	$.getJSON(
	    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/' + branch + '/emotes.json', 
	    function(data) {
			// console.log(data);
			let text = "";
			Object.keys(data["bundles"]).forEach(b => {
				text += newBundle(b);
				let nem = ""; let nn = 0;
				Object.keys(data["bundles"][b]).forEach(e => {
					nn++;
					//text += `<img style="vertical-align:middle;height:20px;" src='${emoteurl(e, type)}' /> :${e}:</br>`;
					nem += emoteurl(e, data["bundles"][b][e]);
					nem += ` :${e}:</br>`;
					if(nn == Object.keys(data["bundles"][b]).length){
						text += newEmotes(nem);
						$("#emotes").html(text);
					};
				});
			});
		}
	);
};

$(document).ready(function(){
	$("#version").html("version " + getversion());
	getMessage();
	refreshEmotes();
});
