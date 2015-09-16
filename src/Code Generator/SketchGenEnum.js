Sketch.EnumBase = function(){
	_count = 0;
	this.propAdd = function(name){
		this[name] = _count++;
	}
}

Sketch.SketchGenInstructions = [];

Sketch.SketchGenNodes = new Sketch.EnumBase();

//Program header.
Sketch.SketchGenNodes.propAdd("program");

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

//Arithmetic assignment instructions.

//Literals and identifiers.
Sketch.SketchGenNodes.propAdd("num");
Sketch.SketchGenNodes.propAdd("ident");