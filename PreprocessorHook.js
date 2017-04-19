'use strict';
//Add scripts in order.
var ProcessingScripts = ["lynximport"];
var ScriptsPath = "../addons/ProcessesingScripts/"; //path to the script folder, ralative to boot.js
exports.engineVersion = "1.7.6";
/*
The script should have the function "Process(string)" with a return type of string. Like so
exports.Process = function(somestring){
	//do stuff
	return somestring;
}
*/



//------------------------------------------------------------------

var Scripts = [];
ProcessingScripts.forEach(function(file){
	try{
		var fullpath = ScriptsPath + file + ".js";
		var required = require(fullpath);
		if(typeof required.Process != 'function'){
			console.log(file+ " script doesnt contain a Process function");
		}
		else{Scripts.push(required)}
	}catch(err){
		debugger;
		console.log(file+ " script not found or not valid.");
	}
});

var templatehandler = require("../engine/templateHandler.js");
var statichandler = require("../engine/staticHandler.js");
var miscOps = require("../engine/miscOps.js");

var originalTestPageFields;
var originalStaticCompress;

exports.init = function(){
	originalTestPageFields = templatehandler.testPageFields;
	originalStaticCompress = statichandler.compress;

	//static file processing (called upon first request of files)
	statichandler.compress = function(pathName, file, mime, callback){
		if(pathName.length > 4){
			if(pathName.slice(-5) == ".html"){			
				if(miscOps.isPlainText(mime)){
					var pagestring = file.content.toString('utf8');
					Scripts.forEach(function(script){
						pagestring = script.Process(pagestring);
					});
					file.content = Buffer.from(pagestring, 'utf8');
				}
			}
		}
		originalStaticCompress(pathName, file, mime, callback);
	}

	//template page processing (called on build)
	templatehandler.testPageFields = function(document, page, errors){
		
		var pagestring = this[page.template].toString('utf8');
		Scripts.forEach(function(script){
			pagestring = script.Process(pagestring);
		});
		this[page.template] = Buffer.from(pagestring, 'utf8');
		document = require('jsdom').jsdom(this[page.template]);
		return originalTestPageFields(document, page, errors);
	}
}
