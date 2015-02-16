%token IDENTIFIER DIGIT 

%token BOOL BREAK CASE  CONTINUE DEFAULT DO ELSE ELSE_IF FALSE FLOAT FOR FUNCTION IF IMPORT NUM NOT NULL RETURN STRING SWITCH TRY VOID WHILE 
%token VECTOR_2 VECTOR_3 VECTOR_4

%token HASHTAG OPEN_BRACE CLOSE_BRACE OPEN_BRACKET CLOSE_BRACKET OPEN_PARENS CLOSE_PARENS COMMA COLON SEMICOLON ASSIGN PLUS MINUS STAR DIV PERCENT
%token AMP BITWISE_OR CARET EXCL TILDE ASSIGN LT GT OP_INC OP_DEC OP_AND OP_OR  OP_EQ OP_NE OP_LE OP_GE OP_ADD_ASSIGNMENT OP_SUB_ASSIGNMENT
%token OP_MULT_ASSIGNMENT OP_DIV_ASSIGNMENT OP_MOD_ASSIGNMENT OP_AND_ASSIGNMNET OP_OR_ASSIGNMENT OP_XOR_ASSIGNMNET OP_LEFT_SHIFT OP_RIGHT_SHIFT
%token OP_LEFT_SHIFT_ASSIGNMENT OP_RIGHT_SHIFT_ASSIGNMENT ZERO_FILL_RIGHT_SHIFT RETURN_TYPE


%token EOF
/* operator associations and precedence */
/*to be added*/

%start compilationUnit

%%
compilationUnit
    : compilation-unit EOF
        {   
            return {
                "node": "CompilationUnit1",
                "unicode": "1231"
            };
        }
    
    ;
 
PROGRAM
	: include* (out-decl|seq_statement)* EOF 
	; 


include
	: HASHTAG IMPORT IDENTIFIER 
	; 

out-decl
	: FUNCTION IDENTIFIER OPEN_PARENS formal CLOSE_PARENS (RETURN_TYPE type )? OPEN_BRACKET seq_statement CLOSE_BRACKET
	;

formal 
	: (type COLON IDENTIFIER COMMA)* type COLON IDENTIFIER
	| VOID 
	;

in-decl
	: TYPE COLON IDENTIFIER 
	| TYPE COLON IDENTIFIER ASSIGN expr
	;

seq-statement
	: (statement)*
	;

statement
	: dir-statement (SEMICOLON)? 
	| flow-statement
	;

dir-statement
	: IDENTIFIER ASSIGN expr
	| RETURN expr
	| BREAK
	| CONTINUE
	| in-decl
	| expr
	;

flow-statement
	: while-statement 
	| for-statement 
	| do-while_statemnt 
	| if-statement 
	| switch-statement
	;

while-statement
	: WHILE OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET
	;

do-while_statemnt
	: DO OPEN_BRACKET seq_statement CLOSE_BRACKET WHILE OPEN_PARENS expr CLOSE_PARENS
	;

for-statement
	: FOR OPEN_PARENS expr SEMICOLON expr SEMICOLON epxr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET
	;

if-statement
	: IF OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET
	| IF OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET ELSE seq_statement
	| IF OPEN PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET ELSE if-statement
	; 

switch_statement
	: SWITCH OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET (switch_case COLON seq_statement)* CLOSE_BRACKET
	;

switch_case
	: CASE expr 
	| DEFAULT 
	; 	

expr
	: sec_expr
	;

sec_expr
	:prim_expr
	| prim_expr PLUS sec_expr
	| prim_expr MINUS sec_expr
	| prim_expr STAR  sec_expr
	| prim_expr DIVE sec_expr
	| prim_expr PERCENT sec_expr
	| prim_expr OP_ADD_ASSIGNMENT sec_expr
	| prim_expr OP_SUB_ASSIGNMENT sec_expr
	| prim_expr OP_MULT_ASSIGNMENT sec_expr
	| prim_expr OP_DIV_ASSIGNMENT sec_expr
	| prim_expr OP_MOD_ASSIGNMENT sec_expr
	| prim_expr OP_INC
	| prim_expr OP_DEC
	| prim_expr OP_AND sec_expr
	| prim_expr OP_OR  sec_expr
	| prim_expr CARET  sec_expr
	| prim_expr AMP   sec_expr
	| prim_expr BITWISE_OR sec_expr
	| prim_expr OP_RIGHT_SHIFT sec_expr
	| prim_expr OP_LEFT_SHIFT sec_expr
	| prim_expr ZERO_FILL_RIGHT_SHIFT sec_expr
	| prim_expr OP_EQ sec_expr
	| prim_expr LT sec_expr
	| prim_expr GT	sec_expr
	| prim_expr OP_NE sec_expr
	| prim_expr OP_LE sec_expr
	| prim_expr OP_GE sec_expr
	; 

prim_expr
	: IDENTIFIER
	| DIGIT 
	| TRUE 
	| FALSE
	| NOT prim_expr 
	| OPEN_PARENS expr CLOSE_PARENS
;
	
type
	: BOOL
	| NUM
	| FLOAT 
	| POINT 
	| STRING
	| VECTOR_2
	| VECTOR_3
	| VECTOR_4
;
