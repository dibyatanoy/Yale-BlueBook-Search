var codeMenu = false;

function reverse(s){

	return s.split("").reverse().join("");
}

searchYBBCode = function(word){

	var query = word.selectionText;


	query = query.replace(/\s/g, "+");

	chrome.tabs.create({url: "https://ybb.yale.edu/search/q?term=all&number=" + query});

	
}

searchYBBTitle = function(word){

	var query = word.selectionText;

	query = query.replace(/\s/g, "+");

	chrome.tabs.create({url: "https://ybb.yale.edu/search/q?term=all&keyword=" + query});

	
}

courseCodeEnabler = function(word){

	var query = word;

	if(query.charAt(0) == " "){

		query = query.replace(/\s+/, "");
	}

	query = reverse(query);

	if(query.charAt(0) == " "){

		query = query.replace(/\s+/, "");
	}

	query = reverse(query);

	console.log(query);

	if(query.length == 8 && query.search(/\s/) == 4){

		childMenuCode = chrome.contextMenus.update("childMenuCode", {
			title: "By course code",
			contexts: ["selection"],
			onclick: searchYBBCode,
			enabled: true
		});

		codeMenu = true;

	}else{

		codeMenu = false;
		chrome.contextMenus.update("childMenuCode", {

			title: "By course code",
			contexts: ["selection"],
			onclick: searchYBBCode,
			enabled: false
		});
	}
}



var parMenu = chrome.contextMenus.create({
	title: "Search in Yale BlueBook",
	contexts: ["selection"],
	id: "parentMenu"
});

console.log("Here");
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {


    if (request.message == 'updateContextMenu') {
        
        courseCodeEnabler(request.data);

    } else {
        sendResponse({});
    }
});

var childMenuCode = chrome.contextMenus.create({
	title: "By course code",
	parentId: parMenu,
	contexts: ["selection"],
	onclick: searchYBBCode,
	id: "childMenuCode",
	enabled: true
});

var childMenuTitle = chrome.contextMenus.create({
	title: "By title (or keyword)",
	parentId: parMenu,
	contexts: ["selection"],
	onclick: searchYBBTitle
});