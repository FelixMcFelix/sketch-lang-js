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
				return new ShaderManager.Shader(this.manager.context, sourceObject.name, sourceObject.type, sourceObject.src, sourceObject.attrs);

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
		return type;
	},

	/**
	* Determine if a string is valid JSON.
	* @method ShaderManager.ShaderFactory#isJSON
	* @private
	* @param {string} str - Suspected JSON string to check.
	*/
	isJSON: function(str){
		try{
			JSON.parse(str);
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