Sketch.SketchGenInstr = [];

//CONVENTION: All functions return an object with their return type. This is how we do type checking.

/*
Sketch.SketchGenInstr[Sketch.SketchGenNodes["template"]] = function(args){
	var type;
	return type;
}
*/

//Program header.
Sketch.SketchGenInstr[Sketch.SketchGenNodes["program"]] = function(args){
	this.interpretNode(args);
}

//Program Structure
Sketch.SketchGenInstr[Sketch.SketchGenNodes["block"]] = function(args){
	//HAS NO TYPE - ORGANISATIONAL TYPE

	this.scopePush();
	this.interpretNode(args);
	this.scopePop();
}

//Variable declaration and assignment
Sketch.SketchGenInstr[Sketch.SketchGenNodes["variable_decl"]] = function(args){
	this.interpretNode(args);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["variable_decl_assign"]] = function(args){
	this.interpretNode(args[0]);

	this.interpretNode({
		type: Sketch.SketchGenNodes["assign"], 
		arguments: [{
			type: Sketch.SketchGenNodes["ident"], 
			arguments: args[0].arguments[1]
		}, args[1]]
	});
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["decl"]] = function(args){
	this.scopeRegister(args[1],args[0]);
	return args[0];
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["assign"]] = function(args){
	var left = this.interpretNode(args[0], true);
	var right = this.interpretNode(args[1]);

	if(left.type != "ident"){
		throw "ERROR: non-identity type on left side of assignment operator."
	}
	if(right.type != left.data.entry.type){
		throw "ERROR: right side of assignment does not match type of identifier."
	}

	//TODO: check right matches the ident's resolved type.

	this.emit(MVM.opCodes.STORER);
	this.emit(left.data.stack);
	this.emit(left.data.entry.address);

	return right;
}

//Arithmetic Instructions
Sketch.SketchGenInstr[Sketch.SketchGenNodes["addition"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.FADD);

	return {type: "num"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["subtraction"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.FSUB);

	return {type: "num"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["multiplication"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.FMUL);

	return {type: "num"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["division"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.FDIV);

	return {type: "num"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["modulo"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.FMOD);

	return {type: "num"};
}

//Arithmetic assignment Instructions.

//Literals and identifiers.
Sketch.SketchGenInstr[Sketch.SketchGenNodes["num"]] = function(args){
	this.emit(MVM.opCodes.LOADC);
	this.emit(args);
	return {type: "num"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["ident"]] = function(args, noaccess){
	var d = this.scopeLookup(args);
	if(!noaccess){
		this.emit(MVM.opCodes.LOADR);
		this.emit(d.stack);
		this.emit(d.entry.address);
	}
	return {type: "ident", data: d};
}

Sketch.bindInstructions = function(sketchgen){
	var out = [];
	for (var i = 0; i < Sketch.SketchGenInstr.length; i++){
		out[i] = Sketch.SketchGenInstr[i].bind(sketchgen);
	}
	return out;
}