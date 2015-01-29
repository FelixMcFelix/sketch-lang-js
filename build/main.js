/**
* @classdesc
* The core part of the system - initialise this to begin using the shader manager.
* @class ShaderManager.Manager
* @constructor
* @param {WebGLRenderingContext} gl - The context all shaders and programs will belong to and be compiled by.
*/
ShaderManager.Manager = function(gl){
	if(!(gl instanceof WebGLRenderingContext)){
		throw new TypeError("Error: attempted to create ShaderManager with illegal argument.");
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
    * A {@link ShaderManager.ShaderFactory} object utilised by the manager
    * to generate valid shader objects from many sources for use.
    * @property {ShaderManager.ShaderFactory} shaderFactory
    * @protected
    * @readonly
    */
	this.shaderFactory	= new ShaderManager.ShaderFactory(this);
};

ShaderManager.Manager.prototype = {
	/**
	* Add a shader into the manager's storage for future access.
	* @method ShaderManager.Manager#addShader
	* @public
	* @param {string|ShaderManager.Shader} shaderRef - URL, JSON or ShaderManager.Shader.
	*/
	addShader: function(shaderRef){
		this.shaderFactory.addShader(shaderRef);
	},

	/**
	* Send a draw call to a given vs-fs pair.
	* The work is delegated down to the program's own draw method.
	* @method ShaderManager.Manager#draw
	* @public
	* @param {string|ShaderManager.Shader} vs - The desired Vertex Shader.
	* @param {string|ShaderManager.Shader} fs - The desired Fragment Shader.
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
	* @method ShaderManager.Manager#getProgram
	* @public
	* @param {string|ShaderManager.Shader} vs - The desired Vertex Shader.
	* @param {string|ShaderManager.Shader} fs - The desired Fragment Shader.
	* @return {ShaderManager.Program} The {@link ShaderManager.Program} either found or generated. If either shader was not found, NULL is returned.
	*/
	getProgram: function(vs, fs){
		//TODO: Generate and link new programs for lookup miss.
		return this.programs[vs][fs];
	},

	/**
	* Request a shader object from storage using its type and name.
	* @method ShaderManager.Manager#getShader
	* @public
	* @param {integer} type - Either ShaderManager.Shader.VS or ShaderManager.Shader.FS.
	* @param {string} name - The shader's identifier.
	* @return {ShaderManager.Shader} The requested {@link ShaderManager.Shader}. If a shader was not found, NULL is returned.
	*/
	getShader: function(type, name){
		return (type === ShaderManager.Shader.VS) ? this.vertShaders[name] : this.fragShaders[name];
	}
};

ShaderManager.Manager.prototype.constructor = ShaderManager.Manager;

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
	this.context = gl;
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
	this.shader = 0;
	this.context = gl;
	this.attrs = attrs;
};

ShaderManager.Shader.VS		= 0;
ShaderManager.Shader.FS		= 1;
ShaderManager.Shader.LIST	= 2;

ShaderManager.Shader.prototype.constructor = ShaderManager.Shader;

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
* @param {ShaderManager.Manager} manager - The manager to place 
*/
ShaderManager.ShaderFactory = function(manager){
	/**
    * An object reference to the parent {@link ShaderManager.Manager}.
    * @property {ShaderManager.Manager} manager
    * @readonly
    * @protected
    */
	this.manager = manager;
};

ShaderManager.ShaderFactory.prototype = {
	/**
	* Begin the shader construction process.
	* @method ShaderManager.ShaderFactory#addShader
	* @public
	* @param {string|ShaderManager.Shader} shader - URL, JSON, Shader Source Object or {@link ShaderManager.Shader}.
	*/
	addShader: function(shader){
		var inShader;
		var outShader;

		switch(this.establishType(shader)){
			case ShaderManager.ShaderFactory.SOURCE_OBJECT:
				inShader = shader;
			case ShaderManager.ShaderFactory.JSON:
				inShader = inShader || JSON.parse(shader);
				outShader = this.createShaderObject(inShader);
				break;

			case ShaderManager.ShaderFactory.SHADER_OBJECT:
				outShader = shader;
				break;

			case ShaderManager.ShaderFactory.URL:
				this.downloadFromURL(shader);
				break;
			default:
				throw new Exception("Not a valid type of shader.");
		}

		if(outShader) this.registerShader(outShader);
	},

	/**
	* Create a shader from a source object.
	* @method ShaderManager.ShaderFactory#createShaderObject
	* @protected
	* @param {object} sourceObject - Either a list of shaders or a single shader object is valid.
	* @return {ShaderManager.Shader|null} Returns a {@link ShaderManager.Shader} if the Source Object was not a list. If it was a list, it adds all the children instead.
	*/
	createShaderObject: function(sourceObject){
		switch(sourceObject.type){
			case ShaderManager.Shader.VS:
			case ShaderManager.Shader.FS:
				return new Shader(this.manager.context, sourceObject.name, sourceObject.type, sourceObject.src, sourceObject.attrs);

			case ShaderManager.Shader.LIST:
				for (var i = sourceObject.content.length - 1; i >= 0; i--) {
					this.addShader(sourceObject.content[i]);
				}
				break;

			default:
				throw new Exception("Tried to create an illegal class of shader.");
		}
	},

	/**
	* Download a file from the supplied URL, before adding it to the manager.
	* @method ShaderManager.ShaderFactory#downloadFromURL
	* @protected
	* @param {string} url - URL corresponding to a Shader Source Object JSON file.
	*/
	downloadFromURL: function(url){
		var rdr = new XMLHttpRequest();
		rdr.open("GET", url, true);
		rdr.onload = function(){
			this.addShader(rdr.response);
		};
		rdr.send();
	},

	/**
	* Determine the type of shader reference passed to the factory.
	* @method ShaderManager.ShaderFactory#establishType
	* @protected
	* @param {string|ShaderManager.Shader} shader - URL, JSON or ShaderManager.Shader.
	* @return {integer} Either ShaderManager.ShaderFactory.SOURCE_OBJECT, .JSON, .URL or .SHADER_OBJECT.
	*/
	establishType: function(shader){
		var type = -1;
		if(shader instanceof ShaderManager.Shader){
			type = ShaderManager.ShaderFactory.SHADER_OBJECT;
		} else if(shader.type && shader.name && (shader.content || shader.src)){
			type = ShaderManager.ShaderFactory.SOURCE_OBJECT;
		} else if(this.isJSON(shader)){
			type = ShaderManager.ShaderFactory.JSON;
		} else if(shader instanceof String){
			type = ShaderManager.ShaderFactory.URL;
		}
		
	},

	/**
	* Determine if a string is valid JSON.
	* @method ShaderManager.ShaderFactory#isJSON
	* @private
	* @param {string} str - Suspected JSON string to check.
	*/
	isJSON: function(str){
		try{
			var k = JSON.parse(str);
			return true;
		} catch (e){
			return false;
		}
	},

	/**
	* Add a shader directly into the manager's storage for future access.
	* @method ShaderManager.ShaderFactory#registerShader
	* @protected
	* @param {ShaderManager.Shader} shaderObject - Compiled shader object to store in the {@link ShaderManager.Manager}.
	*/
	registerShader: function(shaderObject){
		switch(shaderObject.type){
			case ShaderManager.Shader.VS:
				this.manager.vertShaders[shaderObject.name] = this.manager.vertShaders[shaderObject.name] || shaderObject;
				break;
			case ShaderManager.Shader.FS:
				this.manager.fragShaders[shaderObject.name] = this.manager.fragShaders[shaderObject.name] || shaderObject;
				break;
			default:
				throw new Exception("Tried to register an illegal class of shader.");
		}
	}
};

ShaderManager.ShaderFactory.SOURCE_OBJECT	= 0;
ShaderManager.ShaderFactory.JSON			= 1;
ShaderManager.ShaderFactory.URL				= 2;
ShaderManager.ShaderFactory.SHADER_OBJECT	= 3;

ShaderManager.ShaderFactory.prototype.constructor = ShaderManager.ShaderFactory;
/**
* @namespace ShaderManager
*/
var ShaderManager = ShaderManager || {};
