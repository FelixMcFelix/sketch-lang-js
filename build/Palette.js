/**
* @namespace Palette
*/
var Palette = Palette || {};

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
		var vsName = this.getShaderName(vs);
		var fsName = this.getShaderName(fs);
		var vsObj;
		var fsObj;

		var output;

		this.programs[vsName] = this.programs[vsName] || {};
		this.programs[vsName][fsName] = this.programs[vsName][fsName] || {};

		if(!(this.programs[vsName][fsName] instanceof Palette.Program)){
			if(vs instanceof Palette.Shader){vsObj = vs;} else{vsObj = this.getShader(Palette.Shader.VS, vsName);}
			if(fs instanceof Palette.Shader){fsObj = fs;} else{fsObj = this.getShader(Palette.Shader.FS, fsName);}
			this.programs[vsName][fsName] = new Palette.Program(this.context, vsObj, fsObj);
		}
		output = this.programs[vsName][fsName];

		return output;
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
	},

	/**
	* Ensure that we have a shader's name, for lookup purposes in particular.
	* @method Palette.Manager#getShaderName
	* @public
	* @param {string|Palette.Shader} input - The shader we need to sanity check the name of.
	* @return {string} - The definite name of the shader.
	*/
	getShaderName: function(input){
		var output;
		if(input instanceof Palette.Shader){
			output = input.name;
		} else{
			output = input;
		}
		return output;
	}
};

Palette.Manager.prototype.constructor = Palette.Manager;

/* global Palette */
/**
* @classdesc Abstraction of program references to allow easy manipulation.
* @description The Program object, generated from linked pairs of vs-fs combinations.
* @class Palette.Program
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {Palette.Shader} vs - The {@link Palette.Shader} acting as the vertex shader for this program.
* @param {Palette.Shader} fs - The {@link Palette.Shader} acting as the fragment shader for this program.
*/
Palette.Program = function(gl, vs, fs){
	/**
	* The program's attached context.
	* @property {WebGLRenderingContext} context
	* @protected
	* @readonly
	*/
	this.context = gl;
	
	/**
	* The program's attached vertex shader.
	* @property {Palette.Shader} vs
	* @protected
	* @readonly
	*/
	this.vs = vs;
	
	/**
	* The program's attached fragment shader.
	* @property {Palette.Shader} fs
	* @protected
	* @readonly
	*/
	this.fs = fs;

	/**
	* The program as seen by WebGL.
	* @property {WebGLProgram} program
	* @protected
	* @readonly
	*/
	this.program = null;

	/**
	* Has the program attempted compilation yet?
	* @property {boolean} compiled
	* @private
	* @readonly
	*/
	this.compiled = false;

	/**
	* Attribute Storage - temporary and set.
	* @property {Object} attrs
	* @private
	* @readonly
	*/
	this.attrs = {vs: {access:{},store:{},send:{}}
					, fs: {access:{},store:{},send:{}}};

	/**
	* The Selected Draw Mode for the program.
	* @property {number} drawMode
	* @private
	* @readonly
	*/
	this.drawMode = Palette.Program.TRIANGLES;

	this.linkProgram();
	this.prepareAttrStores();
};

Palette.Program.prototype = {
	/**
	* Draw a set of vertices with this program, with optional configuration. Configurations passed here do not
	* overwrite the cached object.
	* This method is accessed when {@link Palette.Manager#draw} is called.
	* @method Palette.Program#draw
	* @public
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(verts, conf1, conf2){
		this.context.useProgram(this.program);
		if(!conf1) conf1 = {};
		conf1.vertexBuffer = verts;

		this.generateSend(this.attrs.vs, conf1);
		this.generateSend(this.attrs.fs, conf2);

		//var mode = (conf1 ? Palette.Program.VS_MODE : 0) | (conf2 ? Palette.Program.FS_MODE : 0);
		this.passAttrstoProg();

		//this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vtxBuffer);
		//this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(verts), this.context.DYNAMIC_DRAW);

		this.context.drawArrays(this.drawMode, 0
			, this.attrs.vs.send.vertexBuffer.length/this.attrs.vs.access.vertexBuffer.itemSize);
	},

	/**
	* Restore a program's object config for either shader or both.
	* @method Palette.Program#restoreDefaultConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports Palette.Program.VS_MODE,
	* Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	*/
	restoreDefaultConfig: function(mode){
		var attrPointer;
		var shaderPointer;

		for(var j=0; j<2; j++){
			if(!j){if(!mode&Palette.Program.VS_MODE)continue; shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {if(!mode&Palette.Program.FS_MODE)continue; shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for (var i = shaderPointer.attrs.length - 1; i >= 0; i--) {
				var attrData = shaderPointer.attrs[i];
				var name = attrData[0];

				if(attrData[1]=="buffer" || attrData[1]=="vertexAttrib"){
					attrPointer.store[name] = null;
				} else if(attrData[1]!="vertexAttrib"){
					attrPointer.store[name] = attrData[2];
				}
			}
		}
	},

	/**
	* Set a program's object config for either shader or both with a given config object.
	* Object properties not in the supplied object will not overwrite the program state.
	* @method Palette.Program#setConfig
	* @public
	* @param {integer} mode - The identifier for which config object to set. Supports Palette.Program.VS_MODE,
	* Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	* @param {object} conf - The config object to inject into the program state.
	*/
	setConfig: function(mode, conf){
		//TODO
	},

	linkProgram: function(){
		if (this.compiled) return false;
		this.compiled = true;

		this.program = this.context.createProgram();

		this.context.attachShader(this.program, this.vs.shader);
		this.context.attachShader(this.program, this.fs.shader);

		this.context.linkProgram(this.program);

		return true;
	},

	prepareAttrStores: function(){
		this.context.useProgram(this.program);
		var shaderPointer;
		var attrPointer;

		for(var j=0; j<2; j++){
			if(!j){shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for (var i = shaderPointer.attrs.length - 1; i >= 0; i--) {
				var attrData = shaderPointer.attrs[i];
				var name = attrData[0];
				attrPointer.access[name] = attrPointer.access[name] || {};
				var attrAccessDest = attrPointer.access[name];

				attrAccessDest.setFunction = Palette.Program.fetchSetter(this.context, attrData[1]);

				if(attrData[1]=="vertexAttrib"){
					attrAccessDest.pointer = this.context.getAttribLocation(this.program, attrData[0]);
					this.context.enableVertexAttribArray(attrAccessDest.pointer);
					attrAccessDest.bufferName = attrData[2];
				}	else if(attrData[1]=="buffer"){
					attrAccessDest.pointer = this.context.createBuffer();
					attrAccessDest.itemSize = attrData[2];
				}	else{
					attrAccessDest.pointer = this.context.getUniformLocation(this.program, attrData[0]);
				}

				attrAccessDest.type = attrData[1];
			}
		}
		this.restoreDefaultConfig(Palette.Program.BOTH_MODE);
	},

	passAttrstoProg: function(){
		var attrPointer;

		for(var j=0; j<2; j++){
			if(!j){attrPointer = this.attrs.vs;}
			else {attrPointer = this.attrs.fs;}

			for(var prop in attrPointer.access){
				var attrDest = attrPointer.send[prop];
				var attrAccessDest = attrPointer.access[prop];

				if(attrAccessDest.type.substr(0,3) == "mat"){
					attrAccessDest.setFunction(attrAccessDest.pointer, this.context.FALSE, attrDest);
				} else if(attrAccessDest.type == "vertexAttrib"){
					var buffer = this.attrs.vs.access[attrAccessDest.bufferName];
					attrAccessDest.setFunction(attrAccessDest, buffer);
				} else if(attrAccessDest.type == "buffer"){
					attrAccessDest.setFunction(attrAccessDest, attrDest);
				} else{
					attrAccessDest.setFunction(attrAccessDest.pointer, attrDest);
				}
			}
		}
	},

	/**
	* Set a program's draw mode.
	* @method Palette.Program#setDrawMode
	* @public
	* @param {integer} mode - The gl code for drawing mode. Supports Palette.Program.POINTS, .LINES, .LINE_LOOP,
	* .LINE_STRIP, .TRIANGLES, .TRIANGLE_STRIP, .TRIANGLE_FAN.
	*/
	setDrawMode: function(mode){
		this.drawMode = mode;
	},

	generateSend: function(dest, conf){
		var toSend;
		for(name in dest.access){
			if(conf[name]) toSend = conf[name];
			else toSend = dest.store[name];
			dest.send[name] = toSend;
		}
	}
};

Palette.Program.fetchSetter = function(gl, type){
	//LAZY
	//I'LL DO THIS MORE ELEGANTLY ONE DAY.
	switch(type){
		case "float":
			return gl.uniform1f.bind(gl);
		case "float[]":
			return gl.uniform1fv.bind(gl);
		case "int":
			return gl.uniform1i.bind(gl);
		case "int[]":
			return gl.uniform1iv.bind(gl);
		case "vec2":
			return gl.uniform2f.bind(gl);
		case "vec2[]":
			return gl.uniform2fv.bind(gl);
		case "ivec2":
			return gl.uniform2i.bind(gl);
		case "ivec2[]":
			return gl.uniform2iv.bind(gl);
		case "vec3":
			return gl.uniform3f.bind(gl);
		case "vec3[]":
			return gl.uniform3fv.bind(gl);
		case "ivec3":
			return gl.uniform3i.bind(gl);
		case "ivec3[]":
			return gl.uniform3iv.bind(gl);
		case "vec4":
			return gl.uniform4f.bind(gl);
		case "vec4[]":
			return gl.uniform4fv.bind(gl);
		case "ivec4":
			return gl.uniform4i.bind(gl);
		case "ivec4[]":
			return gl.uniform4iv.bind(gl);
		case "mat2":
			return gl.uniformMatrix2fv.bind(gl);
		case "mat3":
			return gl.uniformMatrix3fv.bind(gl);
		case "mat4":
			return gl.uniformMatrix4fv.bind(gl);
		case "texture":
			alert("You're on your own, kid.");
			return null;
		case "vertexAttrib":
			var k = function(attrib, buffer){
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.vertexAttribPointer(attrib.pointer, buffer.itemSize, gl.FLOAT, false, 0, 0);
			}
			return k.bind(gl);
		case "buffer":
			var k = function(buffer, bufferData){
				//var buffer = this.vs.attrs[bufferName].access;
				//var bufferData = this.vs.send[bufferName];
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData)
					, gl.DYNAMIC_DRAW);
			}
			return k.bind(gl);
		default:
			alert("Not gonna lie - you really messed up. I can't pass "+type+" onto the shader.");
			return null;
	}
};

Palette.Program.NONE_MODE	= 0;
Palette.Program.VS_MODE 	= 1;
Palette.Program.FS_MODE 	= 2;
Palette.Program.BOTH_MODE 	= 3;

Palette.Program.POINTS			= 0;
Palette.Program.LINES			= 1;
Palette.Program.LINE_LOOP		= 2;
Palette.Program.LINE_STRIP		= 3;
Palette.Program.TRIANGLES		= 4;
Palette.Program.TRIANGLE_STRIP	= 5;
Palette.Program.TRIANGLE_FAN	= 6;

Palette.Program.prototype.constructor = Palette.Program;

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
		if (this.compiled){return null;}

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

/* global Palette */
/**
* @classdesc
* A Factory class designed to process objects, URLs, JSON and potentially other formats to generate
* valid {@link Palette.Shader} objects.
*
* This is a deliberate choice, to abstract some functionality away from the central {@link Palette.Manager}
* class.
* @class Palette.ShaderFactory
* @description
* Create a new ShaderFactory object - this is done automatically by {@link Palette.Manager}.
*
* @param {Palette.Manager} manager - The manager to place 
*/
Palette.ShaderFactory = function(manager){
	/**
    * An object reference to the parent {@link Palette.Manager}.
    * @property {Palette.Manager} manager
    * @readonly
    * @protected
    */
    that = this;
	this.manager = manager;
	this.downloadInProgress = false;
};

Palette.ShaderFactory.prototype = {
	/**
	* Begin the shader construction process.
	* @method Palette.ShaderFactory#addShader
	* @public
	* @param {string|Palette.Shader|Object} shader - URL, JSON, Shader Source Object or {@link Palette.Shader}.
	*/
	addShader: function(shader){
		var inShader;
		var outShader;

		switch(this.establishType(shader)){
			case Palette.ShaderFactory.SOURCE_OBJECT:
				inShader = shader;
				/* falls through */
			case Palette.ShaderFactory.JSON:
				inShader = inShader || JSON.parse(shader);
				outShader = this.createShaderObject(inShader);
				break;

			case Palette.ShaderFactory.SHADER_OBJECT:
				outShader = shader;
				break;

			case Palette.ShaderFactory.URL:
				this.downloadFromURL(shader);
				break;
			default:
				throw new Error("Not a valid type of shader.");
		}

		//while(this.downloadInProgress){}

		if(outShader){this.registerShader(outShader);}
	},

	/**
	* Create a shader from a source object.
	* @method Palette.ShaderFactory#createShaderObject
	* @protected
	* @param {object} sourceObject - Either a list of shaders or a single shader object is valid.
	* @return {Palette.Shader|null} Returns a {@link Palette.Shader} if the Source Object was not a list. If it was a list, it adds all the children instead.
	*/
	createShaderObject: function(sourceObject){
		switch(sourceObject.type){
			case Palette.Shader.VS:
			case Palette.Shader.FS:
				return new Palette.Shader(this.manager.context, sourceObject.name, sourceObject.type, sourceObject.src, sourceObject.attrs);

			case Palette.Shader.LIST:
				for (var i = sourceObject.content.length - 1; i >= 0; i--) {
					this.addShader(sourceObject.content[i]);
				}
				break;

			default:
				throw new Error("Tried to create an illegal class of shader.");
		}
	},

	/**
	* Download a file from the supplied URL, before adding it to the manager.
	* @method Palette.ShaderFactory#downloadFromURL
	* @protected
	* @param {string} url - URL corresponding to a Shader Source Object JSON file.
	*/
	downloadFromURL: function(url){
		var rdr = new XMLHttpRequest();
		rdr.open("GET", url, true);
		rdr.onload = function(){
			console.log(that)
			that.addShader(rdr.response);
			that.downloadInProgress = false;
		};
		that.downloadInProgress = true;
		rdr.send();
	},

	/**
	* Determine the type of shader reference passed to the factory.
	* @method Palette.ShaderFactory#establishType
	* @protected
	* @param {string|Palette.Shader} shader - URL, JSON or Palette.Shader.
	* @return {number} Either Palette.ShaderFactory.SOURCE_OBJECT, .JSON, .URL or .SHADER_OBJECT.
	*/
	establishType: function(shader){
		var type = -1;
		if(shader instanceof Palette.Shader){
			type = Palette.ShaderFactory.SHADER_OBJECT;
		} else if((shader.type != undefined) && (shader.name != undefined) && (shader.content || shader.src)){
			type = Palette.ShaderFactory.SOURCE_OBJECT;
		} else if(this.isJSON(shader)){
			type = Palette.ShaderFactory.JSON;
		} else if(this.isString(shader)){
			type = Palette.ShaderFactory.URL;
		}
		return type;
	},

	/**
	* Determine if a string is valid JSON.
	* @method Palette.ShaderFactory#isJSON
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

	isString: function(s){
    	return typeof(s) === 'string' || s instanceof String;
	},

	/**
	* Add a shader directly into the manager's storage for future access.
	* @method Palette.ShaderFactory#registerShader
	* @protected
	* @param {Palette.Shader} shaderObject - Compiled shader object to store in the {@link Palette.Manager}.
	*/
	registerShader: function(shaderObject){
		switch(shaderObject.type){
			case Palette.Shader.VS:
				this.manager.vertShaders[shaderObject.name] = this.manager.vertShaders[shaderObject.name] || shaderObject;
				break;
			case Palette.Shader.FS:
				this.manager.fragShaders[shaderObject.name] = this.manager.fragShaders[shaderObject.name] || shaderObject;
				break;
			default:
				throw new Error("Tried to register an illegal class of shader.");
		}
	}
};

Palette.ShaderFactory.SOURCE_OBJECT	= 0;
Palette.ShaderFactory.JSON			= 1;
Palette.ShaderFactory.URL				= 2;
Palette.ShaderFactory.SHADER_OBJECT	= 3;

Palette.ShaderFactory.prototype.constructor = Palette.ShaderFactory;