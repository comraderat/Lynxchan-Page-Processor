var templatehandler

exports.Process = function(page){
	debugger;
	var jsdom = require('jsdom').jsdom;
	var serializer = require('jsdom').serializeDocument;

	var document = jsdom(page);

	var list = document.getElementsByTagName("lynximport");
	
	for(var i =0 ; i<list.length; i++){
		debugger;
		var path = list[i].getAttribute("path");
		try{
			var replacement = fs.readFileSync(path);
		}catch(err){
			console.log("Couldn't find file: " + path.toString());
			debugger;
		}
		try{
			replacement = replacement.toString();
			replacement = jsdom(replacement);
		}catch(err){
			console.log("Couldn't make html from loaded file");
			debugger;
		}
		list[i].parentNode.replaceChild(replacement, list[i]);
	}
	return serializer(document);
}
