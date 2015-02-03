/* global Palette */
/**
* @classdesc Abstraction of shader references to allow easy manipulation.
* @class Palette.Shader
* @description Initialise and compile a valid Source Object into a Shader.
* @param {WebGLRenderingContext} gl - The context the shader will belong to and be compiled by.
* @param {string} name - The name the shader object will be referred to by.
* @param {number} type - The class of the shader contained, either Palette.Shader.VS or Palette.Shader.FS.
* @param {string} source - The source code to compile the shader from.
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {object} [attrs] - The array which contains attribute names and default values, as an array of 3-tuples.
*/
Palette.Shader = function(gl, name, type, source, attrs){
	/**
	* The shader's name.
	* @property {string} name
	* @protected
	* @readonly
	*/
	this.name = name;

	/**
	* The type of shader, either Palette.Shader.VS or Palette.Shader.FS for objects.
	* @property {integer} type
	* @protected
	* @readonly
	*/
	this.type = type;

	/**
	* The shader's attached context.
	* @property {WebGLRenderingContext} context
	* @protected
	* @readonly
	*/
	this.context = gl;

	/**
	* The shader's attribute array.
	* @property {Array[]} attrs
	* @protected
	* @readonly
	*/
	this.attrs = attrs;

	/**
	* The reference to the compiled shader in the WebGLRenderingCOntext.
	* @property {WebGLShader} name
	* @protected
	* @readonly
	*/
	this.shader = null;

	/**
	* Has the shader attempted compilation yet?
	* @property {boolean} compiled
	* @private
	* @readonly
	*/
	this.compiled = false;

	this.bakeShader(source);
};

Palette.Shader.prototype = {
	/**
	* Compile shader code from a source string. Once compiled, you cannot recompile.
	* @method Palette.Shader#bakeShader
	* @protected
	* @param {string} source - The source code to compile and attach to this shader object.
	* @return {boolean} True if successful, false if unsuccessful.
	*/
	bakeShader: function(source){
		if (this.compiled) return null;

		this.compiled = true;

		switch(this.type){
			case Palette.Shader.VS:
				this.shader = this.context.createShader(this.context.VERTEX_SHADER);
				break;
			case Palette.Shader.FS:
				this.shader = this.context.createShader(this.context.FRAGMENT_SHADER);
				break;
			default:
				return false;
		}

		this.context.shaderSource(this.shader, source);
		this.context.compileShader(this.shader);
		if (!this.context.getShaderParameter(this.shader, this.context.COMPILE_STATUS)) {
			alert("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(this.shader));
			return false;
		}

		return true;
	}
};

Palette.Shader.VS		= 0;
Palette.Shader.FS		= 1;
Palette.Shader.LIST		= 2;

Palette.Shader.prototype.constructor = Palette.Shader;
