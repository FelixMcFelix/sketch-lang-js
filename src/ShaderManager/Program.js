/**
* @classdesc
* The Program object, generated from linked pairs of vs-fs combinations.
* @class ShaderManager.Program
* @constructor
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {ShaderManager.Shader} vs - The context the shaders of this program will belong to and be compiled by.
* @param {ShaderManager.Shader} fs - The context the shaders of this program will belong to and be compiled by.
*/
ShaderManager.Program = function(gl, vs, fs){
	this.gl = gl;
	this.vs = vs;
	this.fs = fs;
};

ShaderManager.Program.prototype = {
	/**
	* Draw a set of vertices with this program, with optional configuration. Configurations passed here do not overwrite the cached object.
	* This method is accessed when {@link ShaderManager.Manager#draw} is called.
	* @method ShaderManager.Program#draw
	* @public
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(verts, conf1, conf2){

	},

	/**
	* Restore a program's object config for either shader or both.
	* @method ShaderManager.Program#restoreDefaultConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports ShaderManager.Program.VS_MODE, ShaderManager.Program.FS_MODE, ShaderManager.Program.BOTH_MODE.
	*/
	restoreDefaultConfig: function(mode){

	},

	/**
	* Set a program's object config for either shader or both with a given config object.
	* @method ShaderManager.Program#setConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports ShaderManager.Program.VS_MODE, ShaderManager.Program.FS_MODE, ShaderManager.Program.BOTH_MODE.
	* @param {object} conf - The config object to inject into the program state.
	*/
	setConfig: function(mode, conf){

	}
};

ShaderManager.Program.VS_MODE 	= 0;
ShaderManager.Program.FS_MODE 	= 1;
ShaderManager.Program.BOTH_MODE = 2;

ShaderManager.Program.prototype.constructor = ShaderManager.Program;
