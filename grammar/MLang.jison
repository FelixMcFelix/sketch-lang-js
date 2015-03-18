
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                  /* skip whitespace */
"//".*                      /* ignore comment */
"#".*                      /* ignore comment */

"bool"                                 return 'BOOL';
"break"                                return 'BREAK';
"clear"                                return 'CLEAR'; 
"continue"                             return 'CONTINUE';
"do"                                   return 'DO';
"else"                                 return 'ELSE';
"false"                                return 'FALSE';
"float"                                return 'FLOAT';
"for"                                  return 'FOR';
"function"                             return 'FUNCTION'
"if"                                   return 'IF';
"Line"                             return 'LINE';
"int"                                  return 'INT';
"not"                                  return 'NOT';
"null"                                 return 'NULL';
"Point"                                return 'POINT';
"Polygon"                              return 'POLYGON';
"return"                               return 'RETURN';
"String"                               return 'STRING';
"true"                                 return 'TRUE';
"void"                                 return 'VOID';
"while"                                return 'WHILE';
"vector(2)"                            return 'VECTOR_2';
"vector(3)"                            return 'VECTOR_3';
"vector(4)"                            return 'VECTOR_4';


"{"                        return 'OPEN_BRACE';
"}"                        return 'CLOSE_BRACE';
"["                        return 'OPEN_BRACKET';
"]"                        return 'CLOSE_BRACKET';
"("                        return 'OPEN_PARENS';
")"                        return 'CLOSE_PARENS';
","                        return 'COMMA';
":"                        return 'COLON';
";"                        return 'SEMICOLON';
"->"                       return 'RETURN_TYPE';
"="                        return 'ASSIGN';
"+="                       return 'OP_ADD_ASSIGNMENT';
"++"                       return 'OP_INC';
"+"                        return 'PLUS';
"-="                       return 'OP_SUB_ASSIGNMENT';
"--"                       return 'OP_DEC';
"-"                        return 'MINUS';
"*="                       return 'OP_MULT_ASSIGNMENT';
"*"                        return 'ASTERIX';
"/="                       return 'OP_DIV_ASSIGNMENT';
"/"                        return 'DIV';
"%="                       return 'OP_MOD_ASSIGNMENT';
"%"                        return 'MODULO';
"&&"                       return 'OP_AND';
"&="                       return 'OP_AND_ASSIGNMENT';
"&"                        return 'AMP';
"||"                       return 'OP_OR';
"|="                       return 'OP_OR_ASSIGNMENT';
"|"                        return 'BITWISE_OR';
"^="                       return 'OP_XOR_ASSIGNMENT';
"^"                        return 'CARET';
"~"                        return 'TILDE';
"?="                       return 'OP_EQ';
"?<"                       return 'LT';
"?>"                       return 'GT';
"!="                       return 'OP_NE';
"!>"                       return 'OP_LE';
"!<"                       return 'OP_GE';
"!"                        return 'EXCL';
"<<="                      return 'OP_LEFT_SHIFT_ASSIGNMENT';
"<<"                       return 'OP_LEFT_SHIFT';
">>="                      return 'OP_RIGHT_SHIFT_ASSIGNMENT';
">>>"                      return 'ZERO_FILL_RIGHT_SHIFT';
">>"                       return 'OP_RIGHT_SHIFT';
<<EOF>>                    return 'EOF';

\"[^"]+\"                 yytext = yytext.slice(1,-1); return 'STRINGT'
[0-9]+("."[0-9]*)?        return 'DIGIT';
"."[0-9]+                 return 'DIGIT';
[a-zA-Z_]+[a-zA-Z0-9_]*   return 'IDENTIFIER';



/lex


/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS
%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE


%start start

%%
start 
 : program EOF
    {return " blop";}
; 
program 
   : declarations 
   | program declarations 
; 

declarations
   : out-decl 
   | in-decl 
   | statement

; 

out-decl
  :FUNCTION declarator declaration_list func_return body 

  ;

in-decl 
  : type declarator ASSIGN exp semi
;
func_return  
  : RETURN_TYPE type
  |
;

 declaration_list 
  : OPEN_PARENS CLOSE_PARENS
  | OPEN_PARENS param_list CLOSE_PARENS
  ;

param_list
  : param 
  | param_list COMMA param 
 ;

 param 
   : type declarator 
 ; 

body
  : OPEN_BRACE CLOSE_BRACE
  | OPEN_BRACE statement_list CLOSE_BRACE
  | OPEN_BRACE in-decl statement_list CLOSE_BRACE
;

statement
  : exp semi
  | body
  | condition_statements
  | iteration_statements
  | jump_statements
;






condition_statements  
  : IF OPEN_PARENS exp CLOSE_PARENS statement %prec IF_WITHOUT_ELSE
  | IF OPEN_PARENS exp CLOSE_PARENS statement ELSE statement 
;

iteration_statements  
  : WHILE OPEN_PARENS exp CLOSE_PARENS statement
  | DO statement WHILE OPEN_PARENS exp CLOSE_PARENS semi
  | FOR OPEN_PARENS in-decl semi exp semi exp CLOSE_PARENS statement
;

jump_statements 
  : CONTINUE semi
  | BREAK semi 
  | RETURN exp  semi 
  | RETURN  semi 
;


statement_list 
  : statement
  | statement_list statement
 
   
;
list
   : prim_expr 
   | list COMMA prim_expr
   | 
;
point_assign 
  : prim_expr
  | point_assign COMMA prim_expr
;
  
exp
    :prim_expr       
    | prim_expr PLUS exp     
    | prim_expr MINUS exp  
    | prim_expr ASTERIX  exp  
    | prim_expr DIV exp         
    | prim_expr MODULO exp            
    | prim_expr OP_ADD_ASSIGNMENT exp                  
    | prim_expr OP_SUB_ASSIGNMENT exp            
    | prim_expr OP_MULT_ASSIGNMENT exp        
    | prim_expr OP_DIV_ASSIGNMENT exp            
    | prim_expr OP_MOD_ASSIGNMENT exp 
    | prim_expr OP_INC            
    | prim_expr OP_DEC             
    | prim_expr OP_AND exp          
    | prim_expr OP_OR  exp       
    | prim_expr CARET  exp           
    | prim_expr AMP   exp            
    | prim_expr BITWISE_OR exp             
    | prim_expr OP_RIGHT_SHIFT exp              
    | prim_expr OP_LEFT_SHIFT exp         
    | prim_expr ZERO_FILL_RIGHT_SHIFT exp            
    | prim_expr OP_EQ exp              
    | prim_expr LT exp         
    | prim_expr GT  exp           
    | prim_expr OP_NE exp            
    | prim_expr OP_LE exp           
    | prim_expr OP_GE exp          
    | prim_expr ASSIGN exp  
;

prim_expr
    : IDENTIFIER 
    |  DIGIT 
    | TRUE 
    | FALSE
    | STRINGT
    | NOT prim_expr
    | OPEN_PARENS exp CLOSE_PARENS
    |  IDENTIFIER OPEN_PARENS init_list CLOSE_PARENS semi
    | OPEN_BRACE init_list CLOSE_BRACE
    | OPEN_PARENS init_list CLOSE_PARENS;
//not mandatory semicolon 
semi
  : SEMICOLON
  |
;
 declarator 
   :IDENTIFIER
;
declaration 
  : init_list
  | declarator OPEN_PARENS init_list CLOSE_PARENS
  ;

 init_list 
   : prim_expr
   | init_list COMMA prim_expr
   |
;

type
   :VOID 
   |STRING 
   | INT
   | FLOAT 
   |BOOL
   |POINT 
   |VECTOR_2
   |VECTOR_3
   |VECTOR_4
   |LINE
   |POLYGON
;
