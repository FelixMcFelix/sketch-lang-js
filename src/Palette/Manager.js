/* global Palette */
/* global WebGLRenderingContext */
/**
* @classdesc The core part of the system - initialise this to begin using the shader manager.
* @class Palette.Manager
* @param {WebGLRenderingContext} gl - The context all shaders and programs will belong to and be compiled by.
* @author FelixMcFelix (Kyle S.)
*/
Palette.Manager = function(gl){
	/**
    * A reference to the defining WebGLRenderingContext.
    * @name Palette.Manager#context
	* @type WebGLRenderingContext
    * @protected
    * @readonly
    */
	this.context 		= gl;
	
	/**
    * An object storing all processed Vertex Shaders.
    * @name Palette.Manager#vertShaders
	* @type Object
    * @protected
    */
	this.vertShaders 	= {};
	/**
    * An object storing all processed Fragment Shaders.
    * @name Palette.Manager#fragShaders
	* @type Object
    * @protected
    */
	this.fragShaders	= {};
	/**
    * An object storing all processed Programs.
    * @name Palette.Manager#programs
	* @type Object
    * @protected
    */
	this.programs		= {};

	/**
    * A {@link Palette.ShaderFactory} object utilised by the manager
    * to generate valid shader objects from many sources for use.
    * @name Palette.Manager#shaderFactory
	* @type Palette.ShaderFactory
    * @protected
    * @readonly
    */
	this.shaderFactory	= new Palette.ShaderFactory(this);
};

Palette.Manager.prototype = {
	/**
	* Add a shader into the manager's storage for future access.
	* @method Palette.Manager#addShader
	* @public
	* @param {string|Palette.Shader} shaderRef - URL, JSON or Palette.Shader.
	*/
	addShader: function(shaderRef){
		this.shaderFactory.addShader(shaderRef);
	},

	/**
	* Send a draw call to a given vs-fs pair.
	* The work is delegated down to the program's own draw method.
	* @method Palette.Manager#draw
	* @public
	* @param {string|Palette.Shader} vs - The desired Vertex Shader.
	* @param {string|Palette.Shader} fs - The desired Fragment Shader.
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(vs, fs, verts, conf1, conf2){
		this.getProgram(vs, fs).draw(verts, conf1, conf2);
	},

	/**
	* Request a program object from a known vs-fs pair.
	* @method Palette.Manager#getProgram
	* @public
	* @param {string|Palette.Shader} vs - The desired Vertex Shader.
	* @param {string|Palette.Shader} fs - The desired Fragment Shader.
	* @return {Palette.Program} The {@link Palette.Program} either found or generated. If either shader was not found, NULL is returned.
	*/
	getProgram: function(vs, fs){
		var vsName = this.getShaderName(vs);
		var fsName = this.getShaderName(fs);
		var vsObj;
		var fsObj;

		var output;

		this.programs[vsName] = this.programs[vsName] || {};
		this.programs[vsName][fsName] = this.programs[vsName][fsName] || {};

		if(!(this.programs[vsName][fsName] instanceof Palette.Program)){
			if(vs instanceof Palette.Shader){vsObj = vs;} else{vsObj = this.getShader(Palette.Shader.VS, vsName);}
			if(fs instanceof Palette.Shader){fsObj = fs;} else{fsObj = this.getShader(Palette.Shader.FS, fsName);}
			this.programs[vsName][fsName] = new Palette.Program(this.context, vsObj, fsObj);
		}
		output = this.programs[vsName][fsName];

		return output;
	},

	/**
	* Request a shader object from storage using its type and name.
	* @method Palette.Manager#getShader
	* @public
	* @param {int} type - Either Palette.Shader.VS or Palette.Shader.FS.
	* @param {string} name - The shader's identifier.
	* @return {Palette.Shader} The requested {@link Palette.Shader}. If a shader was not found, NULL is returned.
	*/
	getShader: function(type, name){
		return (type === Palette.Shader.VS) ? this.vertShaders[name] : this.fragShaders[name];
	},

	/**
	* Ensure that we have a shader's name, for lookup purposes in particular.
	* @method Palette.Manager#getShaderName
	* @public
	* @param {string|Palette.Shader} input - The shader we need to sanity check the name of.
	* @return {string} - The definite name of the shader.
	*/
	getShaderName: function(input){
		var output;
		if(input instanceof Palette.Shader){
			output = input.name;
		} else{
			output = input;
		}
		return output;
	}
};

Palette.Manager.prototype.constructor = Palette.Manager;
