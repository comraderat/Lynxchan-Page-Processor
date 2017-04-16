'use strict';
debugger;
//Add scripts in order.
var ProcessingScripts = ["Example", "AllUppercase"];
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
	try{
		var fullpath = ScriptsPath + file + ".js";
		var required = require(fullpath);
		if(typeof required.Process != 'function'){
			console.log(file+ " script doesnt contain a Process function");
		}
		else{Scripts.append(required)}
	}catch(err){
		console.log(file+ " script not found or not valid.");
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
