let tab = null;

let version = "0.1.0"

function getversion() {
	return version;
}



function getMessage(){
		$.getJSON(
		    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/messages.json', 
		    function(data) {
				$("#message").html(data["version"])
			}
		);
}

function emoteurl(str, ft){
	return `<img style="vertical-align:middle;height:20px;" title="` + str +`" src='https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/emotes/` + str + `.` + ft + `' />`;
}

//function emoteurl(str, ft){
	//return 'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/emotes/' + str + '.' + ft;
//}

function refreshEmotes() {
	$.getJSON(
	    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/emotes.json', 
	    function(data) {
			// console.log(data);
			let text = "";
			data["filetypes"].forEach(type => {
				data["emotes"][type].forEach(e => {
					//text += `<img style="vertical-align:middle;height:20px;" src='${emoteurl(e, type)}' /> :${e}:</br>`;
					text += emoteurl(e, type);
					text += ` :${e}:</br>`
					$("#emotes").html(text);
				});
			});
		}
	);
}

$(document).ready(function(){
	$("#version").html("version " + getversion())
	getMessage();
	refreshEmotes();
});
