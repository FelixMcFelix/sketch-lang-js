/**
 * @classdesc The driver class for the sketch module. Initialise via Sketch.createSketch(...) for default configs.
 * @class Sketch.Driver
 * @param {HTMLCanvasElement} canvas - The canvas element that sketch will be targeting.
 */
Sketch.Driver = function(canvas){
	/**
	 * Internal counter used to block execution calls while shaders are still being added.
	 * @name Sketch.Driver#readyLock
	 * @type int
	 * @private
	 */
	this.readyLock = 0;

	//Canvas-y stuff;
	/**
	 * The module's attached canvas.
	 * @name Sketch.Driver#canvas
	 * @type HTMLCanvasElement
	 * @protected
	 * @readonly
	 */
	this.canvas = canvas;
	/**
	 * The module's attached context.
	 * @name Sketch.Driver#context
	 * @type WebGLRenderingContext
	 * @protected
	 * @readonly
	 */
	this.context = canvas.getContext("webgl", {preserveDrawingBuffer: true});

	//Space hold-y stuff.
	/**
	 * The VM's code store.
	 * @name Sketch.Driver#codeStore
	 * @type Array
	 * @protected
	 */
	this.codeStore = [];
	/**
	 * The VM's constant pool.
	 * @name Sketch.Driver#constantPool
	 * @type Array
	 * @protected
	 */
	this.constantPool = [];

	//Modules.
	/**
	 * A reference to the parser.
	 * @name Sketch.Driver#parser
	 * @type Parser
	 * @protected
	 * @readonly
	 */
	this.parser = sketchParse;
	/**
	 * The module's reference to the code generator.
	 * @name Sketch.Driver#codeGen
	 * @type Object
	 * @protected
	 * @readonly
	 */
	this.codeGen = null;
	/**
	 * The module's reference to the shader manager.
	 * @name Sketch.Driver#shaderManager
	 * @type Palette.Manager
	 * @protected
	 * @readonly
	 */
	this.shaderManager = new Palette.Manager(context);
	/**
	 * The module's reference to the VM.
	 * @name Sketch.Driver#vm
	 * @type MVM
	 * @protected
	 * @readonly
	 */
	this.vm = new MVM(this.context, this.shaderManager, this.codeStore, this.constantPool, false);
};

Sketch.Driver.prototype = {
	/**
	 * Add a shader from an already-resolved JSON String.
	 * @method Sketch.Driver#addShader
	 * @param {String} text - the JSON string for a shader object.
	 * @public
	 */
	addShader: function(text){
		this.readyLock++;
		this.addShaderInternal(text);
	},

	/**
	 * Add a shader from a URL.
	 * @method Sketch.Driver#addShaderURL
	 * @param {String} url - the URL string leading to a shader object.
	 * @public
	 */
	addShaderURL: function(url){
		this.readyLock++;
		var that = this;
		var x = new XMLHttpRequest();
		x.open("GET", url, true);
		x.onload = function(){
			that.addShaderInternal(x.response);
		};
		x.send();
	},

	/**
	 * Final phase of shader addition. Frees up the lock to allow execution.
	 * @method Sketch.Driver#addShaderInternal
	 * @param {String} text - the JSON string for a shader object.
	 * @private
	 */
	addShaderInternal: function(text){
		this.shaderManager.addShader(text);
		this.readyLock--;
	},

	/**
	 * Compile and execute a Sketch program.
	 * @method Sketch.Driver#compile
	 * @param {String} text - the source code for a Sketch program.
	 * @returns boolean - will fail either on error, or if shaders are still being added.
	 * @public
	 */
	compile: function(text){
		if(this.readyLock>0){
			alert("Sketch driver is still loading shaders - be patient!" +
			" If it's been excessively long then you may have tried to add a malformed shader.");
			return false;
		}	else{
			alert("All my shaders compiled, we're good to go.");
			return false;
		}
	}
};