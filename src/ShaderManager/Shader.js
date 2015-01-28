/**
* @class ShaderManager.Shader
* @constructor
* @param {WebGLRenderingContext} gl - The context the shader will belong to and be compiled by.
* @param {string} name - The name the shader object will be referred to by.
* @param {number} type - The class of the shader contained, either ShaderManager.Shader.VS or ShaderManager.Shader.FS.
* @param {string} source - The source code to compile the shader from.
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {object} [attrs] - The array which contains attribute names and default values, as an array of 2-tuples.
*/
ShaderManager.Shader = function(gl, name, type, source, attrs){
	this.name = name;
	this.type = type;
	this.source = source;
	this.gl = gl;
	this.attrs = attr;
};

ShaderManager.Shader.VS		= 0;
ShaderManager.Shader.FS		= 1;
ShaderManager.Shader.LIST	= 2;

ShaderManager.Shader.prototype.constructor = ShaderManager.Shader;
