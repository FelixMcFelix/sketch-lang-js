/**
 * Table of unbound functions used in code generation.
 * These correspond to keys in {@link Sketch.SketchGenNodes}, and MUST be bound to an instance of {@link Sketch.SketchGen} to function.
 * @constant Sketch.SketchGen.SketchGenInstr
 * @author FelixMcFelix (Kyle S.)
 */
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
	this.emit(MVM.opCodes.EXIT);
}

//Program Structure
Sketch.SketchGenInstr[Sketch.SketchGenNodes["block"]] = function(args, noCodes){
	//HAS NO TYPE - ORGANISATIONAL TYPE

	this.scopePush(noCodes);
	this.interpretNode(args);
	this.scopePop(noCodes);
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["function"]] = function(args){
	//args[0] = name, args[1] = decls[], args[2] = type, args[3] = block
	//We need to extract info, and then transform the tree to place decls inside the block.

	this.beginFunction(args[2]);

	this.emit(MVM.opCodes.JUMP);
	var patchme = this.emit(0xff);

	//Extract the amount of parameters and their types - names are unimportant for the table.
	var pTypes = [];
	args[1].forEach(function(curr){
		pTypes.push(curr.arguments[0]);
	});

	this.scopeRegister(args[0], "function", {returnType: args[2], paramTypes: pTypes});

	this.interpretNode(
		{
			type: Sketch.SketchGenNodes["block"],
			arguments: [args[1], args[3].arguments]
		}, true
	);

	//All functions return a null value for their type automatically.
	//This allows runoff at the end, implicit zero return,
	//and makes my life easier.

	var defaultRet = Sketch.sketchGenDefaultReturns[args[2]];

	if(defaultRet === null){
		this.emit(MVM.opCodes.RETURN);
	} else{
		this.emit(MVM.opCodes.RETURNVAL);
		this.emit(defaultRet);
	}
	
	this.patch(patchme, this.pc());

	this.endFunction();

	return {type: "function"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["func_call"]] = function(args){
	//args[0] = name, args[1] = params[]
	//Lookup name, check for function type.
	//Compare param types, count while accessing them.
	//Check return type against 

	var dat = this.scopeLookup(args[0]);

	console.log(dat);

	if(dat.entry.type !== "function")
		throw "Tried to call "+args[0]+" as though it were a function - it is a "+dat.type+"!";
	if(args[1].length === undefined)
		args[1].length = 0;
	if(dat.entry.extra.paramTypes.length !== args[1].length)
		throw "Parameter length mismatch."

	for(var i = 0; i<args[1].length; i++){
		var t1 = this.interpretNode(args[1][i]).type;
		var t2 = dat.entry.extra.paramTypes[i];

		if (t1 !== t2)
			throw "Type mismatch on parameter "+i+" of call to "+args[0]+": EXPECTED "+t2+", not"+t1+"."
	}

	this.emit(MVM.opCodes.CALL);
	this.emit(dat.stack);
	this.emit(dat.entry.address);
	this.emit(args[1].length);

	return {type: dat.entry.extra.returnType};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["return"]] = function(args){
	if(args === null){
		this.emit(MVM.opCodes.RETURN);
	} else{
		var t1 = this.interpretNode(args).type;
		this.emit(MVM.opCodes.RETURNVAL);

		var t2 = this.currentFunctionType();
		if (t1 !== t2)
			throw "ERROR: expected return type of "+t2+", given "+t1+".";
	}

	return {type: null};
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
	if(right.type != left.data.entry.type && right.data.entry.type != left.data.entry.type){
		console.log("Ltype: "+left.data.entry.type+", Rtype: "+right.type)
		throw "ERROR: right side of assignment does not match type of identifier."
	}

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

//Logical Instructions
Sketch.SketchGenInstr[Sketch.SketchGenNodes["and"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.BAND);
	
	return {type: "bool"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["or"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.BOR);
	
	return {type: "bool"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["equal"]] = function(args){
	this.interpretNode(args[0]);
	this.interpretNode(args[1]);
	this.emit(MVM.opCodes.CMPEQ);
	
	return {type: "bool"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["not_equal"]] = function(args){
	this.interpretNode({
		type: Sketch.SketchGenNodes["negate"],
		arguments: {
				type: Sketch.SketchGenNodes["equal"],
				arguments: args
		}
	});

	return {type: "bool"};
}

Sketch.SketchGenInstr[Sketch.SketchGenNodes["negate"]] = function(args){
	this.interpretNode([args]);
	this.emit(MVM.opCodes.BNEG);

	return {type: "bool"};
}

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

Sketch.SketchGenInstr[Sketch.SketchGenNodes["bool"]] = function(args){
	this.emit(MVM.opCodes.LOADC);
	this.emit(args);
	return {type: "bool"};
}

Sketch.bindInstructions = function(sketchgen){
	var out = [];
	for (var i = 0; i < Sketch.SketchGenInstr.length; i++){
		out[i] = Sketch.SketchGenInstr[i].bind(sketchgen);
	}
	return out;
}