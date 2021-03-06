/**
* @classdesc Abstraction of program references to allow easy manipulation.
* @description The Program object, generated from linked pairs of vs-fs combinations.
* @class Palette.Program
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {Palette.Shader} vs - The {@link Palette.Shader} acting as the vertex shader for this program.
* @param {Palette.Shader} fs - The {@link Palette.Shader} acting as the fragment shader for this program.
* @author FelixMcFelix (Kyle S.)
*/
Palette.Program = function(gl, vs, fs){
	/**
	* The program's attached context.
	* @name Palette.Program#context
	* @type WebGLRenderingContext
	* @protected
	* @readonly
	*/
	this.context = gl;
	
	/**
	* The program's attached vertex shader.
	* @name Palette.Program#vs
	* @type Palette.Shader
	* @protected
	* @readonly
	*/
	this.vs = vs;
	
	/**
	* The program's attached fragment shader.
	* @name Palette.Program#fs
	* @type Palette.Shader
	* @protected
	* @readonly
	*/
	this.fs = fs;

	/**
	* The program as seen by WebGL.
	* @name Palette.Program#program
	* @type WebGLProgram
	* @protected
	* @readonly
	*/
	this.program = null;

	/**
	* Has the program attempted compilation yet?
	* @name Palette.Program#compiled
	* @type Boolean
	* @private
	* @readonly
	*/
	this.compiled = false;

	/**
	* Attribute Storage - temporary and set.
	* @name Palette.Program#attrs
	* @type Object
	* @private
	* @readonly
	*/
	this.attrs = {vs: {access:{},store:{},send:{}},
					fs: {access:{},store:{},send:{}}};

	/**
	* The Selected Draw Mode for the program.
	* @name Palette.Program#drawMode
	* @type int
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
		var tempDrawMode = this.drawMode;
		if(verts !== null){
		switch(this.drawMode){
			case Palette.Program.POLYGON:
				var temp = earcut(verts, null, 2);
				var itemSize = this.attrs.vs.access.vertexBuffer.itemSize;
				var temper = new Float32Array(temp.length * itemSize);

				var vertSize = 2;

				for(var i=0; i<temp.length; i++){
					var vertIndex = temp[i];

					switch(vertSize){
						case 3:
							temper[itemSize*i+2] = verts[vertIndex*vertSize +2];
							/*falls through*/
						case 2:
							temper[itemSize*i+1] = verts[vertIndex*vertSize +1];
							/*falls through*/
						case 1:
							temper[itemSize*i] = verts[vertIndex*vertSize];
							/*falls through*/
					}
				}
				conf1.vertexBuffer = temper;
				tempDrawMode = Palette.Program.TRIANGLES;
				break;
			default:
				conf1.vertexBuffer = verts;
				break;
		}
		}

		this.generateSend(this.attrs.vs, conf1);
		this.generateSend(this.attrs.fs, conf2);

		this.passAttrstoProg();

		this.context.drawArrays(tempDrawMode, 0,
			this.attrs.vs.send.vertexBuffer.length/this.attrs.vs.access.vertexBuffer.itemSize);
	},

	/**
	* Restore a program's object config for either shader or both.
	* @method Palette.Program#restoreDefaultConfig
	* @public
	* @param {int} mode - The identifier for which config object to revert. Supports Palette.Program.VS_MODE,
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
	* @param {int} mode - The identifier for which config object to set. Supports Palette.Program.VS_MODE,
	* Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	* @param {object} conf - The config object to inject into the program state.
	*/
	setConfig: function(mode, conf){
		var attrPointer;
		var shaderPointer;

		for(var j=0; j<2; j++){
			if(!j){if(!mode&Palette.Program.VS_MODE)continue; shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {if(!mode&Palette.Program.FS_MODE)continue; shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for(var prop in attrPointer.access){
				var attrDest = attrPointer.store[prop];

				if(conf[prop]!== undefined)
					attrDest = conf[prop];
			}
		}
	},

	/**
	* Compile the set of shader attached to this program as a compilation unit.
	* Can only be run once per Program object, i.e. per vs-fs pair.
	* @method Palette.Program#linkProgram
	* @private
	*/
	linkProgram: function(){
		if (this.compiled) return false;
		this.compiled = true;

		this.program = this.context.createProgram();

		this.context.attachShader(this.program, this.vs.shader);
		this.context.attachShader(this.program, this.fs.shader);

		this.context.linkProgram(this.program);

		return true;
	},

	/**
	* Fetches the default values for program attributes, and fetches setter methods
	* for execution at run time. 
	* @method Palette.Program#prepareAttrStores
	* @private
	*/
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

	/**
	* Run through the setters for each attribute, passing the values in the send
	* section of the store to the context.
	* @method Palette.Program#passAttrsToProg
	* @private
	*/
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
	* @param {int} mode - The gl code for drawing mode. Supports Palette.Program.POINTS, .LINES, .LINE_LOOP,
	* .LINE_STRIP, .TRIANGLES, .TRIANGLE_STRIP, .TRIANGLE_FAN.
	*/
	setDrawMode: function(mode){
		this.drawMode = mode;
	},

	/**
	* Generate the "send" region of the vs and fs attribute stores from the necessary
	* sub-stores.
	* @method Palette.Program#generateSend
	* @private
	*/
	generateSend: function(dest, conf){
		var toSend;
		for(var name in dest.access){
			if(conf[name]) toSend = conf[name];
			else toSend = dest.store[name];
			dest.send[name] = toSend;
		}
	}
};
/**
* Returns the relevant setter function for each 
* @method Palette.Program.fetchSetter
* @private
*/
Palette.Program.fetchSetter = function(gl, type){
	//LAZY
	//I'LL DO THIS MORE ELEGANTLY ONE DAY.
	var oneParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0]);
		};
	};
	var twoParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1]);
		};
	};
	var threeParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1],array[2]);
		};
	};
	var fourParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1],array[2],array[3]);
		};
	};

	var k;

	switch(type){
		case "float":
			return oneParamFromArray(gl.uniform1f.bind(gl));
		case "float[]":
			return gl.uniform1fv.bind(gl);
		case "int":
			return oneParamFromArray(gl.uniform1i.bind(gl));
		case "int[]":
			return gl.uniform1iv.bind(gl);
		case "vec2":
			return twoParamFromArray(gl.uniform2f.bind(gl));
		case "vec2[]":
			return gl.uniform2fv.bind(gl);
		case "ivec2":
			return twoParamFromArray(gl.uniform2i.bind(gl));
		case "ivec2[]":
			return gl.uniform2iv.bind(gl);
		case "vec3":
			return threeParamFromArray(gl.uniform3f.bind(gl));
		case "vec3[]":
			return gl.uniform3fv.bind(gl);
		case "ivec3":
			return threeParamFromArray(gl.uniform3i.bind(gl));
		case "ivec3[]":
			return gl.uniform3iv.bind(gl);
		case "vec4":
			return fourParamFromArray(gl.uniform4f.bind(gl));
		case "vec4[]":
			return gl.uniform4fv.bind(gl);
		case "ivec4":
			return fourParamFromArray(gl.uniform4i.bind(gl));
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
			k = function(attrib, buffer){
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.vertexAttribPointer(attrib.pointer, buffer.itemSize, gl.FLOAT, false, 0, 0);
			};
			return k.bind(gl);
		case "buffer":
			k = function(buffer, bufferData){
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.DYNAMIC_DRAW);
			};
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

//WEBGL
Palette.Program.POINTS			= 0;
Palette.Program.LINES			= 1;
Palette.Program.LINE_LOOP		= 2;
Palette.Program.LINE_STRIP		= 3;
Palette.Program.TRIANGLES		= 4;
Palette.Program.TRIANGLE_STRIP	= 5;
Palette.Program.TRIANGLE_FAN	= 6;
//MINE
Palette.Program.POLYGON			= 7;


Palette.Program.prototype.constructor = Palette.Program;
