%token IDENTIFIER DIGIT 

%token BOOL BREAK CASE  CONTINUE DEFAULT DO ELSE ELSE_IF FALSE FLOAT FOR FUNCTION IF IMPORT NUM NOT NULL RETURN STRING SWITCH TRY VOID WHILE 
%token VECTOR_2 VECTOR_3 VECTOR_4

%token HASHTAG OPEN_BRACE CLOSE_BRACE OPEN_BRACKET CLOSE_BRACKET OPEN_PARENS CLOSE_PARENS COMMA COLON SEMICOLON ASSIGN PLUS MINUS STAR DIV PERCENT
%token AMP BITWISE_OR CARET EXCL TILDE ASSIGN LT GT OP_INC OP_DEC OP_AND OP_OR  OP_EQ OP_NE OP_LE OP_GE OP_ADD_ASSIGNMENT OP_SUB_ASSIGNMENT
%token OP_MULT_ASSIGNMENT OP_DIV_ASSIGNMENT OP_MOD_ASSIGNMENT OP_AND_ASSIGNMNET OP_OR_ASSIGNMENT OP_XOR_ASSIGNMNET OP_LEFT_SHIFT OP_RIGHT_SHIFT
%token OP_LEFT_SHIFT_ASSIGNMENT OP_RIGHT_SHIFT_ASSIGNMENT ZERO_FILL_RIGHT_SHIFT RETURN_TYPE


%token EOF
/* operator associations and precedence */
/*more to be added */
%left PLUS MINUS 
%left STAR DIV 
%left PERCENT 
%left OP_AND OP_OR 



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
    : include* ( out-decl | seq_statement )* EOF 
            {$$ = {
                type: 'program',
                arguments:[
                $1, 
                $3,
                $5
                ]
            };
        }
    ; 


include
    : HASHTAG IMPORT IDENTIFIER 
            {$$ = { 
            type: 'include',
            arguments: [
                $1, 
                $2, 
                $3]
            };
        }
    ; 

out-decl
    : FUNCTION IDENTIFIER OPEN_PARENS formal CLOSE_PARENS (RETURN_TYPE type )? OPEN_BRACKET seq_statement CLOSE_BRACKET
                    {$$ = { 
                        type: 'out-decl',
                        arguments: [ 
                            $2, 
                            $4,
                            $7,
                            $9]
                            };
                    }
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
                {$$ = { 
                        type: 'assign'
                        arguments: [
                            $3;]
                      };
                }

    | RETURN expr
                {$$ =  $2;}

    | BREAK
    | CONTINUE

    | in-decl
                {$$ =  $1;}

    | expr
                {$$ = $1;}
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
        {$$ = { 
                type: 'while-loop',
                arguments:[
                    $3,
                    $6]
                };
        }
    ;

do-while_statemnt
    : DO OPEN_BRACKET seq_statement CLOSE_BRACKET WHILE OPEN_PARENS expr CLOSE_PARENS
       {$$ = { 
                type: 'do-while',
                 arguments:[
                   $3,
                   $7]
               };
        }
        ;

for-statement
    : FOR OPEN_PARENS expr SEMICOLON expr SEMICOLON epxr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET
        {$$ = {
                type: "for-loop",
                arguments: [ 
                    $3,
                    $5,
                    $7,
                    $10]
              };
        }
    ;

if-statement
    : IF OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET
        {$$ = { 
                type: 'if-statment',
                arguments: [ 
                    $3,
                    $6]
               };
        }

    | IF OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET ELSE seq_statement
        {$$ = {
                type: 'if-else',
                arguments: [
                    $3,
                    $6,
                    $9]
              };
        }

    | IF OPEN PARENS expr CLOSE_PARENS OPEN_BRACKET seq_statement CLOSE_BRACKET ELSE if-statement
        {$$ = {
                type: 'if-else-if',
                arguments: [ 
                    $3,
                    $6,
                    $9]
               };
        }
    ; 
 


switch_statement
    : SWITCH OPEN_PARENS expr CLOSE_PARENS OPEN_BRACKET (CASE expr COLON seq_statement)* (DEFAULT seq_statement)* CLOSE_BRACKET
        {$$ = { 
                type: 'switch',
                arguments: [ 
                $3,
                $7,
                $9,
                $11]
               };
        }
    ;



expr
    : sec_expr 
                {return $1;}
    ;

sec_expr
    :prim_expr  
                {$$ =  $1;}
    | prim_expr PLUS sec_expr   
                {$$ = {
                        type: 'addition',
                        arguments: [ 
                            $1,
                            $3]
                        }; 
                }

    | prim_expr MINUS sec_expr  
                {$$ = { 
                        type: 'minus',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr STAR  sec_expr  
                   {$$ = { 
                        type: 'multiplication',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr DIV sec_expr    
                   {$$ = { 
                        type: 'division',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr PERCENT sec_expr 
                   {$$ = { 
                        type: 'modulo',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_ADD_ASSIGNMENT sec_expr 
                   {$$ = { 
                        type: 'add_assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_SUB_ASSIGNMENT sec_expr 
                   {$$ = { 
                        type: 'sub_assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MULT_ASSIGNMENT sec_expr
                   {$$ = { 
                        type: 'multi_assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_DIV_ASSIGNMENT sec_expr 
                   {$$ = { 
                        type: 'div_assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MOD_ASSIGNMENT sec_expr 
                   {$$ = { 
                        type: 'mod_assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_INC  
                   {$$ = { 
                        type: 'increments',
                        arguments:[
                            $1]
                       };
                }

    | prim_expr OP_DEC  
                   {$$ = { 
                        type: 'decrement',
                        arguments:[
                            $1]
                       };
                }

    | prim_expr OP_AND sec_expr 
                   {$$ = { 
                        type: 'and',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_OR  sec_expr 
                   {$$ = { 
                        type: 'or',
                        arguments:[
                            $1, 
                            $3]
                       };
                }
    | prim_expr CARET  sec_expr 
                   {$$ = { 
                        type: 'bit-XOR',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr AMP   sec_expr 
                   {$$ = { 
                        type: 'bit-AND',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr BITWISE_OR sec_expr 
                   {$$ = { 
                        type: 'bit-OR',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_RIGHT_SHIFT sec_expr 
                   {$$ = { 
                        type: 'bit-right-shift',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_LEFT_SHIFT sec_expr 
                   {$$ = { 
                        type: 'bit-left-shift',
                        arguments:[
                            $1, 
                            $3]
                       };
                }
    | prim_expr ZERO_FILL_RIGHT_SHIFT sec_expr 
                   {$$ = { 
                        type: 'zero-fill-right-shift',
                        arguments:[
                            $1, 
                            $3]
                       };
                }
    | prim_expr OP_EQ sec_expr 
                  {$$ = { 
                        type: 'equality',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr LT sec_expr 
                   {$$ = { 
                        type: 'less-than',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr GT  sec_expr
                   {$$ = { 
                        type: 'larger-than',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_NE sec_expr
                   {$$ = { 
                        type: 'not-equal',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_LE sec_expr
                   {$$ = { 
                        type: 'less-than-or-equal ',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_GE sec_expr
                   {$$ = { 
                        type: 'greater-than-or-equal' ,
                        arguments:[
                            $1, 
                            $3]
                       };
                }
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
