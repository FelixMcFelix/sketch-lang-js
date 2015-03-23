/**
 * @namespace Sketch
 */
var Sketch = function(canvas){
	//Canvas-y stuff;
	this.canvas = canvas;
	this.context = canvas.getContext("webgl");

	//Space hold-y stuff.
	this.codeStore = [];
	this.constantPool = [];

	//Modules.
	this.parser = null;
	this.codeGen = null;
	this.shaderManager = new Palette.Manager(context);
	this.vm = new MVM(this.context, this.shadermanager, this.codStore, this.constantPool, false);
}

Sketch.prototype = {
	addShader: function(){

	},

	compile: function(text){

	}
};


Sketch.createSketch = function(inCanvas){
	out = new Sketch(inCanvas);
	out.addShader("shaders/simpleSquaeShader.json");
	return out;
}