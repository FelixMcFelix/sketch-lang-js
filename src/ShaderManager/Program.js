/**
* @classdesc
* The Program object, generated from linked pairs of vs-fs combinations.
* @class ShaderManager.Program
* @constructor
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
*/
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