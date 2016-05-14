searchYBB = function(word){

	var query = word.selectionText;

	

	query = query.replace(/\s/g, "+");

	chrome.tabs.create({url: "https://ybb.yale.edu/search/q?term=all&number=" + query});

	
}

chrome.contextMenus.create({
	title: "Search in Yale BlueBook",
	contexts: ["selection"],
	onclick: searchYBB
});