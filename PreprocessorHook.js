'use strict';
debugger;
//Add scripts in order.
var ProcessingScripts = ["test"];
var ScriptsPath = "../addons/ProcessesingScripts/"; //path to the script folder, ralative to boot.js

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
	//Scripts.append(require(ScriptsPath + file));
	
	try{
		Scripts.append([file, require(ScriptsPath + file)]);
	}catch(err){
		console.log(file+ " script not found.");
	}
});

var templatehandler = require("../engine/templateHandler.js");
var originalprocesspage; 

exports.init = function(){
	originalprocesspage = templatehandler.processPage;


	templatehandler.processPage = function(errors, page){

		debugger;
		originalprocesspage(errors, page);

		Scripts.forEach(function(script){
			page.template = script.Process(page.template);
		});

	}
}
