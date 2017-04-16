exports.Process = function(page){
	debugger;
	var xmltojs = require('xml2js');

	var xml = xmltojs.parseString(page, function(err, result){
		var lol =1;
	});

	return page;
}
