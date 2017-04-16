'use strict';

var test = require("../engine/domManipulator/common.js");
exports.init=function(){
	test.originalloadSettings = test.loadSettings;
	test.loadSettings = function(){
		console.log("Loading settings lol");
		test.originalloadSettings();
		console.log("Modified Version:");
		console.log(test.loadSettings.toString());
		console.log("Original Version:");
		console.log(test.originalloadSettings.toString());
	}
}

/*
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
