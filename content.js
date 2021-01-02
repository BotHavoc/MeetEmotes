let updated = 0;
let emotes = {};
const branch = "main";

function replaceAll(str, from, to){
	return str.split(from).join(to);
}

function getClass() {
	let url = window.location.href;
	if(url.includes("messenger")){
		return ["_3oh- _58nk","ljqsnud1"];
	} else if(url.includes("meet")){
		return ["oIy2qc"];
	}
}

function emoteurl(str, dir, height=20){
	return `<img style="vertical-align:middle;height:` + height + `px;" title="` + str +`" src='https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/` + branch + `/emotes/` + dir + `' />`;
}

function updateEmotes(){
	if(updated) return;
	$.getJSON(
	    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/' + branch + '/directory.json', 
	    function(data) {
			updated = 1;
			emotes = data;
		}
	);
}

(function () {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function (mutations, observer) {
		updateEmotes();
		const classes = getClass();
		classes.forEach(cname => {
	        const textbox = document.getElementsByClassName(cname);
	        for(let t of textbox) {
	            let val = t.innerHTML;
	            let h = 20;
	            if(val.startsWith(":") && val.endsWith(":") && emotes["emotes"].includes(val.slice(1,-1))){
					h = 30;
				}
	            let newval = val;
	            let n=0;
	            emotes["emotes"].forEach(e => {
					n++;
					newval = replaceAll(newval, `:${e}:`,emoteurl(e, emotes["dir"][e], h));
					if(n==emotes["emotes"].length){
						t.innerHTML = newval;
					}
				})
	        };
		});
    });
    observer.observe(document, {
        subtree: true,
        attributes: true
    });

})();

