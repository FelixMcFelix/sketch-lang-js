//big fuck off case statement
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
		case  "for":
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
		case "increments":
			walkIncrements(obj.arguments);
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

//Walkers for all different types of node

//for example in 
//Function Foo(int x) -> int{
//	int y = x + 1;
//	return y;
//	}
//declarator = "Foo"
//declarationList = ["int", "x"]
//returnType = "int"
//functionBody would consist of a decl list and a statement list for what is contained in the body
	
function walkFunction(a){
	var declarator  =a[0];
	var declarationList = a[1];
	var returnType = a[2];
	var functionBody = a[3];
}

//for example in int x = 1
//type = int
//declarator = x
//exp = 1
	
function walkVaraibleDeclAssign(a){
	var type = a[0];
	var declarator = a[1];
	var exp = a[2];
}

//for example in int x;
//type = int
//declarator = x
	
function walkVariableDecl(a){
	var type = a[0];
	var declarator = a[1];
}

//for example in if(x ?= 1){*do some code"}
//expression would be a equality check node for x and 1
//statements would be a statement list with some code
	
function walkIf(a){
	var expression = a[0];
	var statements = a[1];
}

//for example in if(x ?= 1){...} else{...}
//exp would be a equality check node for x and 1
//statementswould be a statement list with the code from the if statement body
//elseStatements would a statement list with the code from the else body 
	
function  walkIfElse(a){
	var exp = a[0];
	var statements = a[1];
	var elseStatements= a[2];
}

//for example in while(b ?= true){...}
//exp would be an equality check node for b and true
//body would be a statement list with the code from the while loop body
	
function  walkWhile(a){
	var exp = a[0];
	var body = a[1];
}

//for example Do{...}while(b = true)
//exp would be an equality check node for b and true
//body would be a statement list with the code from the do while loop body
	
function  walkDoWhile(a){
	var exp = a[0];
	var body = a[1];
}

//for example in For(int i = 0; i ?< 5; i++){...}
//decl would be a VaraibleDeclAssign node for int i = 0
//condition would be a equality check node between variable i and 5
//update would be an increments node for i
//body would be a statement list with the code from the for loop body

function walkFor(a){
	var decl = a[0];
	var condition = a[1];
	var update = a[2];
	var body = a[3];
}

//assigns variables to both sides of statement
//for example in x + y
//left = x
//right = y
	
function walkAddition(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x - y
//left = x
//right = y
	
function walkMinus(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x * y
//left = x
//right = y
	
function walkMultiplication(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x / y
//left = x
//right = y
			
function walkDivision(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x % y
//left = x
//right = y

function walkModulo(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x += y
//left = x
//right = y
	
function walkAddAssign(a){
    var left = a[0];
    var right = a[1];
}

//assigns variables to both sides of statement
//for example in x -= y
//left = x
//right = y
	
function walkSubAssign(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x *= y
//left = x
//right = y
				
function walkMultiAssign(a){
	var left =a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x /= y
//left = x
//right = y
	
function walkDivAssign(a){
	var left = a[0];
	var rigth = a[1];
}

//assigns variables to both sides of statement
//for example in x %= y
//left = x
//right = y
			
function walkModAssign(a){
	var left = a[0];
	var right = a[1];
}

//assigns variables to both sides of statement
//for example in x++
//name = x
		
function walkIncrements(a){
	var varToDect = a[0];
}

//assigns variables to both sides of statement
//for example in x--
//name = x

var walkDecrement = function(obj arguments){
	var name = arguments[0];
}

//assigns variables to both sides of statement
//for example in x && 2
//left = x
//right = 2

var walkAnd = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x || 2
//left = x
//right = 2

var walkOr = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x = 2
//left = x
//right = 2

var walkAssign = function(arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x & 2
//left = x
//right = 2

var walkBitAND = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x >>> 2
//left = x
//right = 2

var walkZeroFillRightShift = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x | 2
//left = x
//right = 2

var walkBitOR = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x >> 2
//left = x
//right = 2

var walkBitRightShift = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x << 2
//left = x
//right = 2

var walkBitLeftShift = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x ^ 2
//left = x
//right = 2

var walkbitXOR = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in != 2
//left = x
//right = 2

var walkNotEqual = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x <= 2
//left = x
//right = 2

var walkLessThanOrEqual = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x < 2
//left = x
//right = 2

var walkLessThan = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x > 2
//left = x
//right = 2

var walkLargerThan = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x >= 2
//left = x
//right = 2

var walkGreaterThanOrEqual = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}

//assigns variables to both sides of statement
//for example in x ?= 2
//left = x
//right = 2

var walkEquality = function(obj arguments){
	var left = arguments[0];
	var right = arguments[1];
}
	
