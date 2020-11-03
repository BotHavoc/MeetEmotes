let emotes = [];
let emoteslink = [];

function replaceAll(str, from, to){
	return str.split(from).join(to);
}

function getClass() {
	let url = window.location.href;
	if(url.includes("messenger")){
		return "_3oh- _58nk";
	} else if(url.includes("meet")){
		return "oIy2qc";
	}
}

function emoteurl(str, ft, height=20){
	return `<img style="vertical-align:middle;height:` + height + `px;" title="` + str +`" src='https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/emotes/` + str + `.` + ft + `' />`;
}

function updateEmotes(){
	//console.log("update.");
	if(emotes.length) return;
	$.getJSON(
	    'https://raw.githubusercontent.com/BotHavoc/MeetEmotes-emotes/main/emotes.json', 
	    function(data) {
			// console.log(data);
			let text = "";
			data["filetypes"].forEach(type => {
				data["emotes"][type].forEach(e => {
					emotes.push(e);
					emoteslink.push(type);
				});
			});
		}
	);
}

(function () {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function (mutations, observer) {
		updateEmotes();
        const textbox = document.getElementsByClassName(getClass());
        for(let t of textbox) {
            let val = t.innerHTML;
            let h = 20;
            if(val.startsWith(":") && val.endsWith(":") && emotes.includes(val.slice(1,-1))){
				h = 30;
			}
            let newval = val;
            let n=0;
            emotes.forEach(e => {
				n++;
				newval = replaceAll(newval, `:${e}:`,emoteurl(e, emoteslink[n-1], h));
				if(n==emotes.length){
					t.innerHTML = newval;
				}
			})
        };
    });
    observer.observe(document, {
        subtree: true,
        attributes: true
    });

})();

