document.addEventListener("mousedown", function(event){
    

	document.addEventListener("mouseup", function(event){

		var selected = window.getSelection().toString();

	    if(selected != '') {
	        //get selected text and send request to bkgd page to create menu
	        chrome.extension.sendMessage({
	            'message': 'updateContextMenu', 
	            'selection': true,
	            'data': selected
	        });
	    }
	}, true)
    
}, true);