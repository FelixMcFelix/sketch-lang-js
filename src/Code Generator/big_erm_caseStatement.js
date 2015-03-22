/* Recursive Descent Tree Walker
 * 
 * 		Embedded Heterogeneous Tree Walker pattern
 * 
 */

// case statement corresponds with each of the structures in the BNF.
//  (this could just as easily be implemented as a big if/else block)
var walk = function (obj) {

	switch(obj.type){
		case "function":
			walkFunction(obj.arguments);
			break;
		case "variable-decl-assign":
			walkVaraibleDeclAssign(obj.arguments);
			break;
		case "variable-decl":
			walkVariableDecl(obj.arguments);
			break;
		case "addition":
			walkIf(obj.arguments);
			break;
		case "ifelse":
			walkIfElse(obj.arguments);
			break;
		case "while":
			walkWhile(obj.arguments);
			break;
		case "do_while":
			walkDoWhile(obj.arguments);
			break;
		case "for":
			walkFor(obj.arguments);
			break; 
		case "addition":
			walkAddition(obj.arguments);
			break;
		case "minus":
			walkMinus(obj.arguments);
			break;
		case "multiplication":
			walkMultiplication(obj.arguments);
			break;
		case "division":
			walkDivision(obj.arguments);
			break
		case "modulo":
			walkModulo(obj.arguments);
			break;
		case "add_assign":
			walkAddAssign(obj.arguments);
			break;
		case "sub_assign":
			walkSubAssign(obj.arguments);
			break;
		case "multi_assign":
			walkMultiAssign(obj.arguments);
			break;
		case "div_assign":
			walkDivAssign(obj.arguments);
			break;
		case "mod_assign":
			walkModAssign(obj.arguments);
			break;
		case "increment":
			walkIncrement(obj.arguments);
			break;
		case "decrement":
			walkDecrement(obj.arguments);
			break;
		case "and":
			walkAnd(obj.arguments);
			break;
		case "or":
			walkOr(obj.arguments);
			break;
		case "bit-XOR":
			walkBitXOR(obj.arguments);
			break;
		case "bit-AND":
			walkBitAND(obj.arguments);
			break;
		case "bit-OR":
			walkBitOR(obj.arguments);
			break;
		case "bit-right-shift":
			walkBitRightShift(obj.arguments);
			break;
		case "bit-left-shift":
			walkBitLeftShift(obj.arguments);
			break;
		case "zero-fill-right-shift":
			walkZeroFillRightShift(obj.arguments);
			break;
		case "equality":
			walkEquality(obj.arguments);
			break
		case "less-than":
			walkLessThan(obj.arguments);
			break;
		case "larger-than":
			walkLargerThan(obj.arguments);
			break;
		case "not-equal":
			walkNotEqual(obj.arguments);
			break;
		case "less-than-or-equal":
			walkLessThanOrEqual(obj.arguments);
			break;
		case "greater-than-or-equal":
			walkGreaterThanOrEqual(obj.arguments);
			break;
		case "assign":
			walkAssign(obj.arguments);
			break;
		}
}

/* Walkers for all different types of node

/* 
 * for example in 
 * 	 Function Foo(int x) -> int{
 * 		int y = x + 1;
 * 		return y;
 * 	 }
 * declarator = "Foo"
 * declarationList = ["int", "x"]
 * returnType = "int"
 *  functionBody would consist of a decl list and a statement list for what is contained in the body
 */
function walkFunction(arguments){
	var declarator = arguments[0];			// name of function
	var declarationList = arguments[1];		// list of parameters
	var returnType = arguments[2];			// return type of function
	var functionBody = arguments[3];		// optional decl/statement_lists
	
	// add function name/return type to symbol table
	// walk list of parameters (which implies adding them to symbol table also)
	// walk body
}

/* for example in int x = 1
 * type = int
 * declarator = x
 * exp = 1
 */
function walkVaraibleDeclAssign(arguments){
	var type = arguments[0];
	var declarator = arguments[1];
	var exp = arguments[2];
	
	// walkVariableDecl ([type, declarator])
	// walkAssign ([type, arguments]) ?
}

/* for example in int x;
 * type = int
 * declarator = x
 */
function walkVariableDecl(arguments){
	var type = arguments[0];
	var declarator = arguments[1];		// name of variable
	
	// add varable type/declarator to symbol table
}

/* for example in if(x ?= 1){*do some code"}
 * expression would be a equality check node for x and 1
 * statements would be a statement list with some code
 */
function walkIf(arguments){
	var expression = arguments[0];
	var statements = arguments[1];
	
	// evaluate expression?
	// walk statements if true
}

/* for example in if(x ?= 1){...} else{...}
 * exp would be a equality check node for x and 1
 * statementswould be a statement list with the code from the if statement body
 * elseStatements would a statement list with the code from the else body 
 */
function walkIfElse(arguments){
	var exp = arguments[0];
	var statements = arguments[1];
	var elseStatements= arguments[2];
	
	// walkIf ([expression, statements])
	// walkStatements () // TODO: find equivalent of walkStatments
}

/* for example in while(b ?= true){...}
 * exp would be an equality check node for b and true
 * body would be a statement list with the code from the while loop body
 */
function walkWhile(arguments){
	var exp = arguments[0];
	var body = arguments[1];
	
	// evaluate exp to see whether we should walk body
}

/* for example Do{...}while(b = true)
 * exp would be an equality check node for b and true
 * body would be a statement list with the code from the do while loop body
 */
function walkDoWhile(arguments){
	var exp = arguments[0];
	var body = arguments[1];
	
	// walk body
	// evaluate exp to see whether we should walk body again
}

/* for example in For(int i = 0; i ?< 5; i++){...}
 * decl would be a VaraibleDeclAssign node for int i = 0
 * condition would be a equality check node between variable i and 5
 * update would be an increment node for i
 * body would be a statement list with the code from the for loop body
 */
function walkFor(arguments){
	var decl = arguments[0];
	var condition = arguments[1];
	var update = arguments[2];
	var body = arguments[3];
	
	// walk declaration, add stuff to symbol table		// TODO check with Kris, seems like this necessitates a new variable be declared every time, meaning we can't use others.
	// evaluate condition to see if we should walk body
	// walk body
	// walk update clause and return to beginning.
}

// TODO: mathematical operation type checking? overloading?

/* assigns variables to both sides of statement
 * for example in x + y
 * left = x
 * right = y
 */
function walkAddition(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// if int, opcodes to push left and right to stack
	// if float, opcodes to push left and right to constant pool
	// other types, not sure what to do here. operator overloading?
	// after things pushed to their appropriate places, send opcodes for addition.
}

/* assigns variables to both sides of statement
 * for example in x - y
 * left = x
 * right = y
 */
function walkMinus(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
		// if int, opcodes to push left and right to stack
	// if float, opcodes to push left and right to constant pool
	// other types, not sure what to do here. operator overloading?
	// after things pushed to their appropriate places, send opcodes for subtraction.
}

/* assigns variables to both sides of statement
 * for example in x * y
 * left = x
 * right = y
 */
function walkMultiplication(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// if int, opcodes to push left and right to stack
	// if float, opcodes to push left and right to constant pool
	// other types, not sure what to do here. operator overloading?
	// after things pushed to their appropriate places, send opcodes for multiplition.
}

/* assigns variables to both sides of statement
 * for example in x / y
 * left = x
 * right = y
 */
function walkDivision(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// if int, opcodes to push left and right to stack
	// if float, opcodes to push left and right to constant pool
	// other types, not sure what to do here. operator overloading?
	// after things pushed to their appropriate places, send opcodes for division.
}

/* assigns variables to both sides of statement
 * for example in x % y
 * left = x
 * right = y
 */
function walkModulo(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// if int, opcodes to push left and right to stack
	// if float, opcodes to push left and right to constant pool
	// other types, not sure what to do here. operator overloading?
// after things pushed to their appropriate places, send opcodes for modulo arithetic.
}

/* assigns variables to both sides of statement
/for example in x += y
 * left = x
 * right = y
 */
function walkAddAssign(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// operation x += y expands to x = x + y
	// this means we need to add x and y, then assign result to x
	// so, walkAssign(x, walkAdd(x,y))
}

/* assigns variables to both sides of statement
 * for example in x -= y
 * left = x
 * right = y
 */
function walkSubAssign(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// operation x -= y expands to x = x - y
	// this means we need to subtract y from x, then assign the result to x
	// so, walkAssign(x, walkSubtract(x,y))
}

/* assigns variables to both sides of statement
 * for example in x * = y
 * left = x
 * right = y
 */
function walkMultiAssign(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// operation x *= expands to x = x * y
	// this means we need to multiply x by y, then assign to x
	// so, walkAssign(x, walkMultiply(x,y))
}

/* assigns variables to both sides of statement
 * for example in x /= y
 * left = x
 * right = y
 */
function walkDivAssign(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// operation x /= yexpands to x = x / y
	// this means we need to divide x by y, then assign to x
	// so, walkAssign(x, walkDivide(x,y))
}

/* assigns variables to both sides of statement
 * for example in x %= y
 * left = x
 * right = y
 */
function walkModAssign(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// operation x %= y expands to x = x % y
	// this means we need to get x % y, then assign to x
	// so, walkAssign(x, walkModulo(x+y))
}

/* assigns variables to both sides of statement
 * for example in x++
 * name = x
 */
function walkIncrement(arguments){
	var name = arguments[0];
	
	// x++ expands to x = x + 1
	// so, walkAssign(walkAdd(x,1))
}

//----------TODO: check which is the better syntax: function ...(...) or var ... = function (...)------------------------------------------------------------------------

/* assigns variables to both sides of statement
 * for example in x--
 * name = x
 */
var walkDecrement = function(arguments){
	var name = arguments[0];
	
	// x-- expands to x = x - 1
	// so, walkAssign(walkSubtract(x,1))
	// or, walkAssign(walkAdd(x,-1))
}

/* assigns variables to both sides of statement
 * for example in x && 2
 * left = x
 * right = 2
 */
var walkAnd = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// TODO: make evaluate function
	// check both evaluate to true.
	// Evaluate(left)
	// Evaluate(right)
}

/* assigns variables to both sides of statement
 * for example in x || 2
 * left = x
 * right = 2
 */
var walkOr = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// check if either evaluates to true.
	// Evaluate(left)
	// Evaluate(right)
}

/* assigns variables to both sides of statement
 * for example in x = 2
 * left = x
 * right = 2
 */
var walkAssign = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
	
	// find left in symbol table/scope tree, warn about undeclared if not there.
	// evaluate (walk) right.
	
}

	// TODO check with Darren about bitwise operator opcodes.

/* assigns variables to both sides of statement
 * for example in x & 2
 * left = x
 * right = 2
 */
var walkBitAND = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x >>> 2
 * left = x
 * right = 2
 */
var walkZeroFillRightShift = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x | 2
 * left = x
 * right = 2
 */
var walkBitOR = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x >> 2
 * left = x
 * right = 2
 */
var walkBitRightShift = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x << 2
 * left = x
 * right = 2
 */
var walkBitLeftShift = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x ^ 2
 * left = x
 * right = 2
 */
var walkbitXOR = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

// TODO: evaluation function for boolean logic

/* assigns variables to both sides of statement
 * for example in != 2
 * left = x
 * right = 2
 */
var walkNotEqual = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x <= 2
 * left = x
 * right = 2
 */
var walkLessThanOrEqual = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x < 2
 * left = x
 * right = 2
 */
var walkLessThan = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x > 2
 * left = x
 * right = 2
 */
var walkLargerThan = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x >= 2
 * left = x
 * right = 2
 */
var walkGreaterThanOrEqual = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

/* assigns variables to both sides of statement
 * for example in x ?= 2
 * left = x
 * right = 2
 */
var walkEquality = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

