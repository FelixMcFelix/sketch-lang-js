
/*Parser for Sketch graphics programming language*/

/* Author: Kris Dimitrov */

/* lexical grammar */
%lex
%%

\s+                                    /* skip whitespace */
"//".*                                 /* ignore comment */
"#".*                                  /* ignore comment */

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
"Line"                                 return 'LINE';
"int"                                  return 'INT';
"not"                                  return 'NOT';
"null"                                 return 'NULL';
"Point"                                return 'POINT';
"Polygon"                              return 'POLYGON';
"return"                               return 'RETURN';
"true"                                 return 'TRUE';
"void"                                 return 'VOID';
"while"                                return 'WHILE';



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
"*"                        return 'MULT';
"/="                       return 'OP_DIV_ASSIGNMENT';
"/"                        return 'DIV';
"%="                       return 'OP_MOD_ASSIGNMENT';
"%"                        return 'MODULO';
"&&"                       return 'OP_AND';
"||"                       return 'OP_OR';
"?="                       return 'OP_EQ';
"?<"                       return 'LT';
"?>"                       return 'GT';
"!="                       return 'OP_NE';
"!>"                       return 'OP_LE';
"!<"                       return 'OP_GE';
"!"                        return 'EXCL';
<<EOF>>                    return 'EOF';


 
[0-9]+("."[0-9]*)?        return 'NUMBER';
[a-zA-Z_]+[a-zA-Z0-9_]*   return 'IDENTIFIER';



/lex


/* operator associations and precedence */

%left PLUS MINUS
%left MULT DIV
%right '!'
%right '%'
%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE


%start start

%%
start 
 : program EOF
    {
           {typeof console !== 'undefined' ? console.log("%j",$1) : print($1);
          return $1;
           }
        }
  | EOF 
   {return [];} 
; 
program 
   : declarations 
   | program declarations 
    {$$ = [$1,$2];}
; 

declarations
   : out-decl 
   | in-decl 
   | statement

; 

out-decl
  :FUNCTION declarator declaration_list func_return body 
   {$$ = {type: "function",
          arguments: [$2,$3,$4,$5]};}

  ;

in-decl 
  : param ASSIGN exp semi
   { $$ = { type: 'variable-decl-assign',
           arguments: [ $1,$3]};}
  | param semi 
     {$$ = {
          type: 'variable-decl',
          arguments: $1};
    }
;
func_return  
  : RETURN_TYPE type
     {$$ = $2;}
  |
    {$$ = "void";}
;

 declaration_list 
  : OPEN_PARENS CLOSE_PARENS
      {$$ = "";} 
  | OPEN_PARENS param_list CLOSE_PARENS
      {$$ = $2;}
  ;

param_list
  : param 
      {$$ = $1;}
  | param_list COMMA param
       {$$= [$1,$3];} 
 ;

 param 
   : type declarator
       {$$ = [$1, $2];} 
 ; 

body
  : OPEN_BRACE CLOSE_BRACE
      { $$ = "";}
  | OPEN_BRACE statement_list CLOSE_BRACE
     {$$ = $2;}
  | OPEN_BRACE decl_list CLOSE_BRACE
       {$$ = $2;}
  | OPEN_BRACE decl_list statement_list CLOSE_BRACE
         {$$= [$2,$3];} 
;

statement
  : exp semi
  | body
  | function
  | condition_statements
  | iteration_statements
  | jump_statements

;






condition_statements  
  : IF OPEN_PARENS exp CLOSE_PARENS statement %prec IF_WITHOUT_ELSE
       { $$ = { type: "if",
                arguments : [$3,
                             $5]
               };
       }

  | IF OPEN_PARENS exp CLOSE_PARENS statement ELSE statement 
       {$$ = { type : "if-else",
               arguments : [ $3,
                             $5,
                             $7
                           ]
             };
     }
;

iteration_statements  
  : WHILE OPEN_PARENS exp CLOSE_PARENS statement
       {$$ = {type : "while", 
              arguments: [ $3,
                           $4
                         ]
            }; 
     }

  | DO statement WHILE OPEN_PARENS exp CLOSE_PARENS semi
               {$$ = {type : "do-while", 
              arguments: [ $2,
                           $5
                         ]
            }; 
     }
  | FOR OPEN_PARENS in-decl semi exp semi exp CLOSE_PARENS statement
                     {$$ = {type : "for", 
              arguments: [ $3,
                           $5,
                           $7,
                           $9
                         ]
            }; 
     }
;

jump_statements 
  : CONTINUE semi
  | BREAK semi 
  | RETURN exp  semi 
      { $$ = [$1, $2];}
  | RETURN  semi 
;

decl_list
 :in-decl 
 | out-decl 
 | decl_list in-decl
    {$$= [$1,$2];} 
 | decl_list out-decl
    {$$= [$1,$2];} 

;

statement_list 
  : statement
  | statement_list statement
     {$$= [$1,$2];} 
 | statement_list decl_list
  {$$= [$1,$2];} 

;
      

 
  
exp
    :prim_expr
    | exp PLUS exp 
                {$$ = {
                        type: 'addition',
                        arguments: [ 
                            $1,
                            $3]
                        }; 
                }

    | exp MINUS exp
                {$$ = { 
                        type: 'subtraction',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp MULT  exp
                   {$$ = { 
                        type: 'multiplication',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp DIV exp  
                   {$$ = { 
                        type: 'division',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp MODULO exp 
                   {$$ = { 
                        type: 'modulo',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_ADD_ASSIGNMENT exp 
                   {$$ = { 
                        type: 'add-assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_SUB_ASSIGNMENT exp 
                   {$$ = { 
                        type: 'sub-assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MULT_ASSIGNMENT exp
                   {$$ = { 
                        type: 'multi-assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_DIV_ASSIGNMENT exp 
                   {$$ = { 
                        type: 'div-assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MOD_ASSIGNMENT exp 
                   {$$ = { 
                        type: 'mod-assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_INC  
                   {$$ = { 
                        type: 'increment',
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

    | prim_expr OP_AND exp 
                   {$$ = { 
                        type: 'and',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_OR  exp 
                   {$$ = { 
                        type: 'or',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_EQ exp 
                  {$$ = { 
                        type: 'equality',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr LT exp 
                   {$$ = { 
                        type: 'less-than',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr GT  exp
                   {$$ = { 
                        type: 'greater-than',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_NE exp
                   {$$ = { 
                        type: 'not-equal',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_LE exp
                   {$$ = { 
                        type: 'less-than-or-equal ',
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_GE exp
                   {$$ = { 
                        type: 'greater-than-or-equal' ,
                        arguments:[
                            $1, 
                            $3]
                       };
                }
   
     
    | prim_expr ASSIGN exp  
               {$$ = { 
                        type: 'assign',
                        arguments:[
                            $1, 
                            $3]
                       };
                }
      
;

prim_expr
    : IDENTIFIER
          { $$ = {type: 'ident', arguments: yytext};}
    | NUMBER 
          { $$ = {type: 'num', arguments: Number(yytext)};}
    | TRUE 
    | FALSE
    | NOT prim_expr
           {$$ = [$1,$2];}
    | OPEN_PARENS exp CLOSE_PARENS
             { $$ = $2;}
    |  IDENTIFIER OPEN_PARENS init_list CLOSE_PARENS semi
         {$$ = [$1,$3];}
    | OPEN_BRACE init_list CLOSE_BRACE
         { $$ = $2;}
    | OPEN_PARENS init_list CLOSE_PARENS
         { $$ = $2;}
;


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
       {$$ = [$1,$3];}
  ;

 init_list 
   : prim_expr
   | init_list COMMA prim_expr
          {$$ = [$1,$3];}
   |
;

type
   :VOID 
   |INT
   |FLOAT 
   |BOOL
   |POINT
   |LINE
   |POLYGON
;


