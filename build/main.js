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

var MVM = function(glctx, manager) {

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

	this.opCodes = {
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
		LNDRAW: 21
	};

	this.glctx = glctx;
	this.manager = manager;

	this.interpret = function(debugMode, codeStore) {

		// Loop Counter - For debugging
		var lc = 0;

		// Points to the next instruction in the code store to execute
		var cp = 0;

		// Points to the first free location after the program
		var cl = codeStore.length;

		// Data store (Stack)
		var dataStore = [];

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

									//	37

		var opCodes = this.opCodes;
		while (cp < cl) {
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
					dataStore[fp + localAddress] = dataStore[sp];
					sp++;
					if(debugMode) console.log("STOREL: " + dataStore[sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADL:
					var localAddress = codeStore[cp];
					cp++;
					dataStore[sp] = dataStore[fp + localAddress];
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
					while(i >= 0) {
						i--;
						dataStore[sp] = arg[i];
						sp++;
					}
					break;
				case opCodes.RETURN:
					var shouldReturnValue = codeStore[cp];
					var returnValue;
					if (shouldReturnValue) {
						returnValue = dataStore[sp - 1]
					}
					var returnAddress = dataStore[fp + RA];
					cp = returnAddress;
					sp = fp;
					fp = dataStore[fp + DLA];
					dataStore[sp] = returnValue;
					sp++;
				case opCodes.LNDRAW:
					this.glctx.clearColor(0.0,0.0,0.0,1.0);
					this.glctx.clear(this.glctx.COLOR_BUFFER_BIT|this.glctx.DEPTH_BUFFER_BIT);
					var theLine = new Float32Array([-0.5,-0.5,0,
													0.5,0.5,0]);
					var prog = this.manager.getProgram("square", "square");
					prog.setDrawMode(Palette.Program.LINES);
					prog.draw(theLine, {}, {color: [Math.random(),Math.random(),Math.random(),1.0]});
				case 999: // Print top of stack
					//if(debugMode) console.log(dataStore[sp - 1]);
					break;
			}
			lc++;
			if (lc > 100000) {console.log("INF LOOP");break};
		}
	}
}
/**
* @namespace Palette
*/
var Palette = Palette || {};

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
/**
 * @namespace Sketch
 */
var Sketch = Sketch || {};
