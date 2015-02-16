%lex 
%options flex 


/* Documentation Comments */ 
SINGLE_LINE_DOC_COMMENT    		'///'{Input_characters}?
DELIMITIED_DOC_COMMENT     		'/**'{Delimited_comment_text}?{Asterisks}'/'

/*New line char*/
NEW_LINE 				 		[\u000D]|[\u000A]|([\u000D][\u000A])|[\u0085]|[\u2029]

/* Comments */ 
SINGLE_LINE_COMMENT       		[/]{2}{Input_characters}?
Input_characters    	  		{Input_character}+

/*all unicode characters*/
Input_character 		   		[^\u000D\u000A\u0085\u2028\u2029\n]
NEW_LINE_CHARACTER 		   		[\u000D]|[\u000A]|[\u0085]|[\u2028]|[\u2029]|'\n' 

delimited-comment 				'/*' ([*]*)? {delimited-comment-characters}? ([*]*)? '*/'
delimited-comment-characters 	{delimited-comment-character}*
delimited-comment-character     {not-asterisk}|('*' {not-slash} )
not-asterisk                    [^*]
not-slash                       [^/]

/*UNICODE character clases*/
UNICODE_CLASS_Sp				  [\u0020]|[\u00A0]|[\u1680]|[\u180E]|[\u2000]|[\u2001]|[\u2002]|[\u2003]|[\u2004]|[\u2005]|[\u2006]|[\u2008]|[\u2009]|[\u200A]|[\u202F]|[\u3000]|[\u205F]
UNICODE_CLASS_Uc 				 [\u0041-\u005A]   //A- Z 
UNICODE_CLASS_Lc                 [\u0061-\u007A]  //a-z 
UNICODE_CLASS_Nu                 [\u0030]|[\u0031]|[\u0032]|[\u0033]|[\u0034]|[\u0035]|[\u0036]|[\u0037]|[\u0038]|[\u0039]  //0-9
UNICODE_CLASS_Co          		 [\u005F]|[\uFF3F]|[\u2014] //-_


/* White space */
WHITESPACE 					{Whitespace_characters}
Whitespace_characters 		{Whitespace_character}+
Whitespace_characters       {UNICODE_CLASS_Zs}|[\u0009]|[\u000B]|[\u000C]|[\s]


//Template 
IDENTIFIER 				{Letter}({Letter}|{DIGIT}| {Dash})?
Letter					{UNICODE_CLASS_Uc}|{UNICODE_CLASS_Lc}
DIGIT 					{UNICODE_CLASS_Nu}
Dash 					{UNICODE_CLASS_Co}





%%
{WHITESPACE} 							/* skip */
{NEW_LINE_CHARACTER} 					/* skip */
{SINGLE_LINE_COMMENT}					/* skip */
{SINGLE_LINE_DOC_COMMENT}			    /* skip */
{DELIMITED_DOC_COMMENT}			        /* skip */
{NEW_LINE}                              /* skip */
{delimited-comment}                     /* skip */



/* Keywords */
"bool"                                 return 'BOOL';
"break"                                return 'BREAK';
"case"                                 return 'CASE';
"continue"                             return 'CONTINUE';
"default"                              return 'DEFAULT';
"do"                                   return 'DO';
"else"                                 return 'ELSE';
"false"                                return 'FALSE';
"float"                                return 'FLOAT';
"for"                                  return 'FOR';
"function"							   return 'FUNCTION'
"if"                                   return 'IF';
"import" 							   return 'IMPORT';
"num"								   return 'NUM';
"not"								   return 'NOT';
"null"                                 return 'NULL';
"point"								   return 'POINT';
"return"                               return 'RETURN';
"string"                               return 'STRING';
"switch"                               return 'SWITCH';
"true"								   return 'TRUE';
"void"                                 return 'VOID';
"while"                                return 'WHILE';
"vector(2)"							   return 'VECTOR_2';
"vector(3)"							   return 'VECTOR_3';
"vector(4)"							   return 'VECTOR_4';

/* Operators And Punctuators*/
"#"									return 'HASHTAG'
"{" 								return 'OPEN_BRACE';
"}" 								return 'CLOSE_BRACE';
"[" 								return 'OPEN_BRACKET';
"]" 								return 'CLOSE_BRACKET';
"(" 								return 'OPEN_PARENS';
")" 								return 'CLOSE_PARENS';
"," 								return 'COMMA';
":" 								return 'COLON';
";" 								return 'SEMICOLON';
"="									return 'ASSIGN'
"+" 								return 'PLUS';
"-" 								return 'MINUS';
"*" 								return 'STAR';
"/" 								return 'DIV';
"'%'" 								return 'PERCENT';
"&" 								return 'AMP';
"|" 								return 'BITWISE_OR';
"^" 								return 'CARET';
"!" 								return 'EXCL';
"~" 								return 'TILDE';
"=" 								return 'ASSIGN';
"++" 								return 'OP_INC';
"--" 								return 'OP_DEC';
"&&" 								return 'OP_AND';
"||									return 'OP_OR';
"?="								return 'OP_EQ';
"?<" 								return 'LT';
"?>" 								return 'GT';
"!=" 								return 'OP_NE';
"!>" 								return 'OP_LE';
"!<"                                return 'OP_GE';
"+=" 								return 'OP_ADD_ASSIGNMENT';
"-=" 								return 'OP_SUB_ASSIGNMENT';
"*=" 								return 'OP_MULT_ASSIGNMENT';
"/=" 								return 'OP_DIV_ASSIGNMENT';
"'%'=" 								return 'OP_MOD_ASSIGNMENT';
"&=" 								return 'OP_AND_ASSIGNMENT';
"|=" 								return 'OP_OR_ASSIGNMENT';
"^=" 								return 'OP_XOR_ASSIGNMENT';
"<<" 								return 'OP_LEFT_SHIFT';
"<<=" 								return 'OP_LEFT_SHIFT_ASSIGNMENT';
">>" 								return 'OP_RIGHT_SHIFT';
">>=" 								return 'OP_RIGHT_SHIFT_ASSIGNMENT';
">>>"								return 'ZERO_FILL_RIGHT_SHIFT';
"->"								return 'RETURN_TYPE'
<<EOF>> 							return 'EOF';
