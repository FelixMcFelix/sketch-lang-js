ShaderManager.Manager = function(gl){

};

ShaderManager.Manager.prototype = {
	addShader: function(shaderObj){

	},

	addShaderFromURL: function(url){

	},

	draw: function(vs, fs, verts, conf1, conf2){

	},

	getProgram: function(vs, fs){

	},

	getShader: function(type, name){

	}
};

ShaderManager.Manager.prototype.constructor = ShaderManager.Manager;

ShaderManager.Program = function(gl, vs, fs){
	
};

ShaderManager.Program.prototype = {
	draw: function(verts, conf1, conf2){

	},

	restoreDefaultConfig: function(mode){

	},

	setConfig: function(mode, conf){

	}
};

ShaderManager.Program.VS_MODE 	= 0;
ShaderManager.Program.FS_MODE 	= 1;
ShaderManager.Program.BOTH_MODE = 2;

ShaderManager.Program.prototype.constructor = ShaderManager.Program;

/**
* @class ShaderManager.Shader
* @constructor
* @param {string} [name=null] - The name the shader object will be referred to by.
* @param {number} [type=null] - The class of the shader contained, either ShaderManager.Shader.VS or ShaderManager.Shader.FS.
* @param {string} [source=""] - The source code to compile the shader from.
* @param {object} [attrs=[]] - The array which contains attribute names and default values, as an array of 2-tuples.
*/
ShaderManager.Shader = function(name, type, source, attrs){

};

ShaderManager.Shader.VS = 0;
ShaderManager.Shader.FS = 1;

ShaderManager.Shader.prototype.constructor = ShaderManager.Shader;

/**
* @namespace ShaderManager
*/
var ShaderManager = ShaderManager || {};
