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


/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,41],$V2=[1,16],$V3=[1,17],$V4=[1,18],$V5=[1,19],$V6=[1,20],$V7=[1,21],$V8=[1,22],$V9=[1,23],$Va=[1,35],$Vb=[1,36],$Vc=[1,37],$Vd=[1,38],$Ve=[1,39],$Vf=[1,40],$Vg=[1,24],$Vh=[1,25],$Vi=[1,26],$Vj=[1,27],$Vk=[1,28],$Vl=[1,29],$Vm=[1,30],$Vn=[1,31],$Vo=[1,32],$Vp=[1,33],$Vq=[1,34],$Vr=[5,10,21,25,32,34,35,36,37,38,39,67,68,69,70,71,72,76,77,78,79,80,81,82,83,84,85,86],$Vs=[1,45],$Vt=[5,10,21,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72,76,77,78,79,80,81,82,83,84,85,86],$Vu=[2,80],$Vv=[1,48],$Vw=[5,10,21,25,26,32,33,34,35,36,37,38,39,67,68,69,70,71,72,76,77,78,79,80,81,82,83,84,85,86],$Vx=[5,10,21,22,25,26,32,33,34,35,36,37,38,39,67,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,86],$Vy=[1,77],$Vz=[1,51],$VA=[1,52],$VB=[1,53],$VC=[1,54],$VD=[1,55],$VE=[1,56],$VF=[1,57],$VG=[1,58],$VH=[1,59],$VI=[1,60],$VJ=[1,61],$VK=[1,62],$VL=[1,63],$VM=[1,64],$VN=[1,65],$VO=[1,66],$VP=[1,67],$VQ=[1,68],$VR=[1,69],$VS=[1,70],$VT=[1,71],$VU=[1,72],$VV=[1,73],$VW=[1,74],$VX=[1,75],$VY=[1,76],$VZ=[2,86],$V_=[1,78],$V$=[1,94],$V01=[25,67],$V11=[5,10,16,21,22,24,25,26,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,86],$V21=[22,24],$V31=[5,10,16,21,22,24,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,86],$V41=[5,10,21,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,86],$V51=[1,134],$V61=[21,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72],$V71=[10,21,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72,76,77,78,79,80,81,82,83,84,85,86],$V81=[2,84],$V91=[21,25,67,68,69,70,71,72],$Va1=[22,24,26],$Vb1=[19,25];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"start":3,"program":4,"EOF":5,"declarations":6,"out-decl":7,"in-decl":8,"statement":9,"FUNCTION":10,"declarator":11,"declaration_list":12,"func_return":13,"body":14,"param":15,"ASSIGN":16,"exp":17,"semi":18,"RETURN_TYPE":19,"type":20,"OPEN_PARENS":21,"CLOSE_PARENS":22,"param_list":23,"COMMA":24,"OPEN_BRACE":25,"CLOSE_BRACE":26,"statement_list":27,"decl_list":28,"condition_statements":29,"iteration_statements":30,"jump_statements":31,"IF":32,"ELSE":33,"WHILE":34,"DO":35,"FOR":36,"CONTINUE":37,"BREAK":38,"RETURN":39,"prim_expr":40,"PLUS":41,"MINUS":42,"ASTERIX":43,"DIV":44,"PERCENT":45,"OP_ADD_ASSIGNMENT":46,"OP_SUB_ASSIGNMENT":47,"OP_MULT_ASSIGNMENT":48,"OP_DIV_ASSIGNMENT":49,"OP_MOD_ASSIGNMENT":50,"OP_INC":51,"OP_DEC":52,"OP_AND":53,"OP_OR":54,"CARET":55,"AMP":56,"BITWISE_OR":57,"OP_RIGHT_SHIFT":58,"OP_LEFT_SHIFT":59,"ZERO_FILL_RIGHT_SHIFT":60,"OP_EQ":61,"LT":62,"GT":63,"OP_NE":64,"OP_LE":65,"OP_GE":66,"IDENTIFIER":67,"DIGIT":68,"TRUE":69,"FALSE":70,"STRINGT":71,"NOT":72,"init_list":73,"SEMICOLON":74,"declaration":75,"VOID":76,"STRING":77,"INT":78,"FLOAT":79,"BOOL":80,"POINT":81,"VECTOR_2":82,"VECTOR_3":83,"VECTOR_4":84,"LINE":85,"POLYGON":86,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"FUNCTION",16:"ASSIGN",19:"RETURN_TYPE",21:"OPEN_PARENS",22:"CLOSE_PARENS",24:"COMMA",25:"OPEN_BRACE",26:"CLOSE_BRACE",32:"IF",33:"ELSE",34:"WHILE",35:"DO",36:"FOR",37:"CONTINUE",38:"BREAK",39:"RETURN",41:"PLUS",42:"MINUS",43:"ASTERIX",44:"DIV",45:"PERCENT",46:"OP_ADD_ASSIGNMENT",47:"OP_SUB_ASSIGNMENT",48:"OP_MULT_ASSIGNMENT",49:"OP_DIV_ASSIGNMENT",50:"OP_MOD_ASSIGNMENT",51:"OP_INC",52:"OP_DEC",53:"OP_AND",54:"OP_OR",55:"CARET",56:"AMP",57:"BITWISE_OR",58:"OP_RIGHT_SHIFT",59:"OP_LEFT_SHIFT",60:"ZERO_FILL_RIGHT_SHIFT",61:"OP_EQ",62:"LT",63:"GT",64:"OP_NE",65:"OP_LE",66:"OP_GE",67:"IDENTIFIER",68:"DIGIT",69:"TRUE",70:"FALSE",71:"STRINGT",72:"NOT",74:"SEMICOLON",76:"VOID",77:"STRING",78:"INT",79:"FLOAT",80:"BOOL",81:"POINT",82:"VECTOR_2",83:"VECTOR_3",84:"VECTOR_4",85:"LINE",86:"POLYGON"},
productions_: [0,[3,2],[4,1],[4,2],[6,1],[6,1],[6,1],[7,5],[8,4],[8,2],[13,2],[13,0],[12,2],[12,3],[23,1],[23,3],[15,2],[14,2],[14,3],[14,3],[14,4],[9,2],[9,1],[9,1],[9,1],[9,1],[29,5],[29,7],[30,5],[30,7],[30,9],[31,2],[31,2],[31,3],[31,2],[28,1],[28,1],[28,2],[28,2],[27,1],[27,2],[17,1],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,2],[17,2],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[17,3],[40,1],[40,1],[40,1],[40,1],[40,1],[40,2],[40,3],[40,5],[40,3],[40,3],[18,1],[18,0],[11,1],[75,1],[75,4],[73,1],[73,3],[73,0],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

           {typeof console !== 'undefined' ? console.log("%j",$$[$0-1]) : print($$[$0-1]);
          return $$[$0-1]; }
        
break;
case 3: case 74:
this.$ = [$$[$0-1],$$[$0]];
break;
case 7:
this.$ = {type: "function",
          arguments: [$$[$0-3],$$[$0-2],$$[$0-1],$$[$0]]};
break;
case 8:
 this.$ = { type: 'variable-decl-assign',
           arguments: [ $$[$0-3],$$[$0-1]]};
break;
case 9:
this.$ = {
          type: 'variable-decl',
          arguments: $$[$0-1]};
    
break;
case 10: case 14:
this.$ = $$[$0];
break;
case 11:
this.$ = "void";
break;
case 12:
this.$ = "";
break;
case 13: case 18: case 19:
this.$ = $$[$0-1];
break;
case 15:
this.$= [$$[$0-2],$$[$0]];
break;
case 16:
this.$ = [$$[$0-1], $$[$0]];
break;
case 17:
 this.$ = "";
break;
case 20:
this.$= [$$[$0-2],$$[$0-1]];
break;
case 26:
 this.$ = { type: "if",
                arguments : [$$[$0-2],
                             $$[$0]]
               };
       
break;
case 27:
this.$ = { type : "ifelse",
               arguments : [ $$[$0-4],
                             $$[$0-2],
                             $$[$0-1]
                           ]
             };
     
break;
case 28:
this.$ = {type : "while", 
              arguments: [ $$[$0-2],
                           $$[$0-1]
                         ]
            }; 
     
break;
case 29:
this.$ = {type : "do_while", 
              arguments: [ $$[$0-5],
                           $$[$0-2]
                         ]
            }; 
     
break;
case 30:
this.$ = {type : "for", 
              arguments: [ $$[$0-6],
                           $$[$0-4],
                           $$[$0-2],
                           $$[$0]
                         ]
            }; 
     
break;
case 33:
 this.$ = [$$[$0-2], $$[$0-1]];
break;
case 37: case 38: case 40:
this.$= [$$[$0-1],$$[$0]];
break;
case 42:
this.$ = {
                        type: 'addition',
                        arguments: [ 
                            $$[$0-2],
                            $$[$0]]
                        }; 
                
break;
case 43:
this.$ = { 
                        type: 'minus',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 44:
this.$ = { 
                        type: 'multiplication',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 45:
this.$ = { 
                        type: 'division',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 46:
this.$ = { 
                        type: 'modulo',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 47:
this.$ = { 
                        type: 'add_assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 48:
this.$ = { 
                        type: 'sub_assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 49:
this.$ = { 
                        type: 'multi_assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 50:
this.$ = { 
                        type: 'div_assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 51:
this.$ = { 
                        type: 'mod_assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 52:
this.$ = { 
                        type: 'increments',
                        arguments:[
                            $$[$0-1]]
                       };
                
break;
case 53:
this.$ = { 
                        type: 'decrement',
                        arguments:[
                            $$[$0-1]]
                       };
                
break;
case 54:
this.$ = { 
                        type: 'and',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 55:
this.$ = { 
                        type: 'or',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 56:
this.$ = { 
                        type: 'bit-XOR',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 57:
this.$ = { 
                        type: 'bit-AND',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 58:
this.$ = { 
                        type: 'bit-OR',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 59:
this.$ = { 
                        type: 'bit-right-shift',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 60:
this.$ = { 
                        type: 'bit-left-shift',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 61:
this.$ = { 
                        type: 'zero-fill-right-shift',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 62:
this.$ = { 
                        type: 'equality',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 63:
this.$ = { 
                        type: 'less-than',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 64:
this.$ = { 
                        type: 'larger-than',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 65:
this.$ = { 
                        type: 'not-equal',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 66:
this.$ = { 
                        type: 'less-than-or-equal ',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 67:
this.$ = { 
                        type: 'greater-than-or-equal' ,
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 68:
this.$ = { 
                        type: 'assign',
                        arguments:[
                            $$[$0-2], 
                            $$[$0]]
                       };
                
break;
case 75: case 77: case 78:
 this.$ = $$[$0-1];
break;
case 76:
this.$ = [$$[$0-4],$$[$0-2]];
break;
case 83:
this.$ = [$$[$0-3],$$[$0-1]];
break;
case 85:
this.$ = [$$[$0-2],$$[$0]];
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:$V0,14:10,15:8,17:9,20:14,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},{1:[3]},{5:[1,42],6:43,7:4,8:5,9:6,10:$V0,14:10,15:8,17:9,20:14,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},o($Vr,[2,2]),o($Vr,[2,4]),o($Vr,[2,5]),o($Vr,[2,6]),{11:44,67:$Vs},o($Vt,$Vu,{18:47,16:[1,46],74:$Vv}),o($Vw,$Vu,{18:49,74:$Vv}),o($Vw,[2,22]),o($Vw,[2,23]),o($Vw,[2,24]),o($Vw,[2,25]),{11:50,67:$Vs},o($Vx,[2,41],{16:$Vy,41:$Vz,42:$VA,43:$VB,44:$VC,45:$VD,46:$VE,47:$VF,48:$VG,49:$VH,50:$VI,51:$VJ,52:$VK,53:$VL,54:$VM,55:$VN,56:$VO,57:$VP,58:$VQ,59:$VR,60:$VS,61:$VT,62:$VU,63:$VV,64:$VW,65:$VX,66:$VY}),{7:84,8:83,9:82,10:$V0,14:10,15:8,17:9,20:14,21:$V1,24:$VZ,25:$V2,26:$V_,27:79,28:80,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:85,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,73:81,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},{21:[1,86]},{21:[1,87]},{9:88,14:10,17:9,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{21:[1,89]},o($Vw,$Vu,{18:90,74:$Vv}),o($Vw,$Vu,{18:91,74:$Vv}),o([5,10,26,32,33,34,35,36,37,38,39,76,77,78,79,80,81,82,83,84,85,86],$Vu,{40:15,17:92,18:93,21:$V1,25:$V$,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,74:$Vv}),o($V01,[2,87]),o($V01,[2,88]),o($V01,[2,89]),o($V01,[2,90]),o($V01,[2,91]),o($V01,[2,92]),o($V01,[2,93]),o($V01,[2,94]),o($V01,[2,95]),o($V01,[2,96]),o($V01,[2,97]),o([5,10,16,22,24,25,26,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,74,76,77,78,79,80,81,82,83,84,85,86],[2,69],{21:[1,95]}),o($V11,[2,70]),o($V11,[2,71]),o($V11,[2,72]),o($V11,[2,73]),{21:$V1,25:$V$,40:96,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($V21,$VZ,{40:85,17:97,73:98,21:$V1,25:$V$,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf}),{1:[2,1]},o($Vr,[2,3]),{12:99,21:[1,100]},o($V31,[2,81]),{17:101,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($V41,[2,9]),o($V11,[2,79]),o($Vw,[2,21]),o($V31,[2,16]),{17:102,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:103,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:104,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:105,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:106,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:107,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:108,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:109,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:110,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:111,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($Vx,[2,52]),o($Vx,[2,53]),{17:112,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:113,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:114,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:115,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:116,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:117,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:118,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:119,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:120,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:121,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:122,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:123,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:124,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:125,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:126,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($Vw,[2,17]),{9:128,14:10,17:9,21:$V1,25:$V2,26:[1,127],29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{7:132,8:131,9:82,10:$V0,14:10,15:8,17:9,20:14,21:$V1,25:$V2,26:[1,129],27:130,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},{24:$V51,26:[1,133]},o($V61,[2,39]),o($V71,[2,35]),o($V71,[2,36]),o([21,22,24,25,26,32,34,35,36,37,38,39,67,68,69,70,71,72,74],$V81,{16:$Vy,41:$Vz,42:$VA,43:$VB,44:$VC,45:$VD,46:$VE,47:$VF,48:$VG,49:$VH,50:$VI,51:$VJ,52:$VK,53:$VL,54:$VM,55:$VN,56:$VO,57:$VP,58:$VQ,59:$VR,60:$VS,61:$VT,62:$VU,63:$VV,64:$VW,65:$VX,66:$VY}),{17:135,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:136,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{34:[1,137]},{8:138,15:8,20:14,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},o($Vw,[2,31]),o($Vw,[2,32]),o($Vw,$Vu,{18:139,74:$Vv}),o($Vw,[2,34]),o([24,26],$VZ,{73:81,40:140,21:$V1,25:$V$,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf}),o($V21,$VZ,{40:140,73:141,21:$V1,25:$V$,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf}),o($V11,[2,74]),{22:[1,142]},{22:[1,143],24:$V51},{13:144,19:[1,145],25:[2,11]},{15:148,20:14,22:[1,146],23:147,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},o($Vt,$Vu,{18:149,74:$Vv}),o($Vx,[2,42]),o($Vx,[2,43]),o($Vx,[2,44]),o($Vx,[2,45]),o($Vx,[2,46]),o($Vx,[2,47]),o($Vx,[2,48]),o($Vx,[2,49]),o($Vx,[2,50]),o($Vx,[2,51]),o($Vx,[2,54]),o($Vx,[2,55]),o($Vx,[2,56]),o($Vx,[2,57]),o($Vx,[2,58]),o($Vx,[2,59]),o($Vx,[2,60]),o($Vx,[2,61]),o($Vx,[2,62]),o($Vx,[2,63]),o($Vx,[2,64]),o($Vx,[2,65]),o($Vx,[2,66]),o($Vx,[2,67]),o($Vx,[2,68]),o($Vw,[2,18]),o($V61,[2,40]),o($Vw,[2,19]),{9:128,14:10,17:9,21:$V1,25:$V2,26:[1,150],29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($V71,[2,37]),o($V71,[2,38]),o($V11,[2,77]),{21:$V1,25:$V$,40:151,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{22:[1,152]},{22:[1,153]},{21:[1,154]},o($V91,$Vu,{18:155,74:$Vv}),o($Vw,[2,33]),o($Va1,$V81),{22:[1,156],24:$V51},o($V11,[2,75]),o($V11,[2,78]),{14:157,25:[1,158]},{20:159,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},o($Vb1,[2,12]),{22:[1,160],24:[1,161]},o($V21,[2,14]),o($V41,[2,8]),o($Vw,[2,20]),o($Va1,[2,85]),{9:162,14:10,17:9,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{9:163,14:10,17:9,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:164,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},{17:165,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o([5,10,16,21,22,24,25,26,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,76,77,78,79,80,81,82,83,84,85,86],$Vu,{18:166,74:$Vv}),o($Vt,[2,7]),{7:84,8:83,9:82,10:$V0,14:10,15:8,17:9,20:14,21:$V1,25:$V2,26:$V_,27:79,28:80,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},{25:[2,10]},o($Vb1,[2,13]),{15:167,20:14,76:$Vg,77:$Vh,78:$Vi,79:$Vj,80:$Vk,81:$Vl,82:$Vm,83:$Vn,84:$Vo,85:$Vp,86:$Vq},o($Vt,[2,26],{33:[1,168]}),o($Vw,[2,28]),{22:[1,169]},o($V91,$Vu,{18:170,74:$Vv}),o($V11,[2,76]),o($V21,[2,15]),{9:171,14:10,17:9,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($Vw,$Vu,{18:172,74:$Vv}),{17:173,21:$V1,25:$V$,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($Vw,[2,27]),o($Vw,[2,29]),{22:[1,174]},{9:175,14:10,17:9,21:$V1,25:$V2,29:11,30:12,31:13,32:$V3,34:$V4,35:$V5,36:$V6,37:$V7,38:$V8,39:$V9,40:15,67:$Va,68:$Vb,69:$Vc,70:$Vd,71:$Ve,72:$Vf},o($Vw,[2,30])],
defaultActions: {42:[2,1],159:[2,10]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* ignore comment */
break;
case 2:/* ignore comment */
break;
case 3:return 80;
break;
case 4:return 38;
break;
case 5:return 'CLEAR'; 
break;
case 6:return 37;
break;
case 7:return 35;
break;
case 8:return 33;
break;
case 9:return 70;
break;
case 10:return 79;
break;
case 11:return 36;
break;
case 12:return 10
break;
case 13:return 32;
break;
case 14:return 85;
break;
case 15:return 78;
break;
case 16:return 72;
break;
case 17:return 'NULL';
break;
case 18:return 81;
break;
case 19:return 86;
break;
case 20:return 39;
break;
case 21:return 77;
break;
case 22:return 69;
break;
case 23:return 76;
break;
case 24:return 34;
break;
case 25:return 82;
break;
case 26:return 83;
break;
case 27:return 84;
break;
case 28:return 25;
break;
case 29:return 26;
break;
case 30:return 'OPEN_BRACKET';
break;
case 31:return 'CLOSE_BRACKET';
break;
case 32:return 21;
break;
case 33:return 22;
break;
case 34:return 24;
break;
case 35:return 'COLON';
break;
case 36:return 74;
break;
case 37:return 19;
break;
case 38:return 16;
break;
case 39:return 46;
break;
case 40:return 51;
break;
case 41:return 41;
break;
case 42:return 47;
break;
case 43:return 52;
break;
case 44:return 42;
break;
case 45:return 48;
break;
case 46:return 43;
break;
case 47:return 49;
break;
case 48:return 44;
break;
case 49:return 50;
break;
case 50:return 'MODULO';
break;
case 51:return 53;
break;
case 52:return 'OP_AND_ASSIGNMENT';
break;
case 53:return 56;
break;
case 54:return 54;
break;
case 55:return 'OP_OR_ASSIGNMENT';
break;
case 56:return 57;
break;
case 57:return 'OP_XOR_ASSIGNMENT';
break;
case 58:return 55;
break;
case 59:return 'TILDE';
break;
case 60:return 61;
break;
case 61:return 62;
break;
case 62:return 63;
break;
case 63:return 64;
break;
case 64:return 65;
break;
case 65:return 66;
break;
case 66:return 'EXCL';
break;
case 67:return 'OP_LEFT_SHIFT_ASSIGNMENT';
break;
case 68:return 59;
break;
case 69:return 'OP_RIGHT_SHIFT_ASSIGNMENT';
break;
case 70:return 60;
break;
case 71:return 58;
break;
case 72:return 5;
break;
case 73:yy_.yytext = yy_.yytext.slice(1,-1); return 71
break;
case 74:return 68;
break;
case 75:return 68;
break;
case 76:return 67;
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:#.*)/,/^(?:bool\b)/,/^(?:break\b)/,/^(?:clear\b)/,/^(?:continue\b)/,/^(?:do\b)/,/^(?:else\b)/,/^(?:false\b)/,/^(?:float\b)/,/^(?:for\b)/,/^(?:function\b)/,/^(?:if\b)/,/^(?:Line\b)/,/^(?:int\b)/,/^(?:not\b)/,/^(?:null\b)/,/^(?:Point\b)/,/^(?:Polygon\b)/,/^(?:return\b)/,/^(?:String\b)/,/^(?:true\b)/,/^(?:void\b)/,/^(?:while\b)/,/^(?:vector\(2\))/,/^(?:vector\(3\))/,/^(?:vector\(4\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?::)/,/^(?:;)/,/^(?:->)/,/^(?:=)/,/^(?:\+=)/,/^(?:\+\+)/,/^(?:\+)/,/^(?:-=)/,/^(?:--)/,/^(?:-)/,/^(?:\*=)/,/^(?:\*)/,/^(?:\/=)/,/^(?:\/)/,/^(?:%=)/,/^(?:%)/,/^(?:&&)/,/^(?:&=)/,/^(?:&)/,/^(?:\|\|)/,/^(?:\|=)/,/^(?:\|)/,/^(?:\^=)/,/^(?:\^)/,/^(?:~)/,/^(?:\?=)/,/^(?:\?<)/,/^(?:\?>)/,/^(?:!=)/,/^(?:!>)/,/^(?:!<)/,/^(?:!)/,/^(?:<<=)/,/^(?:<<)/,/^(?:>>=)/,/^(?:>>>)/,/^(?:>>)/,/^(?:$)/,/^(?:"[^"]+")/,/^(?:[0-9]+(\.[0-9]*)?)/,/^(?:\.[0-9]+)/,/^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
// M Bytecode interperator

var MVM = function(glctx, manager, codeStore, constantPool, debugMode) {

	/*	Op codes
	*	
	*	MNEMONIC	OPCODE	OPERANDS	DESCRIPTION
	*	STOREG		0		2			store global at address
	*	LOADG		1		1			push global at address
	*	STOREL		2		1			store local at address
	*	LOADL		3		1			push local at local address
	*	LOADC		4		1			push constant
	*	IADD		5		0			i = pop off stack. j = pop off stack. push j + i
	*	ISUB		6		0			i = pop off stack. j = pop off stack. push j - i
	*	IMUL		7		0			i = pop off stack. j = pop off stack. push j * i
	*	IDIV		8		0			i = pop off stack. j = pop off stack. push j / i
	*	FADD		9		0			i = pop off stack. j = pop off stack. push j + i
	*	FSUB		10		0			i = pop off stack. j = pop off stack. push j - i
	*	FMUL		11		0			i = pop off stack. j = pop off stack. push j * i
	*	FDIV		12		0			i = pop off stack. j = pop off stack. push j / i
	*	NCMPEQ		13		0			i = pop off stack. j = pop off stack. push result of j == i
	*	NCMPLT		14		0			i = pop off stack. j = pop off stack. push result of j < i
	*	NCMPGT		15		0			i = pop off stack. j = pop off stack. push result of j > i
	*	JUMP		16		1			jump to address
	*	JUMPT		17		1			pop value off stack. Jump to address if value == 1
	*	JUMPF		18		1			pop value off stack. Jump to address if value == 0
	*	CALL		19		2			arg 1 = address of function. arg2 = number of params
	*	RETURN		20		1			Takes the number of values to return
	*/

	var opCodes = {
		STOREG: 0,
		LOADG: 	1,
		STOREL: 2,
		LOADL: 	3,
		LOADC: 	4,
		IADD: 	5,
		ISUB: 	6,
		IMUL: 	7,
		IDIV: 	8,
		FADD: 	9,		//	Floating point arithmatic ops take
		FSUB: 	10,		//	address into the constant pool.
		FMUL: 	11,
		FDIV: 	12,
		NCMPEQ: 13,
		NCMPLT: 14,
		NCMPGT: 15,
		JUMP: 	16,
		JUMPT: 	17, 
		JUMPF: 	18,
		CALL: 	19, 
		RETURN: 20,
		LNDRAW: 21,
		REQAN: 	22,
		RENDER: 100,
		CLEAR: 	101,
		PRINTST:102,
		PRINTS: 103,
		EXIT: 	999
	};

	var glctx = glctx;
	var manager = manager;

	var lastRender;

	// Loop Counter - For debugging
	var lc = 0;

	// Points to the next instruction in the code store to execute
	var cp = 0;

	// Points to the first free location after the program
	var cl;

	// Data store (Stack)
	this.dataStore = [];

	// Points to the first free space at the top of the data store
	var sp = 0;

	// Points to the first location of the top most frame
	var fp = 0;

	// Local Offset. The off set of the first local address from the frame pointer
	var LO = 2;

	// Address of the dynamic link in a frame
	var DLA = 0;

	// Address of the retrun address of a frame
	var RA = 1;

	// Global data store
	var globalStore = [];

	var needsUpdate = 0;

	var needsClear = 0;

	this.interpret = function() {

		var dataStore = this.dataStore;

		cl = codeStore.length;

		//var opCodes = this.opCodes;
		while (cp < cl && needsUpdate == 0) {
			lc++
			var opCode = codeStore[cp];
			cp++;
			switch (opCode) {
				case opCodes.STOREG:
					var address = codeStore[cp]
					cp++;
					sp--;
					var i = dataStore[sp];
					globalStore[address] = i;
					if(debugMode) console.log("STOREG: " + i + " " + address);
					break;
				case opCodes.LOADG:
					var address = codeStore[cp];
					cp++;
					dataStore[sp] = globalStore[address];
					sp++;
					if(debugMode) console.log("LOADG: " + i + " " + address);
					break;
				case opCodes.STOREL:
					var localAddress = codeStore[cp];
					cp++;
					sp--;
					dataStore[fp + localAddress + 2] = dataStore[sp];
					sp++;
					if(debugMode) console.log("STOREL: " + dataStore[sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADL:
					var localAddress = codeStore[cp];
					cp++;
					dataStore[sp] = dataStore[fp + localAddress + 2];
					sp++;
					if(debugMode) console.log("LOADL: " + dataStore[sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADC:
					var contsant = codeStore[cp];
					cp++;
					dataStore[sp] = contsant;
					sp++;
					if(debugMode) console.log("LOADC: " + contsant);
					break;
				case opCodes.IADD:
					sp--;
					var i = Math.floor(dataStore[sp]);
					sp--;
					var j = Math.floor(dataStore[sp]);
					var result = j + i
					dataStore[sp] = result;
					sp++
					dataStore.splice(sp, 1);
					if(debugMode) console.log("IADD: " + j + " + " + i + " = " + result);
					break;
				case opCodes.ISUB:
					sp--;
					var i = Math.floor(dataStore[sp]);
					sp--;
					var j = Math.floor(dataStore[sp]);
					var result = j - i;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("ISUB: " + j + " - " + i + " = " + result);
					break;
				case opCodes.IMUL:
					sp--;
					var i = Math.floor(dataStore[sp]);
					sp--;
					var j = Math.floor(dataStore[sp]);
					var result = j * i;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("IMUL: " + j + " * " + i + " = " + result);
					break;
				case opCodes.IDIV:
					sp--;
					var i = Math.floor(dataStore[sp]);
					sp--;
					var j = Math.floor(dataStore[sp]);
					var result = Math.floor(j / i);
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("IDIV: " + j + " / " + i + " = " + result);
					break;
				case opCodes.FADD:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = j + i;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("FADD: " + j + " + " + i + " = " + result);
					break;
				case opCodes.FSUB:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					dataStore[sp] = j - i;
					sp++;
					if(debugMode) console.log("FSUB: " + j + " - " + i + " = " + result);
					break;
				case opCodes.FMUL:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = j * i;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("FMUL: " + j + " * " + i + " = " + result);
					break;
				case opCodes.FDIV:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = j / i;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("FMUL: " + j + " / " + i + " = " + result);
					break;
				case opCodes.NCMPEQ:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = (j == i) ? 1 : 0;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("NCMPEQ: " + j + " == " + i + " = " + result);
					break;
				case opCodes.NCMPLT:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = (j < i) ? 1 : 0;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("NCMPLT: " + j + " < " + i + " = " + result);
					break;
				case opCodes.NCMPGT:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = (j > i) ? 1 : 0;
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("NCMPLT: " + j + " > " + i + " = " + result);
					break;
				case opCodes.JUMP:
					var address = codeStore[cp];
					cp = address;
					if(debugMode) console.log("JUMP: " + address);
					break;
				case opCodes.JUMPT:
					var address = codeStore[cp];
					sp--;
					var i = dataStore[sp];
					result = i == 1;
					if (result) {
						cp = codeStore[cp];
					}
					else {
						cp++;
					}
					if(debugMode) console.log("JUMPT: " + i + " " + result);
					break;
				case opCodes.JUMPF:
					var address = codeStore[cp];
					sp--;
					var i = dataStore[sp];
					var result = i == 0;
					if(debugMode) console.log("JUMPF: " + i + " " + result);
					if (result) {
						cp = codeStore[cp];
					}
					else {
						cp++;
					}
					break;
				case opCodes.CALL:
					var address = codeStore[cp];
					cp++;
					var numArgs = codeStore[cp];
					cp++;
					var returnAddress = cp;
					var dynamicLink = fp;
					var args = [];
					// Copy Args
					var i = 0;
					while(i < numArgs) {
						sp--;
						args[i] = dataStore[sp];
						i++;
					}
					// Add new Frame
					fp = sp;
					dataStore[sp] = dynamicLink;
					sp++;
					dataStore[sp] = returnAddress;
					sp++;
					// Add args as locals
					while(i > 0) {
						i--;
						dataStore[sp] = args[i];
						sp++;
					}
					// jump to address
					cp = address;
					if(debugMode) console.log("CALL: " + address + " " + numArgs);
					break;
				case opCodes.RETURN:
					var shouldReturnValue = codeStore[cp];
					var returnValue;
					if (shouldReturnValue) {
						returnValue = dataStore[sp - 1]
					}
					var returnAddress = dataStore[fp + RA];
					var firstElement = fp;
					if (shouldReturnValue) {firstElement++;}
					var elementsInFrame = sp - fp;
					cp = returnAddress;
					sp = fp;
					fp = dataStore[fp + DLA];
					dataStore[sp] = returnValue;
					sp++;
					dataStore.splice(firstElement,elementsInFrame);
					if(debugMode) console.log("RETURN: " + numArgs + " returnValue: " + returnValue);
					break;
				case opCodes.LNDRAW:
					// Get line
					sp--;
					var lineAddress = dataStore[sp];
					var line = constantPool[lineAddress];
					var pt1 = line[0];
					var pt2 = line[1];
					var pt1x = pt1[0];
					var pt1y = pt1[1];
					var pt2x = pt2[0];
					var pt2y = pt2[1];
					var color = line[2];
					var r = color[0];
					var g = color[1];
					var b = color[2];
					var a = color[3];
					var theLine = new Float32Array([pt1x,pt1y,0,
													pt2x,pt2y,0]);
					var theColor = new Float32Array([r,g,b,a]);
					var prog = manager.getProgram("square", "square");
					prog.setDrawMode(Palette.Program.LINES);
					prog.draw(theLine, {}, {color: theColor});
					if(debugMode) console.log("LNDRAW: " + line);
					break;
				case opCodes.RENDER:
					needsUpdate = 1;
					break;
				case opCodes.CLEAR:
					needsClear = 1;
					glctx.clearColor(0.0,0.0,0.0,1.0);
					glctx.clear(glctx.COLOR_BUFFER_BIT|glctx.DEPTH_BUFFER_BIT);
					break;
				case opCodes.REQAN:
					needsUpdate = 1;
					break;
				case opCodes.EXIT:
					cp = cl;
					console.log("EXIT");
					break;
				case opCodes.PRINTST: // Print top of stack
					if(debugMode) console.log(dataStore[sp - 1]);
					break;
				case opCodes.PRINTS: // Print top of stack
					if(debugMode) console.log(dataStore);
					break;
			}
			//console.log("cp:"+cp+"sp:"+sp+"fp"+fp);
			//console.log(codeStore);
			if(debugMode) console.log(JSON.stringify(dataStore));
			lc++;
			if (/*lc > 50*/0) {console.log("INF LOOP");break};
		}
		if (needsUpdate) {render();}
	}

	render = function() {
		if (needsClear) {
			needsClear = 0
			//glctx.clearColor(0.0,0.0,0.0,1.0);
			//glctx.clear(glctx.COLOR_BUFFER_BIT|glctx.DEPTH_BUFFER_BIT);
		}
		needsUpdate = 0;
		//setTimeout(window.mvm.interpret,1);
		window.requestAnimationFrame(window.mvm.interpret);
	}
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = earcut;

function earcut(points, returnIndices) {

    var outerNode = filterPoints(linkedList(points[0], true)),
        triangles = returnIndices ? {vertices: [], indices: []} : [];

    if (!outerNode) return triangles;

    var node, minX, minY, maxX, maxY, x, y, size, i,
        threshold = 80;

    for (i = 0; threshold >= 0 && i < points.length; i++) threshold -= points[i].length;

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (threshold < 0) {
        node = outerNode.next;
        minX = maxX = node.p[0];
        minY = maxY = node.p[1];
        do {
            x = node.p[0];
            y = node.p[1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            node = node.next;
        } while (node !== outerNode);

        // minX, minY and size are later used to transform coords into integers for z-order calculation
        size = Math.max(maxX - minX, maxY - minY);
    }

    if (points.length > 1) outerNode = eliminateHoles(points, outerNode);

    earcutLinked(outerNode, triangles, minX, minY, size);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(points, clockwise) {
    var sum = 0,
        len = points.length,
        i, j, p1, p2, last;

    // calculate original winding order of a polygon ring
    for (i = 0, j = len - 1; i < len; j = i++) {
        p1 = points[i];
        p2 = points[j];
        sum += (p2[0] - p1[0]) * (p1[1] + p2[1]);
    }

    // link points into circular doubly-linked list in the specified winding order
    if (clockwise === (sum > 0)) {
        for (i = 0; i < len; i++) last = insertNode(points[i], last);
    } else {
        for (i = len - 1; i >= 0; i--) last = insertNode(points[i], last);
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!end) end = start;

    var node = start,
        again;
    do {
        again = false;

        if (equals(node.p, node.next.p) || orient(node.prev.p, node.p, node.next.p) === 0) {

            // remove node
            node.prev.next = node.next;
            node.next.prev = node.prev;

            if (node.prevZ) node.prevZ.nextZ = node.nextZ;
            if (node.nextZ) node.nextZ.prevZ = node.prevZ;

            node = end = node.prev;

            if (node === node.next) return null;
            again = true;

        } else {
            node = node.next;
        }
    } while (again || node !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, minX, minY, size, pass) {
    if (!ear) return;

    var indexed = triangles.vertices !== undefined;

    // interlink polygon nodes in z-order
    if (!pass && minX !== undefined) indexCurve(ear, minX, minY, size);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (isEar(ear, minX, minY, size)) {
            // cut off the triangle
            if (indexed) {
                addIndexedVertex(triangles, prev);
                addIndexedVertex(triangles, ear);
                addIndexedVertex(triangles, next);
            } else {
                triangles.push(prev.p);
                triangles.push(ear.p);
                triangles.push(next.p);
            }

            // remove ear node
            next.prev = prev;
            prev.next = next;

            if (ear.prevZ) ear.prevZ.nextZ = ear.nextZ;
            if (ear.nextZ) ear.nextZ.prevZ = ear.prevZ;

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, minX, minY, size, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles);
                earcutLinked(ear, triangles, minX, minY, size, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, minX, minY, size);
            }

            break;
        }
    }
}

function addIndexedVertex(triangles, node) {
    if (node.source) node = node.source;

    var i = node.index;
    if (i === null) {
        var dim = node.p.length;
        var vertices = triangles.vertices;
        node.index = i = vertices.length / dim;

        for (var d = 0; d < dim; d++) vertices.push(node.p[d]);
    }
    triangles.indices.push(i);
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear, minX, minY, size) {

    var a = ear.prev.p,
        b = ear.p,
        c = ear.next.p,

        ax = a[0], bx = b[0], cx = c[0],
        ay = a[1], by = b[1], cy = c[1],

        abd = ax * by - ay * bx,
        acd = ax * cy - ay * cx,
        cbd = cx * by - cy * bx,
        A = abd - acd - cbd;

    if (A <= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear;
    // the code below is a bit verbose and repetitive but this is done for performance

    var cay = cy - ay,
        acx = ax - cx,
        aby = ay - by,
        bax = bx - ax,
        p, px, py, s, t, k, node;

    // if we use z-order curve hashing, iterate through the curve
    if (minX !== undefined) {

        // triangle bbox; min & max are calculated like this for speed
        var minTX = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
            minTY = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
            maxTX = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
            maxTY = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy),

            // z-order range for the current triangle bbox;
            minZ = zOrder(minTX, minTY, minX, minY, size),
            maxZ = zOrder(maxTX, maxTY, minX, minY, size);

        // first look for points inside the triangle in increasing z-order
        node = ear.nextZ;

        while (node && node.z <= maxZ) {
            p = node.p;
            node = node.nextZ;
            if (p === a || p === c) continue;

            px = p[0];
            py = p[1];

            s = cay * px + acx * py - acd;
            if (s >= 0) {
                t = aby * px + bax * py + abd;
                if (t >= 0) {
                    k = A - s - t;
                    if ((k >= 0) && ((s && t) || (s && k) || (t && k))) return false;
                }
            }
        }

        // then look for points in decreasing z-order
        node = ear.prevZ;

        while (node && node.z >= minZ) {
            p = node.p;
            node = node.prevZ;
            if (p === a || p === c) continue;

            px = p[0];
            py = p[1];

            s = cay * px + acx * py - acd;
            if (s >= 0) {
                t = aby * px + bax * py + abd;
                if (t >= 0) {
                    k = A - s - t;
                    if ((k >= 0) && ((s && t) || (s && k) || (t && k))) return false;
                }
            }
        }

    // if we don't use z-order curve hash, simply iterate through all other points
    } else {
        node = ear.next.next;

        while (node !== ear.prev) {
            p = node.p;
            node = node.next;

            px = p[0];
            py = p[1];

            s = cay * px + acx * py - acd;
            if (s >= 0) {
                t = aby * px + bax * py + abd;
                if (t >= 0) {
                    k = A - s - t;
                    if ((k >= 0) && ((s && t) || (s && k) || (t && k))) return false;
                }
            }
        }
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles) {
    var indexed = !!triangles.vertices;

    var node = start;
    do {
        var a = node.prev,
            b = node.next.next;

        // a self-intersection where edge (v[i-1],v[i]) intersects (v[i+1],v[i+2])
        if (a.p !== b.p && intersects(a.p, node.p, node.next.p, b.p) && locallyInside(a, b) && locallyInside(b, a)) {

            if (indexed) {
                addIndexedVertex(triangles, a);
                addIndexedVertex(triangles, node);
                addIndexedVertex(triangles, b);
            } else {
                triangles.push(a.p);
                triangles.push(node.p);
                triangles.push(b.p);
            }

            // remove two nodes involved
            a.next = b;
            b.prev = a;

            var az = node.prevZ,
                bz = node.nextZ && node.nextZ.nextZ;

            if (az) az.nextZ = bz;
            if (bz) bz.prevZ = az;

            node = start = b;
        }
        node = node.next;
    } while (node !== start);

    return node;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, minX, minY, size) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.p !== b.p && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, minX, minY, size);
                earcutLinked(c, triangles, minX, minY, size);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(points, outerNode) {
    var len = points.length;

    var queue = [];
    for (var i = 1; i < len; i++) {
        var list = filterPoints(linkedList(points[i], false));
        if (list) queue.push(getLeftmost(list));
    }
    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(holeNode, outerNode) {
    outerNode = findHoleBridge(holeNode, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, holeNode);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(holeNode, outerNode) {
    var node = outerNode,
        p = holeNode.p,
        px = p[0],
        py = p[1],
        qMax = -Infinity,
        mNode, a, b;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        a = node.p;
        b = node.next.p;

        if (py <= a[1] && py >= b[1]) {
            var qx = a[0] + (py - a[1]) * (b[0] - a[0]) / (b[1] - a[1]);
            if (qx <= px && qx > qMax) {
                qMax = qx;
                mNode = a[0] < b[0] ? node : node.next;
            }
        }
        node = node.next;
    } while (node !== outerNode);

    if (!mNode) return null;

    // look for points strictly inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var bx = mNode.p[0],
        by = mNode.p[1],
        pbd = px * by - py * bx,
        pcd = px * py - py * qMax,
        cpy = py - py,
        pcx = px - qMax,
        pby = py - by,
        bpx = bx - px,
        A = pbd - pcd - (qMax * by - py * bx),
        sign = A <= 0 ? -1 : 1,
        stop = mNode,
        tanMin = Infinity,
        mx, my, amx, s, t, tan;

    node = mNode.next;

    while (node !== stop) {

        mx = node.p[0];
        my = node.p[1];
        amx = px - mx;

        if (amx >= 0 && mx >= bx) {
            s = (cpy * mx + pcx * my - pcd) * sign;
            if (s >= 0) {
                t = (pby * mx + bpx * my + pbd) * sign;

                if (t >= 0 && A * sign - s - t >= 0) {
                    tan = Math.abs(py - my) / amx; // tangential
                    if (tan < tanMin && locallyInside(node, holeNode)) {
                        mNode = node;
                        tanMin = tan;
                    }
                }
            }
        }

        node = node.next;
    }

    return mNode;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, size) {
    var node = start;

    do {
        if (node.z === null) node.z = zOrder(node.p[0], node.p[1], minX, minY, size);
        node.prevZ = node.prev;
        node.nextZ = node.next;
        node = node.next;
    } while (node !== start);

    node.prevZ.nextZ = null;
    node.prevZ = null;

    sortLinked(node);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    while (true) {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }

            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize === 0) {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                } else if (qSize === 0 || !q) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else if (p.z <= q.z) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;

        if (numMerges <= 1) return list;

        inSize *= 2;
    }
}

// z-order of a point given coords and size of the data bounding box
function zOrder(x, y, minX, minY, size) {
    // coords are transformed into (0..1000) integer range
    x = 1000 * (x - minX) / size;
    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = 1000 * (y - minY) / size;
    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var node = start,
        leftmost = start;
    do {
        if (node.p[0] < leftmost.p[0]) leftmost = node;
        node = node.next;
    } while (node !== start);

    return leftmost;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return !intersectsPolygon(a, a.p, b.p) &&
           locallyInside(a, b) && locallyInside(b, a) &&
           middleInside(a, a.p, b.p);
}

// winding order of triangle formed by 3 given points
function orient(p, q, r) {
    var o = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    return o > 0 ? 1 :
           o < 0 ? -1 : 0;
}

// check if two points are equal
function equals(p1, p2) {
    return p1[0] === p2[0] && p1[1] === p2[1];
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    return orient(p1, q1, p2) !== orient(p1, q1, q2) &&
           orient(p2, q2, p1) !== orient(p2, q2, q1);
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(start, a, b) {
    var node = start;
    do {
        var p1 = node.p,
            p2 = node.next.p;

        if (p1 !== a && p2 !== a && p1 !== b && p2 !== b && intersects(p1, p2, a, b)) return true;

        node = node.next;
    } while (node !== start);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return orient(a.prev.p, a.p, a.next.p) === -1 ?
        orient(a.p, b.p, a.next.p) !== -1 && orient(a.p, a.prev.p, b.p) !== -1 :
        orient(a.p, b.p, a.prev.p) === -1 || orient(a.p, a.next.p, b.p) === -1;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(start, a, b) {
    var node = start,
        inside = false,
        px = (a[0] + b[0]) / 2,
        py = (a[1] + b[1]) / 2;
    do {
        var p1 = node.p,
            p2 = node.next.p;

        if (((p1[1] > py) !== (p2[1] > py)) &&
            (px < (p2[0] - p1[0]) * (py - p1[1]) / (p2[1] - p1[1]) + p1[0])) inside = !inside;

        node = node.next;
    } while (node !== start);

    return inside;
}

function compareX(a, b) {
    return a.p[0] - b.p[0];
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.p),
        b2 = new Node(b.p),
        an = a.next,
        bp = b.prev;

    a2.source = a;
    b2.source = b;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(point, last) {
    var node = new Node(point);

    if (!last) {
        node.prev = node;
        node.next = node;

    } else {
        node.next = last.next;
        node.prev = last;
        last.next.prev = node;
        last.next = node;
    }
    return node;
}

function Node(p) {
    // vertex coordinates
    this.p = p;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // used for indexed output
    this.source = null;
    this.index = null;
}

},{}],2:[function(require,module,exports){
/**
* @namespace Palette
*/
var Palette = Palette || {};

Palette.earcut = require("earcut");

},{"earcut":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZWFyY3V0L3NyYy9lYXJjdXQuanMiLCJzcmMvUGFsZXR0ZS9QYWxldHRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ByQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVhcmN1dDtcblxuZnVuY3Rpb24gZWFyY3V0KHBvaW50cywgcmV0dXJuSW5kaWNlcykge1xuXG4gICAgdmFyIG91dGVyTm9kZSA9IGZpbHRlclBvaW50cyhsaW5rZWRMaXN0KHBvaW50c1swXSwgdHJ1ZSkpLFxuICAgICAgICB0cmlhbmdsZXMgPSByZXR1cm5JbmRpY2VzID8ge3ZlcnRpY2VzOiBbXSwgaW5kaWNlczogW119IDogW107XG5cbiAgICBpZiAoIW91dGVyTm9kZSkgcmV0dXJuIHRyaWFuZ2xlcztcblxuICAgIHZhciBub2RlLCBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCB4LCB5LCBzaXplLCBpLFxuICAgICAgICB0aHJlc2hvbGQgPSA4MDtcblxuICAgIGZvciAoaSA9IDA7IHRocmVzaG9sZCA+PSAwICYmIGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHRocmVzaG9sZCAtPSBwb2ludHNbaV0ubGVuZ3RoO1xuXG4gICAgLy8gaWYgdGhlIHNoYXBlIGlzIG5vdCB0b28gc2ltcGxlLCB3ZSdsbCB1c2Ugei1vcmRlciBjdXJ2ZSBoYXNoIGxhdGVyOyBjYWxjdWxhdGUgcG9seWdvbiBiYm94XG4gICAgaWYgKHRocmVzaG9sZCA8IDApIHtcbiAgICAgICAgbm9kZSA9IG91dGVyTm9kZS5uZXh0O1xuICAgICAgICBtaW5YID0gbWF4WCA9IG5vZGUucFswXTtcbiAgICAgICAgbWluWSA9IG1heFkgPSBub2RlLnBbMV07XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHggPSBub2RlLnBbMF07XG4gICAgICAgICAgICB5ID0gbm9kZS5wWzFdO1xuICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKG5vZGUgIT09IG91dGVyTm9kZSk7XG5cbiAgICAgICAgLy8gbWluWCwgbWluWSBhbmQgc2l6ZSBhcmUgbGF0ZXIgdXNlZCB0byB0cmFuc2Zvcm0gY29vcmRzIGludG8gaW50ZWdlcnMgZm9yIHotb3JkZXIgY2FsY3VsYXRpb25cbiAgICAgICAgc2l6ZSA9IE1hdGgubWF4KG1heFggLSBtaW5YLCBtYXhZIC0gbWluWSk7XG4gICAgfVxuXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKSBvdXRlck5vZGUgPSBlbGltaW5hdGVIb2xlcyhwb2ludHMsIG91dGVyTm9kZSk7XG5cbiAgICBlYXJjdXRMaW5rZWQob3V0ZXJOb2RlLCB0cmlhbmdsZXMsIG1pblgsIG1pblksIHNpemUpO1xuXG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuLy8gY3JlYXRlIGEgY2lyY3VsYXIgZG91Ymx5IGxpbmtlZCBsaXN0IGZyb20gcG9seWdvbiBwb2ludHMgaW4gdGhlIHNwZWNpZmllZCB3aW5kaW5nIG9yZGVyXG5mdW5jdGlvbiBsaW5rZWRMaXN0KHBvaW50cywgY2xvY2t3aXNlKSB7XG4gICAgdmFyIHN1bSA9IDAsXG4gICAgICAgIGxlbiA9IHBvaW50cy5sZW5ndGgsXG4gICAgICAgIGksIGosIHAxLCBwMiwgbGFzdDtcblxuICAgIC8vIGNhbGN1bGF0ZSBvcmlnaW5hbCB3aW5kaW5nIG9yZGVyIG9mIGEgcG9seWdvbiByaW5nXG4gICAgZm9yIChpID0gMCwgaiA9IGxlbiAtIDE7IGkgPCBsZW47IGogPSBpKyspIHtcbiAgICAgICAgcDEgPSBwb2ludHNbaV07XG4gICAgICAgIHAyID0gcG9pbnRzW2pdO1xuICAgICAgICBzdW0gKz0gKHAyWzBdIC0gcDFbMF0pICogKHAxWzFdICsgcDJbMV0pO1xuICAgIH1cblxuICAgIC8vIGxpbmsgcG9pbnRzIGludG8gY2lyY3VsYXIgZG91Ymx5LWxpbmtlZCBsaXN0IGluIHRoZSBzcGVjaWZpZWQgd2luZGluZyBvcmRlclxuICAgIGlmIChjbG9ja3dpc2UgPT09IChzdW0gPiAwKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIGxhc3QgPSBpbnNlcnROb2RlKHBvaW50c1tpXSwgbGFzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIGxhc3QgPSBpbnNlcnROb2RlKHBvaW50c1tpXSwgbGFzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3Q7XG59XG5cbi8vIGVsaW1pbmF0ZSBjb2xpbmVhciBvciBkdXBsaWNhdGUgcG9pbnRzXG5mdW5jdGlvbiBmaWx0ZXJQb2ludHMoc3RhcnQsIGVuZCkge1xuICAgIGlmICghZW5kKSBlbmQgPSBzdGFydDtcblxuICAgIHZhciBub2RlID0gc3RhcnQsXG4gICAgICAgIGFnYWluO1xuICAgIGRvIHtcbiAgICAgICAgYWdhaW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAoZXF1YWxzKG5vZGUucCwgbm9kZS5uZXh0LnApIHx8IG9yaWVudChub2RlLnByZXYucCwgbm9kZS5wLCBub2RlLm5leHQucCkgPT09IDApIHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIG5vZGVcbiAgICAgICAgICAgIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cbiAgICAgICAgICAgIGlmIChub2RlLnByZXZaKSBub2RlLnByZXZaLm5leHRaID0gbm9kZS5uZXh0WjtcbiAgICAgICAgICAgIGlmIChub2RlLm5leHRaKSBub2RlLm5leHRaLnByZXZaID0gbm9kZS5wcmV2WjtcblxuICAgICAgICAgICAgbm9kZSA9IGVuZCA9IG5vZGUucHJldjtcblxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IG5vZGUubmV4dCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBhZ2FpbiA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9IHdoaWxlIChhZ2FpbiB8fCBub2RlICE9PSBlbmQpO1xuXG4gICAgcmV0dXJuIGVuZDtcbn1cblxuLy8gbWFpbiBlYXIgc2xpY2luZyBsb29wIHdoaWNoIHRyaWFuZ3VsYXRlcyBhIHBvbHlnb24gKGdpdmVuIGFzIGEgbGlua2VkIGxpc3QpXG5mdW5jdGlvbiBlYXJjdXRMaW5rZWQoZWFyLCB0cmlhbmdsZXMsIG1pblgsIG1pblksIHNpemUsIHBhc3MpIHtcbiAgICBpZiAoIWVhcikgcmV0dXJuO1xuXG4gICAgdmFyIGluZGV4ZWQgPSB0cmlhbmdsZXMudmVydGljZXMgIT09IHVuZGVmaW5lZDtcblxuICAgIC8vIGludGVybGluayBwb2x5Z29uIG5vZGVzIGluIHotb3JkZXJcbiAgICBpZiAoIXBhc3MgJiYgbWluWCAhPT0gdW5kZWZpbmVkKSBpbmRleEN1cnZlKGVhciwgbWluWCwgbWluWSwgc2l6ZSk7XG5cbiAgICB2YXIgc3RvcCA9IGVhcixcbiAgICAgICAgcHJldiwgbmV4dDtcblxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYXJzLCBzbGljaW5nIHRoZW0gb25lIGJ5IG9uZVxuICAgIHdoaWxlIChlYXIucHJldiAhPT0gZWFyLm5leHQpIHtcbiAgICAgICAgcHJldiA9IGVhci5wcmV2O1xuICAgICAgICBuZXh0ID0gZWFyLm5leHQ7XG5cbiAgICAgICAgaWYgKGlzRWFyKGVhciwgbWluWCwgbWluWSwgc2l6ZSkpIHtcbiAgICAgICAgICAgIC8vIGN1dCBvZmYgdGhlIHRyaWFuZ2xlXG4gICAgICAgICAgICBpZiAoaW5kZXhlZCkge1xuICAgICAgICAgICAgICAgIGFkZEluZGV4ZWRWZXJ0ZXgodHJpYW5nbGVzLCBwcmV2KTtcbiAgICAgICAgICAgICAgICBhZGRJbmRleGVkVmVydGV4KHRyaWFuZ2xlcywgZWFyKTtcbiAgICAgICAgICAgICAgICBhZGRJbmRleGVkVmVydGV4KHRyaWFuZ2xlcywgbmV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHByZXYucCk7XG4gICAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goZWFyLnApO1xuICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5leHQucCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBlYXIgbm9kZVxuICAgICAgICAgICAgbmV4dC5wcmV2ID0gcHJldjtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5leHQ7XG5cbiAgICAgICAgICAgIGlmIChlYXIucHJldlopIGVhci5wcmV2Wi5uZXh0WiA9IGVhci5uZXh0WjtcbiAgICAgICAgICAgIGlmIChlYXIubmV4dFopIGVhci5uZXh0Wi5wcmV2WiA9IGVhci5wcmV2WjtcblxuICAgICAgICAgICAgLy8gc2tpcHBpbmcgdGhlIG5leHQgdmVydGljZSBsZWFkcyB0byBsZXNzIHNsaXZlciB0cmlhbmdsZXNcbiAgICAgICAgICAgIGVhciA9IG5leHQubmV4dDtcbiAgICAgICAgICAgIHN0b3AgPSBuZXh0Lm5leHQ7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFyID0gbmV4dDtcblxuICAgICAgICAvLyBpZiB3ZSBsb29wZWQgdGhyb3VnaCB0aGUgd2hvbGUgcmVtYWluaW5nIHBvbHlnb24gYW5kIGNhbid0IGZpbmQgYW55IG1vcmUgZWFyc1xuICAgICAgICBpZiAoZWFyID09PSBzdG9wKSB7XG4gICAgICAgICAgICAvLyB0cnkgZmlsdGVyaW5nIHBvaW50cyBhbmQgc2xpY2luZyBhZ2FpblxuICAgICAgICAgICAgaWYgKCFwYXNzKSB7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGZpbHRlclBvaW50cyhlYXIpLCB0cmlhbmdsZXMsIG1pblgsIG1pblksIHNpemUsIDEpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGRpZG4ndCB3b3JrLCB0cnkgY3VyaW5nIGFsbCBzbWFsbCBzZWxmLWludGVyc2VjdGlvbnMgbG9jYWxseVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZWFyID0gY3VyZUxvY2FsSW50ZXJzZWN0aW9ucyhlYXIsIHRyaWFuZ2xlcyk7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGVhciwgdHJpYW5nbGVzLCBtaW5YLCBtaW5ZLCBzaXplLCAyKTtcblxuICAgICAgICAgICAgLy8gYXMgYSBsYXN0IHJlc29ydCwgdHJ5IHNwbGl0dGluZyB0aGUgcmVtYWluaW5nIHBvbHlnb24gaW50byB0d29cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMikge1xuICAgICAgICAgICAgICAgIHNwbGl0RWFyY3V0KGVhciwgdHJpYW5nbGVzLCBtaW5YLCBtaW5ZLCBzaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZEluZGV4ZWRWZXJ0ZXgodHJpYW5nbGVzLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc291cmNlKSBub2RlID0gbm9kZS5zb3VyY2U7XG5cbiAgICB2YXIgaSA9IG5vZGUuaW5kZXg7XG4gICAgaWYgKGkgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGRpbSA9IG5vZGUucC5sZW5ndGg7XG4gICAgICAgIHZhciB2ZXJ0aWNlcyA9IHRyaWFuZ2xlcy52ZXJ0aWNlcztcbiAgICAgICAgbm9kZS5pbmRleCA9IGkgPSB2ZXJ0aWNlcy5sZW5ndGggLyBkaW07XG5cbiAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkaW07IGQrKykgdmVydGljZXMucHVzaChub2RlLnBbZF0pO1xuICAgIH1cbiAgICB0cmlhbmdsZXMuaW5kaWNlcy5wdXNoKGkpO1xufVxuXG4vLyBjaGVjayB3aGV0aGVyIGEgcG9seWdvbiBub2RlIGZvcm1zIGEgdmFsaWQgZWFyIHdpdGggYWRqYWNlbnQgbm9kZXNcbmZ1bmN0aW9uIGlzRWFyKGVhciwgbWluWCwgbWluWSwgc2l6ZSkge1xuXG4gICAgdmFyIGEgPSBlYXIucHJldi5wLFxuICAgICAgICBiID0gZWFyLnAsXG4gICAgICAgIGMgPSBlYXIubmV4dC5wLFxuXG4gICAgICAgIGF4ID0gYVswXSwgYnggPSBiWzBdLCBjeCA9IGNbMF0sXG4gICAgICAgIGF5ID0gYVsxXSwgYnkgPSBiWzFdLCBjeSA9IGNbMV0sXG5cbiAgICAgICAgYWJkID0gYXggKiBieSAtIGF5ICogYngsXG4gICAgICAgIGFjZCA9IGF4ICogY3kgLSBheSAqIGN4LFxuICAgICAgICBjYmQgPSBjeCAqIGJ5IC0gY3kgKiBieCxcbiAgICAgICAgQSA9IGFiZCAtIGFjZCAtIGNiZDtcblxuICAgIGlmIChBIDw9IDApIHJldHVybiBmYWxzZTsgLy8gcmVmbGV4LCBjYW4ndCBiZSBhbiBlYXJcblxuICAgIC8vIG5vdyBtYWtlIHN1cmUgd2UgZG9uJ3QgaGF2ZSBvdGhlciBwb2ludHMgaW5zaWRlIHRoZSBwb3RlbnRpYWwgZWFyO1xuICAgIC8vIHRoZSBjb2RlIGJlbG93IGlzIGEgYml0IHZlcmJvc2UgYW5kIHJlcGV0aXRpdmUgYnV0IHRoaXMgaXMgZG9uZSBmb3IgcGVyZm9ybWFuY2VcblxuICAgIHZhciBjYXkgPSBjeSAtIGF5LFxuICAgICAgICBhY3ggPSBheCAtIGN4LFxuICAgICAgICBhYnkgPSBheSAtIGJ5LFxuICAgICAgICBiYXggPSBieCAtIGF4LFxuICAgICAgICBwLCBweCwgcHksIHMsIHQsIGssIG5vZGU7XG5cbiAgICAvLyBpZiB3ZSB1c2Ugei1vcmRlciBjdXJ2ZSBoYXNoaW5nLCBpdGVyYXRlIHRocm91Z2ggdGhlIGN1cnZlXG4gICAgaWYgKG1pblggIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIC8vIHRyaWFuZ2xlIGJib3g7IG1pbiAmIG1heCBhcmUgY2FsY3VsYXRlZCBsaWtlIHRoaXMgZm9yIHNwZWVkXG4gICAgICAgIHZhciBtaW5UWCA9IGF4IDwgYnggPyAoYXggPCBjeCA/IGF4IDogY3gpIDogKGJ4IDwgY3ggPyBieCA6IGN4KSxcbiAgICAgICAgICAgIG1pblRZID0gYXkgPCBieSA/IChheSA8IGN5ID8gYXkgOiBjeSkgOiAoYnkgPCBjeSA/IGJ5IDogY3kpLFxuICAgICAgICAgICAgbWF4VFggPSBheCA+IGJ4ID8gKGF4ID4gY3ggPyBheCA6IGN4KSA6IChieCA+IGN4ID8gYnggOiBjeCksXG4gICAgICAgICAgICBtYXhUWSA9IGF5ID4gYnkgPyAoYXkgPiBjeSA/IGF5IDogY3kpIDogKGJ5ID4gY3kgPyBieSA6IGN5KSxcblxuICAgICAgICAgICAgLy8gei1vcmRlciByYW5nZSBmb3IgdGhlIGN1cnJlbnQgdHJpYW5nbGUgYmJveDtcbiAgICAgICAgICAgIG1pblogPSB6T3JkZXIobWluVFgsIG1pblRZLCBtaW5YLCBtaW5ZLCBzaXplKSxcbiAgICAgICAgICAgIG1heFogPSB6T3JkZXIobWF4VFgsIG1heFRZLCBtaW5YLCBtaW5ZLCBzaXplKTtcblxuICAgICAgICAvLyBmaXJzdCBsb29rIGZvciBwb2ludHMgaW5zaWRlIHRoZSB0cmlhbmdsZSBpbiBpbmNyZWFzaW5nIHotb3JkZXJcbiAgICAgICAgbm9kZSA9IGVhci5uZXh0WjtcblxuICAgICAgICB3aGlsZSAobm9kZSAmJiBub2RlLnogPD0gbWF4Wikge1xuICAgICAgICAgICAgcCA9IG5vZGUucDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHRaO1xuICAgICAgICAgICAgaWYgKHAgPT09IGEgfHwgcCA9PT0gYykgY29udGludWU7XG5cbiAgICAgICAgICAgIHB4ID0gcFswXTtcbiAgICAgICAgICAgIHB5ID0gcFsxXTtcblxuICAgICAgICAgICAgcyA9IGNheSAqIHB4ICsgYWN4ICogcHkgLSBhY2Q7XG4gICAgICAgICAgICBpZiAocyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdCA9IGFieSAqIHB4ICsgYmF4ICogcHkgKyBhYmQ7XG4gICAgICAgICAgICAgICAgaWYgKHQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBrID0gQSAtIHMgLSB0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGsgPj0gMCkgJiYgKChzICYmIHQpIHx8IChzICYmIGspIHx8ICh0ICYmIGspKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZW4gbG9vayBmb3IgcG9pbnRzIGluIGRlY3JlYXNpbmcgei1vcmRlclxuICAgICAgICBub2RlID0gZWFyLnByZXZaO1xuXG4gICAgICAgIHdoaWxlIChub2RlICYmIG5vZGUueiA+PSBtaW5aKSB7XG4gICAgICAgICAgICBwID0gbm9kZS5wO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUucHJldlo7XG4gICAgICAgICAgICBpZiAocCA9PT0gYSB8fCBwID09PSBjKSBjb250aW51ZTtcblxuICAgICAgICAgICAgcHggPSBwWzBdO1xuICAgICAgICAgICAgcHkgPSBwWzFdO1xuXG4gICAgICAgICAgICBzID0gY2F5ICogcHggKyBhY3ggKiBweSAtIGFjZDtcbiAgICAgICAgICAgIGlmIChzID49IDApIHtcbiAgICAgICAgICAgICAgICB0ID0gYWJ5ICogcHggKyBiYXggKiBweSArIGFiZDtcbiAgICAgICAgICAgICAgICBpZiAodCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBBIC0gcyAtIHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoayA+PSAwKSAmJiAoKHMgJiYgdCkgfHwgKHMgJiYgaykgfHwgKHQgJiYgaykpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAvLyBpZiB3ZSBkb24ndCB1c2Ugei1vcmRlciBjdXJ2ZSBoYXNoLCBzaW1wbHkgaXRlcmF0ZSB0aHJvdWdoIGFsbCBvdGhlciBwb2ludHNcbiAgICB9IGVsc2Uge1xuICAgICAgICBub2RlID0gZWFyLm5leHQubmV4dDtcblxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gZWFyLnByZXYpIHtcbiAgICAgICAgICAgIHAgPSBub2RlLnA7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuXG4gICAgICAgICAgICBweCA9IHBbMF07XG4gICAgICAgICAgICBweSA9IHBbMV07XG5cbiAgICAgICAgICAgIHMgPSBjYXkgKiBweCArIGFjeCAqIHB5IC0gYWNkO1xuICAgICAgICAgICAgaWYgKHMgPj0gMCkge1xuICAgICAgICAgICAgICAgIHQgPSBhYnkgKiBweCArIGJheCAqIHB5ICsgYWJkO1xuICAgICAgICAgICAgICAgIGlmICh0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IEEgLSBzIC0gdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChrID49IDApICYmICgocyAmJiB0KSB8fCAocyAmJiBrKSB8fCAodCAmJiBrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gZ28gdGhyb3VnaCBhbGwgcG9seWdvbiBub2RlcyBhbmQgY3VyZSBzbWFsbCBsb2NhbCBzZWxmLWludGVyc2VjdGlvbnNcbmZ1bmN0aW9uIGN1cmVMb2NhbEludGVyc2VjdGlvbnMoc3RhcnQsIHRyaWFuZ2xlcykge1xuICAgIHZhciBpbmRleGVkID0gISF0cmlhbmdsZXMudmVydGljZXM7XG5cbiAgICB2YXIgbm9kZSA9IHN0YXJ0O1xuICAgIGRvIHtcbiAgICAgICAgdmFyIGEgPSBub2RlLnByZXYsXG4gICAgICAgICAgICBiID0gbm9kZS5uZXh0Lm5leHQ7XG5cbiAgICAgICAgLy8gYSBzZWxmLWludGVyc2VjdGlvbiB3aGVyZSBlZGdlICh2W2ktMV0sdltpXSkgaW50ZXJzZWN0cyAodltpKzFdLHZbaSsyXSlcbiAgICAgICAgaWYgKGEucCAhPT0gYi5wICYmIGludGVyc2VjdHMoYS5wLCBub2RlLnAsIG5vZGUubmV4dC5wLCBiLnApICYmIGxvY2FsbHlJbnNpZGUoYSwgYikgJiYgbG9jYWxseUluc2lkZShiLCBhKSkge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXhlZCkge1xuICAgICAgICAgICAgICAgIGFkZEluZGV4ZWRWZXJ0ZXgodHJpYW5nbGVzLCBhKTtcbiAgICAgICAgICAgICAgICBhZGRJbmRleGVkVmVydGV4KHRyaWFuZ2xlcywgbm9kZSk7XG4gICAgICAgICAgICAgICAgYWRkSW5kZXhlZFZlcnRleCh0cmlhbmdsZXMsIGIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChhLnApO1xuICAgICAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5vZGUucCk7XG4gICAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goYi5wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHR3byBub2RlcyBpbnZvbHZlZFxuICAgICAgICAgICAgYS5uZXh0ID0gYjtcbiAgICAgICAgICAgIGIucHJldiA9IGE7XG5cbiAgICAgICAgICAgIHZhciBheiA9IG5vZGUucHJldlosXG4gICAgICAgICAgICAgICAgYnogPSBub2RlLm5leHRaICYmIG5vZGUubmV4dFoubmV4dFo7XG5cbiAgICAgICAgICAgIGlmIChheikgYXoubmV4dFogPSBiejtcbiAgICAgICAgICAgIGlmIChieikgYnoucHJldlogPSBhejtcblxuICAgICAgICAgICAgbm9kZSA9IHN0YXJ0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IHN0YXJ0KTtcblxuICAgIHJldHVybiBub2RlO1xufVxuXG4vLyB0cnkgc3BsaXR0aW5nIHBvbHlnb24gaW50byB0d28gYW5kIHRyaWFuZ3VsYXRlIHRoZW0gaW5kZXBlbmRlbnRseVxuZnVuY3Rpb24gc3BsaXRFYXJjdXQoc3RhcnQsIHRyaWFuZ2xlcywgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIC8vIGxvb2sgZm9yIGEgdmFsaWQgZGlhZ29uYWwgdGhhdCBkaXZpZGVzIHRoZSBwb2x5Z29uIGludG8gdHdvXG4gICAgdmFyIGEgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIHZhciBiID0gYS5uZXh0Lm5leHQ7XG4gICAgICAgIHdoaWxlIChiICE9PSBhLnByZXYpIHtcbiAgICAgICAgICAgIGlmIChhLnAgIT09IGIucCAmJiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGxpdCB0aGUgcG9seWdvbiBpbiB0d28gYnkgdGhlIGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBzcGxpdFBvbHlnb24oYSwgYik7XG5cbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgY29saW5lYXIgcG9pbnRzIGFyb3VuZCB0aGUgY3V0c1xuICAgICAgICAgICAgICAgIGEgPSBmaWx0ZXJQb2ludHMoYSwgYS5uZXh0KTtcbiAgICAgICAgICAgICAgICBjID0gZmlsdGVyUG9pbnRzKGMsIGMubmV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBydW4gZWFyY3V0IG9uIGVhY2ggaGFsZlxuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChhLCB0cmlhbmdsZXMsIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChjLCB0cmlhbmdsZXMsIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGIgPSBiLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGEubmV4dDtcbiAgICB9IHdoaWxlIChhICE9PSBzdGFydCk7XG59XG5cbi8vIGxpbmsgZXZlcnkgaG9sZSBpbnRvIHRoZSBvdXRlciBsb29wLCBwcm9kdWNpbmcgYSBzaW5nbGUtcmluZyBwb2x5Z29uIHdpdGhvdXQgaG9sZXNcbmZ1bmN0aW9uIGVsaW1pbmF0ZUhvbGVzKHBvaW50cywgb3V0ZXJOb2RlKSB7XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBsaXN0ID0gZmlsdGVyUG9pbnRzKGxpbmtlZExpc3QocG9pbnRzW2ldLCBmYWxzZSkpO1xuICAgICAgICBpZiAobGlzdCkgcXVldWUucHVzaChnZXRMZWZ0bW9zdChsaXN0KSk7XG4gICAgfVxuICAgIHF1ZXVlLnNvcnQoY29tcGFyZVgpO1xuXG4gICAgLy8gcHJvY2VzcyBob2xlcyBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICBmb3IgKGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxpbWluYXRlSG9sZShxdWV1ZVtpXSwgb3V0ZXJOb2RlKTtcbiAgICAgICAgb3V0ZXJOb2RlID0gZmlsdGVyUG9pbnRzKG91dGVyTm9kZSwgb3V0ZXJOb2RlLm5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRlck5vZGU7XG59XG5cbi8vIGZpbmQgYSBicmlkZ2UgYmV0d2VlbiB2ZXJ0aWNlcyB0aGF0IGNvbm5lY3RzIGhvbGUgd2l0aCBhbiBvdXRlciByaW5nIGFuZCBhbmQgbGluayBpdFxuZnVuY3Rpb24gZWxpbWluYXRlSG9sZShob2xlTm9kZSwgb3V0ZXJOb2RlKSB7XG4gICAgb3V0ZXJOb2RlID0gZmluZEhvbGVCcmlkZ2UoaG9sZU5vZGUsIG91dGVyTm9kZSk7XG4gICAgaWYgKG91dGVyTm9kZSkge1xuICAgICAgICB2YXIgYiA9IHNwbGl0UG9seWdvbihvdXRlck5vZGUsIGhvbGVOb2RlKTtcbiAgICAgICAgZmlsdGVyUG9pbnRzKGIsIGIubmV4dCk7XG4gICAgfVxufVxuXG4vLyBEYXZpZCBFYmVybHkncyBhbGdvcml0aG0gZm9yIGZpbmRpbmcgYSBicmlkZ2UgYmV0d2VlbiBob2xlIGFuZCBvdXRlciBwb2x5Z29uXG5mdW5jdGlvbiBmaW5kSG9sZUJyaWRnZShob2xlTm9kZSwgb3V0ZXJOb2RlKSB7XG4gICAgdmFyIG5vZGUgPSBvdXRlck5vZGUsXG4gICAgICAgIHAgPSBob2xlTm9kZS5wLFxuICAgICAgICBweCA9IHBbMF0sXG4gICAgICAgIHB5ID0gcFsxXSxcbiAgICAgICAgcU1heCA9IC1JbmZpbml0eSxcbiAgICAgICAgbU5vZGUsIGEsIGI7XG5cbiAgICAvLyBmaW5kIGEgc2VnbWVudCBpbnRlcnNlY3RlZCBieSBhIHJheSBmcm9tIHRoZSBob2xlJ3MgbGVmdG1vc3QgcG9pbnQgdG8gdGhlIGxlZnQ7XG4gICAgLy8gc2VnbWVudCdzIGVuZHBvaW50IHdpdGggbGVzc2VyIHggd2lsbCBiZSBwb3RlbnRpYWwgY29ubmVjdGlvbiBwb2ludFxuICAgIGRvIHtcbiAgICAgICAgYSA9IG5vZGUucDtcbiAgICAgICAgYiA9IG5vZGUubmV4dC5wO1xuXG4gICAgICAgIGlmIChweSA8PSBhWzFdICYmIHB5ID49IGJbMV0pIHtcbiAgICAgICAgICAgIHZhciBxeCA9IGFbMF0gKyAocHkgLSBhWzFdKSAqIChiWzBdIC0gYVswXSkgLyAoYlsxXSAtIGFbMV0pO1xuICAgICAgICAgICAgaWYgKHF4IDw9IHB4ICYmIHF4ID4gcU1heCkge1xuICAgICAgICAgICAgICAgIHFNYXggPSBxeDtcbiAgICAgICAgICAgICAgICBtTm9kZSA9IGFbMF0gPCBiWzBdID8gbm9kZSA6IG5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IG91dGVyTm9kZSk7XG5cbiAgICBpZiAoIW1Ob2RlKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIGxvb2sgZm9yIHBvaW50cyBzdHJpY3RseSBpbnNpZGUgdGhlIHRyaWFuZ2xlIG9mIGhvbGUgcG9pbnQsIHNlZ21lbnQgaW50ZXJzZWN0aW9uIGFuZCBlbmRwb2ludDtcbiAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcG9pbnRzIGZvdW5kLCB3ZSBoYXZlIGEgdmFsaWQgY29ubmVjdGlvbjtcbiAgICAvLyBvdGhlcndpc2UgY2hvb3NlIHRoZSBwb2ludCBvZiB0aGUgbWluaW11bSBhbmdsZSB3aXRoIHRoZSByYXkgYXMgY29ubmVjdGlvbiBwb2ludFxuXG4gICAgdmFyIGJ4ID0gbU5vZGUucFswXSxcbiAgICAgICAgYnkgPSBtTm9kZS5wWzFdLFxuICAgICAgICBwYmQgPSBweCAqIGJ5IC0gcHkgKiBieCxcbiAgICAgICAgcGNkID0gcHggKiBweSAtIHB5ICogcU1heCxcbiAgICAgICAgY3B5ID0gcHkgLSBweSxcbiAgICAgICAgcGN4ID0gcHggLSBxTWF4LFxuICAgICAgICBwYnkgPSBweSAtIGJ5LFxuICAgICAgICBicHggPSBieCAtIHB4LFxuICAgICAgICBBID0gcGJkIC0gcGNkIC0gKHFNYXggKiBieSAtIHB5ICogYngpLFxuICAgICAgICBzaWduID0gQSA8PSAwID8gLTEgOiAxLFxuICAgICAgICBzdG9wID0gbU5vZGUsXG4gICAgICAgIHRhbk1pbiA9IEluZmluaXR5LFxuICAgICAgICBteCwgbXksIGFteCwgcywgdCwgdGFuO1xuXG4gICAgbm9kZSA9IG1Ob2RlLm5leHQ7XG5cbiAgICB3aGlsZSAobm9kZSAhPT0gc3RvcCkge1xuXG4gICAgICAgIG14ID0gbm9kZS5wWzBdO1xuICAgICAgICBteSA9IG5vZGUucFsxXTtcbiAgICAgICAgYW14ID0gcHggLSBteDtcblxuICAgICAgICBpZiAoYW14ID49IDAgJiYgbXggPj0gYngpIHtcbiAgICAgICAgICAgIHMgPSAoY3B5ICogbXggKyBwY3ggKiBteSAtIHBjZCkgKiBzaWduO1xuICAgICAgICAgICAgaWYgKHMgPj0gMCkge1xuICAgICAgICAgICAgICAgIHQgPSAocGJ5ICogbXggKyBicHggKiBteSArIHBiZCkgKiBzaWduO1xuXG4gICAgICAgICAgICAgICAgaWYgKHQgPj0gMCAmJiBBICogc2lnbiAtIHMgLSB0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGFuID0gTWF0aC5hYnMocHkgLSBteSkgLyBhbXg7IC8vIHRhbmdlbnRpYWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhbiA8IHRhbk1pbiAmJiBsb2NhbGx5SW5zaWRlKG5vZGUsIGhvbGVOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbU5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFuTWluID0gdGFuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gbU5vZGU7XG59XG5cbi8vIGludGVybGluayBwb2x5Z29uIG5vZGVzIGluIHotb3JkZXJcbmZ1bmN0aW9uIGluZGV4Q3VydmUoc3RhcnQsIG1pblgsIG1pblksIHNpemUpIHtcbiAgICB2YXIgbm9kZSA9IHN0YXJ0O1xuXG4gICAgZG8ge1xuICAgICAgICBpZiAobm9kZS56ID09PSBudWxsKSBub2RlLnogPSB6T3JkZXIobm9kZS5wWzBdLCBub2RlLnBbMV0sIG1pblgsIG1pblksIHNpemUpO1xuICAgICAgICBub2RlLnByZXZaID0gbm9kZS5wcmV2O1xuICAgICAgICBub2RlLm5leHRaID0gbm9kZS5uZXh0O1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IHN0YXJ0KTtcblxuICAgIG5vZGUucHJldloubmV4dFogPSBudWxsO1xuICAgIG5vZGUucHJldlogPSBudWxsO1xuXG4gICAgc29ydExpbmtlZChub2RlKTtcbn1cblxuLy8gU2ltb24gVGF0aGFtJ3MgbGlua2VkIGxpc3QgbWVyZ2Ugc29ydCBhbGdvcml0aG1cbi8vIGh0dHA6Ly93d3cuY2hpYXJrLmdyZWVuZW5kLm9yZy51ay9+c2d0YXRoYW0vYWxnb3JpdGhtcy9saXN0c29ydC5odG1sXG5mdW5jdGlvbiBzb3J0TGlua2VkKGxpc3QpIHtcbiAgICB2YXIgaSwgcCwgcSwgZSwgdGFpbCwgbnVtTWVyZ2VzLCBwU2l6ZSwgcVNpemUsXG4gICAgICAgIGluU2l6ZSA9IDE7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBwID0gbGlzdDtcbiAgICAgICAgbGlzdCA9IG51bGw7XG4gICAgICAgIHRhaWwgPSBudWxsO1xuICAgICAgICBudW1NZXJnZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChwKSB7XG4gICAgICAgICAgICBudW1NZXJnZXMrKztcbiAgICAgICAgICAgIHEgPSBwO1xuICAgICAgICAgICAgcFNpemUgPSAwO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcFNpemUrKztcbiAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcbiAgICAgICAgICAgICAgICBpZiAoIXEpIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxU2l6ZSA9IGluU2l6ZTtcblxuICAgICAgICAgICAgd2hpbGUgKHBTaXplID4gMCB8fCAocVNpemUgPiAwICYmIHEpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocFNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHE7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocVNpemUgPT09IDAgfHwgIXEpIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBwU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocC56IDw9IHEueikge1xuICAgICAgICAgICAgICAgICAgICBlID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcCA9IHAubmV4dFo7XG4gICAgICAgICAgICAgICAgICAgIHBTaXplLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHE7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YWlsKSB0YWlsLm5leHRaID0gZTtcbiAgICAgICAgICAgICAgICBlbHNlIGxpc3QgPSBlO1xuXG4gICAgICAgICAgICAgICAgZS5wcmV2WiA9IHRhaWw7XG4gICAgICAgICAgICAgICAgdGFpbCA9IGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHAgPSBxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFpbC5uZXh0WiA9IG51bGw7XG5cbiAgICAgICAgaWYgKG51bU1lcmdlcyA8PSAxKSByZXR1cm4gbGlzdDtcblxuICAgICAgICBpblNpemUgKj0gMjtcbiAgICB9XG59XG5cbi8vIHotb3JkZXIgb2YgYSBwb2ludCBnaXZlbiBjb29yZHMgYW5kIHNpemUgb2YgdGhlIGRhdGEgYm91bmRpbmcgYm94XG5mdW5jdGlvbiB6T3JkZXIoeCwgeSwgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIC8vIGNvb3JkcyBhcmUgdHJhbnNmb3JtZWQgaW50byAoMC4uMTAwMCkgaW50ZWdlciByYW5nZVxuICAgIHggPSAxMDAwICogKHggLSBtaW5YKSAvIHNpemU7XG4gICAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgICB4ID0gKHggfCAoeCA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICAgIHggPSAoeCB8ICh4IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gICAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICAgIHkgPSAxMDAwICogKHkgLSBtaW5ZKSAvIHNpemU7XG4gICAgeSA9ICh5IHwgKHkgPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgICB5ID0gKHkgfCAoeSA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICAgIHkgPSAoeSB8ICh5IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gICAgeSA9ICh5IHwgKHkgPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICAgIHJldHVybiB4IHwgKHkgPDwgMSk7XG59XG5cbi8vIGZpbmQgdGhlIGxlZnRtb3N0IG5vZGUgb2YgYSBwb2x5Z29uIHJpbmdcbmZ1bmN0aW9uIGdldExlZnRtb3N0KHN0YXJ0KSB7XG4gICAgdmFyIG5vZGUgPSBzdGFydCxcbiAgICAgICAgbGVmdG1vc3QgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIGlmIChub2RlLnBbMF0gPCBsZWZ0bW9zdC5wWzBdKSBsZWZ0bW9zdCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGxlZnRtb3N0O1xufVxuXG4vLyBjaGVjayBpZiBhIGRpYWdvbmFsIGJldHdlZW4gdHdvIHBvbHlnb24gbm9kZXMgaXMgdmFsaWQgKGxpZXMgaW4gcG9seWdvbiBpbnRlcmlvcilcbmZ1bmN0aW9uIGlzVmFsaWREaWFnb25hbChhLCBiKSB7XG4gICAgcmV0dXJuICFpbnRlcnNlY3RzUG9seWdvbihhLCBhLnAsIGIucCkgJiZcbiAgICAgICAgICAgbG9jYWxseUluc2lkZShhLCBiKSAmJiBsb2NhbGx5SW5zaWRlKGIsIGEpICYmXG4gICAgICAgICAgIG1pZGRsZUluc2lkZShhLCBhLnAsIGIucCk7XG59XG5cbi8vIHdpbmRpbmcgb3JkZXIgb2YgdHJpYW5nbGUgZm9ybWVkIGJ5IDMgZ2l2ZW4gcG9pbnRzXG5mdW5jdGlvbiBvcmllbnQocCwgcSwgcikge1xuICAgIHZhciBvID0gKHFbMV0gLSBwWzFdKSAqIChyWzBdIC0gcVswXSkgLSAocVswXSAtIHBbMF0pICogKHJbMV0gLSBxWzFdKTtcbiAgICByZXR1cm4gbyA+IDAgPyAxIDpcbiAgICAgICAgICAgbyA8IDAgPyAtMSA6IDA7XG59XG5cbi8vIGNoZWNrIGlmIHR3byBwb2ludHMgYXJlIGVxdWFsXG5mdW5jdGlvbiBlcXVhbHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxWzBdID09PSBwMlswXSAmJiBwMVsxXSA9PT0gcDJbMV07XG59XG5cbi8vIGNoZWNrIGlmIHR3byBzZWdtZW50cyBpbnRlcnNlY3RcbmZ1bmN0aW9uIGludGVyc2VjdHMocDEsIHExLCBwMiwgcTIpIHtcbiAgICByZXR1cm4gb3JpZW50KHAxLCBxMSwgcDIpICE9PSBvcmllbnQocDEsIHExLCBxMikgJiZcbiAgICAgICAgICAgb3JpZW50KHAyLCBxMiwgcDEpICE9PSBvcmllbnQocDIsIHEyLCBxMSk7XG59XG5cbi8vIGNoZWNrIGlmIGEgcG9seWdvbiBkaWFnb25hbCBpbnRlcnNlY3RzIGFueSBwb2x5Z29uIHNlZ21lbnRzXG5mdW5jdGlvbiBpbnRlcnNlY3RzUG9seWdvbihzdGFydCwgYSwgYikge1xuICAgIHZhciBub2RlID0gc3RhcnQ7XG4gICAgZG8ge1xuICAgICAgICB2YXIgcDEgPSBub2RlLnAsXG4gICAgICAgICAgICBwMiA9IG5vZGUubmV4dC5wO1xuXG4gICAgICAgIGlmIChwMSAhPT0gYSAmJiBwMiAhPT0gYSAmJiBwMSAhPT0gYiAmJiBwMiAhPT0gYiAmJiBpbnRlcnNlY3RzKHAxLCBwMiwgYSwgYikpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBjaGVjayBpZiBhIHBvbHlnb24gZGlhZ29uYWwgaXMgbG9jYWxseSBpbnNpZGUgdGhlIHBvbHlnb25cbmZ1bmN0aW9uIGxvY2FsbHlJbnNpZGUoYSwgYikge1xuICAgIHJldHVybiBvcmllbnQoYS5wcmV2LnAsIGEucCwgYS5uZXh0LnApID09PSAtMSA/XG4gICAgICAgIG9yaWVudChhLnAsIGIucCwgYS5uZXh0LnApICE9PSAtMSAmJiBvcmllbnQoYS5wLCBhLnByZXYucCwgYi5wKSAhPT0gLTEgOlxuICAgICAgICBvcmllbnQoYS5wLCBiLnAsIGEucHJldi5wKSA9PT0gLTEgfHwgb3JpZW50KGEucCwgYS5uZXh0LnAsIGIucCkgPT09IC0xO1xufVxuXG4vLyBjaGVjayBpZiB0aGUgbWlkZGxlIHBvaW50IG9mIGEgcG9seWdvbiBkaWFnb25hbCBpcyBpbnNpZGUgdGhlIHBvbHlnb25cbmZ1bmN0aW9uIG1pZGRsZUluc2lkZShzdGFydCwgYSwgYikge1xuICAgIHZhciBub2RlID0gc3RhcnQsXG4gICAgICAgIGluc2lkZSA9IGZhbHNlLFxuICAgICAgICBweCA9IChhWzBdICsgYlswXSkgLyAyLFxuICAgICAgICBweSA9IChhWzFdICsgYlsxXSkgLyAyO1xuICAgIGRvIHtcbiAgICAgICAgdmFyIHAxID0gbm9kZS5wLFxuICAgICAgICAgICAgcDIgPSBub2RlLm5leHQucDtcblxuICAgICAgICBpZiAoKChwMVsxXSA+IHB5KSAhPT0gKHAyWzFdID4gcHkpKSAmJlxuICAgICAgICAgICAgKHB4IDwgKHAyWzBdIC0gcDFbMF0pICogKHB5IC0gcDFbMV0pIC8gKHAyWzFdIC0gcDFbMV0pICsgcDFbMF0pKSBpbnNpZGUgPSAhaW5zaWRlO1xuXG4gICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gc3RhcnQpO1xuXG4gICAgcmV0dXJuIGluc2lkZTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZVgoYSwgYikge1xuICAgIHJldHVybiBhLnBbMF0gLSBiLnBbMF07XG59XG5cbi8vIGxpbmsgdHdvIHBvbHlnb24gdmVydGljZXMgd2l0aCBhIGJyaWRnZTsgaWYgdGhlIHZlcnRpY2VzIGJlbG9uZyB0byB0aGUgc2FtZSByaW5nLCBpdCBzcGxpdHMgcG9seWdvbiBpbnRvIHR3bztcbi8vIGlmIG9uZSBiZWxvbmdzIHRvIHRoZSBvdXRlciByaW5nIGFuZCBhbm90aGVyIHRvIGEgaG9sZSwgaXQgbWVyZ2VzIGl0IGludG8gYSBzaW5nbGUgcmluZ1xuZnVuY3Rpb24gc3BsaXRQb2x5Z29uKGEsIGIpIHtcbiAgICB2YXIgYTIgPSBuZXcgTm9kZShhLnApLFxuICAgICAgICBiMiA9IG5ldyBOb2RlKGIucCksXG4gICAgICAgIGFuID0gYS5uZXh0LFxuICAgICAgICBicCA9IGIucHJldjtcblxuICAgIGEyLnNvdXJjZSA9IGE7XG4gICAgYjIuc291cmNlID0gYjtcblxuICAgIGEubmV4dCA9IGI7XG4gICAgYi5wcmV2ID0gYTtcblxuICAgIGEyLm5leHQgPSBhbjtcbiAgICBhbi5wcmV2ID0gYTI7XG5cbiAgICBiMi5uZXh0ID0gYTI7XG4gICAgYTIucHJldiA9IGIyO1xuXG4gICAgYnAubmV4dCA9IGIyO1xuICAgIGIyLnByZXYgPSBicDtcblxuICAgIHJldHVybiBiMjtcbn1cblxuLy8gY3JlYXRlIGEgbm9kZSBhbmQgb3B0aW9uYWxseSBsaW5rIGl0IHdpdGggcHJldmlvdXMgb25lIChpbiBhIGNpcmN1bGFyIGRvdWJseSBsaW5rZWQgbGlzdClcbmZ1bmN0aW9uIGluc2VydE5vZGUocG9pbnQsIGxhc3QpIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKHBvaW50KTtcblxuICAgIGlmICghbGFzdCkge1xuICAgICAgICBub2RlLnByZXYgPSBub2RlO1xuICAgICAgICBub2RlLm5leHQgPSBub2RlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5uZXh0ID0gbGFzdC5uZXh0O1xuICAgICAgICBub2RlLnByZXYgPSBsYXN0O1xuICAgICAgICBsYXN0Lm5leHQucHJldiA9IG5vZGU7XG4gICAgICAgIGxhc3QubmV4dCA9IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKHApIHtcbiAgICAvLyB2ZXJ0ZXggY29vcmRpbmF0ZXNcbiAgICB0aGlzLnAgPSBwO1xuXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgdmVydGljZSBub2RlcyBpbiBhIHBvbHlnb24gcmluZ1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy5uZXh0ID0gbnVsbDtcblxuICAgIC8vIHotb3JkZXIgY3VydmUgdmFsdWVcbiAgICB0aGlzLnogPSBudWxsO1xuXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgbm9kZXMgaW4gei1vcmRlclxuICAgIHRoaXMucHJldlogPSBudWxsO1xuICAgIHRoaXMubmV4dFogPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3IgaW5kZXhlZCBvdXRwdXRcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IG51bGw7XG59XG4iLCIvKipcclxuKiBAbmFtZXNwYWNlIFBhbGV0dGVcclxuKi9cclxudmFyIFBhbGV0dGUgPSBQYWxldHRlIHx8IHt9O1xyXG5cclxuUGFsZXR0ZS5lYXJjdXQgPSByZXF1aXJlKFwiZWFyY3V0XCIpO1xyXG4iXX0=

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Palette */
/**
* @classdesc The core part of the system - initialise this to begin using the shader manager.
* @class Palette.Manager
* @param {WebGLRenderingContext} gl - The context all shaders and programs will belong to and be compiled by.
*/
Palette.Manager = function(gl){
	if(!(gl instanceof WebGLRenderingContext)){
		throw new TypeError("Error: attempted to create Palette with illegal argument.");
	}

	/**
    * A reference to the defining WebGLRenderingContext.
    * @name Palette.Manager#context
	* @type WebGLRenderingContext
    * @protected
    * @readonly
    */
	this.context 		= gl;
	
	/**
    * An object storing all processed Vertex Shaders.
    * @name Palette.Manager#vertShaders
	* @type Object
    * @private
    */
	this.vertShaders 	= {};
	/**
    * An object storing all processed Fragment Shaders.
    * @name Palette.Manager#fragShaders
	* @type Object
    * @private
    */
	this.fragShaders	= {};
	/**
    * An object storing all processed Programs.
    * @name Palette.Manager#programs
	* @type Object
    * @private
    */
	this.programs		= {};

	/**
    * A {@link Palette.ShaderFactory} object utilised by the manager
    * to generate valid shader objects from many sources for use.
    * @name Palette.Manager#shaderFactory
	* @type Palette.ShaderFactory
    * @protected
    * @readonly
    */
	this.shaderFactory	= new Palette.ShaderFactory(this);
};

Palette.Manager.prototype = {
	/**
	* Add a shader into the manager's storage for future access.
	* @method Palette.Manager#addShader
	* @public
	* @param {string|Palette.Shader} shaderRef - URL, JSON or Palette.Shader.
	*/
	addShader: function(shaderRef){
		this.shaderFactory.addShader(shaderRef);
	},

	/**
	* Send a draw call to a given vs-fs pair.
	* The work is delegated down to the program's own draw method.
	* @method Palette.Manager#draw
	* @public
	* @param {string|Palette.Shader} vs - The desired Vertex Shader.
	* @param {string|Palette.Shader} fs - The desired Fragment Shader.
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(vs, fs, verts, conf1, conf2){
		this.getProgram(vs, fs).draw(verts, conf1, conf2);
	},

	/**
	* Request a program object from a known vs-fs pair.
	* @method Palette.Manager#getProgram
	* @public
	* @param {string|Palette.Shader} vs - The desired Vertex Shader.
	* @param {string|Palette.Shader} fs - The desired Fragment Shader.
	* @return {Palette.Program} The {@link Palette.Program} either found or generated. If either shader was not found, NULL is returned.
	*/
	getProgram: function(vs, fs){
		var vsName = this.getShaderName(vs);
		var fsName = this.getShaderName(fs);
		var vsObj;
		var fsObj;

		var output;

		this.programs[vsName] = this.programs[vsName] || {};
		this.programs[vsName][fsName] = this.programs[vsName][fsName] || {};

		if(!(this.programs[vsName][fsName] instanceof Palette.Program)){
			if(vs instanceof Palette.Shader){vsObj = vs;} else{vsObj = this.getShader(Palette.Shader.VS, vsName);}
			if(fs instanceof Palette.Shader){fsObj = fs;} else{fsObj = this.getShader(Palette.Shader.FS, fsName);}
			this.programs[vsName][fsName] = new Palette.Program(this.context, vsObj, fsObj);
		}
		output = this.programs[vsName][fsName];

		return output;
	},

	/**
	* Request a shader object from storage using its type and name.
	* @method Palette.Manager#getShader
	* @public
	* @param {integer} type - Either Palette.Shader.VS or Palette.Shader.FS.
	* @param {string} name - The shader's identifier.
	* @return {Palette.Shader} The requested {@link Palette.Shader}. If a shader was not found, NULL is returned.
	*/
	getShader: function(type, name){
		return (type === Palette.Shader.VS) ? this.vertShaders[name] : this.fragShaders[name];
	},

	/**
	* Ensure that we have a shader's name, for lookup purposes in particular.
	* @method Palette.Manager#getShaderName
	* @public
	* @param {string|Palette.Shader} input - The shader we need to sanity check the name of.
	* @return {string} - The definite name of the shader.
	*/
	getShaderName: function(input){
		var output;
		if(input instanceof Palette.Shader){
			output = input.name;
		} else{
			output = input;
		}
		return output;
	}
};

Palette.Manager.prototype.constructor = Palette.Manager;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGFsZXR0ZS9NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgUGFsZXR0ZSAqL1xyXG4vKipcclxuKiBAY2xhc3NkZXNjIFRoZSBjb3JlIHBhcnQgb2YgdGhlIHN5c3RlbSAtIGluaXRpYWxpc2UgdGhpcyB0byBiZWdpbiB1c2luZyB0aGUgc2hhZGVyIG1hbmFnZXIuXHJcbiogQGNsYXNzIFBhbGV0dGUuTWFuYWdlclxyXG4qIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCAtIFRoZSBjb250ZXh0IGFsbCBzaGFkZXJzIGFuZCBwcm9ncmFtcyB3aWxsIGJlbG9uZyB0byBhbmQgYmUgY29tcGlsZWQgYnkuXHJcbiovXHJcblBhbGV0dGUuTWFuYWdlciA9IGZ1bmN0aW9uKGdsKXtcclxuXHRpZighKGdsIGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KSl7XHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXJyb3I6IGF0dGVtcHRlZCB0byBjcmVhdGUgUGFsZXR0ZSB3aXRoIGlsbGVnYWwgYXJndW1lbnQuXCIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBkZWZpbmluZyBXZWJHTFJlbmRlcmluZ0NvbnRleHQuXHJcbiAgICAqIEBuYW1lIFBhbGV0dGUuTWFuYWdlciNjb250ZXh0XHJcblx0KiBAdHlwZSBXZWJHTFJlbmRlcmluZ0NvbnRleHRcclxuICAgICogQHByb3RlY3RlZFxyXG4gICAgKiBAcmVhZG9ubHlcclxuICAgICovXHJcblx0dGhpcy5jb250ZXh0IFx0XHQ9IGdsO1xyXG5cdFxyXG5cdC8qKlxyXG4gICAgKiBBbiBvYmplY3Qgc3RvcmluZyBhbGwgcHJvY2Vzc2VkIFZlcnRleCBTaGFkZXJzLlxyXG4gICAgKiBAbmFtZSBQYWxldHRlLk1hbmFnZXIjdmVydFNoYWRlcnNcclxuXHQqIEB0eXBlIE9iamVjdFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuXHR0aGlzLnZlcnRTaGFkZXJzIFx0PSB7fTtcclxuXHQvKipcclxuICAgICogQW4gb2JqZWN0IHN0b3JpbmcgYWxsIHByb2Nlc3NlZCBGcmFnbWVudCBTaGFkZXJzLlxyXG4gICAgKiBAbmFtZSBQYWxldHRlLk1hbmFnZXIjZnJhZ1NoYWRlcnNcclxuXHQqIEB0eXBlIE9iamVjdFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuXHR0aGlzLmZyYWdTaGFkZXJzXHQ9IHt9O1xyXG5cdC8qKlxyXG4gICAgKiBBbiBvYmplY3Qgc3RvcmluZyBhbGwgcHJvY2Vzc2VkIFByb2dyYW1zLlxyXG4gICAgKiBAbmFtZSBQYWxldHRlLk1hbmFnZXIjcHJvZ3JhbXNcclxuXHQqIEB0eXBlIE9iamVjdFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuXHR0aGlzLnByb2dyYW1zXHRcdD0ge307XHJcblxyXG5cdC8qKlxyXG4gICAgKiBBIHtAbGluayBQYWxldHRlLlNoYWRlckZhY3Rvcnl9IG9iamVjdCB1dGlsaXNlZCBieSB0aGUgbWFuYWdlclxyXG4gICAgKiB0byBnZW5lcmF0ZSB2YWxpZCBzaGFkZXIgb2JqZWN0cyBmcm9tIG1hbnkgc291cmNlcyBmb3IgdXNlLlxyXG4gICAgKiBAbmFtZSBQYWxldHRlLk1hbmFnZXIjc2hhZGVyRmFjdG9yeVxyXG5cdCogQHR5cGUgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5XHJcbiAgICAqIEBwcm90ZWN0ZWRcclxuICAgICogQHJlYWRvbmx5XHJcbiAgICAqL1xyXG5cdHRoaXMuc2hhZGVyRmFjdG9yeVx0PSBuZXcgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5KHRoaXMpO1xyXG59O1xyXG5cclxuUGFsZXR0ZS5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHQvKipcclxuXHQqIEFkZCBhIHNoYWRlciBpbnRvIHRoZSBtYW5hZ2VyJ3Mgc3RvcmFnZSBmb3IgZnV0dXJlIGFjY2Vzcy5cclxuXHQqIEBtZXRob2QgUGFsZXR0ZS5NYW5hZ2VyI2FkZFNoYWRlclxyXG5cdCogQHB1YmxpY1xyXG5cdCogQHBhcmFtIHtzdHJpbmd8UGFsZXR0ZS5TaGFkZXJ9IHNoYWRlclJlZiAtIFVSTCwgSlNPTiBvciBQYWxldHRlLlNoYWRlci5cclxuXHQqL1xyXG5cdGFkZFNoYWRlcjogZnVuY3Rpb24oc2hhZGVyUmVmKXtcclxuXHRcdHRoaXMuc2hhZGVyRmFjdG9yeS5hZGRTaGFkZXIoc2hhZGVyUmVmKTtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQqIFNlbmQgYSBkcmF3IGNhbGwgdG8gYSBnaXZlbiB2cy1mcyBwYWlyLlxyXG5cdCogVGhlIHdvcmsgaXMgZGVsZWdhdGVkIGRvd24gdG8gdGhlIHByb2dyYW0ncyBvd24gZHJhdyBtZXRob2QuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuTWFuYWdlciNkcmF3XHJcblx0KiBAcHVibGljXHJcblx0KiBAcGFyYW0ge3N0cmluZ3xQYWxldHRlLlNoYWRlcn0gdnMgLSBUaGUgZGVzaXJlZCBWZXJ0ZXggU2hhZGVyLlxyXG5cdCogQHBhcmFtIHtzdHJpbmd8UGFsZXR0ZS5TaGFkZXJ9IGZzIC0gVGhlIGRlc2lyZWQgRnJhZ21lbnQgU2hhZGVyLlxyXG5cdCogQHBhcmFtIHtGbG9hdDMyQXJyYXl9IHZlcnRzIC0gVmVydGV4IGxpc3QgdG8gcGFzcyB0byB0aGUgR1BVLlxyXG5cdCogQHBhcmFtIHtvYmplY3R9IFtjb25mMV0gLSBBIHNldCBvZiBhdHRyaWJ1dGVzIHRvIHBhc3MgZG93biB0byB0aGUgZnJhZ21lbnQgc2hhZGVyLlxyXG5cdCogQHBhcmFtIHtvYmplY3R9IFtjb25mMl0gLSBBIHNldCBvZiBhdHRyaWJ1dGVzIHRvIHBhc3MgZG93biB0byB0aGUgdmVydGV4IHNoYWRlci5cclxuXHQqL1xyXG5cdGRyYXc6IGZ1bmN0aW9uKHZzLCBmcywgdmVydHMsIGNvbmYxLCBjb25mMil7XHJcblx0XHR0aGlzLmdldFByb2dyYW0odnMsIGZzKS5kcmF3KHZlcnRzLCBjb25mMSwgY29uZjIpO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogUmVxdWVzdCBhIHByb2dyYW0gb2JqZWN0IGZyb20gYSBrbm93biB2cy1mcyBwYWlyLlxyXG5cdCogQG1ldGhvZCBQYWxldHRlLk1hbmFnZXIjZ2V0UHJvZ3JhbVxyXG5cdCogQHB1YmxpY1xyXG5cdCogQHBhcmFtIHtzdHJpbmd8UGFsZXR0ZS5TaGFkZXJ9IHZzIC0gVGhlIGRlc2lyZWQgVmVydGV4IFNoYWRlci5cclxuXHQqIEBwYXJhbSB7c3RyaW5nfFBhbGV0dGUuU2hhZGVyfSBmcyAtIFRoZSBkZXNpcmVkIEZyYWdtZW50IFNoYWRlci5cclxuXHQqIEByZXR1cm4ge1BhbGV0dGUuUHJvZ3JhbX0gVGhlIHtAbGluayBQYWxldHRlLlByb2dyYW19IGVpdGhlciBmb3VuZCBvciBnZW5lcmF0ZWQuIElmIGVpdGhlciBzaGFkZXIgd2FzIG5vdCBmb3VuZCwgTlVMTCBpcyByZXR1cm5lZC5cclxuXHQqL1xyXG5cdGdldFByb2dyYW06IGZ1bmN0aW9uKHZzLCBmcyl7XHJcblx0XHR2YXIgdnNOYW1lID0gdGhpcy5nZXRTaGFkZXJOYW1lKHZzKTtcclxuXHRcdHZhciBmc05hbWUgPSB0aGlzLmdldFNoYWRlck5hbWUoZnMpO1xyXG5cdFx0dmFyIHZzT2JqO1xyXG5cdFx0dmFyIGZzT2JqO1xyXG5cclxuXHRcdHZhciBvdXRwdXQ7XHJcblxyXG5cdFx0dGhpcy5wcm9ncmFtc1t2c05hbWVdID0gdGhpcy5wcm9ncmFtc1t2c05hbWVdIHx8IHt9O1xyXG5cdFx0dGhpcy5wcm9ncmFtc1t2c05hbWVdW2ZzTmFtZV0gPSB0aGlzLnByb2dyYW1zW3ZzTmFtZV1bZnNOYW1lXSB8fCB7fTtcclxuXHJcblx0XHRpZighKHRoaXMucHJvZ3JhbXNbdnNOYW1lXVtmc05hbWVdIGluc3RhbmNlb2YgUGFsZXR0ZS5Qcm9ncmFtKSl7XHJcblx0XHRcdGlmKHZzIGluc3RhbmNlb2YgUGFsZXR0ZS5TaGFkZXIpe3ZzT2JqID0gdnM7fSBlbHNle3ZzT2JqID0gdGhpcy5nZXRTaGFkZXIoUGFsZXR0ZS5TaGFkZXIuVlMsIHZzTmFtZSk7fVxyXG5cdFx0XHRpZihmcyBpbnN0YW5jZW9mIFBhbGV0dGUuU2hhZGVyKXtmc09iaiA9IGZzO30gZWxzZXtmc09iaiA9IHRoaXMuZ2V0U2hhZGVyKFBhbGV0dGUuU2hhZGVyLkZTLCBmc05hbWUpO31cclxuXHRcdFx0dGhpcy5wcm9ncmFtc1t2c05hbWVdW2ZzTmFtZV0gPSBuZXcgUGFsZXR0ZS5Qcm9ncmFtKHRoaXMuY29udGV4dCwgdnNPYmosIGZzT2JqKTtcclxuXHRcdH1cclxuXHRcdG91dHB1dCA9IHRoaXMucHJvZ3JhbXNbdnNOYW1lXVtmc05hbWVdO1xyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBSZXF1ZXN0IGEgc2hhZGVyIG9iamVjdCBmcm9tIHN0b3JhZ2UgdXNpbmcgaXRzIHR5cGUgYW5kIG5hbWUuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuTWFuYWdlciNnZXRTaGFkZXJcclxuXHQqIEBwdWJsaWNcclxuXHQqIEBwYXJhbSB7aW50ZWdlcn0gdHlwZSAtIEVpdGhlciBQYWxldHRlLlNoYWRlci5WUyBvciBQYWxldHRlLlNoYWRlci5GUy5cclxuXHQqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIHNoYWRlcidzIGlkZW50aWZpZXIuXHJcblx0KiBAcmV0dXJuIHtQYWxldHRlLlNoYWRlcn0gVGhlIHJlcXVlc3RlZCB7QGxpbmsgUGFsZXR0ZS5TaGFkZXJ9LiBJZiBhIHNoYWRlciB3YXMgbm90IGZvdW5kLCBOVUxMIGlzIHJldHVybmVkLlxyXG5cdCovXHJcblx0Z2V0U2hhZGVyOiBmdW5jdGlvbih0eXBlLCBuYW1lKXtcclxuXHRcdHJldHVybiAodHlwZSA9PT0gUGFsZXR0ZS5TaGFkZXIuVlMpID8gdGhpcy52ZXJ0U2hhZGVyc1tuYW1lXSA6IHRoaXMuZnJhZ1NoYWRlcnNbbmFtZV07XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBFbnN1cmUgdGhhdCB3ZSBoYXZlIGEgc2hhZGVyJ3MgbmFtZSwgZm9yIGxvb2t1cCBwdXJwb3NlcyBpbiBwYXJ0aWN1bGFyLlxyXG5cdCogQG1ldGhvZCBQYWxldHRlLk1hbmFnZXIjZ2V0U2hhZGVyTmFtZVxyXG5cdCogQHB1YmxpY1xyXG5cdCogQHBhcmFtIHtzdHJpbmd8UGFsZXR0ZS5TaGFkZXJ9IGlucHV0IC0gVGhlIHNoYWRlciB3ZSBuZWVkIHRvIHNhbml0eSBjaGVjayB0aGUgbmFtZSBvZi5cclxuXHQqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgZGVmaW5pdGUgbmFtZSBvZiB0aGUgc2hhZGVyLlxyXG5cdCovXHJcblx0Z2V0U2hhZGVyTmFtZTogZnVuY3Rpb24oaW5wdXQpe1xyXG5cdFx0dmFyIG91dHB1dDtcclxuXHRcdGlmKGlucHV0IGluc3RhbmNlb2YgUGFsZXR0ZS5TaGFkZXIpe1xyXG5cdFx0XHRvdXRwdXQgPSBpbnB1dC5uYW1lO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRvdXRwdXQgPSBpbnB1dDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fVxyXG59O1xyXG5cclxuUGFsZXR0ZS5NYW5hZ2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhbGV0dGUuTWFuYWdlcjtcclxuIl19

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Palette */
/**
* @classdesc Abstraction of program references to allow easy manipulation.
* @description The Program object, generated from linked pairs of vs-fs combinations.
* @class Palette.Program
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {Palette.Shader} vs - The {@link Palette.Shader} acting as the vertex shader for this program.
* @param {Palette.Shader} fs - The {@link Palette.Shader} acting as the fragment shader for this program.
*/
Palette.Program = function(gl, vs, fs){
	/**
	* The program's attached context.
	* @name Palette.Program#context
	* @type WebGLRenderingContext
	* @protected
	* @readonly
	*/
	this.context = gl;
	
	/**
	* The program's attached vertex shader.
	* @name Palette.Program#vs
	* @type Palette.Shader
	* @protected
	* @readonly
	*/
	this.vs = vs;
	
	/**
	* The program's attached fragment shader.
	* @name Palette.Program#fs
	* @type Palette.Shader
	* @protected
	* @readonly
	*/
	this.fs = fs;

	/**
	* The program as seen by WebGL.
	* @name Palette.Program#program
	* @type WebGLProgram
	* @protected
	* @readonly
	*/
	this.program = null;

	/**
	* Has the program attempted compilation yet?
	* @name Palette.Program#compiled
	* @type Boolean
	* @private
	* @readonly
	*/
	this.compiled = false;

	/**
	* Attribute Storage - temporary and set.
	* @name Palette.Program#attrs
	* @type Object
	* @private
	* @readonly
	*/
	this.attrs = {vs: {access:{},store:{},send:{}}
					, fs: {access:{},store:{},send:{}}};

	/**
	* The Selected Draw Mode for the program.
	* @name Palette.Program#drawMode
	* @type Integer
	* @private
	* @readonly
	*/
	this.drawMode = Palette.Program.TRIANGLES;

	this.linkProgram();
	this.prepareAttrStores();
};

Palette.Program.prototype = {
	/**
	* Draw a set of vertices with this program, with optional configuration. Configurations passed here do not
	* overwrite the cached object.
	* This method is accessed when {@link Palette.Manager#draw} is called.
	* @method Palette.Program#draw
	* @public
	* @param {Float32Array} verts - Vertex list to pass to the GPU.
	* @param {object} [conf1] - A set of attributes to pass down to the fragment shader.
	* @param {object} [conf2] - A set of attributes to pass down to the vertex shader.
	*/
	draw: function(verts, conf1, conf2){
		this.context.useProgram(this.program);
		if(!conf1) conf1 = {};
		conf1.vertexBuffer = verts;

		this.generateSend(this.attrs.vs, conf1);
		this.generateSend(this.attrs.fs, conf2);

		this.passAttrstoProg();

		this.context.drawArrays(this.drawMode, 0
			, this.attrs.vs.send.vertexBuffer.length/this.attrs.vs.access.vertexBuffer.itemSize);
	},

	/**
	* Restore a program's object config for either shader or both.
	* @method Palette.Program#restoreDefaultConfig
	* @public
	* @param {integer} mode - The identifier for which config object to revert. Supports Palette.Program.VS_MODE,
	* Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	*/
	restoreDefaultConfig: function(mode){
		var attrPointer;
		var shaderPointer;

		for(var j=0; j<2; j++){
			if(!j){if(!mode&Palette.Program.VS_MODE)continue; shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {if(!mode&Palette.Program.FS_MODE)continue; shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for (var i = shaderPointer.attrs.length - 1; i >= 0; i--) {
				var attrData = shaderPointer.attrs[i];
				var name = attrData[0];

				if(attrData[1]=="buffer" || attrData[1]=="vertexAttrib"){
					attrPointer.store[name] = null;
				} else if(attrData[1]!="vertexAttrib"){
					attrPointer.store[name] = attrData[2];
				}
			}
		}
	},

	/**
	* Set a program's object config for either shader or both with a given config object.
	* Object properties not in the supplied object will not overwrite the program state.
	* @method Palette.Program#setConfig
	* @public
	* @param {integer} mode - The identifier for which config object to set. Supports Palette.Program.VS_MODE,
	* Palette.Program.FS_MODE, Palette.Program.BOTH_MODE.
	* @param {object} conf - The config object to inject into the program state.
	*/
	setConfig: function(mode, conf){
		var attrPointer;
		var shaderPointer;

		for(var j=0; j<2; j++){
			if(!j){if(!mode&Palette.Program.VS_MODE)continue; shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {if(!mode&Palette.Program.FS_MODE)continue; shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for(var prop in attrPointer.access){
				var attrDest = attrPointer.store[prop];

				if(conf[prop]!= undefined)
					attrDest = conf[prop];
			}
		}
	},

	/**
	* Compile the set of shader attached to this program as a compilation unit.
	* Can only be run once per Program object, i.e. per vs-fs pair.
	* @method Palette.Program#linkProgram
	* @private
	*/
	linkProgram: function(){
		if (this.compiled) return false;
		this.compiled = true;

		this.program = this.context.createProgram();

		this.context.attachShader(this.program, this.vs.shader);
		this.context.attachShader(this.program, this.fs.shader);

		this.context.linkProgram(this.program);

		return true;
	},

	/**
	* Fetches the default values for program attributes, and fetches setter methods
	* for execution at run time. 
	* @method Palette.Program#prepareAttrStores
	* @private
	*/
	prepareAttrStores: function(){
		this.context.useProgram(this.program);
		var shaderPointer;
		var attrPointer;

		for(var j=0; j<2; j++){
			if(!j){shaderPointer = this.vs; attrPointer = this.attrs.vs;}
			else {shaderPointer = this.fs; attrPointer = this.attrs.fs;}

			for (var i = shaderPointer.attrs.length - 1; i >= 0; i--) {
				var attrData = shaderPointer.attrs[i];
				var name = attrData[0];
				attrPointer.access[name] = attrPointer.access[name] || {};
				var attrAccessDest = attrPointer.access[name];

				attrAccessDest.setFunction = Palette.Program.fetchSetter(this.context, attrData[1]);

				if(attrData[1]=="vertexAttrib"){
					attrAccessDest.pointer = this.context.getAttribLocation(this.program, attrData[0]);
					this.context.enableVertexAttribArray(attrAccessDest.pointer);
					attrAccessDest.bufferName = attrData[2];
				}	else if(attrData[1]=="buffer"){
					attrAccessDest.pointer = this.context.createBuffer();
					attrAccessDest.itemSize = attrData[2];
				}	else{
					attrAccessDest.pointer = this.context.getUniformLocation(this.program, attrData[0]);
				}

				attrAccessDest.type = attrData[1];
			}
		}
		this.restoreDefaultConfig(Palette.Program.BOTH_MODE);
	},

	/**
	* Run through the setters for each attribute, passing the values in the send
	* section of the store to the context.
	* @method Palette.Program#passAttrsToProg
	* @private
	*/
	passAttrstoProg: function(){
		var attrPointer;

		for(var j=0; j<2; j++){
			if(!j){attrPointer = this.attrs.vs;}
			else {attrPointer = this.attrs.fs;}

			for(var prop in attrPointer.access){
				var attrDest = attrPointer.send[prop];
				var attrAccessDest = attrPointer.access[prop];

				if(attrAccessDest.type.substr(0,3) == "mat"){
					attrAccessDest.setFunction(attrAccessDest.pointer, this.context.FALSE, attrDest);
				} else if(attrAccessDest.type == "vertexAttrib"){
					var buffer = this.attrs.vs.access[attrAccessDest.bufferName];
					attrAccessDest.setFunction(attrAccessDest, buffer);
				} else if(attrAccessDest.type == "buffer"){
					attrAccessDest.setFunction(attrAccessDest, attrDest);
				} else{
					attrAccessDest.setFunction(attrAccessDest.pointer, attrDest);
				}
			}
		}
	},

	/**
	* Set a program's draw mode.
	* @method Palette.Program#setDrawMode
	* @public
	* @param {integer} mode - The gl code for drawing mode. Supports Palette.Program.POINTS, .LINES, .LINE_LOOP,
	* .LINE_STRIP, .TRIANGLES, .TRIANGLE_STRIP, .TRIANGLE_FAN.
	*/
	setDrawMode: function(mode){
		this.drawMode = mode;
	},

	/**
	* Generate the "send" region of the vs and fs attribute stores from the necessary
	* sub-stores.
	* @method Palette.Program#generateSend
	* @private
	*/
	generateSend: function(dest, conf){
		var toSend;
		for(name in dest.access){
			if(conf[name]) toSend = conf[name];
			else toSend = dest.store[name];
			dest.send[name] = toSend;
		}
	}
};
/**
* Returns the relevant setter function for each 
* @method Palette.Program.fetchSetter
* @private
*/
Palette.Program.fetchSetter = function(gl, type){
	//LAZY
	//I'LL DO THIS MORE ELEGANTLY ONE DAY.
	var oneParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0]);
		}
	}
	var twoParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1]);
		}
	}
	var threeParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1],array[2]);
		}
	}
	var fourParamFromArray = function(convertFunc){
		return function(ptr, array){
			convertFunc(ptr, array[0],array[1],array[2],array[3]);
		}
	}

	switch(type){
		case "float":
			return oneParamFromArray(gl.uniform1f.bind(gl));
		case "float[]":
			return gl.uniform1fv.bind(gl);
		case "int":
			return oneParamFromArray(gl.uniform1i.bind(gl));
		case "int[]":
			return gl.uniform1iv.bind(gl);
		case "vec2":
			return twoParamFromArray(gl.uniform2f.bind(gl));
		case "vec2[]":
			return gl.uniform2fv.bind(gl);
		case "ivec2":
			return twoParamFromArray(gl.uniform2i.bind(gl));
		case "ivec2[]":
			return gl.uniform2iv.bind(gl);
		case "vec3":
			return threeParamFromArray(gl.uniform3f.bind(gl));
		case "vec3[]":
			return gl.uniform3fv.bind(gl);
		case "ivec3":
			return threeParamFromArray(gl.uniform3i.bind(gl));
		case "ivec3[]":
			return gl.uniform3iv.bind(gl);
		case "vec4":
			return fourParamFromArray(gl.uniform4f.bind(gl));
		case "vec4[]":
			return gl.uniform4fv.bind(gl);
		case "ivec4":
			return fourParamFromArray(gl.uniform4i.bind(gl));
		case "ivec4[]":
			return gl.uniform4iv.bind(gl);
		case "mat2":
			return gl.uniformMatrix2fv.bind(gl);
		case "mat3":
			return gl.uniformMatrix3fv.bind(gl);
		case "mat4":
			return gl.uniformMatrix4fv.bind(gl);
		case "texture":
			alert("You're on your own, kid.");
			return null;
		case "vertexAttrib":
			var k = function(attrib, buffer){
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.vertexAttribPointer(attrib.pointer, buffer.itemSize, gl.FLOAT, false, 0, 0);
			}
			return k.bind(gl);
		case "buffer":
			var k = function(buffer, bufferData){
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer.pointer);
				gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.DYNAMIC_DRAW);
			}
			return k.bind(gl);
		default:
			alert("Not gonna lie - you really messed up. I can't pass "+type+" onto the shader.");
			return null;
	}
};

Palette.Program.NONE_MODE	= 0;
Palette.Program.VS_MODE 	= 1;
Palette.Program.FS_MODE 	= 2;
Palette.Program.BOTH_MODE 	= 3;

Palette.Program.POINTS			= 0;
Palette.Program.LINES			= 1;
Palette.Program.LINE_LOOP		= 2;
Palette.Program.LINE_STRIP		= 3;
Palette.Program.TRIANGLES		= 4;
Palette.Program.TRIANGLE_STRIP	= 5;
Palette.Program.TRIANGLE_FAN	= 6;

Palette.Program.prototype.constructor = Palette.Program;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGFsZXR0ZS9Qcm9ncmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBQYWxldHRlICovXHJcbi8qKlxyXG4qIEBjbGFzc2Rlc2MgQWJzdHJhY3Rpb24gb2YgcHJvZ3JhbSByZWZlcmVuY2VzIHRvIGFsbG93IGVhc3kgbWFuaXB1bGF0aW9uLlxyXG4qIEBkZXNjcmlwdGlvbiBUaGUgUHJvZ3JhbSBvYmplY3QsIGdlbmVyYXRlZCBmcm9tIGxpbmtlZCBwYWlycyBvZiB2cy1mcyBjb21iaW5hdGlvbnMuXHJcbiogQGNsYXNzIFBhbGV0dGUuUHJvZ3JhbVxyXG4qIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCAtIFRoZSBjb250ZXh0IHRoZSBzaGFkZXJzIG9mIHRoaXMgcHJvZ3JhbSB3aWxsIGJlbG9uZyB0byBhbmQgYmUgY29tcGlsZWQgYnkuXHJcbiogQHBhcmFtIHtQYWxldHRlLlNoYWRlcn0gdnMgLSBUaGUge0BsaW5rIFBhbGV0dGUuU2hhZGVyfSBhY3RpbmcgYXMgdGhlIHZlcnRleCBzaGFkZXIgZm9yIHRoaXMgcHJvZ3JhbS5cclxuKiBAcGFyYW0ge1BhbGV0dGUuU2hhZGVyfSBmcyAtIFRoZSB7QGxpbmsgUGFsZXR0ZS5TaGFkZXJ9IGFjdGluZyBhcyB0aGUgZnJhZ21lbnQgc2hhZGVyIGZvciB0aGlzIHByb2dyYW0uXHJcbiovXHJcblBhbGV0dGUuUHJvZ3JhbSA9IGZ1bmN0aW9uKGdsLCB2cywgZnMpe1xyXG5cdC8qKlxyXG5cdCogVGhlIHByb2dyYW0ncyBhdHRhY2hlZCBjb250ZXh0LlxyXG5cdCogQG5hbWUgUGFsZXR0ZS5Qcm9ncmFtI2NvbnRleHRcclxuXHQqIEB0eXBlIFdlYkdMUmVuZGVyaW5nQ29udGV4dFxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLmNvbnRleHQgPSBnbDtcclxuXHRcclxuXHQvKipcclxuXHQqIFRoZSBwcm9ncmFtJ3MgYXR0YWNoZWQgdmVydGV4IHNoYWRlci5cclxuXHQqIEBuYW1lIFBhbGV0dGUuUHJvZ3JhbSN2c1xyXG5cdCogQHR5cGUgUGFsZXR0ZS5TaGFkZXJcclxuXHQqIEBwcm90ZWN0ZWRcclxuXHQqIEByZWFkb25seVxyXG5cdCovXHJcblx0dGhpcy52cyA9IHZzO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCogVGhlIHByb2dyYW0ncyBhdHRhY2hlZCBmcmFnbWVudCBzaGFkZXIuXHJcblx0KiBAbmFtZSBQYWxldHRlLlByb2dyYW0jZnNcclxuXHQqIEB0eXBlIFBhbGV0dGUuU2hhZGVyXHJcblx0KiBAcHJvdGVjdGVkXHJcblx0KiBAcmVhZG9ubHlcclxuXHQqL1xyXG5cdHRoaXMuZnMgPSBmcztcclxuXHJcblx0LyoqXHJcblx0KiBUaGUgcHJvZ3JhbSBhcyBzZWVuIGJ5IFdlYkdMLlxyXG5cdCogQG5hbWUgUGFsZXR0ZS5Qcm9ncmFtI3Byb2dyYW1cclxuXHQqIEB0eXBlIFdlYkdMUHJvZ3JhbVxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLnByb2dyYW0gPSBudWxsO1xyXG5cclxuXHQvKipcclxuXHQqIEhhcyB0aGUgcHJvZ3JhbSBhdHRlbXB0ZWQgY29tcGlsYXRpb24geWV0P1xyXG5cdCogQG5hbWUgUGFsZXR0ZS5Qcm9ncmFtI2NvbXBpbGVkXHJcblx0KiBAdHlwZSBCb29sZWFuXHJcblx0KiBAcHJpdmF0ZVxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLmNvbXBpbGVkID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG5cdCogQXR0cmlidXRlIFN0b3JhZ2UgLSB0ZW1wb3JhcnkgYW5kIHNldC5cclxuXHQqIEBuYW1lIFBhbGV0dGUuUHJvZ3JhbSNhdHRyc1xyXG5cdCogQHR5cGUgT2JqZWN0XHJcblx0KiBAcHJpdmF0ZVxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLmF0dHJzID0ge3ZzOiB7YWNjZXNzOnt9LHN0b3JlOnt9LHNlbmQ6e319XHJcblx0XHRcdFx0XHQsIGZzOiB7YWNjZXNzOnt9LHN0b3JlOnt9LHNlbmQ6e319fTtcclxuXHJcblx0LyoqXHJcblx0KiBUaGUgU2VsZWN0ZWQgRHJhdyBNb2RlIGZvciB0aGUgcHJvZ3JhbS5cclxuXHQqIEBuYW1lIFBhbGV0dGUuUHJvZ3JhbSNkcmF3TW9kZVxyXG5cdCogQHR5cGUgSW50ZWdlclxyXG5cdCogQHByaXZhdGVcclxuXHQqIEByZWFkb25seVxyXG5cdCovXHJcblx0dGhpcy5kcmF3TW9kZSA9IFBhbGV0dGUuUHJvZ3JhbS5UUklBTkdMRVM7XHJcblxyXG5cdHRoaXMubGlua1Byb2dyYW0oKTtcclxuXHR0aGlzLnByZXBhcmVBdHRyU3RvcmVzKCk7XHJcbn07XHJcblxyXG5QYWxldHRlLlByb2dyYW0ucHJvdG90eXBlID0ge1xyXG5cdC8qKlxyXG5cdCogRHJhdyBhIHNldCBvZiB2ZXJ0aWNlcyB3aXRoIHRoaXMgcHJvZ3JhbSwgd2l0aCBvcHRpb25hbCBjb25maWd1cmF0aW9uLiBDb25maWd1cmF0aW9ucyBwYXNzZWQgaGVyZSBkbyBub3RcclxuXHQqIG92ZXJ3cml0ZSB0aGUgY2FjaGVkIG9iamVjdC5cclxuXHQqIFRoaXMgbWV0aG9kIGlzIGFjY2Vzc2VkIHdoZW4ge0BsaW5rIFBhbGV0dGUuTWFuYWdlciNkcmF3fSBpcyBjYWxsZWQuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuUHJvZ3JhbSNkcmF3XHJcblx0KiBAcHVibGljXHJcblx0KiBAcGFyYW0ge0Zsb2F0MzJBcnJheX0gdmVydHMgLSBWZXJ0ZXggbGlzdCB0byBwYXNzIHRvIHRoZSBHUFUuXHJcblx0KiBAcGFyYW0ge29iamVjdH0gW2NvbmYxXSAtIEEgc2V0IG9mIGF0dHJpYnV0ZXMgdG8gcGFzcyBkb3duIHRvIHRoZSBmcmFnbWVudCBzaGFkZXIuXHJcblx0KiBAcGFyYW0ge29iamVjdH0gW2NvbmYyXSAtIEEgc2V0IG9mIGF0dHJpYnV0ZXMgdG8gcGFzcyBkb3duIHRvIHRoZSB2ZXJ0ZXggc2hhZGVyLlxyXG5cdCovXHJcblx0ZHJhdzogZnVuY3Rpb24odmVydHMsIGNvbmYxLCBjb25mMil7XHJcblx0XHR0aGlzLmNvbnRleHQudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xyXG5cdFx0aWYoIWNvbmYxKSBjb25mMSA9IHt9O1xyXG5cdFx0Y29uZjEudmVydGV4QnVmZmVyID0gdmVydHM7XHJcblxyXG5cdFx0dGhpcy5nZW5lcmF0ZVNlbmQodGhpcy5hdHRycy52cywgY29uZjEpO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZVNlbmQodGhpcy5hdHRycy5mcywgY29uZjIpO1xyXG5cclxuXHRcdHRoaXMucGFzc0F0dHJzdG9Qcm9nKCk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmRyYXdBcnJheXModGhpcy5kcmF3TW9kZSwgMFxyXG5cdFx0XHQsIHRoaXMuYXR0cnMudnMuc2VuZC52ZXJ0ZXhCdWZmZXIubGVuZ3RoL3RoaXMuYXR0cnMudnMuYWNjZXNzLnZlcnRleEJ1ZmZlci5pdGVtU2l6ZSk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBSZXN0b3JlIGEgcHJvZ3JhbSdzIG9iamVjdCBjb25maWcgZm9yIGVpdGhlciBzaGFkZXIgb3IgYm90aC5cclxuXHQqIEBtZXRob2QgUGFsZXR0ZS5Qcm9ncmFtI3Jlc3RvcmVEZWZhdWx0Q29uZmlnXHJcblx0KiBAcHVibGljXHJcblx0KiBAcGFyYW0ge2ludGVnZXJ9IG1vZGUgLSBUaGUgaWRlbnRpZmllciBmb3Igd2hpY2ggY29uZmlnIG9iamVjdCB0byByZXZlcnQuIFN1cHBvcnRzIFBhbGV0dGUuUHJvZ3JhbS5WU19NT0RFLFxyXG5cdCogUGFsZXR0ZS5Qcm9ncmFtLkZTX01PREUsIFBhbGV0dGUuUHJvZ3JhbS5CT1RIX01PREUuXHJcblx0Ki9cclxuXHRyZXN0b3JlRGVmYXVsdENvbmZpZzogZnVuY3Rpb24obW9kZSl7XHJcblx0XHR2YXIgYXR0clBvaW50ZXI7XHJcblx0XHR2YXIgc2hhZGVyUG9pbnRlcjtcclxuXHJcblx0XHRmb3IodmFyIGo9MDsgajwyOyBqKyspe1xyXG5cdFx0XHRpZighail7aWYoIW1vZGUmUGFsZXR0ZS5Qcm9ncmFtLlZTX01PREUpY29udGludWU7IHNoYWRlclBvaW50ZXIgPSB0aGlzLnZzOyBhdHRyUG9pbnRlciA9IHRoaXMuYXR0cnMudnM7fVxyXG5cdFx0XHRlbHNlIHtpZighbW9kZSZQYWxldHRlLlByb2dyYW0uRlNfTU9ERSljb250aW51ZTsgc2hhZGVyUG9pbnRlciA9IHRoaXMuZnM7IGF0dHJQb2ludGVyID0gdGhpcy5hdHRycy5mczt9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gc2hhZGVyUG9pbnRlci5hdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdHZhciBhdHRyRGF0YSA9IHNoYWRlclBvaW50ZXIuYXR0cnNbaV07XHJcblx0XHRcdFx0dmFyIG5hbWUgPSBhdHRyRGF0YVswXTtcclxuXHJcblx0XHRcdFx0aWYoYXR0ckRhdGFbMV09PVwiYnVmZmVyXCIgfHwgYXR0ckRhdGFbMV09PVwidmVydGV4QXR0cmliXCIpe1xyXG5cdFx0XHRcdFx0YXR0clBvaW50ZXIuc3RvcmVbbmFtZV0gPSBudWxsO1xyXG5cdFx0XHRcdH0gZWxzZSBpZihhdHRyRGF0YVsxXSE9XCJ2ZXJ0ZXhBdHRyaWJcIil7XHJcblx0XHRcdFx0XHRhdHRyUG9pbnRlci5zdG9yZVtuYW1lXSA9IGF0dHJEYXRhWzJdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogU2V0IGEgcHJvZ3JhbSdzIG9iamVjdCBjb25maWcgZm9yIGVpdGhlciBzaGFkZXIgb3IgYm90aCB3aXRoIGEgZ2l2ZW4gY29uZmlnIG9iamVjdC5cclxuXHQqIE9iamVjdCBwcm9wZXJ0aWVzIG5vdCBpbiB0aGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgbm90IG92ZXJ3cml0ZSB0aGUgcHJvZ3JhbSBzdGF0ZS5cclxuXHQqIEBtZXRob2QgUGFsZXR0ZS5Qcm9ncmFtI3NldENvbmZpZ1xyXG5cdCogQHB1YmxpY1xyXG5cdCogQHBhcmFtIHtpbnRlZ2VyfSBtb2RlIC0gVGhlIGlkZW50aWZpZXIgZm9yIHdoaWNoIGNvbmZpZyBvYmplY3QgdG8gc2V0LiBTdXBwb3J0cyBQYWxldHRlLlByb2dyYW0uVlNfTU9ERSxcclxuXHQqIFBhbGV0dGUuUHJvZ3JhbS5GU19NT0RFLCBQYWxldHRlLlByb2dyYW0uQk9USF9NT0RFLlxyXG5cdCogQHBhcmFtIHtvYmplY3R9IGNvbmYgLSBUaGUgY29uZmlnIG9iamVjdCB0byBpbmplY3QgaW50byB0aGUgcHJvZ3JhbSBzdGF0ZS5cclxuXHQqL1xyXG5cdHNldENvbmZpZzogZnVuY3Rpb24obW9kZSwgY29uZil7XHJcblx0XHR2YXIgYXR0clBvaW50ZXI7XHJcblx0XHR2YXIgc2hhZGVyUG9pbnRlcjtcclxuXHJcblx0XHRmb3IodmFyIGo9MDsgajwyOyBqKyspe1xyXG5cdFx0XHRpZighail7aWYoIW1vZGUmUGFsZXR0ZS5Qcm9ncmFtLlZTX01PREUpY29udGludWU7IHNoYWRlclBvaW50ZXIgPSB0aGlzLnZzOyBhdHRyUG9pbnRlciA9IHRoaXMuYXR0cnMudnM7fVxyXG5cdFx0XHRlbHNlIHtpZighbW9kZSZQYWxldHRlLlByb2dyYW0uRlNfTU9ERSljb250aW51ZTsgc2hhZGVyUG9pbnRlciA9IHRoaXMuZnM7IGF0dHJQb2ludGVyID0gdGhpcy5hdHRycy5mczt9XHJcblxyXG5cdFx0XHRmb3IodmFyIHByb3AgaW4gYXR0clBvaW50ZXIuYWNjZXNzKXtcclxuXHRcdFx0XHR2YXIgYXR0ckRlc3QgPSBhdHRyUG9pbnRlci5zdG9yZVtwcm9wXTtcclxuXHJcblx0XHRcdFx0aWYoY29uZltwcm9wXSE9IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGF0dHJEZXN0ID0gY29uZltwcm9wXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogQ29tcGlsZSB0aGUgc2V0IG9mIHNoYWRlciBhdHRhY2hlZCB0byB0aGlzIHByb2dyYW0gYXMgYSBjb21waWxhdGlvbiB1bml0LlxyXG5cdCogQ2FuIG9ubHkgYmUgcnVuIG9uY2UgcGVyIFByb2dyYW0gb2JqZWN0LCBpLmUuIHBlciB2cy1mcyBwYWlyLlxyXG5cdCogQG1ldGhvZCBQYWxldHRlLlByb2dyYW0jbGlua1Byb2dyYW1cclxuXHQqIEBwcml2YXRlXHJcblx0Ki9cclxuXHRsaW5rUHJvZ3JhbTogZnVuY3Rpb24oKXtcclxuXHRcdGlmICh0aGlzLmNvbXBpbGVkKSByZXR1cm4gZmFsc2U7XHJcblx0XHR0aGlzLmNvbXBpbGVkID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnByb2dyYW0gPSB0aGlzLmNvbnRleHQuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZzLnNoYWRlcik7XHJcblx0XHR0aGlzLmNvbnRleHQuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcy5zaGFkZXIpO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogRmV0Y2hlcyB0aGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHByb2dyYW0gYXR0cmlidXRlcywgYW5kIGZldGNoZXMgc2V0dGVyIG1ldGhvZHNcclxuXHQqIGZvciBleGVjdXRpb24gYXQgcnVuIHRpbWUuIFxyXG5cdCogQG1ldGhvZCBQYWxldHRlLlByb2dyYW0jcHJlcGFyZUF0dHJTdG9yZXNcclxuXHQqIEBwcml2YXRlXHJcblx0Ki9cclxuXHRwcmVwYXJlQXR0clN0b3JlczogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuY29udGV4dC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XHJcblx0XHR2YXIgc2hhZGVyUG9pbnRlcjtcclxuXHRcdHZhciBhdHRyUG9pbnRlcjtcclxuXHJcblx0XHRmb3IodmFyIGo9MDsgajwyOyBqKyspe1xyXG5cdFx0XHRpZighail7c2hhZGVyUG9pbnRlciA9IHRoaXMudnM7IGF0dHJQb2ludGVyID0gdGhpcy5hdHRycy52czt9XHJcblx0XHRcdGVsc2Uge3NoYWRlclBvaW50ZXIgPSB0aGlzLmZzOyBhdHRyUG9pbnRlciA9IHRoaXMuYXR0cnMuZnM7fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IHNoYWRlclBvaW50ZXIuYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0XHR2YXIgYXR0ckRhdGEgPSBzaGFkZXJQb2ludGVyLmF0dHJzW2ldO1xyXG5cdFx0XHRcdHZhciBuYW1lID0gYXR0ckRhdGFbMF07XHJcblx0XHRcdFx0YXR0clBvaW50ZXIuYWNjZXNzW25hbWVdID0gYXR0clBvaW50ZXIuYWNjZXNzW25hbWVdIHx8IHt9O1xyXG5cdFx0XHRcdHZhciBhdHRyQWNjZXNzRGVzdCA9IGF0dHJQb2ludGVyLmFjY2Vzc1tuYW1lXTtcclxuXHJcblx0XHRcdFx0YXR0ckFjY2Vzc0Rlc3Quc2V0RnVuY3Rpb24gPSBQYWxldHRlLlByb2dyYW0uZmV0Y2hTZXR0ZXIodGhpcy5jb250ZXh0LCBhdHRyRGF0YVsxXSk7XHJcblxyXG5cdFx0XHRcdGlmKGF0dHJEYXRhWzFdPT1cInZlcnRleEF0dHJpYlwiKXtcclxuXHRcdFx0XHRcdGF0dHJBY2Nlc3NEZXN0LnBvaW50ZXIgPSB0aGlzLmNvbnRleHQuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBhdHRyRGF0YVswXSk7XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRleHQuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0ckFjY2Vzc0Rlc3QucG9pbnRlcik7XHJcblx0XHRcdFx0XHRhdHRyQWNjZXNzRGVzdC5idWZmZXJOYW1lID0gYXR0ckRhdGFbMl07XHJcblx0XHRcdFx0fVx0ZWxzZSBpZihhdHRyRGF0YVsxXT09XCJidWZmZXJcIil7XHJcblx0XHRcdFx0XHRhdHRyQWNjZXNzRGVzdC5wb2ludGVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlcigpO1xyXG5cdFx0XHRcdFx0YXR0ckFjY2Vzc0Rlc3QuaXRlbVNpemUgPSBhdHRyRGF0YVsyXTtcclxuXHRcdFx0XHR9XHRlbHNle1xyXG5cdFx0XHRcdFx0YXR0ckFjY2Vzc0Rlc3QucG9pbnRlciA9IHRoaXMuY29udGV4dC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBhdHRyRGF0YVswXSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhdHRyQWNjZXNzRGVzdC50eXBlID0gYXR0ckRhdGFbMV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMucmVzdG9yZURlZmF1bHRDb25maWcoUGFsZXR0ZS5Qcm9ncmFtLkJPVEhfTU9ERSk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBSdW4gdGhyb3VnaCB0aGUgc2V0dGVycyBmb3IgZWFjaCBhdHRyaWJ1dGUsIHBhc3NpbmcgdGhlIHZhbHVlcyBpbiB0aGUgc2VuZFxyXG5cdCogc2VjdGlvbiBvZiB0aGUgc3RvcmUgdG8gdGhlIGNvbnRleHQuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuUHJvZ3JhbSNwYXNzQXR0cnNUb1Byb2dcclxuXHQqIEBwcml2YXRlXHJcblx0Ki9cclxuXHRwYXNzQXR0cnN0b1Byb2c6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYXR0clBvaW50ZXI7XHJcblxyXG5cdFx0Zm9yKHZhciBqPTA7IGo8MjsgaisrKXtcclxuXHRcdFx0aWYoIWope2F0dHJQb2ludGVyID0gdGhpcy5hdHRycy52czt9XHJcblx0XHRcdGVsc2Uge2F0dHJQb2ludGVyID0gdGhpcy5hdHRycy5mczt9XHJcblxyXG5cdFx0XHRmb3IodmFyIHByb3AgaW4gYXR0clBvaW50ZXIuYWNjZXNzKXtcclxuXHRcdFx0XHR2YXIgYXR0ckRlc3QgPSBhdHRyUG9pbnRlci5zZW5kW3Byb3BdO1xyXG5cdFx0XHRcdHZhciBhdHRyQWNjZXNzRGVzdCA9IGF0dHJQb2ludGVyLmFjY2Vzc1twcm9wXTtcclxuXHJcblx0XHRcdFx0aWYoYXR0ckFjY2Vzc0Rlc3QudHlwZS5zdWJzdHIoMCwzKSA9PSBcIm1hdFwiKXtcclxuXHRcdFx0XHRcdGF0dHJBY2Nlc3NEZXN0LnNldEZ1bmN0aW9uKGF0dHJBY2Nlc3NEZXN0LnBvaW50ZXIsIHRoaXMuY29udGV4dC5GQUxTRSwgYXR0ckRlc3QpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZihhdHRyQWNjZXNzRGVzdC50eXBlID09IFwidmVydGV4QXR0cmliXCIpe1xyXG5cdFx0XHRcdFx0dmFyIGJ1ZmZlciA9IHRoaXMuYXR0cnMudnMuYWNjZXNzW2F0dHJBY2Nlc3NEZXN0LmJ1ZmZlck5hbWVdO1xyXG5cdFx0XHRcdFx0YXR0ckFjY2Vzc0Rlc3Quc2V0RnVuY3Rpb24oYXR0ckFjY2Vzc0Rlc3QsIGJ1ZmZlcik7XHJcblx0XHRcdFx0fSBlbHNlIGlmKGF0dHJBY2Nlc3NEZXN0LnR5cGUgPT0gXCJidWZmZXJcIil7XHJcblx0XHRcdFx0XHRhdHRyQWNjZXNzRGVzdC5zZXRGdW5jdGlvbihhdHRyQWNjZXNzRGVzdCwgYXR0ckRlc3QpO1xyXG5cdFx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRcdGF0dHJBY2Nlc3NEZXN0LnNldEZ1bmN0aW9uKGF0dHJBY2Nlc3NEZXN0LnBvaW50ZXIsIGF0dHJEZXN0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQqIFNldCBhIHByb2dyYW0ncyBkcmF3IG1vZGUuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuUHJvZ3JhbSNzZXREcmF3TW9kZVxyXG5cdCogQHB1YmxpY1xyXG5cdCogQHBhcmFtIHtpbnRlZ2VyfSBtb2RlIC0gVGhlIGdsIGNvZGUgZm9yIGRyYXdpbmcgbW9kZS4gU3VwcG9ydHMgUGFsZXR0ZS5Qcm9ncmFtLlBPSU5UUywgLkxJTkVTLCAuTElORV9MT09QLFxyXG5cdCogLkxJTkVfU1RSSVAsIC5UUklBTkdMRVMsIC5UUklBTkdMRV9TVFJJUCwgLlRSSUFOR0xFX0ZBTi5cclxuXHQqL1xyXG5cdHNldERyYXdNb2RlOiBmdW5jdGlvbihtb2RlKXtcclxuXHRcdHRoaXMuZHJhd01vZGUgPSBtb2RlO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogR2VuZXJhdGUgdGhlIFwic2VuZFwiIHJlZ2lvbiBvZiB0aGUgdnMgYW5kIGZzIGF0dHJpYnV0ZSBzdG9yZXMgZnJvbSB0aGUgbmVjZXNzYXJ5XHJcblx0KiBzdWItc3RvcmVzLlxyXG5cdCogQG1ldGhvZCBQYWxldHRlLlByb2dyYW0jZ2VuZXJhdGVTZW5kXHJcblx0KiBAcHJpdmF0ZVxyXG5cdCovXHJcblx0Z2VuZXJhdGVTZW5kOiBmdW5jdGlvbihkZXN0LCBjb25mKXtcclxuXHRcdHZhciB0b1NlbmQ7XHJcblx0XHRmb3IobmFtZSBpbiBkZXN0LmFjY2Vzcyl7XHJcblx0XHRcdGlmKGNvbmZbbmFtZV0pIHRvU2VuZCA9IGNvbmZbbmFtZV07XHJcblx0XHRcdGVsc2UgdG9TZW5kID0gZGVzdC5zdG9yZVtuYW1lXTtcclxuXHRcdFx0ZGVzdC5zZW5kW25hbWVdID0gdG9TZW5kO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuLyoqXHJcbiogUmV0dXJucyB0aGUgcmVsZXZhbnQgc2V0dGVyIGZ1bmN0aW9uIGZvciBlYWNoIFxyXG4qIEBtZXRob2QgUGFsZXR0ZS5Qcm9ncmFtLmZldGNoU2V0dGVyXHJcbiogQHByaXZhdGVcclxuKi9cclxuUGFsZXR0ZS5Qcm9ncmFtLmZldGNoU2V0dGVyID0gZnVuY3Rpb24oZ2wsIHR5cGUpe1xyXG5cdC8vTEFaWVxyXG5cdC8vSSdMTCBETyBUSElTIE1PUkUgRUxFR0FOVExZIE9ORSBEQVkuXHJcblx0dmFyIG9uZVBhcmFtRnJvbUFycmF5ID0gZnVuY3Rpb24oY29udmVydEZ1bmMpe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHB0ciwgYXJyYXkpe1xyXG5cdFx0XHRjb252ZXJ0RnVuYyhwdHIsIGFycmF5WzBdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dmFyIHR3b1BhcmFtRnJvbUFycmF5ID0gZnVuY3Rpb24oY29udmVydEZ1bmMpe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHB0ciwgYXJyYXkpe1xyXG5cdFx0XHRjb252ZXJ0RnVuYyhwdHIsIGFycmF5WzBdLGFycmF5WzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dmFyIHRocmVlUGFyYW1Gcm9tQXJyYXkgPSBmdW5jdGlvbihjb252ZXJ0RnVuYyl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24ocHRyLCBhcnJheSl7XHJcblx0XHRcdGNvbnZlcnRGdW5jKHB0ciwgYXJyYXlbMF0sYXJyYXlbMV0sYXJyYXlbMl0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgZm91clBhcmFtRnJvbUFycmF5ID0gZnVuY3Rpb24oY29udmVydEZ1bmMpe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHB0ciwgYXJyYXkpe1xyXG5cdFx0XHRjb252ZXJ0RnVuYyhwdHIsIGFycmF5WzBdLGFycmF5WzFdLGFycmF5WzJdLGFycmF5WzNdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJmbG9hdFwiOlxyXG5cdFx0XHRyZXR1cm4gb25lUGFyYW1Gcm9tQXJyYXkoZ2wudW5pZm9ybTFmLmJpbmQoZ2wpKTtcclxuXHRcdGNhc2UgXCJmbG9hdFtdXCI6XHJcblx0XHRcdHJldHVybiBnbC51bmlmb3JtMWZ2LmJpbmQoZ2wpO1xyXG5cdFx0Y2FzZSBcImludFwiOlxyXG5cdFx0XHRyZXR1cm4gb25lUGFyYW1Gcm9tQXJyYXkoZ2wudW5pZm9ybTFpLmJpbmQoZ2wpKTtcclxuXHRcdGNhc2UgXCJpbnRbXVwiOlxyXG5cdFx0XHRyZXR1cm4gZ2wudW5pZm9ybTFpdi5iaW5kKGdsKTtcclxuXHRcdGNhc2UgXCJ2ZWMyXCI6XHJcblx0XHRcdHJldHVybiB0d29QYXJhbUZyb21BcnJheShnbC51bmlmb3JtMmYuYmluZChnbCkpO1xyXG5cdFx0Y2FzZSBcInZlYzJbXVwiOlxyXG5cdFx0XHRyZXR1cm4gZ2wudW5pZm9ybTJmdi5iaW5kKGdsKTtcclxuXHRcdGNhc2UgXCJpdmVjMlwiOlxyXG5cdFx0XHRyZXR1cm4gdHdvUGFyYW1Gcm9tQXJyYXkoZ2wudW5pZm9ybTJpLmJpbmQoZ2wpKTtcclxuXHRcdGNhc2UgXCJpdmVjMltdXCI6XHJcblx0XHRcdHJldHVybiBnbC51bmlmb3JtMml2LmJpbmQoZ2wpO1xyXG5cdFx0Y2FzZSBcInZlYzNcIjpcclxuXHRcdFx0cmV0dXJuIHRocmVlUGFyYW1Gcm9tQXJyYXkoZ2wudW5pZm9ybTNmLmJpbmQoZ2wpKTtcclxuXHRcdGNhc2UgXCJ2ZWMzW11cIjpcclxuXHRcdFx0cmV0dXJuIGdsLnVuaWZvcm0zZnYuYmluZChnbCk7XHJcblx0XHRjYXNlIFwiaXZlYzNcIjpcclxuXHRcdFx0cmV0dXJuIHRocmVlUGFyYW1Gcm9tQXJyYXkoZ2wudW5pZm9ybTNpLmJpbmQoZ2wpKTtcclxuXHRcdGNhc2UgXCJpdmVjM1tdXCI6XHJcblx0XHRcdHJldHVybiBnbC51bmlmb3JtM2l2LmJpbmQoZ2wpO1xyXG5cdFx0Y2FzZSBcInZlYzRcIjpcclxuXHRcdFx0cmV0dXJuIGZvdXJQYXJhbUZyb21BcnJheShnbC51bmlmb3JtNGYuYmluZChnbCkpO1xyXG5cdFx0Y2FzZSBcInZlYzRbXVwiOlxyXG5cdFx0XHRyZXR1cm4gZ2wudW5pZm9ybTRmdi5iaW5kKGdsKTtcclxuXHRcdGNhc2UgXCJpdmVjNFwiOlxyXG5cdFx0XHRyZXR1cm4gZm91clBhcmFtRnJvbUFycmF5KGdsLnVuaWZvcm00aS5iaW5kKGdsKSk7XHJcblx0XHRjYXNlIFwiaXZlYzRbXVwiOlxyXG5cdFx0XHRyZXR1cm4gZ2wudW5pZm9ybTRpdi5iaW5kKGdsKTtcclxuXHRcdGNhc2UgXCJtYXQyXCI6XHJcblx0XHRcdHJldHVybiBnbC51bmlmb3JtTWF0cml4MmZ2LmJpbmQoZ2wpO1xyXG5cdFx0Y2FzZSBcIm1hdDNcIjpcclxuXHRcdFx0cmV0dXJuIGdsLnVuaWZvcm1NYXRyaXgzZnYuYmluZChnbCk7XHJcblx0XHRjYXNlIFwibWF0NFwiOlxyXG5cdFx0XHRyZXR1cm4gZ2wudW5pZm9ybU1hdHJpeDRmdi5iaW5kKGdsKTtcclxuXHRcdGNhc2UgXCJ0ZXh0dXJlXCI6XHJcblx0XHRcdGFsZXJ0KFwiWW91J3JlIG9uIHlvdXIgb3duLCBraWQuXCIpO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdGNhc2UgXCJ2ZXJ0ZXhBdHRyaWJcIjpcclxuXHRcdFx0dmFyIGsgPSBmdW5jdGlvbihhdHRyaWIsIGJ1ZmZlcil7XHJcblx0XHRcdFx0Z2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlci5wb2ludGVyKTtcclxuXHRcdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYi5wb2ludGVyLCBidWZmZXIuaXRlbVNpemUsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGsuYmluZChnbCk7XHJcblx0XHRjYXNlIFwiYnVmZmVyXCI6XHJcblx0XHRcdHZhciBrID0gZnVuY3Rpb24oYnVmZmVyLCBidWZmZXJEYXRhKXtcclxuXHRcdFx0XHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyLnBvaW50ZXIpO1xyXG5cdFx0XHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXJEYXRhLCBnbC5EWU5BTUlDX0RSQVcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBrLmJpbmQoZ2wpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0YWxlcnQoXCJOb3QgZ29ubmEgbGllIC0geW91IHJlYWxseSBtZXNzZWQgdXAuIEkgY2FuJ3QgcGFzcyBcIit0eXBlK1wiIG9udG8gdGhlIHNoYWRlci5cIik7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufTtcclxuXHJcblBhbGV0dGUuUHJvZ3JhbS5OT05FX01PREVcdD0gMDtcclxuUGFsZXR0ZS5Qcm9ncmFtLlZTX01PREUgXHQ9IDE7XHJcblBhbGV0dGUuUHJvZ3JhbS5GU19NT0RFIFx0PSAyO1xyXG5QYWxldHRlLlByb2dyYW0uQk9USF9NT0RFIFx0PSAzO1xyXG5cclxuUGFsZXR0ZS5Qcm9ncmFtLlBPSU5UU1x0XHRcdD0gMDtcclxuUGFsZXR0ZS5Qcm9ncmFtLkxJTkVTXHRcdFx0PSAxO1xyXG5QYWxldHRlLlByb2dyYW0uTElORV9MT09QXHRcdD0gMjtcclxuUGFsZXR0ZS5Qcm9ncmFtLkxJTkVfU1RSSVBcdFx0PSAzO1xyXG5QYWxldHRlLlByb2dyYW0uVFJJQU5HTEVTXHRcdD0gNDtcclxuUGFsZXR0ZS5Qcm9ncmFtLlRSSUFOR0xFX1NUUklQXHQ9IDU7XHJcblBhbGV0dGUuUHJvZ3JhbS5UUklBTkdMRV9GQU5cdD0gNjtcclxuXHJcblBhbGV0dGUuUHJvZ3JhbS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYWxldHRlLlByb2dyYW07XHJcbiJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Palette */
/**
* @classdesc Abstraction of shader references to allow easy manipulation.
* @class Palette.Shader
* @description Initialise and compile a valid Source Object into a Shader.
* @param {WebGLRenderingContext} gl - The context the shader will belong to and be compiled by.
* @param {string} name - The name the shader object will be referred to by.
* @param {number} type - The class of the shader contained, either Palette.Shader.VS or Palette.Shader.FS.
* @param {string} source - The source code to compile the shader from.
* @param {WebGLRenderingContext} gl - The context the shaders of this program will belong to and be compiled by.
* @param {object} [attrs] - The array which contains attribute names and default values, as an array of 3-tuples.
*/
Palette.Shader = function(gl, name, type, source, attrs){
	/**
	* The shader's name.
	* @name Palette.Shader#name
	* @type String
	* @protected
	* @readonly
	*/
	this.name = name;

	/**
	* The type of shader, either Palette.Shader.VS or Palette.Shader.FS for objects.
	* @name Palette.Shader#type
	* @type Integer
	* @protected
	* @readonly
	*/
	this.type = type;

	/**
	* The shader's attached context.
	* @name Palette.Shader#context
	* @type WebGLRenderingContext
	* @protected
	* @readonly
	*/
	this.context = gl;

	/**
	* The shader's attribute array.
	* @name Palette.Shader#attrs
	* @type Array[]
	* @protected
	* @readonly
	*/
	this.attrs = attrs;

	/**
	* The reference to the compiled shader in the WebGLRenderingContext.
	* @name Palette.Shader#shader
	* @type WebGLShader
	* @protected
	* @readonly
	*/
	this.shader = null;

	/**
	* Has the shader attempted compilation yet?
	* @name Palette.Shader#compiled
	* @type Boolean
	* @private
	* @readonly
	*/
	this.compiled = false;

	this.bakeShader(source);
};

Palette.Shader.prototype = {
	/**
	* Compile shader code from a source string. Once compiled, you cannot recompile.
	* @method Palette.Shader#bakeShader
	* @protected
	* @param {string} source - The source code to compile and attach to this shader object.
	* @return {boolean} True if successful, false if unsuccessful.
	*/
	bakeShader: function(source){
		if (this.compiled){return null;}

		this.compiled = true;

		switch(this.type){
			case Palette.Shader.VS:
				this.shader = this.context.createShader(this.context.VERTEX_SHADER);
				break;
			case Palette.Shader.FS:
				this.shader = this.context.createShader(this.context.FRAGMENT_SHADER);
				break;
			default:
				return false;
		}

		this.context.shaderSource(this.shader, source);
		this.context.compileShader(this.shader);
		if (!this.context.getShaderParameter(this.shader, this.context.COMPILE_STATUS)) {
			alert("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(this.shader));
			return false;
		}

		return true;
	}
};

Palette.Shader.VS		= 0;
Palette.Shader.FS		= 1;
Palette.Shader.LIST		= 2;

Palette.Shader.prototype.constructor = Palette.Shader;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGFsZXR0ZS9TaGFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIFBhbGV0dGUgKi9cclxuLyoqXHJcbiogQGNsYXNzZGVzYyBBYnN0cmFjdGlvbiBvZiBzaGFkZXIgcmVmZXJlbmNlcyB0byBhbGxvdyBlYXN5IG1hbmlwdWxhdGlvbi5cclxuKiBAY2xhc3MgUGFsZXR0ZS5TaGFkZXJcclxuKiBAZGVzY3JpcHRpb24gSW5pdGlhbGlzZSBhbmQgY29tcGlsZSBhIHZhbGlkIFNvdXJjZSBPYmplY3QgaW50byBhIFNoYWRlci5cclxuKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2wgLSBUaGUgY29udGV4dCB0aGUgc2hhZGVyIHdpbGwgYmVsb25nIHRvIGFuZCBiZSBjb21waWxlZCBieS5cclxuKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIHRoZSBzaGFkZXIgb2JqZWN0IHdpbGwgYmUgcmVmZXJyZWQgdG8gYnkuXHJcbiogQHBhcmFtIHtudW1iZXJ9IHR5cGUgLSBUaGUgY2xhc3Mgb2YgdGhlIHNoYWRlciBjb250YWluZWQsIGVpdGhlciBQYWxldHRlLlNoYWRlci5WUyBvciBQYWxldHRlLlNoYWRlci5GUy5cclxuKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIC0gVGhlIHNvdXJjZSBjb2RlIHRvIGNvbXBpbGUgdGhlIHNoYWRlciBmcm9tLlxyXG4qIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCAtIFRoZSBjb250ZXh0IHRoZSBzaGFkZXJzIG9mIHRoaXMgcHJvZ3JhbSB3aWxsIGJlbG9uZyB0byBhbmQgYmUgY29tcGlsZWQgYnkuXHJcbiogQHBhcmFtIHtvYmplY3R9IFthdHRyc10gLSBUaGUgYXJyYXkgd2hpY2ggY29udGFpbnMgYXR0cmlidXRlIG5hbWVzIGFuZCBkZWZhdWx0IHZhbHVlcywgYXMgYW4gYXJyYXkgb2YgMy10dXBsZXMuXHJcbiovXHJcblBhbGV0dGUuU2hhZGVyID0gZnVuY3Rpb24oZ2wsIG5hbWUsIHR5cGUsIHNvdXJjZSwgYXR0cnMpe1xyXG5cdC8qKlxyXG5cdCogVGhlIHNoYWRlcidzIG5hbWUuXHJcblx0KiBAbmFtZSBQYWxldHRlLlNoYWRlciNuYW1lXHJcblx0KiBAdHlwZSBTdHJpbmdcclxuXHQqIEBwcm90ZWN0ZWRcclxuXHQqIEByZWFkb25seVxyXG5cdCovXHJcblx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHJcblx0LyoqXHJcblx0KiBUaGUgdHlwZSBvZiBzaGFkZXIsIGVpdGhlciBQYWxldHRlLlNoYWRlci5WUyBvciBQYWxldHRlLlNoYWRlci5GUyBmb3Igb2JqZWN0cy5cclxuXHQqIEBuYW1lIFBhbGV0dGUuU2hhZGVyI3R5cGVcclxuXHQqIEB0eXBlIEludGVnZXJcclxuXHQqIEBwcm90ZWN0ZWRcclxuXHQqIEByZWFkb25seVxyXG5cdCovXHJcblx0dGhpcy50eXBlID0gdHlwZTtcclxuXHJcblx0LyoqXHJcblx0KiBUaGUgc2hhZGVyJ3MgYXR0YWNoZWQgY29udGV4dC5cclxuXHQqIEBuYW1lIFBhbGV0dGUuU2hhZGVyI2NvbnRleHRcclxuXHQqIEB0eXBlIFdlYkdMUmVuZGVyaW5nQ29udGV4dFxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLmNvbnRleHQgPSBnbDtcclxuXHJcblx0LyoqXHJcblx0KiBUaGUgc2hhZGVyJ3MgYXR0cmlidXRlIGFycmF5LlxyXG5cdCogQG5hbWUgUGFsZXR0ZS5TaGFkZXIjYXR0cnNcclxuXHQqIEB0eXBlIEFycmF5W11cclxuXHQqIEBwcm90ZWN0ZWRcclxuXHQqIEByZWFkb25seVxyXG5cdCovXHJcblx0dGhpcy5hdHRycyA9IGF0dHJzO1xyXG5cclxuXHQvKipcclxuXHQqIFRoZSByZWZlcmVuY2UgdG8gdGhlIGNvbXBpbGVkIHNoYWRlciBpbiB0aGUgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlxyXG5cdCogQG5hbWUgUGFsZXR0ZS5TaGFkZXIjc2hhZGVyXHJcblx0KiBAdHlwZSBXZWJHTFNoYWRlclxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLnNoYWRlciA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCogSGFzIHRoZSBzaGFkZXIgYXR0ZW1wdGVkIGNvbXBpbGF0aW9uIHlldD9cclxuXHQqIEBuYW1lIFBhbGV0dGUuU2hhZGVyI2NvbXBpbGVkXHJcblx0KiBAdHlwZSBCb29sZWFuXHJcblx0KiBAcHJpdmF0ZVxyXG5cdCogQHJlYWRvbmx5XHJcblx0Ki9cclxuXHR0aGlzLmNvbXBpbGVkID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuYmFrZVNoYWRlcihzb3VyY2UpO1xyXG59O1xyXG5cclxuUGFsZXR0ZS5TaGFkZXIucHJvdG90eXBlID0ge1xyXG5cdC8qKlxyXG5cdCogQ29tcGlsZSBzaGFkZXIgY29kZSBmcm9tIGEgc291cmNlIHN0cmluZy4gT25jZSBjb21waWxlZCwgeW91IGNhbm5vdCByZWNvbXBpbGUuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuU2hhZGVyI2Jha2VTaGFkZXJcclxuXHQqIEBwcm90ZWN0ZWRcclxuXHQqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgLSBUaGUgc291cmNlIGNvZGUgdG8gY29tcGlsZSBhbmQgYXR0YWNoIHRvIHRoaXMgc2hhZGVyIG9iamVjdC5cclxuXHQqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgc3VjY2Vzc2Z1bCwgZmFsc2UgaWYgdW5zdWNjZXNzZnVsLlxyXG5cdCovXHJcblx0YmFrZVNoYWRlcjogZnVuY3Rpb24oc291cmNlKXtcclxuXHRcdGlmICh0aGlzLmNvbXBpbGVkKXtyZXR1cm4gbnVsbDt9XHJcblxyXG5cdFx0dGhpcy5jb21waWxlZCA9IHRydWU7XHJcblxyXG5cdFx0c3dpdGNoKHRoaXMudHlwZSl7XHJcblx0XHRcdGNhc2UgUGFsZXR0ZS5TaGFkZXIuVlM6XHJcblx0XHRcdFx0dGhpcy5zaGFkZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlU2hhZGVyKHRoaXMuY29udGV4dC5WRVJURVhfU0hBREVSKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBQYWxldHRlLlNoYWRlci5GUzpcclxuXHRcdFx0XHR0aGlzLnNoYWRlciA9IHRoaXMuY29udGV4dC5jcmVhdGVTaGFkZXIodGhpcy5jb250ZXh0LkZSQUdNRU5UX1NIQURFUik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29udGV4dC5zaGFkZXJTb3VyY2UodGhpcy5zaGFkZXIsIHNvdXJjZSk7XHJcblx0XHR0aGlzLmNvbnRleHQuY29tcGlsZVNoYWRlcih0aGlzLnNoYWRlcik7XHJcblx0XHRpZiAoIXRoaXMuY29udGV4dC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy5zaGFkZXIsIHRoaXMuY29udGV4dC5DT01QSUxFX1NUQVRVUykpIHtcclxuXHRcdFx0YWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZCBjb21waWxpbmcgdGhlIHNoYWRlcnM6IFwiICsgdGhpcy5jb250ZXh0LmdldFNoYWRlckluZm9Mb2codGhpcy5zaGFkZXIpKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufTtcclxuXHJcblBhbGV0dGUuU2hhZGVyLlZTXHRcdD0gMDtcclxuUGFsZXR0ZS5TaGFkZXIuRlNcdFx0PSAxO1xyXG5QYWxldHRlLlNoYWRlci5MSVNUXHRcdD0gMjtcclxuXHJcblBhbGV0dGUuU2hhZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhbGV0dGUuU2hhZGVyO1xyXG4iXX0=

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Palette */
/**
* @classdesc
* A Factory class designed to process objects, URLs, JSON and potentially other formats to generate
* valid {@link Palette.Shader} objects.
*
* This is a deliberate choice, to abstract some functionality away from the central {@link Palette.Manager}
* class.
* @class Palette.ShaderFactory
* @description
* Create a new ShaderFactory object - this is done automatically by {@link Palette.Manager}.
*
* @param {Palette.Manager} manager - The manager to place 
*/
Palette.ShaderFactory = function(manager){
	/**
    * An object reference to the parent {@link Palette.Manager}.
    * @name Palette.ShaderFactory#manager
	* @type Palette.Manager
    * @readonly
    * @protected
    */
    that = this;
	this.manager = manager;
	this.downloadInProgress = false;
};

Palette.ShaderFactory.prototype = {
	/**
	* Begin the shader construction process.
	* @method Palette.ShaderFactory#addShader
	* @public
	* @param {string|Palette.Shader|Object} shader - URL, JSON, Shader Source Object or {@link Palette.Shader}.
	*/
	addShader: function(shader){
		var inShader;
		var outShader;

		switch(this.establishType(shader)){
			case Palette.ShaderFactory.SOURCE_OBJECT:
				inShader = shader;
				/* falls through */
			case Palette.ShaderFactory.JSON:
				inShader = inShader || JSON.parse(shader);
				outShader = this.createShaderObject(inShader);
				break;

			case Palette.ShaderFactory.SHADER_OBJECT:
				outShader = shader;
				break;

			case Palette.ShaderFactory.URL:
				this.downloadFromURL(shader);
				break;
			default:
				throw new Error("Not a valid type of shader.");
		}

		//while(this.downloadInProgress){}

		if(outShader){this.registerShader(outShader);}
	},

	/**
	* Create a shader from a source object.
	* @method Palette.ShaderFactory#createShaderObject
	* @protected
	* @param {object} sourceObject - Either a list of shaders or a single shader object is valid.
	* @return {Palette.Shader|null} Returns a {@link Palette.Shader} if the Source Object was not a list. If it was a list, it adds all the children instead.
	*/
	createShaderObject: function(sourceObject){
		switch(sourceObject.type){
			case Palette.Shader.VS:
			case Palette.Shader.FS:
				return new Palette.Shader(this.manager.context, sourceObject.name, sourceObject.type, sourceObject.src, sourceObject.attrs);

			case Palette.Shader.LIST:
				for (var i = sourceObject.content.length - 1; i >= 0; i--) {
					this.addShader(sourceObject.content[i]);
				}
				break;

			default:
				throw new Error("Tried to create an illegal class of shader.");
		}
	},

	/**
	* Download a file from the supplied URL, before adding it to the manager.
	* @method Palette.ShaderFactory#downloadFromURL
	* @protected
	* @param {string} url - URL corresponding to a Shader Source Object JSON file.
	*/
	downloadFromURL: function(url){
		var rdr = new XMLHttpRequest();
		rdr.open("GET", url, true);
		rdr.onload = function(){
			console.log(that)
			that.addShader(rdr.response);
			that.downloadInProgress = false;
		};
		that.downloadInProgress = true;
		rdr.send();
	},

	/**
	* Determine the type of shader reference passed to the factory.
	* @method Palette.ShaderFactory#establishType
	* @protected
	* @param {string|Palette.Shader} shader - URL, JSON or Palette.Shader.
	* @return {number} Either Palette.ShaderFactory.SOURCE_OBJECT, .JSON, .URL or .SHADER_OBJECT.
	*/
	establishType: function(shader){
		var type = -1;
		if(shader instanceof Palette.Shader){
			type = Palette.ShaderFactory.SHADER_OBJECT;
		} else if((shader.type != undefined) && (shader.name != undefined) && (shader.content || shader.src)){
			type = Palette.ShaderFactory.SOURCE_OBJECT;
		} else if(this.isJSON(shader)){
			type = Palette.ShaderFactory.JSON;
		} else if(this.isString(shader)){
			type = Palette.ShaderFactory.URL;
		}
		return type;
	},

	/**
	* Determine if a string is valid JSON.
	* @method Palette.ShaderFactory#isJSON
	* @private
	* @param {string} str - Suspected JSON string to check.
	*/
	isJSON: function(str){
		try{
			JSON.parse(str);
			return true;
		} catch (e){
			return false;
		}
	},

	isString: function(s){
    	return typeof(s) === 'string' || s instanceof String;
	},

	/**
	* Add a shader directly into the manager's storage for future access.
	* @method Palette.ShaderFactory#registerShader
	* @protected
	* @param {Palette.Shader} shaderObject - Compiled shader object to store in the {@link Palette.Manager}.
	*/
	registerShader: function(shaderObject){
		switch(shaderObject.type){
			case Palette.Shader.VS:
				this.manager.vertShaders[shaderObject.name] = this.manager.vertShaders[shaderObject.name] || shaderObject;
				break;
			case Palette.Shader.FS:
				this.manager.fragShaders[shaderObject.name] = this.manager.fragShaders[shaderObject.name] || shaderObject;
				break;
			default:
				throw new Error("Tried to register an illegal class of shader.");
		}
	}
};

Palette.ShaderFactory.SOURCE_OBJECT	= 0;
Palette.ShaderFactory.JSON			= 1;
Palette.ShaderFactory.URL				= 2;
Palette.ShaderFactory.SHADER_OBJECT	= 3;

Palette.ShaderFactory.prototype.constructor = Palette.ShaderFactory;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvUGFsZXR0ZS9TaGFkZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBQYWxldHRlICovXHJcbi8qKlxyXG4qIEBjbGFzc2Rlc2NcclxuKiBBIEZhY3RvcnkgY2xhc3MgZGVzaWduZWQgdG8gcHJvY2VzcyBvYmplY3RzLCBVUkxzLCBKU09OIGFuZCBwb3RlbnRpYWxseSBvdGhlciBmb3JtYXRzIHRvIGdlbmVyYXRlXHJcbiogdmFsaWQge0BsaW5rIFBhbGV0dGUuU2hhZGVyfSBvYmplY3RzLlxyXG4qXHJcbiogVGhpcyBpcyBhIGRlbGliZXJhdGUgY2hvaWNlLCB0byBhYnN0cmFjdCBzb21lIGZ1bmN0aW9uYWxpdHkgYXdheSBmcm9tIHRoZSBjZW50cmFsIHtAbGluayBQYWxldHRlLk1hbmFnZXJ9XHJcbiogY2xhc3MuXHJcbiogQGNsYXNzIFBhbGV0dGUuU2hhZGVyRmFjdG9yeVxyXG4qIEBkZXNjcmlwdGlvblxyXG4qIENyZWF0ZSBhIG5ldyBTaGFkZXJGYWN0b3J5IG9iamVjdCAtIHRoaXMgaXMgZG9uZSBhdXRvbWF0aWNhbGx5IGJ5IHtAbGluayBQYWxldHRlLk1hbmFnZXJ9LlxyXG4qXHJcbiogQHBhcmFtIHtQYWxldHRlLk1hbmFnZXJ9IG1hbmFnZXIgLSBUaGUgbWFuYWdlciB0byBwbGFjZSBcclxuKi9cclxuUGFsZXR0ZS5TaGFkZXJGYWN0b3J5ID0gZnVuY3Rpb24obWFuYWdlcil7XHJcblx0LyoqXHJcbiAgICAqIEFuIG9iamVjdCByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCB7QGxpbmsgUGFsZXR0ZS5NYW5hZ2VyfS5cclxuICAgICogQG5hbWUgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5I21hbmFnZXJcclxuXHQqIEB0eXBlIFBhbGV0dGUuTWFuYWdlclxyXG4gICAgKiBAcmVhZG9ubHlcclxuICAgICogQHByb3RlY3RlZFxyXG4gICAgKi9cclxuICAgIHRoYXQgPSB0aGlzO1xyXG5cdHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcblx0dGhpcy5kb3dubG9hZEluUHJvZ3Jlc3MgPSBmYWxzZTtcclxufTtcclxuXHJcblBhbGV0dGUuU2hhZGVyRmFjdG9yeS5wcm90b3R5cGUgPSB7XHJcblx0LyoqXHJcblx0KiBCZWdpbiB0aGUgc2hhZGVyIGNvbnN0cnVjdGlvbiBwcm9jZXNzLlxyXG5cdCogQG1ldGhvZCBQYWxldHRlLlNoYWRlckZhY3RvcnkjYWRkU2hhZGVyXHJcblx0KiBAcHVibGljXHJcblx0KiBAcGFyYW0ge3N0cmluZ3xQYWxldHRlLlNoYWRlcnxPYmplY3R9IHNoYWRlciAtIFVSTCwgSlNPTiwgU2hhZGVyIFNvdXJjZSBPYmplY3Qgb3Ige0BsaW5rIFBhbGV0dGUuU2hhZGVyfS5cclxuXHQqL1xyXG5cdGFkZFNoYWRlcjogZnVuY3Rpb24oc2hhZGVyKXtcclxuXHRcdHZhciBpblNoYWRlcjtcclxuXHRcdHZhciBvdXRTaGFkZXI7XHJcblxyXG5cdFx0c3dpdGNoKHRoaXMuZXN0YWJsaXNoVHlwZShzaGFkZXIpKXtcclxuXHRcdFx0Y2FzZSBQYWxldHRlLlNoYWRlckZhY3RvcnkuU09VUkNFX09CSkVDVDpcclxuXHRcdFx0XHRpblNoYWRlciA9IHNoYWRlcjtcclxuXHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXHJcblx0XHRcdGNhc2UgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LkpTT046XHJcblx0XHRcdFx0aW5TaGFkZXIgPSBpblNoYWRlciB8fCBKU09OLnBhcnNlKHNoYWRlcik7XHJcblx0XHRcdFx0b3V0U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXJPYmplY3QoaW5TaGFkZXIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBQYWxldHRlLlNoYWRlckZhY3RvcnkuU0hBREVSX09CSkVDVDpcclxuXHRcdFx0XHRvdXRTaGFkZXIgPSBzaGFkZXI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFBhbGV0dGUuU2hhZGVyRmFjdG9yeS5VUkw6XHJcblx0XHRcdFx0dGhpcy5kb3dubG9hZEZyb21VUkwoc2hhZGVyKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSB2YWxpZCB0eXBlIG9mIHNoYWRlci5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly93aGlsZSh0aGlzLmRvd25sb2FkSW5Qcm9ncmVzcyl7fVxyXG5cclxuXHRcdGlmKG91dFNoYWRlcil7dGhpcy5yZWdpc3RlclNoYWRlcihvdXRTaGFkZXIpO31cclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQqIENyZWF0ZSBhIHNoYWRlciBmcm9tIGEgc291cmNlIG9iamVjdC5cclxuXHQqIEBtZXRob2QgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5I2NyZWF0ZVNoYWRlck9iamVjdFxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHBhcmFtIHtvYmplY3R9IHNvdXJjZU9iamVjdCAtIEVpdGhlciBhIGxpc3Qgb2Ygc2hhZGVycyBvciBhIHNpbmdsZSBzaGFkZXIgb2JqZWN0IGlzIHZhbGlkLlxyXG5cdCogQHJldHVybiB7UGFsZXR0ZS5TaGFkZXJ8bnVsbH0gUmV0dXJucyBhIHtAbGluayBQYWxldHRlLlNoYWRlcn0gaWYgdGhlIFNvdXJjZSBPYmplY3Qgd2FzIG5vdCBhIGxpc3QuIElmIGl0IHdhcyBhIGxpc3QsIGl0IGFkZHMgYWxsIHRoZSBjaGlsZHJlbiBpbnN0ZWFkLlxyXG5cdCovXHJcblx0Y3JlYXRlU2hhZGVyT2JqZWN0OiBmdW5jdGlvbihzb3VyY2VPYmplY3Qpe1xyXG5cdFx0c3dpdGNoKHNvdXJjZU9iamVjdC50eXBlKXtcclxuXHRcdFx0Y2FzZSBQYWxldHRlLlNoYWRlci5WUzpcclxuXHRcdFx0Y2FzZSBQYWxldHRlLlNoYWRlci5GUzpcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFBhbGV0dGUuU2hhZGVyKHRoaXMubWFuYWdlci5jb250ZXh0LCBzb3VyY2VPYmplY3QubmFtZSwgc291cmNlT2JqZWN0LnR5cGUsIHNvdXJjZU9iamVjdC5zcmMsIHNvdXJjZU9iamVjdC5hdHRycyk7XHJcblxyXG5cdFx0XHRjYXNlIFBhbGV0dGUuU2hhZGVyLkxJU1Q6XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IHNvdXJjZU9iamVjdC5jb250ZW50Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZFNoYWRlcihzb3VyY2VPYmplY3QuY29udGVudFtpXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUcmllZCB0byBjcmVhdGUgYW4gaWxsZWdhbCBjbGFzcyBvZiBzaGFkZXIuXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogRG93bmxvYWQgYSBmaWxlIGZyb20gdGhlIHN1cHBsaWVkIFVSTCwgYmVmb3JlIGFkZGluZyBpdCB0byB0aGUgbWFuYWdlci5cclxuXHQqIEBtZXRob2QgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5I2Rvd25sb2FkRnJvbVVSTFxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVSTCBjb3JyZXNwb25kaW5nIHRvIGEgU2hhZGVyIFNvdXJjZSBPYmplY3QgSlNPTiBmaWxlLlxyXG5cdCovXHJcblx0ZG93bmxvYWRGcm9tVVJMOiBmdW5jdGlvbih1cmwpe1xyXG5cdFx0dmFyIHJkciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0cmRyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcclxuXHRcdHJkci5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGF0KVxyXG5cdFx0XHR0aGF0LmFkZFNoYWRlcihyZHIucmVzcG9uc2UpO1xyXG5cdFx0XHR0aGF0LmRvd25sb2FkSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0fTtcclxuXHRcdHRoYXQuZG93bmxvYWRJblByb2dyZXNzID0gdHJ1ZTtcclxuXHRcdHJkci5zZW5kKCk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBEZXRlcm1pbmUgdGhlIHR5cGUgb2Ygc2hhZGVyIHJlZmVyZW5jZSBwYXNzZWQgdG8gdGhlIGZhY3RvcnkuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuU2hhZGVyRmFjdG9yeSNlc3RhYmxpc2hUeXBlXHJcblx0KiBAcHJvdGVjdGVkXHJcblx0KiBAcGFyYW0ge3N0cmluZ3xQYWxldHRlLlNoYWRlcn0gc2hhZGVyIC0gVVJMLCBKU09OIG9yIFBhbGV0dGUuU2hhZGVyLlxyXG5cdCogQHJldHVybiB7bnVtYmVyfSBFaXRoZXIgUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LlNPVVJDRV9PQkpFQ1QsIC5KU09OLCAuVVJMIG9yIC5TSEFERVJfT0JKRUNULlxyXG5cdCovXHJcblx0ZXN0YWJsaXNoVHlwZTogZnVuY3Rpb24oc2hhZGVyKXtcclxuXHRcdHZhciB0eXBlID0gLTE7XHJcblx0XHRpZihzaGFkZXIgaW5zdGFuY2VvZiBQYWxldHRlLlNoYWRlcil7XHJcblx0XHRcdHR5cGUgPSBQYWxldHRlLlNoYWRlckZhY3RvcnkuU0hBREVSX09CSkVDVDtcclxuXHRcdH0gZWxzZSBpZigoc2hhZGVyLnR5cGUgIT0gdW5kZWZpbmVkKSAmJiAoc2hhZGVyLm5hbWUgIT0gdW5kZWZpbmVkKSAmJiAoc2hhZGVyLmNvbnRlbnQgfHwgc2hhZGVyLnNyYykpe1xyXG5cdFx0XHR0eXBlID0gUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LlNPVVJDRV9PQkpFQ1Q7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5pc0pTT04oc2hhZGVyKSl7XHJcblx0XHRcdHR5cGUgPSBQYWxldHRlLlNoYWRlckZhY3RvcnkuSlNPTjtcclxuXHRcdH0gZWxzZSBpZih0aGlzLmlzU3RyaW5nKHNoYWRlcikpe1xyXG5cdFx0XHR0eXBlID0gUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LlVSTDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0eXBlO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCogRGV0ZXJtaW5lIGlmIGEgc3RyaW5nIGlzIHZhbGlkIEpTT04uXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuU2hhZGVyRmFjdG9yeSNpc0pTT05cclxuXHQqIEBwcml2YXRlXHJcblx0KiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gU3VzcGVjdGVkIEpTT04gc3RyaW5nIHRvIGNoZWNrLlxyXG5cdCovXHJcblx0aXNKU09OOiBmdW5jdGlvbihzdHIpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRKU09OLnBhcnNlKHN0cik7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBjYXRjaCAoZSl7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRpc1N0cmluZzogZnVuY3Rpb24ocyl7XHJcbiAgICBcdHJldHVybiB0eXBlb2YocykgPT09ICdzdHJpbmcnIHx8IHMgaW5zdGFuY2VvZiBTdHJpbmc7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0KiBBZGQgYSBzaGFkZXIgZGlyZWN0bHkgaW50byB0aGUgbWFuYWdlcidzIHN0b3JhZ2UgZm9yIGZ1dHVyZSBhY2Nlc3MuXHJcblx0KiBAbWV0aG9kIFBhbGV0dGUuU2hhZGVyRmFjdG9yeSNyZWdpc3RlclNoYWRlclxyXG5cdCogQHByb3RlY3RlZFxyXG5cdCogQHBhcmFtIHtQYWxldHRlLlNoYWRlcn0gc2hhZGVyT2JqZWN0IC0gQ29tcGlsZWQgc2hhZGVyIG9iamVjdCB0byBzdG9yZSBpbiB0aGUge0BsaW5rIFBhbGV0dGUuTWFuYWdlcn0uXHJcblx0Ki9cclxuXHRyZWdpc3RlclNoYWRlcjogZnVuY3Rpb24oc2hhZGVyT2JqZWN0KXtcclxuXHRcdHN3aXRjaChzaGFkZXJPYmplY3QudHlwZSl7XHJcblx0XHRcdGNhc2UgUGFsZXR0ZS5TaGFkZXIuVlM6XHJcblx0XHRcdFx0dGhpcy5tYW5hZ2VyLnZlcnRTaGFkZXJzW3NoYWRlck9iamVjdC5uYW1lXSA9IHRoaXMubWFuYWdlci52ZXJ0U2hhZGVyc1tzaGFkZXJPYmplY3QubmFtZV0gfHwgc2hhZGVyT2JqZWN0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFBhbGV0dGUuU2hhZGVyLkZTOlxyXG5cdFx0XHRcdHRoaXMubWFuYWdlci5mcmFnU2hhZGVyc1tzaGFkZXJPYmplY3QubmFtZV0gPSB0aGlzLm1hbmFnZXIuZnJhZ1NoYWRlcnNbc2hhZGVyT2JqZWN0Lm5hbWVdIHx8IHNoYWRlck9iamVjdDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUcmllZCB0byByZWdpc3RlciBhbiBpbGxlZ2FsIGNsYXNzIG9mIHNoYWRlci5cIik7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LlNPVVJDRV9PQkpFQ1RcdD0gMDtcclxuUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LkpTT05cdFx0XHQ9IDE7XHJcblBhbGV0dGUuU2hhZGVyRmFjdG9yeS5VUkxcdFx0XHRcdD0gMjtcclxuUGFsZXR0ZS5TaGFkZXJGYWN0b3J5LlNIQURFUl9PQkpFQ1RcdD0gMztcclxuXHJcblBhbGV0dGUuU2hhZGVyRmFjdG9yeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYWxldHRlLlNoYWRlckZhY3Rvcnk7Il19

/**
 * @namespace Sketch
 */
var Sketch = Sketch || {};
