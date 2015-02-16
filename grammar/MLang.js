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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o};
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilationUnit":3,"compilation-unit":4,"EOF":5,"PROGRAM":6,"include":7,"out-decl":8,"seq_statement":9,"HASHTAG":10,"IMPORT":11,"IDENTIFIER":12,"FUNCTION":13,"OPEN_PARENS":14,"formal":15,"CLOSE_PARENS":16,"RETURN_TYPE":17,"type":18,"OPEN_BRACKET":19,"CLOSE_BRACKET":20,"COLON":21,"COMMA":22,"VOID":23,"in-decl":24,"TYPE":25,"ASSIGN":26,"expr":27,"seq-statement":28,"statement":29,"dir-statement":30,"SEMICOLON":31,"flow-statement":32,"RETURN":33,"BREAK":34,"CONTINUE":35,"while-statement":36,"for-statement":37,"do-while_statemnt":38,"if-statement":39,"switch-statement":40,"WHILE":41,"DO":42,"FOR":43,"epxr":44,"IF":45,"ELSE":46,"OPEN":47,"PARENS":48,"switch_statement":49,"SWITCH":50,"switch_case":51,"CASE":52,"DEFAULT":53,"sec_expr":54,"prim_expr":55,"PLUS":56,"MINUS":57,"STAR":58,"DIV":59,"PERCENT":60,"OP_ADD_ASSIGNMENT":61,"OP_SUB_ASSIGNMENT":62,"OP_MULT_ASSIGNMENT":63,"OP_DIV_ASSIGNMENT":64,"OP_MOD_ASSIGNMENT":65,"OP_INC":66,"OP_DEC":67,"OP_AND":68,"OP_OR":69,"CARET":70,"AMP":71,"BITWISE_OR":72,"OP_RIGHT_SHIFT":73,"OP_LEFT_SHIFT":74,"ZERO_FILL_RIGHT_SHIFT":75,"OP_EQ":76,"LT":77,"GT":78,"OP_NE":79,"OP_LE":80,"OP_GE":81,"DIGIT":82,"TRUE":83,"FALSE":84,"NOT":85,"BOOL":86,"NUM":87,"FLOAT":88,"POINT":89,"STRING":90,"VECTOR_2":91,"VECTOR_3":92,"VECTOR_4":93,"$accept":0,"$end":1},
terminals_: {2:"error",4:"compilation-unit",5:"EOF",9:"seq_statement",10:"HASHTAG",11:"IMPORT",12:"IDENTIFIER",13:"FUNCTION",14:"OPEN_PARENS",16:"CLOSE_PARENS",17:"RETURN_TYPE",19:"OPEN_BRACKET",20:"CLOSE_BRACKET",21:"COLON",22:"COMMA",23:"VOID",25:"TYPE",26:"ASSIGN",31:"SEMICOLON",33:"RETURN",34:"BREAK",35:"CONTINUE",40:"switch-statement",41:"WHILE",42:"DO",43:"FOR",44:"epxr",45:"IF",46:"ELSE",47:"OPEN",48:"PARENS",50:"SWITCH",52:"CASE",53:"DEFAULT",56:"PLUS",57:"MINUS",58:"STAR",59:"DIV",60:"PERCENT",61:"OP_ADD_ASSIGNMENT",62:"OP_SUB_ASSIGNMENT",63:"OP_MULT_ASSIGNMENT",64:"OP_DIV_ASSIGNMENT",65:"OP_MOD_ASSIGNMENT",66:"OP_INC",67:"OP_DEC",68:"OP_AND",69:"OP_OR",70:"CARET",71:"AMP",72:"BITWISE_OR",73:"OP_RIGHT_SHIFT",74:"OP_LEFT_SHIFT",75:"ZERO_FILL_RIGHT_SHIFT",76:"OP_EQ",77:"LT",78:"GT",79:"OP_NE",80:"OP_LE",81:"OP_GE",82:"DIGIT",83:"TRUE",84:"FALSE",85:"NOT",86:"BOOL",87:"NUM",88:"FLOAT",89:"POINT",90:"STRING",91:"VECTOR_2",92:"VECTOR_3",93:"VECTOR_4"},
productions_: [0,[3,2],[6,2],[6,2],[7,3],[8,10],[15,7],[15,1],[24,3],[24,5],[28,1],[29,2],[29,1],[30,3],[30,2],[30,1],[30,1],[30,1],[30,1],[32,1],[32,1],[32,1],[32,1],[32,1],[36,7],[38,8],[37,11],[39,7],[39,9],[39,10],[49,9],[51,2],[51,1],[27,1],[54,1],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,2],[54,2],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[55,1],[55,1],[55,1],[55,1],[55,2],[55,3],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1],[18,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
   
            return {
                "node": "CompilationUnit1",
                "unicode": "1231"
            };
        
break;
case 33:
return $$[$0];
break;
case 34:
this.$ =  $$[$0];
break;
case 35:
this.$ = $$[$0-2] + $$[$0]; 
break;
case 36:
 this.$ = $$[$0-2] - $$[$0];
break;
case 37:
this.$ =  $$[$0-2] * $$[$0];
break;
case 38:
this.$ =  $$[$0-2] / $$[$0];
break;
case 39:
 this.$ = $$[$0-2] % $$[$0];
break;
case 40:
$$[$0-2] = $$[$0-2] + $$[$0];
break;
case 41:
$$[$0-2] = $$[$0-2] - $$[$0];
break;
case 42:
$$[$0-2] = $$[$0-2] * $$[$0];
break;
case 43:
$$[$0-2] = $$[$0-2] / $$[$0];
break;
case 44:
$$[$0-2] = $$[$0-2] % $$[$0];
break;
case 45:
$$[$0-1]= $$[$0-1] + 1;
break;
case 46:
$$[$0-1] = $$[$0-1] -1;
break;
case 47:
this.$ = $$[$0-2] && $$[$0];
break;
case 48:
this.$ = $$[$0-2] || $$[$0];
break;
case 49:
this.$ = $$[$0-2] ^ $$[$0];
break;
case 50:
this.$ = $$[$0-2] & $$[$0];
break;
case 51:
this.$ = $$[$0-2] | $$[$0]; 
break;
case 52:
 this.$ = $$[$0-2] >> $$[$0]; 
break;
case 53:
this.$ = $$[$0-2] << $$[$0]; 
break;
case 54:
this.$ = $$[$0-2] >>> $$[$0];
break;
case 55:
 this.$ = $$[$0-2] == $$[$0];
break;
case 56:
this.$ = $$[$0-2] < $$[$0]; 
break;
case 57:
this.$= $$[$0-2] > $$[$0];
break;
case 58:
this.$ = ($$[$0-2] <$$[$0]) || ($$[$0-2]>$$[$0]);
break;
case 59:
this.$ = $$[$0-2] <= $$[$0];
break;
case 60:
this.$ = $$[$0-2] >= $$[$0];
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{1:[2,1]}],
defaultActions: {3:[2,1]},
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