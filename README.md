# Lynxchan Page Processor

An addon that allows you to easily make scripts to manipulate your template pages on runtime. For example, replace certain text with with html or making all the text uppercase, if youre into that.

## LynxImport

There is a default script installed, which allows you to do php-esque includes into templates and static text files, using local text/html files. Static files will be processed upon their (first) request and templates will be processed on (re)build. The usage is as followed:

```html
<lynximport path="\static\somehtmlfile.html"></lynximport>
```

On rebuild, any lynximport tag in the templates will get replaced with the content of the file it references or left in place when errors are encountered. Static files will undergo the same upon being requested. Lynximport works recursively, so you can import files which themselves have imports. As of now, only local files can be referenced and these tags can only be used in template pages.

## Addon Hook Usage:

Write a javascript file and place it in the "ProcessingScripts" folder. Then add the name of your file (without .js) to the array of the PreproccesorHook file. Scripts are excecuted per file in order of their position in the array. Your file should at least contain the following:

```javascript
exports.Process = function(value){
//do stuff
return somestring;
}
```

With "value" and "somestring" being a string.
