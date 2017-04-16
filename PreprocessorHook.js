'use strict';

var templatehandler = require("../engine/templateHandler.js");
var originalprocesspage; 
exports.init = function(){
	console.log("Initialisaing preprocessorhook");
	originalprocesspage = templatehandler.processPage;
	templatehandler.processPage = function(errors, page){
		debugger;
		originalprocesspage(errors, page);
		console.log(templatehandler[page.template].toString());
	}
}

/* //Original Testcode
var A = require("../addons/testbehaviourA.js");
var B = require("../addons/testbehaviourB.js");

exports.init= function(){
	console.log("Test hook is initialising");
	A.behaviour();
	B.behaviour = function(){
		console.log("Modified behaviour");	
	};
	A.behaviour();
};*/
