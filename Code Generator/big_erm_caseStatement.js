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

function walkFunction(a){
	var declarator  =a[0];
	var declarationList = a[1];
	var returnType = a[2];
	var functionBody = a[3];
}

function walkVaraibleDeclAssign(a){
	var type = a[0];
	var declarator = a[1];
	var exp = a[2];
}
function walkVariableDecl(a){
	var type = a[0];
	var declarator = a[1];
}

function walkIf(a){
	var exprsion = a[0];
	var statements = a[1];
}

function  walkIfElse(a){
	var exp = a[0];
	var statements = a[1];
	var elseStatements= a[2];
}
function  walkWhile(a){
	var exp = a[0];
	var body = a[1];
}

function  walkDoWhile(a){
	var exp = a[0];
	var body = a[1];
}

function walkFor(a){
	var decl = a[0];
	var condition = a[1];
	var update = a[2];
	var body = a[3];
}

function walkAddition(a){
	var left = a[0];
	var right = a[1];
}

function walkMinus(a){
	var left = a[0];
	var right = a[1];
}

function walkMultiplication(a){
	var left = a[0];
	var right = a[1];
}
		
function walkDivision(a){
	var left = a[0];
	var right = a[1];
}


function walkModulo(a){
	var left = a[0];
	var right = a[1];
}

function walkAddAssign(a){
    var left = a[0];
    var right = a[1];
}

function walkSubAssign(a){
	var left = a[0];
	var right = a[1];
}
			
function walkMultiAssign(a){
	var left =a[0];
	var right = a[1];
}

function walkDivAssign(a){
	var left = a[0];
	var rigth = a[1];
}
		
function walkModAssign(a){
	var left = a[0];
	var right = a[1];
}
		
function walkIncrements(a){
	var varToDect = a[0];
}
	