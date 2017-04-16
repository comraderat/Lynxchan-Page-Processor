var fePath = __dirname + "/../../../fe";
var fs = require('fs');


exports.Process = function(page){
	
	var jsdom = require('jsdom').jsdom;
	var serializer = require('jsdom').serializeDocument;

	var document = jsdom(page);

	var list = document.getElementsByTagName("lynximport");
	
	for(var i =0 ; i<list.length; i++){
		debugger;
		var path = list[i].getAttribute("path");
		path = fePath + path;
		try{
			var replacement = fs.readFileSync(path);
			try{
				replacement = replacement.toString();
				replacement = jsdom(replacement);
				var toreplace = list[i];
				var parent = toreplace.parentNode;
				parent.replaceChild(replacement, toreplace);
				//list[i].parentNode.replaceChild(replacement, list[i]);
			}catch(err){
				console.log("Couldn't make html from loaded file");
				debugger;
			}

		}catch(err){
			console.log("Couldn't find file: " + path.toString());
			debugger;
		}
	}
	return serializer(document);
}
