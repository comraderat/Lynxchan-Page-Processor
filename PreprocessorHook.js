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
var originalTestPageFields; 

exports.init = function(){
	originalTestPageFields = templatehandler.testPageFields;


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
