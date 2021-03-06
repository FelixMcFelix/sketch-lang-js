/* global Sketch */
/* global MVM */

//HELPERS
var createNode = function(type, args){
	return {
		type: Sketch.SketchGenNodes[type],
		arguments: args
	};
};

var boolNegateNode = function(node){
	return createNode("negate", node);
};

var resolveType = function(typeObj){
	if(typeObj.type === "ident"){
		typeObj = typeObj.data.entry
	}

	return typeObj
};

var loadAndOperate = function(context, nodes, operand){
	var types = [];
	for(var i = 0; i< nodes.length; i++){
		var n = context.interpretNode(nodes[i]);

		// if(n.type === "ident"){
		// 	types.push(n.data.entry);
		// } else{
		// 	types.push(n);
		// }
		types.push(resolveType(n));
	}

	var o = Sketch.SketchGenOperandTable.lookup(operand, types);

	context.emit(o.value.code);

	var d = o.value;
	if(o.extra){
		d.extra = o.extra;
	}

	return d;
};

var primitive = function(context, value, type){
	context.emit(MVM.opCodes.LOADC);
	context.emit(value);
	return {type: type};
};

var assignmentOperand = function(context, nodes, operandNode){
	context.interpretNode(createNode("assign", [nodes[0], createNode(operandNode, [nodes[0], nodes[1]])]));
};

var increment = function(context, nodes, value){
	context.interpretNode(nodes[0]);
	assignmentOperand(context, [nodes[0], createNode("num", value)], "addition");

	return Sketch.SketchGenOperandTable.lookup((value>0)?"++":"--", [Sketch.SketchGenNodes._rev[nodes[0]]]).value;
};

/**
 * Table of unbound functions used in code generation.
 * These correspond to keys in {@link Sketch.SketchGenNodes}, and MUST be bound to an instance of {@link Sketch.SketchGen} to function.
 * @constant Sketch.SketchGen.SketchGenInstr
 * @author FelixMcFelix (Kyle S.)
 */
Sketch.SketchGenInstr = [];
Sketch.addInstruction = function(key, func){
	Sketch.SketchGenInstr[Sketch.SketchGenNodes[key]] = func;
};

//CONVENTION: All functions return an object with their return type. This is how we do type checking.

/*
Sketch.addInstruction("template", function(args){
	var type;
	return type;
});
*/

//Program header.
Sketch.addInstruction("program", function(args){
	this.interpretNode(args);
	this.emit(MVM.opCodes.EXIT);
});

//Program Structure
Sketch.addInstruction("block", function(args, noCodes){
	//HAS NO TYPE - ORGANISATIONAL TYPE

	this.scopePush(noCodes);
	this.interpretNode(args);
	this.scopePop(noCodes);

	return {type: null}
});

Sketch.addInstruction("function", function(args){
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

	this.interpretNode(createNode("block", [args[1], args[3].arguments]), true);

	//All functions return a null value for their type automatically.
	//This allows runoff at the end, implicit zero return,
	//and makes my life easier.

	var defaultRet = Sketch.sketchGenDefaultReturns[args[2]];

	if(defaultRet === null){
		this.emit(MVM.opCodes.RETURN);
	} else{
		this.interpretNode(createNode(args[2], defaultRet));
		this.emit(MVM.opCodes.RETURNVAL);
	}
	
	this.patch(patchme, this.pc());

	this.endFunction();

	return {type: "function"};
});

Sketch.addInstruction("func_call", function(args){
	//args[0] = name, args[1] = params[]
	//Lookup name, check for function type.
	//Compare param types, count while accessing them.
	//Check return type against 

	var dat = this.scopeLookup(args[0]);

	if(dat.entry.type !== "function"){
		throw "Tried to call "+args[0]+" as though it were a function - it is a "+dat.type+"!";
	}
	if(args[1].length === undefined){
		args[1].length = 0;
	}
	if(dat.entry.extra.paramTypes.length !== args[1].length){
		throw "Parameter length mismatch.";
	}

	for(var i = 0; i<args[1].length; i++){
		var t1 = resolveType(this.interpretNode(args[1][i])).type;
		var t2 = dat.entry.extra.paramTypes[i];

		if (t1 !== t2){
			throw "Type mismatch on parameter "+i+" of call to "+args[0]+": EXPECTED "+t2+", not"+t1+".";
		}
	}

	this.emit(MVM.opCodes.CALL);
	this.emit(dat.stack);
	this.emit(dat.entry.address);
	this.emit(args[1].length);

	return {type: dat.entry.extra.returnType};
});

Sketch.addInstruction("return", function(args){
	if(args === null){
		this.emit(MVM.opCodes.RETURN);
	} else{
		var t1 = resolveType(this.interpretNode(args)).type;
		this.emit(MVM.opCodes.RETURNVAL);

		var t2 = this.currentFunctionType();
		if (t1 !== t2){
			throw "ERROR: expected return type of "+t2+", given "+t1+".";
		}
	}

	return {type: null};
});

Sketch.addInstruction("if", function(args){
	//args is an array of the other classes.
	//each returns an object with property "patch", the address to patch with the end 
	var patches = [];
	var t = this;

	args.forEach(function(c){
		var k = t.interpretNode(c);
		patches.push(k.patch);
	});

	var end = this.pc();

	patches.forEach(function(c){
		if(c !== null){
			t.patch(c, end);
		}
	});

	return {type: null};
});

Sketch.addInstruction("else_if", function(args){
	//args[0] is the expression to test.
	//args[1] is the block.
	var t1 = this.interpretNode(args[0]);
	if(resolveType(t1).type !== "bool"){
		throw "Expressions in an if-else block must be boolean type (true or false).";
	}
	this.emit(MVM.opCodes.JUMPF);
	var patch1 = this.emit(0xFF);

	var t2 = this.interpretNode(args[1]);
	this.emit(MVM.opCodes.JUMP);
	t2.patch = this.emit(0xFF);

	this.patch(patch1, this.pc());

	return t2;
});

Sketch.addInstruction("else", function(args){
	//args should just be a block;
	var d = this.interpretNode(args);
	d.patch = null;
	return d;
});

//Variable declaration and assignment
Sketch.addInstruction("variable_decl", function(args){
	this.interpretNode(args);
});

Sketch.addInstruction("variable_decl_assign", function(args){
	this.interpretNode(args[0]);

	this.interpretNode(createNode("assign", [createNode("ident", args[0].arguments[1]), args[1]]));
});

Sketch.addInstruction("decl", function(args){
	this.scopeRegister(args[1],args[0]);
	return args[0];
});

Sketch.addInstruction("assign", function(args){
	var left = this.interpretNode(args[0], true);
	var right = this.interpretNode(args[1]);

	if(left.type !== "ident"){
		throw "ERROR: non-identity type on left side of assignment operator.";
	}
	if(resolveType(right).type !== resolveType(left).type){
		console.log("Ltype: "+resolveType(left).type+", Rtype: "+resolveType(right).type);
		throw "ERROR: right side of assignment does not match type of identifier.";
	}

	if(right.extra){
		left.data.entry.extra = right.extra;
	}

	this.emit(MVM.opCodes.STORER);
	this.emit(left.data.stack);
	this.emit(left.data.entry.address);

	return right;
});

//Arithmetic Instructions
Sketch.addInstruction("addition", function(args){
	return loadAndOperate(this, args, "+");
});

Sketch.addInstruction("subtraction", function(args){
	return loadAndOperate(this, args, "-");
});

Sketch.addInstruction("multiplication", function(args){
	return loadAndOperate(this, args, "*");
});

Sketch.addInstruction("division", function(args){
	return loadAndOperate(this, args, "/");
});

Sketch.addInstruction("modulo", function(args){
	return loadAndOperate(this, args, "%");
});

Sketch.addInstruction("increment", function(args){
	return increment(this, args, 1);
});

Sketch.addInstruction("decrement", function(args){
	return increment(this, args, -1);
});

Sketch.addInstruction("unary_minus", function(args){
	return this.interpretNode(createNode("multiplication", [args, createNode("num", [-1])]));
});

//Arithmetic assignment Instructions.
Sketch.addInstruction("add_assign", function(args){
	return assignmentOperand(this, args, "addition");
});

Sketch.addInstruction("sub_assign", function(args){
	return assignmentOperand(this, args, "subtraction");
});

Sketch.addInstruction("mul_assign", function(args){
	return assignmentOperand(this, args, "multiplication");
});

Sketch.addInstruction("div_assign", function(args){
	return assignmentOperand(this, args, "division");
});

Sketch.addInstruction("mod_assign", function(args){
	return assignmentOperand(this, args, "modulo");
});

//Graphical operands
Sketch.addInstruction("colour", function(args){
	return loadAndOperate(this, args, "~");
});

Sketch.addInstruction("translate", function(args){
	return loadAndOperate(this, args, "->");
});

//Logical Instructions
Sketch.addInstruction("and", function(args){
	return loadAndOperate(this, args, "&&");
});

Sketch.addInstruction("or", function(args){
	return loadAndOperate(this, args, "||");
});

Sketch.addInstruction("equal", function(args){
	return loadAndOperate(this, args, "?=");
});

Sketch.addInstruction("not_equal", function(args){
	return this.interpretNode(boolNegateNode(createNode("equal", args)));
});

Sketch.addInstruction("negate", function(args){
	return loadAndOperate(this, [args], "!");
});



Sketch.addInstruction("less_than", function(args){
	return loadAndOperate(this, args, "?<");
});

Sketch.addInstruction("greater_than", function(args){
	return loadAndOperate(this, args, "?>");
});

Sketch.addInstruction("less_than_or_equal", function(args){
	return this.interpretNode(boolNegateNode(createNode("greater_than", args)));
});

Sketch.addInstruction("greater_than_or_equal", function(args){
	return this.interpretNode(boolNegateNode(createNode("less_than", args)));
});

//Literals and identifiers.
Sketch.addInstruction("num", function(args){
	return primitive(this, args, "num");
});

Sketch.addInstruction("ident", function(args, noaccess){
	var d = this.scopeLookup(args);
	if(!noaccess){
		this.emit(MVM.opCodes.LOADR);
		this.emit(d.stack);
		this.emit(d.entry.address);
	}
	return {type: "ident", data: d};
});

Sketch.addInstruction("bool", function(args){
	return primitive(this, args, "bool");
});

Sketch.addInstruction("point", function(args){
	var size = args.length;
	
	if(size){
		//Okay, all elements must be num.
		args.forEach(function(curr){
			var t = this.interpretNode(curr);
			if(t.type !== "num" && t.data.entry.type !== "num"){
				throw "Tried to place a non-numeric value into a point type.";
			}
		}.bind(this));
	
		this.emit(MVM.opCodes.AGGR);
		this.emit(size);
	} else{
		throw "Can't define a zero-size point!";
	}

	return {type: "point", extra: {size: size}};
});

Sketch.addInstruction("width", function(){
	this.emit(MVM.opCodes.WIDTH);
	return {type: "num"};
});

Sketch.addInstruction("height", function(){
	this.emit(MVM.opCodes.HEIGHT);
	return {type: "num"};
});

//Render instructions.
Sketch.addInstruction("draw", function(args){
	return loadAndOperate(this, [args], "draw");
});

Sketch.addInstruction("clear", function(){
	primitive(this, null, null);
	this.emit(MVM.opCodes.CLEAR);
	return {type: null};
});

Sketch.addInstruction("clear_colour", function(args){
	return loadAndOperate(this, [args], "clear");
});

Sketch.bindInstructions = function(sketchgen){
	var out = [];
	for (var i = 0; i < Sketch.SketchGenInstr.length; i++){
		out[i] = Sketch.SketchGenInstr[i].bind(sketchgen);
	}
	return out;
};