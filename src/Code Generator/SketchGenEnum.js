/* global Sketch */
/* global MVM */
/**
 * @classdesc A base class to construct enumerations, without coupling the label to the constant it represents.
 * @class Sketch.EnumBase
 * @public
 * @author FelixMcFelix (Kyle S.)
 */

Sketch.EnumBase = function(){
	_count = 0;
	/**
	 * Array matching numbers to their original names. Not to be used unless reverse lookup is specifically required.
	 * @name Sketch.EnumBase._rev
	 * @type {string[]}
	 * @protected
	 */
	this._rev = [];

	/**
	 * Add a new property to the enum.
	 * @method Sketch.EnumBase#propAdd
	 * @returns void
	 * @public
	 */
	this.propAdd = function(name){
		this._rev[_count] = name;
		this[name] = _count++;
	}
};

/**
 * Enum for all supported nodes within the code generator.
 * @readonly
 * @enum {number}
 */

/*
Sketch.SketchGenNodes.propAdd("template");
*/

Sketch.SketchGenNodes = new Sketch.EnumBase();

//Program header.
Sketch.SketchGenNodes.propAdd("program");

//Program Structure
Sketch.SketchGenNodes.propAdd("block");
Sketch.SketchGenNodes.propAdd("function");
Sketch.SketchGenNodes.propAdd("func_call");
Sketch.SketchGenNodes.propAdd("return");

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

Sketch.SketchGenNodes.propAdd("increment");
Sketch.SketchGenNodes.propAdd("decrement");

//Arithmetic assignment instructions.
Sketch.SketchGenNodes.propAdd("add_assign");
Sketch.SketchGenNodes.propAdd("sub_assign");
Sketch.SketchGenNodes.propAdd("mul_assign");
Sketch.SketchGenNodes.propAdd("div_assign");
Sketch.SketchGenNodes.propAdd("mod_assign");

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