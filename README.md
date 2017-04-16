#Lynxchan Page Processor#
An addon that allows you to easily make scripts to manipulate your template pages on runtime. For example, replace <navbar></navbar> with html from a shared navbar file. Or making all the text uppercase, if youre into that.

##Usage:
Write a javascript file and place it in the "ProcessingScripts" folder. Then add the name of your file (without .js) to the array of the PreproccesorHook file. Scripts are excecuted per file in order of their position in the array. Your file should at least contain the following:

exports.Process = function(value){
//do stuff
return somestring;
}

With "value" and "somestring" being a string.
