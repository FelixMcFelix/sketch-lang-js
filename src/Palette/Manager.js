/* global Palette */
/**
* @classdesc The core part of the system - initialise this to begin using the shader manager.
* @class Palette.Manager
* @param {WebGLRenderingContext} gl - The context all shaders and programs will belong to and be compiled by.
*/
Palette.Manager = function(gl){
	if(!(gl instanceof WebGLRenderingContext)){
		throw new TypeError("Error: attempted to create Palette with illegal argument.");
	}

	/**
    * A reference to the defining WebGLRenderingContext.
    * @property {WebGLRenderingContext} context
    * @protected
    * @readonly
    */
	this.context 		= gl;
	
	/**
    * An object storing all processed Vertex Shaders.
    * @property {object} vertShaders
    * @private
    */
	this.vertShaders 	= {};
	/**
    * An object storing all processed Fragment Shaders.
    * @property {object} fragShaders
    * @private
    */
	this.fragShaders	= {};
	/**
    * An object storing all processed Programs.
    * @property {object} programs
    * @private
    */
	this.programs		= {};

	/**
    * A {@link Palette.ShaderFactory} object utilised by the manager
    * to generate valid shader objects from many sources for use.
    * @property {Palette.ShaderFactory} shaderFactory
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
		//TODO: Lookup from string and exception throwing.
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
		//TODO: Generate and link new programs for lookup miss.
		return this.programs[vs][fs];
	},

	/**
	* Request a shader object from storage using its type and name.
	* @method Palette.Manager#getShader
	* @public
	* @param {integer} type - Either Palette.Shader.VS or Palette.Shader.FS.
	* @param {string} name - The shader's identifier.
	* @return {Palette.Shader} The requested {@link Palette.Shader}. If a shader was not found, NULL is returned.
	*/
	getShader: function(type, name){
		return (type === Palette.Shader.VS) ? this.vertShaders[name] : this.fragShaders[name];
	}
};

Palette.Manager.prototype.constructor = Palette.Manager;
