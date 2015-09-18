Sketch.EnumBase = function(){
	_count = 0;
	this._rev = [];
	this.propAdd = function(name){
		this._rev[_count] = name;
		this[name] = _count++;
	}
}

Sketch.SketchGenInstructions = [];

Sketch.SketchGenNodes = new Sketch.EnumBase();

//Program header.
Sketch.SketchGenNodes.propAdd("program");

//Program Structure
Sketch.SketchGenNodes.propAdd("block");

//Variable declaration and assignment
Sketch.SketchGenNodes.propAdd("variable_decl");
Sketch.SketchGenNodes.propAdd("variable_decl_assign");
Sketch.SketchGenNodes.propAdd("decl");
Sketch.SketchGenNodes.propAdd("assign");

//Arithmetic instructions
Sketch.SketchGenNodes.propAdd("addition");
Sketch.SketchGenNodes.propAdd("subtraction");
Sketch.SketchGenNodes.propAdd("multiplication");
Sketch.SketchGenNodes.propAdd("division");
Sketch.SketchGenNodes.propAdd("modulo");

//Arithmetic assignment instructions.

//Logical Instructions
Sketch.SketchGenNodes.propAdd("and");
Sketch.SketchGenNodes.propAdd("or");
Sketch.SketchGenNodes.propAdd("equal");
Sketch.SketchGenNodes.propAdd("not_equal");
Sketch.SketchGenNodes.propAdd("negate");

//Literals and identifiers.
Sketch.SketchGenNodes.propAdd("num");
Sketch.SketchGenNodes.propAdd("ident");
Sketch.SketchGenNodes.propAdd("bool");