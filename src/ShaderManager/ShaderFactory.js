/**
* @classdesc
* A Factory class designed to process objects, URLs, JSON and potentially other formats to generate
* valid {@link ShaderManager.Shader} objects.
*
* This is a deliberate choice, to abstract some functionality away from the central {@link ShaderManager.Manager}
* class.
* @class ShaderManager.ShaderFactory
* @description
* Create a new ShaderFactory object - this is done automatically by {@link ShaderManager.Manager}.
*
* @constructor
* @param {WebGLRenderingContext} gl - The context all shaders and programs will belong to and be compiled by.
*/
ShaderManager.ShaderFactory = function(gl){

};

ShaderManager.ShaderFactory.prototype = {

}

ShaderManager.ShaderFactory.prototype.constructor = ShaderManager.ShaderFactory;