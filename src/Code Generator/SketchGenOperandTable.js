/* global Sketch */
/* global MVM */
//Class definitions for the lookup table.

Sketch.MultiKeyTable = function(){
	this.store = {};
};

Sketch.MultiKeyTable.prototype = {
	add: function(operand, keys, value){
		var entry = new Sketch.MultiKeyTableEntry(this, operand, keys, value);

		if(!this.store[operand]){
			this.store[operand] = {};
		}

		var cursor = this.store[operand];

		for(var i = 0; i<keys.length; i++){
			if(!cursor[keys[i]]){
				cursor[keys[i]] = {};
			}

			cursor = cursor[keys[i]];
		}

		cursor.content = entry;

		return entry;
	},

	lookup: function(operand, keys){
		try{
			var k = this.store[operand];

			for(var i = 0; i< keys.length; i++){
				k = k[keys[i]];
			}

			if(k.content){
				return k.content;
			} else{
				throw "No associated entry...";
			}
		} catch(e){
			throw "Operand and key combination not found for: "+operand+" and "+keys;
		}
	}
};

Sketch.MultiKeyTableEntry = function(table, operand, keys, value){
	this.parent = table;
	this.keys = keys;
	this.value = value;
};

Sketch.MultiKeyTableEntry.prototype = {
	reflexive: function(){
		this.parent.add(this.keys.reverse(), this.value);
	}
};

Sketch.OpCheckValue = function(type, code){
	this.type = type;
	this.code = code;
};

Sketch.SketchGenOperandTable = new Sketch.MultiKeyTable();

/* TEMPLATE
Sketch.SketchGenOperandTable.add("+", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FADD)
							)
							.reflexive();

Sketch.SketchGenOperandTable.add("+", ["num", "num"], new Sketch.OpCheckValue("num", MVM.opCodes.FADD))
							.reflexive();
*/

//OUR TYPES ARE num, bool, point, line, polygon, void.

//---//
// + //
//---//
Sketch.SketchGenOperandTable.add("+", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FADD)
							);

Sketch.SketchGenOperandTable.add("+", ["point", "point"],
							  new Sketch.OpCheckValue("line", MVM.opCodes.PTADD)
							);

//TODO: add opcode.
Sketch.SketchGenOperandTable.add("+", ["point", "line"],
							  new Sketch.OpCheckValue("polygon", null)
							)
							.reflexive();

//TODO: add opcode.
Sketch.SketchGenOperandTable.add("+", ["point", "polygon"],
							  new Sketch.OpCheckValue("polygon", null)
							)
							.reflexive();

//---//
// - //
//---//
Sketch.SketchGenOperandTable.add("-", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FSUB)
							);

//---//
// * //
//---//
Sketch.SketchGenOperandTable.add("*", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FMUL)
							);

//---//
// / //
//---//
Sketch.SketchGenOperandTable.add("/", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FDIV)
							);

//---//
// % //
//---//
Sketch.SketchGenOperandTable.add("%", ["num", "num"],
							  new Sketch.OpCheckValue("num", MVM.opCodes.FMOD)
							);

//----//
// ++ //
//----//
Sketch.SketchGenOperandTable.add("++", ["ident"],
							  new Sketch.OpCheckValue("num", null)
							);

//----//
// -- //
//----//
Sketch.SketchGenOperandTable.add("--", ["ident"],
							  new Sketch.OpCheckValue("num", null)
							);

//----//
// && //
//----//
Sketch.SketchGenOperandTable.add("&&", ["bool", "bool"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.BAND)
							);

//----//
// || //
//----//
Sketch.SketchGenOperandTable.add("||", ["bool", "bool"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.BOR)
							);


//----//
// ?= //
//----//
Sketch.SketchGenOperandTable.add("?=", ["bool", "bool"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPEQ)
							);
Sketch.SketchGenOperandTable.add("?=", ["num", "num"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPEQ)
							);
Sketch.SketchGenOperandTable.add("?=", ["point", "point"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPEQ)
							);
Sketch.SketchGenOperandTable.add("?=", ["line", "line"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPEQ)
							);
Sketch.SketchGenOperandTable.add("?=", ["polygon", "polygon"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPEQ)
							);

//----//
// ?< //
//----//
Sketch.SketchGenOperandTable.add("?<", ["num", "num"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPLT)
							);

//----//
// ?> //
//----//
Sketch.SketchGenOperandTable.add("?>", ["num", "num"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.CMPGT)
							);

//---//
// ! //
//---//
Sketch.SketchGenOperandTable.add("!", ["bool"],
							  new Sketch.OpCheckValue("bool", MVM.opCodes.BNEG)
							);
