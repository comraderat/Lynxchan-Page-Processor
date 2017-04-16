'use strict';

var A = require("../addons/testbehaviourA.js");
var B = require("../addons/testbehaviourB.js");

exports.init= function(){
	console.log("Test hook is initialising");
	A.behaviour();
	B.behaviour = function(){
		console.log("Modified behaviour");	
	};
	A.behaviour();
};
