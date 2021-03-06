
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
"draw"								                 return 'DRAW';
"continue"                             return 'CONTINUE';
"do"                                   return 'DO';
"else"                                 return 'ELSE';
"false"                                return 'FALSE';
"for"                                  return 'FOR';
"function"                             return 'FUNCTION'
"if"                                   return 'IF';
"line"                                 return 'LINE';
"num"                                  return 'NUM';
"not"                                  return 'NOT';
"null"                                 return 'NULL';
"point"                                return 'POINT';
"polygon"                              return 'POLYGON';
"return"                               return 'RETURN';
"true"                                 return 'TRUE';
"void"                                 return 'VOID';
"while"                                return 'WHILE';
"width"						                     return 'WIDTH';
"height"					                     return 'HEIGHT';



"{"                        return 'OPEN_BRACE';
"}"                        return 'CLOSE_BRACE';
"["                        return 'OPEN_BRACKET';
"]"                        return 'CLOSE_BRACKET';
"("                        return 'OPEN_PARENS';
")"                        return 'CLOSE_PARENS';
","                        return 'COMMA';
":"                        return 'COLON';
";"                        return 'SEMICOLON';
"->"                       return 'ARROW';
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
"~"                        return 'TILDE';
<<EOF>>                    return 'EOF';


 
[0-9]+("."[0-9]*)?        return 'NUMBER';
[a-zA-Z_]+[a-zA-Z0-9_]*   return 'IDENTIFIER';



/lex


/* operator associations and precedence */

/* TODO: Use C precedence for all operators */
%left TILDE

%left PLUS MINUS
%left MULT DIV
%right '!'
%right '%'
%left UNARY
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
   {$$ = {type: Sketch.SketchGenNodes["function"],
          arguments: [$2,$3,$4,$5]};}

  ;

in-decl 
  : param ASSIGN exp semi
   { $$ = { type: Sketch.SketchGenNodes["variable_decl_assign"],
           arguments: [ $1,$3]};}
  | param semi 
     {$$ = {
          type: Sketch.SketchGenNodes["variable_decl"],
          arguments: $1};
    }
;
func_return  
  : ARROW type
     {$$ = $2;}
  |
    {$$ = "void";}
;

 declaration_list 
  : OPEN_PARENS CLOSE_PARENS
      {$$ = [];} 
  | OPEN_PARENS param_list CLOSE_PARENS
      {$$ = $2;}
  ;

param_list
  : param 
      {$$ = [$1];}
  | param_list COMMA param
       {$$= $1; $$.push($3);} 
 ;

 param 
   : type declarator
       {$$ = {type: Sketch.SketchGenNodes["decl"], arguments: [$1, $2]};} 
 ; 

body
  : OPEN_BRACE CLOSE_BRACE
      { $$ = {type: Sketch.SketchGenNodes["block"], arguments: []}; }
  | OPEN_BRACE statement_list CLOSE_BRACE
      { $$ = {type: Sketch.SketchGenNodes["block"], arguments: $2}; }
  | OPEN_BRACE decl_list CLOSE_BRACE
      { $$ = {type: Sketch.SketchGenNodes["block"], arguments: $2}; }
  | OPEN_BRACE decl_list statement_list CLOSE_BRACE
      { $$ = {type: Sketch.SketchGenNodes["block"], arguments: [$2,$3]}; }
;

statement
  : exp semi
  | body
  | function
  | condition_statements
  | iteration_statements
  | jump_statements
  | render_statements
;


render_statements
  : CLEAR semi
    { $$ = {type: Sketch.SketchGenNodes["clear"], arguments: null}; }
  | CLEAR exp semi
    { $$ = {type: Sketch.SketchGenNodes["clear_colour"], arguments: $2}; }
  | DRAW exp semi
    { $$ = {type: Sketch.SketchGenNodes["draw"], arguments: $2}; }
;



condition_statements  
  : IF OPEN_PARENS exp CLOSE_PARENS body else_ifs
    { $$ = {type: Sketch.SketchGenNodes["if"], arguments: [{type: Sketch.SketchGenNodes["else_if"], arguments:[$3, $5]}].concat($6)}; }
;

else_ifs
  : ELSE IF OPEN_PARENS exp CLOSE_PARENS body else_ifs
    {
      $$ = $7; 
      $$.unshift({
        type: Sketch.SketchGenNodes["else_if"],
        arguments: [$4, $6]
      }); 
    }
  | ELSE body
    { $$ = [{type: Sketch.SketchGenNodes["else"], arguments: $2}]; }
  |
    { $$ = []; }
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
               {$$ = {type : "do_while", 
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
      { $$ = {type: Sketch.SketchGenNodes["return"], arguments: $2}; }
  | RETURN  semi 
      { $$ = {type: Sketch.SketchGenNodes["return"], arguments: null}; }
;

decl_list
 : in-decl
 | out-decl 
 | decl_list in-decl
    {$$= [$1,$2];} 
 | decl_list out-decl
    {$$= [$1,$2];} 

;

statement_list 
  : statement
      {$$= [$1]}
  | statement_list statement
      {$$ = $1; $$.push($2);} 
  | statement_list decl_list
      {$$ = $1; $$.push($2);} 

;
      

 
  
exp
    :prim_expr
    | exp PLUS exp 
                {$$ = {
                        type: Sketch.SketchGenNodes["addition"],
                        arguments: [ 
                            $1,
                            $3]
                        }; 
                }

    | exp MINUS exp
                {$$ = { 
                        type: Sketch.SketchGenNodes["subtraction"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp MULT  exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["multiplication"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp DIV exp  
                   {$$ = { 
                        type: Sketch.SketchGenNodes["division"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | exp MODULO exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["modulo"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_ADD_ASSIGNMENT exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["add_assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_SUB_ASSIGNMENT exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["sub_assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MULT_ASSIGNMENT exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["mul_assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_DIV_ASSIGNMENT exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["div_assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_MOD_ASSIGNMENT exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["mod_assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_INC  
                   {$$ = { 
                        type: Sketch.SketchGenNodes["increment"],
                        arguments:[
                            $1]
                       };
                }

    | prim_expr OP_DEC  
                   {$$ = { 
                        type: Sketch.SketchGenNodes["decrement"],
                        arguments:[
                            $1]
                       };
                }

    | prim_expr OP_AND exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["and"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_OR  exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["or"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_EQ exp 
                  {$$ = { 
                        type: Sketch.SketchGenNodes["equal"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr LT exp 
                   {$$ = { 
                        type: Sketch.SketchGenNodes["less_than"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr GT  exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["greater_than"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_NE exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["not_equal"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_LE exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["less_than_or_equal"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }

    | prim_expr OP_GE exp
                   {$$ = { 
                        type: Sketch.SketchGenNodes["greater_than_or_equal"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }
   
     
    | prim_expr ASSIGN exp  
               {$$ = { 
                        type: Sketch.SketchGenNodes["assign"],
                        arguments:[
                            $1, 
                            $3]
                       };
                }
    | exp TILDE exp
                { $$ = {
                    type: Sketch.SketchGenNodes["colour"],
                    arguments: [$1, $3]
                  };
                }
    | exp ARROW exp
                { $$ = {
                    type: Sketch.SketchGenNodes["translate"],
                    arguments: [$1, $3]
                  };
                }
    | MINUS exp %prec UNARY
      { $$ = {type: Sketch.SketchGenNodes["unary_minus"], arguments: $2};
      }
      
;

prim_expr
    : IDENTIFIER
          { $$ = {type: Sketch.SketchGenNodes["ident"], arguments: yytext}; }
    | NUMBER 
          { $$ = {type: Sketch.SketchGenNodes["num"], arguments: Number(yytext)}; }
    | TRUE
          { $$ = {type: Sketch.SketchGenNodes["bool"], arguments: true}; }
    | FALSE
          { $$ = {type: Sketch.SketchGenNodes["bool"], arguments: false}; }
    | EXCL prim_expr
          { $$ = {type: Sketch.SketchGenNodes["negate"], arguments: $2};}
    | OPEN_PARENS exp CLOSE_PARENS
          { $$ = $2;}
    | IDENTIFIER OPEN_PARENS init_list CLOSE_PARENS
          { $$ = { type: Sketch.SketchGenNodes["func_call"], arguments: [$1,$3]}; }
    | OPEN_BRACE init_list CLOSE_BRACE
          { $$ = { type: Sketch.SketchGenNodes["point"], arguments: $2};}
    | OPEN_PARENS init_list CLOSE_PARENS
          { $$ = $2;}
    | WIDTH
          { $$ = { type: Sketch.SketchGenNodes["width"], arguments: null};}
    | HEIGHT
          { $$ = { type: Sketch.SketchGenNodes["height"], arguments: null};}
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
   : exp
      { $$ = [$1]; }
   | init_list COMMA exp
      { $$ = $1; $$.push($3); }
   |
      { $$ = []; }
;

type
   :VOID 
   |NUM
   |BOOL
   |POINT
   |LINE
   |POLYGON
;


