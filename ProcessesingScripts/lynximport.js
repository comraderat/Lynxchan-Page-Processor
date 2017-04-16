exports.Process = function(page){
	debugger;
	var jsdom = require('jsdom').jsdom;

	var document = jsdom(page);

	var list = document.getElementsByTagName("div");
	
	for(var i =0 ; i<list.length; i++){
		
	}
	
	return page;
}
