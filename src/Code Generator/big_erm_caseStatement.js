//==================================================================================================
/* Code Generator information:
 * 	Makes use of a Recursive Descent Tree Walker
 * 		Embedded Heterogeneous Tree Walker pattern
 * 	Generates opcodes for the code store
 * 
 */

//==================================================================================================
/* PROGRAM SETUP 
 * 
 */

var LEAFNODES = ["int", "float", "bool", "void"];

var OPCODES = {
	STOREG: 0,		// Store Global
	LOADG: 	1,		// Load Global
	STOREL: 2,		// Store Local
	LOADL: 	3,		// Load Local
	LOADC: 	4,		// Load Constant
	IADD: 	5,		// Integer Add
	ISUB: 	6,		// Integer Subtract
	IMUL: 	7,		// Integer Multiply
	IDIV: 	8,		// Integer Divide
	IMOD:	9,		// Integer Modulo
	FADD: 	10,		// Float Add
	FSUB: 	11,		// Float Subtract
	FMUL: 	12,		// Float Multiply
	FDIV: 	13,		// Float Division
	FMOD:	14,		// Fload Modulo	
	LOADIDX:15,		// Load Index
	SETIDX: 16,		// Set Index
	NCMPEQ: 17,		// (Numerical) Compare Equal
	NCMPLT: 18,		// (Numerical) Compare Less Than
	NCMPGT: 19,		// (Numerical) Compare Greater Than
	JUMP: 	20,		// Jump Always
	JUMPT: 	21, 	// Jump True
	JUMPF: 	22,		// Jump False
	CALL: 	23, 	// Call (to be used with functions only)
	RETURN: 24,		// Return (boolean for whether to return top of stack)
	LNDRAW: 25,		// Line Draw
	PGDRAW: 26,		// Polygon Draw
	RENDER: 27,		// Render Canvas
	CLEAR: 	28,		// Clear Canvas
	PTADD: 	29,		// Point Add
	LNTOPG: 30,		// Line to Polygon
	LNMUL:  31,		// Line Multiplication
	PRINTST:32,		// Print Stack (Top)
	PRINTS: 33,		// Print Stack (all)
	EXIT: 	34		// Exit Program
};

var SketchGen = function(syntaxTree) {
    this.type = "program";
   	this.arguments = syntaxTree;
}

var treeDepth = 0;

//var thisSketch = new Sketch ('{"type": "multiplication", "arguments": [{"type": "subtraction", "arguments": ["1", "2"]}, "1"]}');

var codeStore = [];		// an integer array that corresponds with opcodes and integers to push to the Abstract Machine stack
var constantPool = [] 	// a miscellaneous array, holds all of the non-integer constants (which can't be pushed onto stack)
var labelTable = [];	// an array of addresses for jump instructions to entries in the code store

//==================================================================================================
/* Now we simply walk the tree */
//walk (thisSketch);

//==================================================================================================
/* debug functions */

function printNode(obj) {
	console.log(obj)
}

//==================================================================================================
/* Misc functions */

function push (opcodes) {
	// opcodes are to be sent to abstract machine, along with refrences to label table and constant pool.
	codeStore = codeStore.concat(opcodes);
	console.log(codeStore);
}

//==================================================================================================
/* Walkers for all different types of node */

// program root ----------------------------------------------------------------

function walkProgram(obj) {
	
	var programTree = obj.arguments;
	
	walk (programTree);
	
}

// assignment ------------------------------------------------------------------

function walkAssign (obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x = 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
	
	// find left in symbol table/scope tree, warn about undeclared if not there.
	// evaluate (walk) right.
	
}

// declarations (inner and outer) ----------------------------------------------

function walkFunction(obj){
	/* 
	 * example:
	 * 	 Function Foo(int x) -> int{
	 * 		int y = x + 1;
	 * 		return y;
	 * 	 }
	 * declarator = "Foo"
	 * declarationList = ["int", "x"]
	 * returnType = "int"
	 *  functionBody would consist of a decl list and a statement list for what is contained in the body
	 */
 	var declarator = obj.arguments[0];			// name of function
	var declarationList = obj.arguments[1];		// list of parameters
	var returnType = obj.arguments[2];			// return type of function
	var functionBody = obj.arguments[3];		// optional decl/statement-lists
	
	console.log(obj.type + " " + declarator + " returns " + returnType);
	
	// add function name/return type to symbol table/label table
	// walk list of parameters (which implies adding them to symbol table also)
	// walk body
}

function walkVariableDeclAssign(obj){
	/* 
	 * example:
	 * 	int x = 1
	 * type = int
	 * declarator = x
	 * exp = 1
	 */	 
	var type = obj.arguments[0];
	var declarator = obj.arguments[1];
	var exp = obj.arguments[2];
	
	// walkVariableDecl ([type, declarator])
	// walkAssign ([type, arguments]) ?
}

function walkVariableDecl(obj){
	/* 
	 * example:
	 * 	int x;
	 * type = int
	 * declarator = x
	 */	 
	var type = obj.arguments[0];
	var declarator = obj.arguments[1];		// name of variable
	
	// add varable type/declarator to symbol table
}

// control structures ----------------------------------------------------------

function walkIf(obj){
	/* example:
	 * 	if(x ?= 1) {*do some code"}
	 * expression = x ?=1
	 * statements = *do some code*
	 */
	var expression = obj.arguments[0];
	var statements = obj.arguments[1];
	
	// evaluate(expression)
	// walk statements if true
}

function walkIfElse(obj){
	/* example:
	 * 	if(x ?= 1) {*do some code*} else {*do some other code*}
	 * exp = x ?= 1
	 * statements = *do some code*
	 * elseStatements = *do some other code*
	 */
	var exp = obj.arguments[0];
	var statements = obj.arguments[1];
	var elseStatements= obj.arguments[2];
	
	// walkIf ([expression, statements])
	// for statment in statements: walk(Statement)
}

function walkWhile(obj){
	/* example:
	 * 	while(b ?= true){...}
	 * exp = b ?= true
	 * body = ...
	 */
	var exp = obj.arguments[0];
	var body = obj.arguments[1];
	
	// evaluate exp to see whether we should walk body
	//if (evaluate(exp)) {
		walkDoWhile(obj)
	//}
}

function walkDoWhile(obj){
	/* example:
	 * 	do{...}while(b ?= true)
	 * exp = b ?= true
	 * body = ...
	 */
	var exp = obj.arguments[0];
	var body = obj.arguments[1];
	
	walk(body);
	// evaluate exp to see whether we should walk body again
}

function walkFor(obj){
	/* example:
	 * 	for (int i = 0; i ?< 5; i++) {...}
	 * decl = int i = 0
	 * condition = i ?< 5
	 * update = i++
	 * body = ...
	 */
	var decl = obj.arguments[0];
	var condition = obj.arguments[1];
	var update = obj.arguments[2];
	var body = obj.arguments[3];
	
	// walk declaration, add information to symbol table at local scope
	//		current implementation doesn't allow for reuse of a variable from outwith this scope.
	// evaluate condition to see if we should walk body
	// walk body
	// walk update clause and return to beginning.
}

// mathematical operations -----------------------------------------------------

function walkMathematical(obj, opcode){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x OPERATION y
	 * left = x
	 * right = y
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
	
	if (isNaN(left)) {
		walk(left);
	} else {
		push ([OPCODES.LOADC, parseFloat(left)])
	}
	
	if (isNaN(right)) {
		walk(right);
	} else {
		push ([OPCODES.LOADC, parseFloat(right)]);
	}
	
	push (opcode);	// <- this is the only difference between the 5 mathematical methods.
	
	// if int or float push to stack.
	// any others will go to constant pool.
	// after things pushed to their appropriate places, send opcodes for OPERATION
}

function walkAddition(obj){
	walkMathematical(obj, OPCODES.IADD);
}

function walkSubtraction(obj){
	walkMathematical(obj, OPCODES.ISUB);
}

function walkMultiplication(obj){
	walkMathematical(obj, OPCODES.IMUL);
}

function walkDivision(obj){
	walkMathematical(obj, OPCODES.IDIV);
}

function walkModulo(obj){
	walkMathematical(obj, OPCODES.IMOD);
}

// shorthand operations --------------------------------------------------------
// ---assignment - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// --- these operations have the general form:
// ---		x [OPERATION]= y
// --- where OPERATION corresponds with one of [=, -, *, /, %].
// --- This can be expanded to the form:
// ---		x = x [OPERATION] y
// --- So, these operations are performed by combining the walkAssign function
// --- with their respective walk[operation] function.

function walkAddAssign(obj){
	obj.type = "addition";
	walkAssign(obj.arguments[0], walkAdd(obj));
}

function walkSubAssign(obj){
	obj.type = "subtraction";
	walkAssign(obj.arguments[0], walkSubtract(obj));
}

function walkMultiAssign(obj){
	obj.type = "multiplication";
	walkAssign(obj.arguments[0], walkMultiply(obj));
}

function walkDivAssign(obj){
	obj.type = "division";
	walkAssign(obj.arguments[0], walkDivide(obj));
}

function walkModAssign(obj){
	obj.type = "modulo";
	walkAssign(obj.arguments[0], walkModulo(obj));
}

// ---increment/decrement	 - - - - - - - - - - - - - - - - - - - - - - - - - -

function walkIncrement(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x++
	 * name = x
	 */
	var name = obj.arguments[0];
	
	// x++ expands to x = x + 1
	// so, walkAssign(walkAdd(x,1))
}

function walkDecrement(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x--
	 * name = x
	 */
	var name = obj.arguments[0];
	
	// x-- expands to x = x - 1
	// so, walkAssign(walkSubtract(x,1))
	// or, walkAssign(walkAdd(x,-1))
}

// boolean logic ---------------------------------------------------------------

function walkAnd(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x && 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
	
	// check both evaluate to true.
	// Evaluate(left)
	// Evaluate(right)
}

function walkOr(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x || 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
	
	// check if either evaluates to true.
	// Evaluate(left)
	// Evaluate(right)
}

// comparison operations -------------------------------------------------------

function walkNotEqual(obj){
	/* assigns variables to both sides of statement
	 * example:
	 *  x != 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

function walkLessThanOrEqual(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x <= 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

function walkLessThan(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x < 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

function walkGreaterThan(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x > 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

function walkGreaterThanOrEqual(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x >= 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

function walkEquality(obj){
	/* assigns variables to both sides of statement
	 * example:
	 * 	x ?= 2
	 * left = x
	 * right = 2
	 */
	var left = obj.arguments[0];
	var right = obj.arguments[1];
}

// undefined -- usually an empty node, e.g. a blank program.
function walkUndefined(){
	
	undef = new Object();
	undef.type = "undefined";
	undef.arguments = "---";
	
	console.log("Undefined node")
	printNode(undef)
}

// default - this means that something unexpected has got into the tree. -------
function walkUnknown(obj){

	unknown = new Object();
	unknown.type = "unknown";
	unknown.arguments = "(" + obj.toString() + ")";
	
	console.log("Unwalkable node")
	printNode(unknown);
}

//==================================================================================================
// case statement corresponds with each of the structures in the BNF.
//  (this could just as easily be implemented as a big if/else block)
function walk(obj){

  /* preorder */
	printNode(obj);

	treeDepth += 1;

  /* inorder */	
	switch(obj.type){

	// program root
		case "program":
			walkProgram(obj);
			break;
	// assignment
		case "assign":
			walkAssign(obj);
			break;
	// declarations (inner and outer)
		case "function":
			walkFunction(obj);
			break;
		case "variable-decl-assign":
			walkVariableDeclAssign(obj);
			break;
		case "variable-decl":
			walkVariableDecl(obj);
			break;
	// control structures
		case "if":
			walkIf(obj);
			break;
		case "if-else":
			walkIfElse(obj);
			break;
		case "while":
			walkWhile(obj);
			break;
		case "do-while":
			walkDoWhile(obj);
			break;
		case "for":
			walkFor(obj);
			break;
	// mathematical operations
		case "addition":
			walkAddition(obj);
			break;
		case "subtraction":
			walkSubtract(obj);
			break;
		case "multiplication":
			walkMultiplication(obj);
			break;
		case "division":
			walkDivision(obj);
			break
		case "modulo":
			walkModulo(obj);
			break;
	// shorthand operations
	// 	--assignment
		case "add-assign":
			walkAddAssign(obj);
			break;
		case "sub-assign":
			walkSubAssign(obj);
			break;
		case "multi-assign":
			walkMultiAssign(obj);
			break;
		case "div-assign":
			walkDivAssign(obj);
			break;
		case "mod-assign":
			walkModAssign(obj);
			break;
	// 	--increment/decrement
		case "increment":
			walkIncrement(obj);
			break;
		case "decrement":
			walkDecrement(obj);
			break;
	// boolean logic
		case "and":
			walkAnd(obj);
			break;
		case "or":
			walkOr(obj);
			break;
	// comparison operations
		case "equality":
			walkEquality(obj);
			break
		case "less-than":
			walkLessThan(obj);
			break;
		case "greater-than":
			walkGreaterThan(obj);
			break;
		case "not-equal":
			walkNotEqual(obj);
			break;
		case "less-than-or-equal":
			walkLessThanOrEqual(obj);
			break;
		case "greater-than-or-equal":
			walkGreaterThanOrEqual(obj);
			break;
			
	// "OH NO"des - if either of these two is reached, then something has gone horribly wrong.
	/*
	 *	This would happen if we haven't accounted for something in the parser.
	 *	To account for the error, we keep it at the same treeDepth as its parent, 
	 *  which we've done here by decrementing/incrementing the treeDepth
	 *	in pre/postorder traversal respectively.
	 */
	 	
	// undefined -- usually an empty node, e.g. a blank program.
		case undefined:
			treeDepth -= 1;
			walkUndefined();
			treeDepth += 1;
			break;
	// default - this means that something unexpected has got into the tree.
		default :
			treeDepth -= 1;
			walkUnknown(obj);
			treeDepth += 1;
			break;
	}

  /* postorder */
	treeDepth -= 1;
	printNode(obj);
	
}
