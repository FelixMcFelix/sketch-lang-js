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
