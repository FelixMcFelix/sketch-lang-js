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

//Variable declaration and assignment
Sketch.SketchGenInstr[Sketch.SketchGenNodes["variable_decl"]] = function(args){
	this.interpretNode(args);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["variable_decl_assign"]] = function(args){
	this.interpretNode({type: Sketch.SketchGenNodes["decl"], arguments: args[0]});
	this.interpretNode({type: Sketch.SketchGenNodes["assign"], arguments: [args[0].arguments[0], args[1]]});
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["decl"]] = function(args){
	this.scopeRegister(args[1],args[0]);
	return args[0];
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["assign"]] = function(args){
	var left = this.interpretNode(args[0]);
	var right = this.interpretNode(args[1]);

	//TODO: check left is ident and right matches the ident's resolved type.

	this.emit(MVM.opCodes.STORER);
	this.emit(left.data.stack);
	this.emit(left.data.entry.address);
}

//Arithmetic Instructions
Sketch.SketchGenInstr[Sketch.SketchGenNodes["addition"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.IADD);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["subtraction"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.ISUB);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["multiplication"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.IMUL);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["division"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.IDIV);
}

//Arithmetic assignment Instructions.

//Literals and identifiers.
Sketch.SketchGenInstr[Sketch.SketchGenNodes["num"]] = function(args){
	this.emit(MVM.opCodes.LOADC);
	this.emit(args);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["ident"]] = function(args){
	return {type: "ident", data: this.scopeLookup(args)};
}

Sketch.bindInstructions = function(sketchgen){
	var out = [];
	for (var i = 0; i < Sketch.SketchGenInstr.length; i++){
		out[i] = Sketch.SketchGenInstr[i].bind(sketchgen);
	}
	return out;
}