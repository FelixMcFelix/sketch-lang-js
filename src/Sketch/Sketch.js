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
	this.parser = sketchParse;
	this.codeGen = null;
	this.shaderManager = new Palette.Manager(context);
	this.vm = new MVM(this.context, this.shaderManager, this.codeStore, this.constantPool, false);
}

Sketch.prototype = {
	addShader: function(text){
		//Adds a shader
	},

	addShaderURL: function(url){
		//Adds a shader
	},

	compile: function(text){
		//Compiles the program text, execution begins
	}
};


Sketch.createSketch = function(inCanvas){
	out = new Sketch(inCanvas);
	out.addShader("shaders/simpleSquareShader.json");
	return out;
}