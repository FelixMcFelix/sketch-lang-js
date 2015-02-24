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
	* Where shall we keep our 
	* @property {boolean} compiled
	* @private
	* @readonly
	*/
	this.attrStore = {vs: {}, fs: {}};

	this.vtxBuffer = gl.createBuffer();

	this.linkProgram();
	this.prepareAttrStores();
};

Palette.Program.prototype = {
	/**
	* Draw a set of vertices with this program, with optional configuration. Configurations passed here do not overwrite the cached object.
	* This method is accessed when {@link Palette.Manager#draw} is called.
	* @method Palette.Program#draw
	* @public
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(verts, conf1, conf2){
		this.context.useProgram(this.program);

		//TODO: PARSE NEW CONFIGS.

		var mode = (conf1 ? Palette.Program.VS_MODE : 0) | (conf2 ? Palette.Program.FS_MODE : 0);
		this.passAttrstoProg(mode);

		this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vtxBuffer);
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(verts), this.context.DYNAMIC_DRAW);

		//TODO: Possibly allow selection of desired draw mode?
		this.context.drawArrays(this.context.TRIANGLES, 0, verts.length);
	},

	/**
	* Restore a program's object config for either shader or both.
	* @method Palette.Program#restoreDefaultConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports Palette.Program.VS_MODE, Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	*/
	restoreDefaultConfig: function(mode){
		var attrPointer;
		var shaderPointer;

		for(var j=0; j<2; j++){
			//ToDo
		}
	},

	/**
	* Set a program's object config for either shader or both with a given config object.
	* Object properties not in the supplied object will not overwrite the program state.
	* @method Palette.Program#setConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports Palette.Program.VS_MODE, Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
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
			if(!j){shaderPointer = this.vs; attrPointer = this.attrStore.vs;}
			else {shaderPointer = this.fs; attrPointer = this.attrStore.fs;}

			for (var i = shaderPointer.attrs.length - 1; i >= 0; i--) {
				var attrData = shaderPointer.attrs[i];
				var attrDest = attrPointer[attrData[0]] || {};

				attrDest.setFunction = Palette.Program.fetchSetter(this.context, attrData[1]);

				if(attrData[1]!="vertexAttrib"){
					attrDest.pointer = this.context.getUniformLocation(this.program, attrData[0]);
					attrDest.value = attrData[2];
				} else{
					attrDest.pointer = this.context.getAttribLocation(this.program, attrData[0]);
					alert("I have no idea what do with values here.");
				}
			}
		}
	},

	passAttrstoProg: function(mode){
		var attrPointer;
		var valueLocation = "value";

		for(var j=0; j<2; j++){
			if(!j){
				attrPointer = this.attrStore.vs; 
				if(mode===Palette.Program.VS_MODE || mode===Palette.Program.BOTH_MODE) valueLocation = "tempValue";
			}
			else {
				attrPointer = this.attrStore.fs;
				if(mode===Palette.Program.FS_MODE || mode===Palette.Program.BOTH_MODE) valueLocation = "tempValue";
				else valueLocation = "value";
			}

			for(var prop in attrPointer){
				var attr = attrPointer[prop];
				var attrValue = attr[valueLocation] || attr.value;

				if(attr.type.substr(0,3) == "mat"){
					attr.setFunction(attr.pointer, this.context.FALSE, attrValue);
				} else if(attr.type = vertexAttrib){

				} else{
					attr.setFunction(attr.pointer, attrValue);
				}
			}
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
			alert("You're still on your own, kid.");
			return null;//gl.vertexAttribPointer.bind(gl);
		default:
			alert("Not gonna lie - you really messed up. I can't pass "+type+" onto the shader.");
			return null;
	}
};

Palette.Program.NONE_MODE	= 0;
Palette.Program.VS_MODE 	= 1;
Palette.Program.FS_MODE 	= 2;
Palette.Program.BOTH_MODE 	= 3;

Palette.Program.prototype.constructor = Palette.Program;
