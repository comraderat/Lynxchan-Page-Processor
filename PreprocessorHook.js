'use strict';

var A = require("testbehaviourA");
//var B = require("testbehaviourB");

exports.init= function(){
	console.log("Test hook is initialising");
	A.behaviour();
	B.behaviour = function(){
		console.log("Modified behaviour");	
	};
	A.behaviour();
};
