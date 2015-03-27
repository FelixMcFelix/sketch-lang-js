% This example An LaTeX document showing how to use the l3proj class to
% write your report. Use pdflatex and bibtex to process the file, creating 
% a PDF file as output (there is no need to use dvips when using pdflatex).

% Modified 


\documentclass{l3proj}
\usepackage{listings}
\usepackage{subcaption}
\usepackage{wrapfig}
% More listing stuff.
%\usepackage{bera}% optional: just to have a nice mono-spaced font
\usepackage{listings}
\usepackage{xcolor}

\colorlet{punct}{red!60!black}
\definecolor{background}{HTML}{EEEEEE}
\definecolor{delim}{RGB}{20,105,176}
\colorlet{numb}{magenta!60!black}
\definecolor{lightgray}{rgb}{.9,.9,.9}
\definecolor{darkgray}{rgb}{.4,.4,.4}
\definecolor{purple}{rgb}{0.65, 0.12, 0.82}
\lstdefinelanguage{JavaScript}{
  keywords={break, case, catch, continue, debugger, default, delete, do, else, false, finally, for, function, if, in, instanceof, new, null, return, switch, this, throw, true, try, typeof, var, void, while, with},
  morecomment=[l]{//},
  morecomment=[s]{/*}{*/},
  morestring=[b]',
  morestring=[b]",
  ndkeywords={class, export, boolean, throw, implements, import, this},
  keywordstyle=\color{blue}\bfseries,
  ndkeywordstyle=\color{darkgray}\bfseries,
  identifierstyle=\color{black},
  commentstyle=\color{purple}\ttfamily,
  stringstyle=\color{red}\ttfamily,
  sensitive=true
}
\lstdefinelanguage{json}{
    %basicstyle=\normalfont\ttfamily,
    numbers=left,
    numberstyle=\scriptsize,
    stepnumber=1,
    numbersep=8pt,
    showstringspaces=false,
    breaklines=true,
    frame=lines,
    backgroundcolor=\color{background},
    literate=
     *{0}{{{\color{numb}0}}}{1}
      {1}{{{\color{numb}1}}}{1}
      {2}{{{\color{numb}2}}}{1}
      {3}{{{\color{numb}3}}}{1}
      {4}{{{\color{numb}4}}}{1}
      {5}{{{\color{numb}5}}}{1}
      {6}{{{\color{numb}6}}}{1}
      {7}{{{\color{numb}7}}}{1}
      {8}{{{\color{numb}8}}}{1}
      {9}{{{\color{numb}9}}}{1}
      {:}{{{\color{punct}{:}}}}{1}
      {,}{{{\color{punct}{,}}}}{1}
      {\{}{{{\color{delim}{\{}}}}{1}
      {\}}{{{\color{delim}{\}}}}}{1}
      {[}{{{\color{delim}{[}}}}{1}
      {]}{{{\color{delim}{]}}}}{1},
}
% Done
\usepackage{hyperref}
\usepackage{amsfonts}
\setlength\parindent{24pt}
\begin{document}
\title{Design and implement your own programming language}
\author{Kyle Simpson\\
		Kristiyan Dimitrov\\
		Darren Findlay\\
		David Creigh\\
		Gerard Docherty}
\date{27 March 2015}
\maketitle
\begin{abstract}

The abstract goes here

\end{abstract}
\educationalconsent
\tableofcontents
%==============================================================================
\chapter{Introduction}
\label{intro}

\section{Project Outline}

We were lucky enough to be given project number 3924: design and implement your own programming language. This dissertation describes the process we undertook to complete the project, from initial research through specification of the grammar and system architecture, to the implementation of the parser, compiler and abstract machine and beyond.

\section{Motivation}

The past few years have brought computing to the forefront of teaching. Many parents now want their children to learn the basics of coding, and both primary and secondary schools are obliging by placing more and more emphasis on computing science. We have all taken part in a fair amount of coding in a variety of programming languages throughout our university careers, but before this project none of us had ever attempted nor even considered writing a completely new one. Despite the challenge the project presented, we were confident it would be both achievable and rewarding.

\section{Aim}

The aim for this project is to create a graphical programming language that is simple to use and read, and can be picked up by nearly any novice user, but is also powerful, and can be used to create drawings. Our idea for a simple language came from Processing, a graphical language created by Casey Reas and Benjamin Fry, and the basis for the language is going to be WebGL – a browser version of OpenGL. With this project, we want to create a language that follows what we think are useful and intuitive features in the design of most programming languages, for example using {} for functions and loops and keeping the familiar structure of the for and while loops, and making sure our language follows them, while finding what we believe to be confusing or annoying common features of programming languages, like the double equals for the comparison of two objects, and replace them with what we find suitable and more 

\section{WebGL Background}

Web Graphics Library (WebGL) is a JavaScript API, that makes use of the \textless{}canvas\textgreater{} element available in HTML to render interactive 2d/3d graphics. It is a branch of the Open Graphics Library Embedded Systems 2.0 (OpenGL ES 2.0), and is supported by most modern browsers, like Google Chrome and Mozilla Firefox, with no necessary plugin (as it makes use of \textless{}canvas\textgreater{}). A WebGL program consists of control code written in JavaScript, and function code (shader code) that is executed by a computer's GPU. 

\section{Outline of report}

The remaining sections of this report will cover the following topics:
\begin{itemize}
	\item \textbf{Language Tutorial} --- a brief introduction to our programming language, which we have named \textbf{Sketch}.
	\item \textbf{Language Reference Manual} --- Sketch's grammar, and and a description of the language.
	\item \textbf{Project Plan} --- a timeline and basic structure of our project, and what we aimed to acheive from it.
	\item \textbf{Language Evolution} --- the decisions and thought process behind the language syntax and domain, and our reasoning.
	\item \textbf{Compiler Architecture} --- an explanation of the 5 different sections of the compiler module:
	\begin{itemize}
		\item Lexer and Parser
		\item Code Generator
		\item Abstract Machine
		\item Shader Manager
		\item Module Facade
	\end{itemize}
	\item \textbf{Development Environment} --- the environment used by the team to help structure and create this programming language.
	\item \textbf{Test Plan and Test Suites} --- an overview of the language's testing strategy, approaches taken, and any bugs discovered.
	\item \textbf{Conclusions} --- This will cover what, as a team, we learned and discovered during this project, any problems we encountered, and anything we would try differently.
\end{itemize}


%==============================================================================
\chapter{Project Plan}
\label{plan}
This section will cover how we tackled our project; how we set, assigned, and completed tasks by the deadline. The first half of our project plan mainly consisted of research and plannning, with most of the implementation being completed in the latter half.

It was set in the first semester that on Wednesday of every week we would meet our advisor, and give updates on where we are, ask questions and be given tasks for the following week. We also had a concrete meeting on Monday of every week, where we would discuss decisions or work to do as a team, with any other meetings being frequent but optional and erratic.

To begin with this project, we had to decide on the domain for the language we were designing. Initially we had a list that covered nearly every domain, but we rounded it down to two; Graphical and General purpose. Pros and cons were written up for these two domains to help with the decision. After a week, we had chosen the route of graphical programming language. This came down to a graphical language sounding more interesting, and that creating any kind of general purpose language that stands out from the others as unique is not an easy task.

After the domain had been chosen, we divided outselves into two sub-groups; one group to research which requirements we wanted the language to meet, and the other to research which graphics library to build out language on. Initially, our main requirements included 3D graphics being a necessity, the movement and transformation of shapes, colour support,it must be aesthetically pleasing and inutuitive. However, after being advised that some of that could be fairly challenging, we made some changes and toned it down so that we had key goals, along with extra features we could add if time was available. The main necessary features we decided on were:
\begin{itemize}
\item 2D graphics are essential
\item The language must be aestetically pleasing
\item The langauge must be simple and easy to learn
\item The language must maintain high performance
\item The language must run on all systems
\item Movement/transformation of shapes
\end{itemize}
The second group, researching which graphics library we should use, initially rounded it down to 3. These were DirectX, OpenGL and WebGL. We discounted DirectX, due to it only being available on Windows compatible machines. In the remaining two, both were very similar, due to the fact that WebGL is based on OpenGL. Our requirement of the language being able to run on all systems made WebGL the obvious choice. This was down to the fact that WebGL runs on any modern browser which supports HTML5, hence any system can run our language so long as it has a browser.

The next research we had to carry out was more straightforward than the others, but still just as important, as we had to decide what language to implement. This was fairly straightforward as we were quite heavily pointed towards JavaScript due to previous decisions. WebGL is written in JavaScript, and JavaScript is compiled in the browser, so all of our requirements were met. Furthermore, some of our team had quite a large understanding of JavaScript, due to previous programming knowledge. We did consider other languages, for example Java and C++, but quickly ruled them out, as we unanimously decided that JavaScript was by fart he best option for the reasons above. 

Following deciding our implementation, we had to discover what the parser would be written in and what it would output. For the implementation, we wanted a parser generator, as it would allow us to concentrate on writing other components, rather than writing a piece of functionality that already exists. However, because JavaScript is not very well supported in the way of parsers, we did not have much choice. ANTLR did originally have JavaScript target support, but the most recent releases do not support the most recent version of JavaScript. Our choice came down to JISON, which does support JavaScript as a target. In regards to output from the parser the only real route for us to follow was for it to create an abstract syntax tree, which the compiler would then walk and compile.

Before we created the system diagram, we had to decide on the means in which users will write and compile code written in our language. As JavaScript and WebGL are run in the browser, that was the main option we had. We decided to make a module which could be embedded in any web page, and would compile code in our language.

The System diagram was the first concrete document we created for this project. It contains the structure of our project, including how different components will interact with one another. It comprises of many of the decisions we had made to this date. This diagram shows how a user will interact with the module, how the code will be compiled, interaction with WebGL, and then the result is pushed to the browser's canvas element and drawn.

Once the system diagram was completed, we could focus on the syntax and semantics of the language, and creating the BNF for it. This is when we made decisions for the unique qualities of our language, including the previously discussed \textit{point + point = line} and \textit{line * n = shape} ideas. We decided that we wanted to keep things that made sense about languages, while removing points of confusion or annoyance for new users. We took inspiration from JavaScript and Swift mainly for the syntax. Our main decisions on syntax were:

\begin{itemize}
\item ?= as an equality comparator, and keeping that consistent throughout the comparators.
\item Implicit type declaration for variables
\item Implicit semi colons
\item Implicit void in function definitions
\item Ability to add 2 points to make a line
\item Ability to multiply a line to make a shape, if type if polygon
\item Ability to multiple a line to make a longer line, if type is line
\end{itemize}

After making these decisions, we could create a BNF for our language. The BNF comprised of all the syntax available in Sketch. The BNF was written in such a way that it could be read by JSON, the parser generator could understand, and comprise the parser based on it. This was the final and main piece of implementation we accomplished in semester 1.

In semester 2, the first decision we had to make was which type of compiler we were going to implement. There were two front runners in this category:
\begin{itemize}
\item Abstract Machine
\item Source to Source
\end{itemize}
We researched the two categories, and finding a solution was not easy. The abstract machine seemed more popular, powerful but significantly more difficult to implement. Originally, the source to source seemed like the best choice, as it would be quicker to implement and did not seem like it would lack in speed or power of any sort. However, our supervisor advised us to follow the opposite route, reasoning that source to source, especially in a project like this, would be just as, if not more difficult to implement. Considering this advice, we decided to implement an abstract machine system for the compiler. While deciding on this, it came to our attention that, for WebGL, we were going to need a shader manager of sorts, to do a lot of the legwork behind the scenes of the language, to make it easier for the user.

Soon after this point, we established that a component was missing from our system. We realised that we needed a component that had the functionality of walking the abstract syntax tree and producing the opcodes for the abstract machine. Now, we had identified 5 key areas that needed research and implementation, and we set each member a task to complete. These were Parser, code generator, abstract machine, shader manager and testing. We researched our own ideas and brought them back to the group to discuss. The parser did not need a huge amount of research, only implementation. The code generation needed studying to see in which way it worked. This took some time due to its complexity. Symbol trees, scope and jumps being the most confusing areas. The abstract machine would have a stack based architecture, providing an intermediary language between source code and WebGL. The shader manager would act as the WebGL calls, being provided information, type, name, src, and attributes, from the abstract machine, and then executing these calls, and drawing to the canvas. The testing comprised of source code tests for the parser and code generator, and opcode-based tests for the abstract machine and shader manager.

Following this, all members continued work on their respective components, giving updates weekly or more, usually a couple of times a week, or when a breakthrough had been made. Members of communicating components had more frequent communication, as they had to ensure they output from their respective component would give the correct type and format of output. Testing was the first section to be completed, as it had the least volume and difficulty of work involved. The team member involved in this could then help other members with their implementation.\textbf{i will expand here. its after 4 and these words are just smudges on the screen}

With all components coming along at a good rate, despite still being a little behind, we decided that the web module should be implemented. We were inspired by ShaderToy and 0x10co.de for the design, and used a tool called CodeMirror to build the syntax highlighting. We could have made it more complex, but time constraints ensured that this was not the case, as we decided that there was more important and urgent things that needed work. For now, we only needed a working IDE, a complex and useful IDE can come in later months.

%==============================================================================
\chapter{Language Evolution}
\label{evo}
In the following section, all the decisions we made for the language syntax and domain will be described as well as our reasoning. 

\section{Graphics Programming Language, or General Purpose?}
The first decision that had to be made regarding the project was what type of language should be developed. The two main types we were considering were a graphics programming language and a general purpose language. Each had their advantages and disadvantages, but we decided to go for a graphics programming language since we considered it to be less difficult to implement in theory than a general purpose one. It would be much more interesting for us rather than a standard language, and we would be able to be create amazing graphs and shapes within just a few lines of code.  

\section {Program Structure and Appearance}
Our main program consists of 2 functions called init() and render(). Having both of them is not mandatory, but at least one of them should be present into the source file. In init(), the user specifies all variables and expression that he is using. Everything that should be drawn is specified in render(). Of course, the user can use variable declarations and all other aspects of the syntax, but the draw keyword should be called from render(). Example can be seen in Listing \ref{main} .

We were considering having only one function called main() for the entire program or not having a main function at all, but in the end we decided that having this separation would make our language more readable, easier to learn and more intuitive for user.
\begin{center}
\lstset{
    basicstyle=\small\ttfamily,
    frame=lrtb,
  }
 

 
  \begin{lstlisting}[caption= {Main program in Sketch}, label= {main}]
  function init(){
    //variable declarations
  }
 
  function render(){
  // draw()
  }
  \end{lstlisting}
  \end{center}
 
\section{Primitive Types}
The initial selection of primitive types consisted of \textbf{int, float, double, vector, Point} and \textbf{String}. We thought that these 6 types would be enough for our language. We considered having a single \textbf{num} type which would replace all specific numeric types, but this idea was quickly rejected, since we reckoned that it would limit the functionality of Sketch and would cause ambiguities in certain circumstances.

Prior to the beginning of the implementation, we made a change to our set of primitive types.  A new type, \textbf{bool}, was added since we believed that it would be useful in situations where the validity of a given condition should be met. Instead of having float and double, we agreed on one type \textbf{float}, which would combine these two, since they were increasing the complexity of our language.  

At the end, two new types were added - \textbf{Line} and \textbf{Polygon} as we assumed that they would be necessary for the special kind of arithmetic that the language can perform. Although we had envisaged vectors and strings as having a key place in Sketch, they had to be removed from the implementation due to time constraints. The final list of primitive types present in Sketch is \textbf{bool, int, float, Point, Line and Polygon}.

\section {Function Declaration}
After some considerations, it was decided that function will be declared using \textbf{function} keyword followed by its name and list of parameters. The challenging bit here was how to specify the return type. The two options were either having it at the beginning of the declaration as in some programming languages or just after the parameters list specified by ``-\textgreater'' and the return type (a notation used in Apple's Swift programming language, Rust, and numerous functional programming languages). We decided to go for the arrow syntax, because using ``-\textgreater'' is very similar to mathematical notation for mapping one domain to another - we felt this would be appropriate for the context of our programming language.

Another feature that is inspired by Swift is implicit void return type for a function's declaration. If a return type is not specified, then the function is assumed to return no value. This would increase the flexibility and usability of our language by removing the need for programmers to state.
The possibility of multiple return types was considered, but we decided at this initial stage it would increase the complexity of our language and it would possibly be a reason for confusion of our users.

\section{Function Parameter Syntax and Semantics}
Further drawing inspiration from other languages, the team conducted research into how function parameters are defined, handled and presented in other programming styles. While we were more used to the traditional style of C-like parameters, where parameters are named during function definition and simply presented in order for function execution, we found ourselves strongly drawn to named parameters.

The most popular examples of languages featuring this behaviour are C\# and Swift, yet even these implementations have their differences. When calling a function in C\#, the language does not require the user to specify the names or values of all parameters - they may be used verbatim, with their name for identification purposes or omitted to assume the default value. Swift, however, requires users to provide the parameters in the order they were presented when making a function call, with their omission causing the default value to be inserted as in C\#. Rather uniquely, Swift has the concept of external and internal parameter names - allowing function calls to be extremely descriptive and describe their operation in a very natural way.

While almost all members of the team were initially enamoured with Swift's expressive and intuitive syntax, we found that implementing such a system with our limited resources would be a risky move. As such, we decided to forego this syntax in favour of tradition - tabling the idea for the future.

\section{Comparison Operators}
Very often it is confusing for inexperienced programmers to distinguish between the assignment operator (often ``='') and the comparison operator for equality (often ``==''). We decided to introduce a completely different, unique notation for comparison. In order to check if two variables are equal, we use \textbf{``?=''}. For consistency reasons, operators for less than and greater are \textbf{``?\textless''} and \textbf{``?\textgreater''}. This naturally extends to the inverse operations, \textbf{``!=''}, \textbf{``!\textless{}''} and \textbf{``!\textgreater{}''} - creating a very elegant syntax that we were surprised to have never come across before. We believe that this makes Sketch easier for new programmers and its uniqueness helps our language to stand out from the crowd, so to speak.

\section {Semicolons}
Semicolons are very often a frustrating reason for compilation errors, but equally they can make code more readable to developers. In order to limit the frequency of errors that rookie (and even experienced) programmers are likely to make, semicolons in our language are optional. To support this, the language follows several methods employed by JavaScript - newlines between statements function as though a semicolon were present, while they do not disrupt an existing statement if the programmer chooses to break a function call over multiple lines for instance.

\section {Loops}
We were considering the idea of having only one type of iterator in Sketch, but bearing in mind that some users prefer for-loops and others while-loops, we decided our syntax should have all of the most common loops. Having only one iteration method would limit the flexibility of our language and some of our users would not be comfortable with this.
 
\section {``If'' Statements and Switches}
Sketch contains if statements and supports else and else-if as well - we established that these were essential features of any programming language. We chose to stick with C's syntax - we knew it best, and we believe that it is the most intuitive. We wanted to have switches in our language, but due to time constraints, we decided to keep this structure for later versions of our language. Regardless, switches can be emulated by a patient programmer using a large chain of if-else conditionals.

\section{Other parts of the syntax}
For parts of the syntax not mentioned above, quick decisions were made. We wanted our language to be easy to learn for everyone, so having syntax not consistent with other programming languages would change this (especially for experienced programmers). Sketch's syntax is similar to the two of the leading programming languages, Java and C - although we honestly believe that our augmentations and modifications are the right choices to make to escape from questionable historical design decisions plaguing both of these languages. 

%==============================================================================
\chapter{Development Environment}
\label{dev}
For a project of this scale, distributed management of our development environment from the beginning was an absolute necessity. To keep source code management, building and recovery a simple process our system integrator devised a relatively robust system for the team to develop within.
\section{Source Management and Revision Control}
\label{dev-scm}
At the beginning of this year, most of our team were inexperienced with regards to proper source control systems - their operation differences, their configuration and their usage. Luckily, this meant that none of us would have to unlearn any SCM operation habits (as such platforms are notoriously different), and reduced the selection of a revision control system to one of availability and popularity. Our choices were narrowed down to two systems - \textit{SVN} and \textit{Git}.

From here, we decided that Git would be the ideal choice for our project's needs; it provides simple branch management, ease of access thanks to the rise of GitHub and an effective GUI client. Although some of Git's concepts were lost upon the team at first, we've since grown to be relatively adept at its operation and have found it to be a great source of our effectiveness by enabling distributed collaboration for very little effort.

\section{Development Tools}
\label{dev-tools}
As our project is JavaScript based, there have been no provisions for an IDE or editor of choice - each team member used whatever they felt most comfortable with. Amongst our team Sublime Text was a popular choice as a pure text editor, with WebStorm occasionally being used by those who preferred a full IDE, with one member choosing to work with gedit due to his Linux background. All testing and code operation was performed within the browser and browser console as mandated by JavaScript.

\section{Build Management}
\label{dev-build}
The project uses Gulp (http://gulpjs.com/) for its build management solution. Gulp is a stream-based build system based around the automation of tasks - providing functionality such as concatenation, minification and documentation generation. Gulp is similar to Apache Ant and Maven, but eschews their configuration-driven approach in favour of a code-driven approach. We found this to be ideal, as it allowed the team to spend time working on their components with the build generation doing a lot of the menial tasks - with each one being built from simple actions.

One particular strength was the litany of plugins available for Gulp - we found that we could automate our documentation production, library downloading and even the generation of our parser from its Jison file. Generation of these tasks was easy for the system integrator, and so the addition of new build tasks never added significant workload (unlike our past experiences with Ant and Ivy). Gulp is also the key element in us providing a single JavaScript file for import by users, simplifying end-user implementation cost for Sketch greatly.

\section{Continuous Integration and Quality Metrics}
\label{dev-ci}
By choosing GitHub as our source control location, we allowed ourselves access to many continuous integration and code quality metric services - several of which are dedicated to providing free usage to open source projects. We decided to pursue Travis-CI (https://travis-ci.org/) as our CI framework of choice for several reasons. The primary consideration was the free cost for open source projects, a very important element in our decision process, followed by its built-in support for node.js based projects - ensuring that we'd be able to run Gulp builds without any hassle. We also anticipated adding a formal testing harness to the project, for which Travis would email the project administrator in case of failing builds, but found that this would be too much trouble and opted to stay with our collection of Sketch language test files.

Selection of a quality metrics service went through a similar thought process, leading us to CodeClimate (https://codeclimate.com/). We added this to our project as it had zero set-up cost (in both time and money) and provides a fantastic visualisation of code quality throughout the repository. While it often was passed over by the team, some members made great use of it by being able to quickly track down overly complex code, duplications and messiness in source files and fix code smells before they led to greater mistakes down the line.

%==============================================================================
\chapter{Compiler Architecture}
\label{arch}

%------------------------------------------------------------------------------
\section{Overview}
\label{arch-over}

Our program module, as part of the role it plays, contains a combination of a compiler, bytecode executor and WebGL interface - written in JavaScript as required by the platform. This section aims to provide a view of the overall architecture and connection between these components, as well a brief explanation of each component's function and design considerations.

The core language module can be divided into 5 main parts:
\begin{enumerate}
\item \textbf{Lexer and Parser} --- The program component charged with tokenising and interpreting Sketch programs, generating an abstract syntax tree for use in code generation.
\item \textbf{Code Generator} --- The program component responsible for conversion of abstract syntax trees into bytecode sequences, for execution by the abstract machine.
\item \textbf{Virtual Machine} --- The main active subsystem present in the module, responsible for all runtime code execution. The abstract machine relies on the shader manager to make draw calls, but handles direct WebGL manipulation for certain key functions separately.
\item \textbf{Shader Manager} --- An active subsystem of the module responsible for management, selection and execution of shader programs for drawing at runtime.
\item \textbf{Module Fa\c{c}ade} --- The active component responsible for managing the interconnections and operation of the above components, as well as exposing the module interface to programmers.
\end{enumerate}
Individual and detailed discussion of each system is provided below. The module's subsystems are then connected as shown in Figure \ref{fig:sketch-overall}.
\begin{figure}[!h]
\centering
\includegraphics[width=\textwidth]{images/sys-diag}
\caption{Overall system diagram of Sketch, including data flow and interactions with the browser.}
\label{fig:sketch-overall}
\end{figure}

%------------------------------------------------------------------------------
\section{Lexer and Parser}
\label{arch-lex}
\subsection{Introduction}
The lexer and the parser are both part of the syntactic analysis of the compiler. During this stage, a source program is parsed in order to determine if it is well-formed, and to determine its phrase structure, in accordance with the syntax of our programming language. If the source program complies with the syntax and grammar of Sketch, an \textit{Abstract Syntax Tree} (AST) will be returned from the parser. An AST is a way to represent a source program’s phrase structure. 

\subsection{Initial steps}
At the beginning of implementation of the parser and lexer for our grammar, an appropriate parser generator for JavaScript had to be found. We found three possible parser generators, each of which would helped us achieve the desired result. ANTLR, JISON and PEG.js were considered as possibilities.

ANTLR uses LL(*) parsing and it can generate lexers, parsers, tree parsers and lexer-parsers. Parsers produced by it are able to automatically generate an AST, which was necessary for our design. However, the most recent release of the software (ANTLR 4) does not support JavaScript as a target platform, even though the previous version does. 

JISON and PEG.js do not encounter the same program - they successfully support JavaScript as a target and both could have been appropriate choice for our parser. PEG.js is based on parsing expression grammar formalism, which is more powerful that traditional LL(k) and LR(k) parsers. On the other hand, Jison can recognize languages described by LALR(1) grammars and provides additional features (i.e the ability to define operator associations and precendence). Because of this additional features, JISON was our chosen parser generator. 


\setcounter{secnumdepth}{3}
\subsection{Design}
JISON provided us with the opportunity to specify both tokenizing rules and language grammar in the same file. This turn out to be very helpful in latter stages when the communication between the parser and code generator had to happen. The whole design process was comprised of three stages: lexical analysis, specification of the grammar and specification of the abstract syntax tree in JSON format. 

\subsubsection{Lexer}
A lexer is a program or function that performs lexical analysis (the process of converting a string of characters into a sequence of tokens).
A token consist of a token name and attribute value. The token name represents a kind of lexical unit (i.e. keyword,identifier) and later the token names are processed by the parser. 

For each keyword of  our language, a token was specified in the grammar file. Each of the operators and punctuations symbols have a specified token as well. There are tokens for the identifiers, numbers and strings as well. This way, all the possible tokens for Sketch were covered in the grammar file. In Listing \ref{lst:token-example}, an example for each of them is presented. 
\begin{center}
\lstset{
    basicstyle=\small\ttfamily,
    frame=lrtb,
  }
  

  
  \begin{lstlisting}[caption={Tokens of Sketch },label={lst:token-example}]
  %lex
  %% 
  ...
  "if"                      return 'IF';
  "Line"                    return 'LINE';
  ...
  "{"                       return 'OPEN_BRACE';
  ...
  "+"                       return 'PLUS';
  ... 
  [0-9]+("."[0-9]*)?        return 'NUMBER';
  [a-zA-Z_]+[a-zA-Z0-9_]*   return 'IDENTIFIER';
  /lex
  \end{lstlisting}
\end{center}

\subsubsection{Grammar}
Next stage in the implementation for this part of the compiler was to specify the grammar rules for our graphic programming language. All the rules specified in the initial BNF were translated in a format that the parser generator can accept. 

As a result, in the case when a given rule of the grammar can be used, that rule had to be rewritten again  but this time using the recursion feature of JISON. JISON supports 2 types of recursion - left and right, but our grammar uses left recursion, since it more reliable and it can parse a sequence of any number of elements with bounded stack space.


Another feature of JISON became very useful in the elimination of shift-reduce conflicts - the ability to specify precedence. Initially our grammar was full of shift-reduce conflict because of the \textit{``dangling else''}  in \textit{``condition\_statment''} (Listing \ref{lst:shift-example}). By using precedence, our grammar become less ambiguous and errors are less likely to occur. 

\begin{center}
\lstset{
    basicstyle=\small\ttfamily,
    frame=lrtb,
  }
  

  
  \begin{lstlisting}[caption={condtion\_statments in Sketch after removal of Shift-Reduce conflict },label={lst:shift-example}]
condition_statements
: IF OPEN_PARENS exp CLOSE_PARENS statement
									 %prec IF_WITHOUT_ELSE
    ...
| IF OPEN_PARENS exp CLOSE_PARENS statement ELSE statement
    ...
;
  
  \end{lstlisting}
\end{center}

\subsubsection {Abstract Syntax Tree (AST)}
If a source program in Sketch uses the correct syntax and grammar rules, after parsing an Abstract Syntax Tree would be generated and passed to the code generator. Our parser produces a tree represented as an object in JSON format. As a result, the JISON file had to be changed and for each grammar rule the corresponding JSON object was added. In Listing \ref{lst:ast-example}, the output for \textbf{``Hello Square''} program is show.
If one of the grammar rules is violated, no AST will be generated and error will be thrown - this feature is provided for us by the parser generator.

\lstset{%
      basicstyle=\ttfamily\footnotesize\bfseries,
      frame=single,
      xleftmargin=.1\textwidth, xrightmargin=.1\textwidth,
      captionpos=b,
      tabsize=4,
      language=json
    }
\begin{lstlisting}[caption={Sample AST produced by the parser },label={lst:ast-example}]
{
 "type":"function",
  "arguments":
      ["init","","void",
         [{"type":"variable-decl-assign",
            "arguments":
             [["Polygon","square"],
                 {"type":"multiplication",
                   "arguments":
                     [{"type":"addition",
                        "arguments":[["0","0"],["5","0"]]}, "4"
                     ]
                  }]},
             ["draw","square"]
             ]
            ]
}

\end{lstlisting}
%------------------------------------------------------------------------------
\section{Code Generator}
\label{arch-gen}

\subsection{Disclaimer}
As of March 27th 2015, the majority of the functionality of the Code Generator is missing. It can compile only the simplest of programs: those dealing with addition, subtraction, multiplication, division and calculating the remainder (``modulus'') of integers and floats exclusively. Neither the declaration, assignment nor referencing of variables and functions works, nor does the evaluation of boolean expressions. 

%------------------------------------------------------------------------------
\section{Virtual Machine}
\label{arch-abs}

\subsection{Introduction}
The Sketch Virtual Machine is an abstract computing machine. It bridges the gap from the Sketch programming language to JavaScript and the WebGL API and provides an intermediate language stage for compilation. The instruction set provided by the Sketch Virtual Machine is tailored specifically to implement the operations of the Sketch programming language.

As Sketch is a programming language for drawing graphics on  web pages, the Sketch Virtual Machine must be able to run in a browser environment. As JavaScript is supported by most modern browsers and is the implementation language for WebGL, it was decided that the Sketch Virtual Machine would be implemented using JavaScript. This makes Sketch a very portable programming language as it can be run on any machine that can run a browser with JavaScript support.

Talk a bit about the Sketch Virtual Machine knowing nothing of the sketch programming language, or how some instructions are tightly coupled with the sketch language.
Talk a bit about how the Sketch Virtual Machine is tightly coupled with the shader management system for drawing.

\subsection{Structure of the Sketch Virtual Machine}

\subsubsection{Data Types}
The Sketch Virtual Machine operates on two kinds of types: Primitive types and reference types. These types can be operated upon, stored as variables, passed as arguments into functions and returned by functions. 

The Sketch Virtual Machine assumes type checking is done at the compilation stage and does no type checking at runtime. Instead, the Sketch Virtual Machine determines its operand types from the instructions. For example, IADD (Integer add), FADD (Float add) and PTADD (Point add) infer that their operands are integer types, float types and point reference types respectively. 

\subsubsection{Primitive types}
The Sketch Virtual Machine supports a three primitive types: \textit{Integer}, \textit{Float} and \textit{Boolean}.
\begin{itemize}
	\item \textit{Integer:} Represents 53-bit signed integer values. Has a default value of 0. 
	\item \textit{Float:} Represents 64-bit signed float values. Has a default value of 0.
	\item \textit{Boolean:} Represents the logical values true and false. Has a default value of false.
\end{itemize}
All primitive data types in the defined by the Sketch Virtual Machine are stored in 64-bits. This is due to javascript using a single 64-bit type: Number, to represent all numeric values. Boolean values are actually Integer types. Zero represents false and any non-zero value represents true.

\subsubsection{Reference Types}
Structs in the sketch programming language are represented as arrays. Each struct member is mapped to an index of the array. These arrays exist in the Constant Pool data structure produced by the compiler. Instructions that operate on structs, such as PTADD, have operands that are addresses into the Constant Pool. These address are Integer values.

\subsubsection{Run-time Data Areas}
The Sketch Virtual Machine has four special purpose Registers: Program Counter, Code Limit, Stack Pointer and Frame pointer.
\begin{itemize}
	\item\textit{Program Counter:} The program counter holds the address of the next instruction to be executed in the code store.
	\item\textit{Code Limit:} The code limit holds the address in the code store that comes immediately after the last instruction.
	\item\textit{Stack Pointer} The Stack pointer holds the address of the location immediately above the topmost element on the stack.
	\item\textit{Frame Pointer} The Frame Pointer holds the address of the first element in the topmost frame on the stack.
\end{itemize}
%------------------------------------------------------------------------------
\section{Shader Manager}
\label{arch-shad}

\subsection{Introduction}
\label{arch-shad-intro}
In designing our system, we established that regardless of the chosen compilation and execution pathway all of our library's shaders would have to be intelligently managed; both during runtime and for storage purposes inside the module itself. While an extensive system like Palette may seem too broad in scope for Sketch's module in its current form, at the language's inception we wanted custom shapes and shaders to be a defining feature of our platform. As such, Palette allows us to one day realise our initial ambitious vision of Sketch due to the level of extensibility and portability it provides.

\begin{figure}[!h]
\centering
\includegraphics[width=\textwidth]{images/Palette-UML}
\caption{A UML class diagram of Palette.}
\label{fig:palette-uml}
\end{figure}

\subsection{Definitions}
\label{arch-shad-def}
\textit{Shaders} are the graphics card level program units used in the conversion from vertex arrays into two-dimensional projections in the screen space, and in the selection of pixel colours to populate the screen space from that projection. In WebGL, older versions of OpenGL and in its subsets such as GLES, shaders must always come in pairs: a \textit{vertex shader} and \textit{fragment shader} comprise each \textit{shader program}. This may then be accessed, modified and called through the \textit{WebGL API}.


\subsection{Requirements}
\label{arch-shad-req}
The unique needs of our module created an interesting set of design requirements for the subsystem - mandating a somewhat in-depth understanding of the WebGL API to manipulate the canvas as required. Upon examination, the shader manager's requirements were found to be:
\begin{itemize}
\item \textbf{Extensibility} --- Sketch needed to support future extension with various shapes, shaders and other such additions beyond its standard library - most shader programs require writing specially tailored code in an object's .draw() method. Similarly, modifications to shader code often require changes at the software level if the attributes or buffers must be changed - this coupling must be minimised or eliminated.
\item \textbf{Portability} --- Such tailored draw code cannot be imported without putting users at significant security risk by requiring them to execute arbitrary code. Some way to infer the attribute update process from the shader itself is a necessity.
\item \textbf{Ease of Use} --- Definition of new shader files should be intuitive and an easy process, provided the user has valid shader code. The linking and compilation of shaders and shader programs must be handled internally, and completely sequestered from external control to centralise most of the API manipulation.
\item \textbf{Configurability} --- Shader programs should have variable control methods exposed as an external interface, to provide a simple means of control over the intricacies of the WebGL API. For instance, programmers must be able to change the draw mode on a moment's notice, or even extract the shader program pointer if they require direct access to WebGL.
\item \textbf{Simplicity} --- WebGL is plagued by esoteric function names, inconsistent function prototypes and an arcane set of named constants: all of which must be used regularly to render graphics. Interactions with the module should be designed with brevity in mind - being able to execute variable update and draw functions as a single method call makes WebGL usage simpler in the other subsystem implementations - lowering the barrier of entry.
\end{itemize}

\subsection{Design Process and Issues}
\label{arch-shad-design}
The first challenge encountered stemmed from trying to find a way to pass shape definitions within our language. At first, we reasoned that since shapes and objects traditionally have predefined draw functions then we'd need to find a way to export raw JavaScript for each shape class. As mentioned in the requirements, we found that direct code evaluation would not only require difficult scoping considerations but would also present a massive security risk to users of the system. From here, we considered merely assigning shape classes a pair of shaders - this seemed to be the logical choice.

We had originally considered allowing programmers to add shader object JSON from a URL source; this would provide an even more convenient set-up for the manager by reducing shader registration to a single line of code per file. However, we ran into trouble with the management of asynchronous execution calls caused by the main thread running while the download completed. We briefly considered making the HTTP request synchronous, but this caused the entire window to freeze until downloading had completed - we quickly discarded this plan until a later time.

Although our JSON system of ``[name, type, default]'' worked well for numeric and matrix uniforms, we were originally at a loss for how buffers and vertex attributes should be handled. By forcing programmers to supply a buffer object with a known name as well as a vertex attribute specific to their shader code, we managed to bypass this problem with regards to the vertex buffer. We found that using the default value to store the name of the referenced buffer was an eloquent solution - keeping each array in Shader JSON at the same size. As far as buffers were concerned, we then realised that we could perform the same substitution to store the itemSize of a buffer. There are many other possible configuration options which had to be cast aside (stride, offset, etc.) to allow this simplicity, however. Finding a simple means of expressing these in our format would be a great addition.

Midway through the development of the abstract machine, we realised that we needed a means to convert from planar polygons (like those that Sketch works with) into triangle sets to render any geometry to the screen. While researching polygon triangulation algorithms we came across \textit{earcut} (https://github.com/mapbox/earcut), a JavaScript library which provides the features and speed that our platform would need to make use of. By patching in an extra draw mode to Palette on top of the standard WebGL modes, the simplicity of execution at the abstract machine level was maintained.

While discussion of the implementation details themselves would be appropriate in a dedicated paper, they must unfortunately be omitted as they are outside of this report's scope.

\subsection{Usage}
\label{arch-shad-use}

While JSDoc automatically generates the API documentation for Palette, construction of Shader JSON files is not yet documented. As these are an essential part of Sketch's operation, and shader source code will not suffice on its own, a light explanation is provided.

Shader JSON objects may fall into three types:
\begin{enumerate}
\item \textbf{Vertex Shaders} --- Objects following the form of Listing \ref{lst:vtx-shad-example}, with type set to 0 and at least two attributes: a \textit{buffer} named``vertexBuffer'' with default value set to the number of components per vertex, and a \textit{vertexAttrib} with a name matching an attribute within the shader and default value set to ``vertexBuffer''. Further attributes are defined in the same format as fragment shaders.
\item \textbf{Fragment Shaders} --- Objects defined similarly to Listing \ref{lst:frag-shad-example}, with type set to 1 and no restriction on what attributes must be predefined.
\item \textbf{Shader Lists} --- Objects following the structure of Listing \ref{lst:list-shad-example}, with type set to 2 and the content tag corresponding to an array of further shader objects of any type.
\end{enumerate}
All integer and vector types are supported, along with their array equivalents. These are denoted as \textit{int}, \textit{int[]}, \textit{float}, \textit{float[]} with vectors taking the form \textit{ivec$n$}, \textit{ivec$n$[]}, \textit{vec$n$} and \textit{vec$n$[]} for $ n \in [2,4]\cap\mathbb{N}$. Float matrices may be defined by \textit{mat$n$}, for $n$ within the same domain.
\begin{center}
\lstset{%
      basicstyle=\ttfamily\footnotesize\bfseries,
      frame=single,
      xleftmargin=.05\textwidth, xrightmargin=.05\textwidth,
      captionpos=b,
      tabsize=4,
      language=json
    }
\begin{lstlisting}[caption={Vertex Shader JSON Structure},label={lst:vtx-shad-example}]
{
	"type": 0,
	"name": "squareVtx",
	"src": "#version 100; attribute vec3 aVertexAttrib;//...",
	"attrs": [
		["aVertexAttrib",
		"vertexAttrib",
		"vertexBuffer"],
		
		["vertexBuffer",
		"buffer",
		3]
	]
}
\end{lstlisting}
\begin{lstlisting}[caption={Fragment Shader JSON Structure},label={lst:frag-shad-example}]
{
	"type": 1,
	"name": "squareFrag",
	"src": "//source",
	"attrs": [
		["name",
		"type",
		"default"]
	]
}
\end{lstlisting}
\begin{lstlisting}[caption={Shader List JSON Structure},label={lst:list-shad-example}]
{
	"type": 2,
	"content": [
		{
			"type": 0,
			"name": "...",
			"src": "...",
			"attrs": [...]
		},
		{
			"type": 1,
			"name": "...",
			"src": "...",
			"attrs": [...]
		}
	]
}
\end{lstlisting}
\end{center}
Initialisation of Palette as part of a JavaScript program is a very simple process. Once the module has been included in the execution space through either loading by the browser over HTTP or concatenation as part of a build script, the API is accessible. An example integration is as follows:
\begin{lstlisting}[caption={Palette Usage Example},label={lst:palette-example},language=JavaScript]
//Given a <canvas> element with id "myCanvas".
//The shader text has been imported either by XMLHttpRequest
//Or has been embedded as a string literal into variable 'text'

//Retrieve elements from DOM, and the context from the canvas.
var canvas = document.getElementById("myCanvas");
var glctx = canvas.getContext("webgl");

//Create and set up Palette.
var manager = new Palette.Manager(glctx);
manager.addShader(text);

//Now we're ready to draw!
manager.draw("vsName", "fsName", [/*DATA*/],
			{/*vsConfig*/}, {/*fsConfig*/});
\end{lstlisting}

The full API documentation is available under docs/index.html within our repository (and the deliverables folder supplied) under the namespace ``Palette''.

\subsection{Future Changes and Evaluation}
\label{arch-shad-future}
While Palette provides a sizeable kernel of features, there is still much room to improve the module - not only to supply all of the functionality we'd originally planned, but also to enable its use in external projects of all scopes.
\begin{itemize}
\item \textbf{Texture Support} --- an absolute necessity to enable images and texturing within Sketch, and for almost all conceivable WebGL projects. Textures require vast amounts of configuration - the issue is figuring out how to represent this information in JSON format, and subsequently handling that data. Makeshift texturing could be achieved by passing an image over a buffer at present, but I believe this is far slower than using the intended API calls. 
\item \textbf{Optimisation} --- at present, Palette makes many redundant calls to the WebGL API. While these do not affect a project on the scale of Sketch, for larger scale rendering tasks this could begin to become a problem. This should be possible to mitigate by making use of tools such as WebGL Inspector, learning from their output, and writing optimisations from its findings.
\item \textbf{Shader Loading from URL} --- the current implementation forces users to externally load shader JSON files themselves - likely through XML HTTP Requests. Making startup simpler would be a great aid to future users.
\item \textbf{Draw Mode Extensibility} --- while this is possible at the current moment, it requires direct modification of Palette's source due to the current internal architecture. Development of a plugin system may be a worthwhile investment in the future to prevent users from modifying the code themselves to add their required functionality.
\end{itemize}

Overall, implementing Palette has been an extremely rewarding experience both for the nuance involved in writing such a subsystem and for the value it has provided to the development of other Sketch subcomponents. Team members who have had to use it had a small adjustment time, but appeared to be suitably impressed with the simplicity it provided them.
%------------------------------------------------------------------------------
\section{Module Fa\c{c}ade}
\label{arch-module}
\subsection{Introduction}
\label{arch-module-intro}
\begin{figure}[!h]
\centering
\includegraphics[width=\textwidth]{images/Facade-UML}
\caption{A UML class diagram of Sketch's module.}
\label{fig:module-uml}
\end{figure}

A fa\c{c}ade as shown in Figure \ref{fig:module-uml} was a necessity if we wished to provide users with the simple set-up we had envisaged. Although this component introduces no novel concepts, programming it still required the input of all team members to ensure that data would be properly handled between components.
\subsection{Implementation Process}
\label{arch-module-impl}
The implementation of the module provides very little functionality of its own, and merely abstracts the calls it receives to its registered components. From the beginning, we established that users would only desire to create an instance of the module, to add shaders to the system and to compile and execute Sketch source files they had written.

The only interactions which require functional code are adding shaders from URL, which delegates to the addShader method regardless, and program compilation. Program compilation follows the same execution order outlined in Chapter \ref{arch-over}, and executes the virtual machine as its final command. Aside from this, it must mediate between the components' output formats and the input arguments of the next step. For instance, the parser outputs the JSON string format of an object, which is functionally useless if we wish to traverse the tree in this form. This required communication between all team members who had developed components, to understand the data transformations required.

Handling asynchronous loading of shader files had now become a necessary consideration, as this functionality was not present in the Shader Manager. To prevent users from trying to execute program code before the shaders were present, a semaphore-like system was used - an internal counter increments for every addShader() or addShaderURL() call made, and decrements when the process finishes. Although we were surprised that this mechanism was sufficient here, it likely would not be sophisticated enough to be used within Palette to deal with asynchronous behaviour on a generalised scale.

%==============================================================================
\chapter{Online IDE}
\label{ide}
As part of our overall project plan, we decided that an environment for users to play around with Sketch was an essential deliverable for us to provide - both for our own testing purposes and to offer an interactive sandbox that could show off our project's capabilities.

\section{Design Process}
\label{ide-design}
Most of the team had not originally considered the production of a development environment for our language, until the topic had been raised by our project manager, David, in the language development stages. Up until that point we had merely assumed that users would produce programs on a desktop computer in their text editor of choice, before linking the code up to the module on a web-page via the JavaScript API. However, mobile devices were left with no means to write their own Sketch programs - this left out a potential user base that we were specifically trying to target by electing to use WebGL.

\begin{figure}
\centering
\begin{subfigure}[b]{0.45\textwidth}
\includegraphics[width=\textwidth]{images/shadertoy-ide}
\caption{An image of ShaderToy's design layout.}
\label{fig:ide-shadertoy}
\end{subfigure}
\begin{subfigure}[b]{0.45\textwidth}
\includegraphics[width=\textwidth]{images/0x10code}
\caption{An image of 0x10co.de's design layout.}
\label{fig:ide-0x10code}
\end{subfigure}
\caption{Other online examples.}
\label{fig-ide-other}
\end{figure}

We began to look at existent online IDEs for various languages to serve as design inspiration for our own. Chief among these was ShaderToy (Figure \ref{fig:ide-shadertoy}), an online community built around sharing and discussing complex fragment shaders. ShaderToy's design makes the code and the visual output the primary focus for users, with both sections taking up relatively equal screen space at opposite ends of the screen. It's noted that the code segment takes up slightly more screen space - this is likely due to the far larger size of GLSL fragment shader code. While many elements of its design are bland, we found the structure of the page to be a perfect fit for graphics dependent languages where the canvas takes centre stage. We even found that the bland colour scheme of the site likely helped the key visual elements - the canvas and the code - to stand out to users by reducing visual clutter and noise elsewhere.

The now defunct 0x10co.de (Figure \ref{fig:ide-0x10code}), an online community based around the fictional DCPU-16, was another key influence in this regard - it also followed a minimalistic design scheme, placing code and graphical output at the forefront. We decided upon minimalism as our go-to style after our investigation to give the page and language presentation the purity we desired, and chose to go for a 50-50 split as our programs are intended to be relatively small. The key decision to deviate from the bright pages in our two exemplars was made in light of modern trends within text editors such as Sublime Text - developers were regularly finding darker environments to be more aesthetically pleasing and less likely to cause eye-strain. As such, we decided to go for a darker web design; not only for these reasons, but also to enhance the appearance of the canvas by creating a stronger contrast.

\section{Implementation}
\label{ide-impl}
\begin{wrapfigure}{r}{0.38\textwidth}
  \centering
  \includegraphics[width=0.36\textwidth]{images/sketch-syntax}
  \caption{Sketch's syntax colouring, provided by CodeMirror.}
  \label{fig:ide-syntax}
\end{wrapfigure}
On further research, it was noted that 0x10co.de and ShaderToy shared a common library - CodeMirror. CodeMirror is a JavaScript library designed to allow embedding fully formattable text entry boxes into web pages, with support for syntax highlighting, theme selection, various plugins and more. After researching it briefly, we were certain we'd found the right tool for the job.

Creating a new syntax colouration template was at first a difficult task - in essence, it was identical to building a parser for Sketch. Luckily, CodeMirror provides a simple module definition plugin, which reduces the task down to the construction of a finite state machine with the help of regular expressions. The task was far easier to tackle this way, and although it lacks the fine-grained control of writing a custom parser the results are very convincing. An image showing this colouring in action is reproduced for Figure \ref{fig:ide-syntax}. The state machine is as follows:
\lstset{%
      basicstyle=\ttfamily\footnotesize\bfseries,
      xleftmargin=.05\textwidth, xrightmargin=.05\textwidth,
      captionpos=b,
      tabsize=4
    }
\begin{lstlisting}[caption={Syntax Highlighting State Machine},label={lst:ide-fsm},language=JavaScript]
CodeMirror.defineSimpleMode("mlang",{
    start:[
		{regex: /(function)(\s+)([a-z$][\w$]*)/,
			token: ["keyword", null, "variable-2"]},
		{regex: /#.*/, token: "comment"},
		{regex: /\/\/.*/, token:"comment"},
		{regex: /\/\*/, token: "comment", next: "comment"},
		{regex: /true|false/, token: "atom"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
			token: "number"},
		{regex: /\/(?:[^\\]|\\.)*?\//, token: "variable"},
		{regex: /\b(?:function|return|if|for|while|else|do|this|draw|clear|width|height)\b/, token: "keyword"},
		{regex: /\b(?:int|float|bool|Line|Point|Polygon|void|color|Circle)\b/, token: "keyword"},
		{regex: /\b(?:vector\([234]\))\b/, token: "keyword"},
		{regex: /[-+\/*=<>!]+/, token: "operator"},
		{regex: /[a-z$][\w$]*/, token: "variable"},
		{regex: /([a-z$][\w$]*)(?=(\s*)\()/, token:"keyword"}
    ],
    comment:[
		{regex: /.*?\*\//, token: "comment", next: "start"},
		{regex: /.*/, token: "comment"}
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});
\end{lstlisting}

The page itself (Figure \ref{fig:ide-full}) is a very simple arrangement of blocks, a canvas, and a text area which is in turn replaced by CodeMirror. This is then styled by page-wide CSS designed to match our chosen CodeMirror theme - creating the subdued look we were going for.

\begin{figure}[!h]
\centering
\includegraphics[width=0.9\textwidth]{images/sketch-ide}
\caption{An image of the Sketch online IDE.}
\label{fig:ide-full}
\end{figure}
\section{Evaluation}
\label{ide-eval}
Being able to produce this page in less than two days, we realised that we had definitely made the correct choice in our library research. The page itself has much room to improve, however - there are vast amounts of unused whitespace, currently links to our documentation are non-functional and the page feels very barren, overall. We believe that the value that this aspect of our project provides is far greater than the time cost involved in creating it, thanks to the simple set-up process and the past experience of team members with HTML and CSS as well as its own intrinsic value.
%==============================================================================
\chapter{Test Plan and Test Suites}
\label{test}
The testing of our language can be covered in three different categories:
\begin{itemize}
\item \textbf{Source code tests} used as a means of testing the parser and integrated compiler as a whole.
\item \textbf{Opcode tests} used as a means of testing the abstract machine.
\item \textbf{Output from tests} used as a means to test the remaining areas of the compiler - ie output from parser used for code generator, and output from the abstract machine used to test the shader manager.
\end{itemize}
The source code tests were originally the only test methods, however, as the project proceeded, we understood the need for tests for each component of the compiler. This was due to fact while the components didn't work, they obviously could not interact with one another.

These source code fragments range from very small and straightforward, for example declaring and assigning a value to variable, to slightly more complex, like loops and nested if statements, to complex, which included creating a short animation, or creating multiple different shapes dependant on the value a line is multiplied by. These tests were very useful in testing the parser to ensure the correct output was given. When these tests were parsed, the output of the parser, the abstract syntax tree (AST), were used as testing for the code generation component. This component would take in the AST, and produce opcodes for the abstract machine.

The opcode tests consisted of small programs due to the higher workload involved in creating them, but still became quite complex, in drawing shapes etc. These tests contained the source code translated into the relevant opcodes and operands. This meant that it could be run directly from the abstract machine module, and it could be tested in isolation, without the need of other components. The output from this was also used to test the shader manager.

We felt this was the most informative, and altogether best structured approach towards testing our language. It allowed us to test different modules by themselves, but also the compiler as a whole and how each module interacted with the next.

\section{User Testing}
At this stage of the implementation of Sketch, we felt that any user evaluation, while would have showed flaws in our program, was not particularly necessary. Any problems, or areas to work on, that occurred due to user evaluations we would either already be aware of, or if not, then we would have more important flaws to work on. This led us to agree that, in the future, user evaluations will be very useful, when we feel the language is ready for release, but at this stage in development, we know what we have to work on to get it to that stage, and will ensure we have our core feature set implemented first.
%==============================================================================
\chapter{Conclusion}
\label{conc}

%------------------------------------------------------------------------------
\section{Contributions}
\label{cont}

%------------------------------------------------------------------------------
\subsection{Report}
\label{cont-report}

\textit{\textbf{Writing:}}
\begin{itemize}
\item \emph{David Creigh:} Chapter
\item \emph{Kristiyan Dimitrov:} Chapter \ref{evo}, \ref{arch-lex}
\item \emph{Gerard Docherty:} Chapter 
\item \emph{Darren Findlay:} Chapter 
\item \emph{Kyle Simpson:} Chapter \ref{arch-over}, \ref{arch-shad}, \ref{arch-module}, \ref{dev}, \ref{ide}
\end{itemize}

\textit{Editing duties performed by all team members across the entire document.}
%------------------------------------------------------------------------------
\subsection{Program}
\label{cont-prog}
\begin{itemize}
\item \textbf{Parser} --- Kristiyan Dimitrov
\item \textbf{Code Generator} --- David Creigh
\item \textbf{Virtual Machine} --- Darren Findlay
\item \textbf{Shader Manager} --- Kyle Simpson
\item \textbf{Module Fa\c{c}ade} --- Kyle Simpson
\item \textbf{Online IDE} --- Kyle Simpson
\item \textbf{Testing Suite} --- Gerard Docherty
\end{itemize}
%------------------------------------------------------------------------------
\subsection{Roles and Responsibilities}
\label{cont-prog}
\begin{itemize}
\item \textbf{Project Manager}
\item \textbf{Language Guru}
\end{itemize}

%==============================================================================
\appendix
\chapter{Language Tutorial}
\label{tut}
This chapter comprises of a brief introduction of how to use our language.
\section{Getting Started}
\label{start}
In every language, the first program to write is always ``Hello World'' - where you would print the words ``Hello World''. However, as this language is mainly a graphical language, the equivalent would be ``Hello Square'', and the aim is to draw a square. In Sketch, the program required to draw a square is:
\lstset{%
      basicstyle=\ttfamily\footnotesize\bfseries,
      xleftmargin=.1\textwidth, xrightmargin=.1\textwidth,
      captionpos=b,
      tabsize=4
    }
\begin{lstlisting}[caption={Hello Square},label={lst:tutorial-hello}]
    function init(){
        Polygon square = ({0,0} + {5,0}) * 4;
        draw square;
    }
\end{lstlisting}

To compile any Sketch program, insert the code into the browser page for our project and click ``Render''. The result of the program will then be shown on the canvas.

Any Sketch program you write will have to consist of at least one function, and variables. These functions and variables can be named anything you like. You can call other functions to help carry out the task, only ones that you have written, as there are no libraries provided in the current version of the language. 

In Sketch, implicit semi-colons exist at the end of every line. This means that, you don't have to end each line with a semi-colon, and whether you do or not will not have an effect on the compilation of the program. 

The draw keyword is used to pass the shapes you want to draw to the correct function, so they can be written to the canvas. This will be discussed in detail later.

One way in which you can pass data between functions is by including variables in the calling statement as parameters. However, you can only do this if the function that is being called is expecting the same number and type of variables. An example is:

\begin{lstlisting}[caption={Function Parameters},label={lst:tutorial-parameters}]
    function init(){
        int n = 2;
        function takesParams(int n){
            print(n);
        }
        takesParams(n);
    }
\end{lstlisting}

Here, you see that the calling statement - \textit{takesParams(n);} - provides the correct number and type of arguments. If another parameter was included, for example \textit{takesParams(n, 7)}, or the wrong types, then the program would not compile. This will be talked about in more detail in Chapter \ref{func}. As you can see in Listing \ref{lst:tutorial-hello}, the code inside of a function is \{enclosed by curly braces\}. The draw keyword is used to draw any shapes that you have constructed to the canvas. It will take one parameter, either the point,line or polygon that you have constructed. This is a predefined keyword in the language, so you don't have to write it, but you cannot name any of your functions \textit{draw()} as a result. 

\section{Variables and Arithmetic operators}
\label{vars}
This next section will use a more complicated program than before, introducing more features, such as comments, loops, and expand on previously touched on features, such as variables.

\begin{lstlisting}[caption={Comments and Point Addition},label={lst:tutorial-comment}]
#This Program will draw 3 different shapes - triangle, square and pentagon.
//Both of these lines are ignored by the compiler.

function init(){
	int sides;
	sides = 5;
    int counter = 3;
    
    Point pt1 = {3,1}
    pt2 = {1,3}
    
    Line l1 = (pt1 + pt2);
    
    #this will loop for the number of sides
    while(counter <= sides){
        clear;
        Polygon shape =	11 * counter;
        draw shape ;
        counter++;
    }
}
\end{lstlisting}

The initial lines indicate how to show comments in your code in Sketch. Using a hash sign (\#) or a double slash (//) will cause the compiler to ignore all characters until the next newline, and show that the current line is a comment. These can be used to explain how your programs works, and make it easier to read and understand, for you or other users. The ``clear'' function in this example is a reserved keyword, and is used to clear the canvas. A reserved keyword is a word that cannot be used otherwise, for variable names, of function calls - ``draw'' is one such example we have shown.

As you can see in Listing \ref{lst:tutorial-comment}, there are two ways of declaring variables, explicitly and implicitly. Each variable declaration must include the variable name, which is an alphanumeric string that always begins with a letter. To explicitly define your variable, each variable name must be preceded by the intended type. For example, the variables ``sides'' and ``counter'' in Listing \ref{lst:tutorial-comment} are declared explicitly. Explicit declaration provides the ability to not initialise the variable immediately. Implicit declaration is when the type is not defined by the user, but instead taken from the context. The type is inferred from the initialization of the variable afterwards. For example, ``pt2'' in Listing \ref{lst:tutorial-comment} is implicitly defined, and from the context, the compiler will recognise that it is of type Point. However, with implicit types, you must immediately initialise the variable so its type can be inferred.

The while loop in Sketch is of standard format and standard functionality. This means that the condition contained in the parentheses is tested, and if it returns true, then the body of the loop, and whatever statements it may contain, are executed. Then the original condition is retested. if true, it again executes the body. This continues until the condition is false, at which point, the body of the loop is not executed, and the next command outside the loop is performed and the program continues. A while loop has the format: 

\begin{lstlisting}[caption={The ``While'' Loop},label={lst:tutorial-while},xleftmargin=0.1\textwidth,xrightmargin=0\textwidth]
while(condition){
	#insert body here
} 
\end{lstlisting}

Sketch has three main types for drawing shapes, lines and so forth. These are Point, Line and Polygon. Let's start with Point: Points are the basis of all possible shapes, and are the vertices from which shapes will be drawn. A point is defined in the following format \{$x$ Coordinate, $y$ Coordinate\}. An example of both implicit and explicit declaration is shown in Listing \ref{lst:tutorial-comment} with ``pt1'' and ``pt2''. These points can be added together to create a Line. Lines are a collection of two points joined together. The format for defining a line, shown by ``l1'' in Listing \ref{lst:tutorial-comment}, is Line = (Point1 + Point2). Lines can be extended from the centre point by multiplying it by a number. For example, multiplying a line by 4 will create a line 4 times the size from the same origin and direction. Finally, variables of type Polygon are a collection of lines, displayed as a closed circuit. Polygons can be defined by either adding multiple lines together, but they must all join, or by defining one line, and multiplying it by the number of sides you would like. This would create a shape of the stated number of lines, closed off, with the origin being the first co-ordinate of the line. The format of this would be either Polygon = (Line2 + Line2 ... + LineN) or Polygon = Line * N. In these examples, N is the number of sides desired.

The line ``counter++'' increments the counter, using the modifying operator ``++''. We will explain modifying operators later in this tutorial.

Sketch also has one more type of loop - the ``for'' loop. The for loop has a completely different structure to the while loop, but has, more or less, the same functionality. The choice between these two types is based on the context, which one would make more sense, for example, incrementation should be used in for loops, while boolean variables should be the control in while loops. The following is the while loop from Listing \ref{lst:tutorial-comment}, changed to a for loop:
\clearpage
\begin{lstlisting}[caption={The ``For'' Loop},label={lst:tutorial-for},xleftmargin=.1\textwidth,xrightmargin=.1\textwidth,]
    for(int counter = 3; counter < 5; counter++) {
        ...
    }
\end{lstlisting}

The for loop statement has three parts. Firstly, the control variable is initialised (it also does not need to be declared beforehand), then the statement that will be checked after every execute of the body, and finally, the incrementation of the control variable. The general functionality is the same as the while loop.
\section{If Statements and Comparative operators}
\label{comp}
This section will cover how to perform comparing statements in Sketch. The following is an if statement which compares to check if a variable is equal to something else:
\begin{lstlisting}[caption={If-Else Conditionals},label={lst:tutorial-ifelse}]
    function init(){
        int n = 5;
        if(n ?= 5){
            print(n);
        }
        else if(n ?> 5){
            print("less than 5");
        }
        else if(n ?< 5){
            print("greater than 5");
        }
    }
\end{lstlisting}

If statements are a way of executing a series of commands, but only if a particular statement returns true. To compare to elements, a comparative operator is needed. In Sketch, there exists a series of six comparative operators:
\begin{itemize}
\item \textbf{?=} will return true if left hand side is equal to right hand side.
\item \textbf{?\textgreater} will return true if left hand side is greater than right hand side.
\item \textbf{?\textless} will return true if left hand side is less than right hand side.
\item \textbf{!=} will return true if left hand side does not equal right hand side.
\item \textbf{!\textgreater} will return true if left hand side is not greater than right hand side (ie is less than or equal to).
\item \textbf{!\textless} will return true if left hand side is not less than right hand side (ie is greater than or equal to).
\end{itemize}

An exclamation mark can be inserted in front of the check statement in the if, to receive the inverse of what it returns.

\section{Modifying Operators}
This section will cover how you can make use of sketch's modifying operators. The following example will outline them:
\begin{lstlisting}[caption={Modifying Operators in Action}, label={lst:tutorial-modify}]
    function init(){
        int n = 1; #line 1
        n += 2; #line 2
        n *= 2; #line 3
        n /= 2; #line 4
        n -= 2; #line 5
        n %= 2; #line 6
        n++; #line 7
        n--; #line 8
        n = (n + 3) * 5; #line 9
    }
\end{lstlisting}

Listing \ref{lst:tutorial-modify} outlines many modifying operators in Sketch. To explain each one, we will walk through the program itself. As previously mentioned, the first line will declare n to be of type int, with a value of 1. The next line will change the value of n by adding one to it. The general syntax would be \textit{*variable to be changed* += *how many to change it by*}. The next three lines follow the same syntax and semantics, with the exception that, line 3 would multiply the variable by the second value and assign it, line 4 would divide it by the second value and assign it, and line 5 would subtract by the second value and assign it, and finally line 6 would change the variable to equal the value of it modulo the second variable. This means that it would change it to the remainder after being divided by that number. So, after line 2, n would be equal to 3, after line 3, n would equal 6, after line 4, n would equal 3, after line 5 n would equal 1 and after line 6, n would still equal 1, as the remainder of 1 / 2 is still 1. These operators are functionally a shorter way of writing \textit{n = n + *value*;}, but obviously changed respective to the context (division, multiplication, subtraction and modulo).

Line 7 is different. This operator will increment the variable by only 1. In the context of this program, n will now equal 2. The following line has the same structure, but instead subtracts one, returning n's value is back to 1. These can be useful in loops for example, to increment or decrement your controlling variable as necessary. The final line outlines how parenthesis work in regards to performing arithmetic operations. The flow it would take, is to first, add to n, making it equal 4, and then multiply by 5, hence n equals 20. The brackets would specify what task has to be carried out first, as if they were not here on this occasion, by the laws of maths, 3 would be multiplied by 5 and then added to n, giving a different outcome. All of these modifying operators, except on line 9, are functionally just shorthand, but can be very useful and time saving while writing a program.

\section{Functions and Scope}
\label{func}
In Sketch, functions, as mentioned before, taken certain types and number of parameters dependant on what you specify, it can range from 0 to n. Furthermore, these functions can be called whatever you decide, and can either have a return type or not, dependant on your needs. Listing \ref{lst:tutorial-functions} will show these in action:
\begin{lstlisting}[caption={Functions and Scope}, label={lst:tutorial-functions}]
function init(){
    int x = 1;
    int i = 5;
    function foo(int n) -> int{
        n++;
        return n;
    }
    function foo2(int n){
        n++;
    }
    i = foo(int i);
    foo2(int x);
}
\end{lstlisting}

In Listing \ref{lst:tutorial-functions}, you can see different properties of defining and calling a function. If a function lacks a return type, then you can see that the void is implicit. Furthermore, if a function has a return type, then you can assign a variable to equal its returned value, if it is of the same type. In regards to scope, functions have local scope, meaning that they would alter outside variables, or variables in other functions. This means that, as shown here, you can call variables the same name in two different functions, and there will be no crossover or confusion of values or any conflicts.


%==============================================================================
\chapter{Language Reference Manual}
\label{manual}
\section{Introduction}
This manual describes the Sketch programming language patterned after the reference manual for the C programming language in Kernighan and Ritchie’s book, The C Programming Language.

\section{Lexical Convention}
ADD TEXT 
\subsection{Tokens}
There are 6 classes of tokens : identifiers, keywords, numerical constants, string literals, operators and other separators. Blanks, tabs,newlines and comments are ignored.Some white space is required to separated otherwise adjacent identifiers, keywords and constants.  
\subsection{Comments} 
The characters '\#' and '//' introduce a comment. They do not nest, and they do not occur within a string. Comments can be added anywhere else  in a given program. 
\subsection{Identifiers}
\label{ident}
 An identifier is a sequence of letters and digit. The first character must be a letter and there is not a restriction for the length of the sequence. The underscore \_ counts as a letter and there is difference between lower-case and upper-case letters. 

\subsection{Keywords}
The following identifiers are reserved for the use as keywords, and may not be used otherwise: 


\begin{center}
    \begin{tabular}{ | l | l | l | l | l |l|l|}
    \hline
    \textit{bool} & \textit{break} & \textit{clear} & \textit{continue}& \textit{do}  &  \textit{else} & \textit{false}\\
    \hline \textit{float} & \textit{for}& \textit{function} &
 
    \textit{if} & \textit{Line} & \textit{int} & \textit{not}\\ 
    \hline
    
    \textit{null} &
    \textit{Point} & \textit{Polygon} & \textit{return} & \textit{true}
     &
    \textit{void} & \textit{while} \\
    \hline

    \end{tabular}
\end{center}
\subsection{Constants}

\section{Meaning of Identifiers} 
\section{Conversions}
\section{Expressions}
\subsection{Primary Expressions}
Primary expressions are identifiers, numeric constants, boolean values,negation of primary expression, expressions in parenthesis, function calls, point declarations  and list of comma separated primary expressions.\\
An identifier is a primary expression if specified in a proper way, described in section \ref{ident}.\\ All numerical constants can be used as a primary expression.\\ Boolean values ``true'' and ``false'' can be used as primary expressions with comparison operators.\\ A parenthesized expression is primary expression as long as it represents a valid expression.\\ Functions calls are primary expressions as long as they corresponds to a function definition provided in the source code. \\Point declarations are valid primary  if they are surrounded by braces and each of the component are comma separated.\\ A list of comma separated primary expression is used only when the function draw() is called.  

\subsection{Expressions}
\label{expr-man}
Expressions are from the following types : additive, multiplicative, comparison, equality and assignment expressions. Expressions with logical operators \textbf{AND} and \textbf{OR} are also present. Operators for decrement and increment are also considered as expressions. 
\begin{lstlisting}
exp
    :prim_expr
    | prim_expr PLUS exp 
    | prim_expr MINUS exp
    | prim_expr ASTERIX  exp
    | prim_expr DIV exp  
    | prim_expr PERCENT exp 
    | prim_expr OP_ADD_ASSIGNMENT exp 
    | prim_expr OP_SUB_ASSIGNMENT exp 
    | prim_expr OP_MULT_ASSIGNMENT exp
    | prim_expr OP_DIV_ASSIGNMENT exp 
    | prim_expr OP_MOD_ASSIGNMENT exp 
    | prim_expr OP_INC  
    | prim_expr OP_DEC  
    | prim_expr OP_AND exp 
    | prim_expr OP_OR  exp 
    | prim_expr OP_EQ exp 
    | prim_expr LT exp 
    | prim_expr GT  exp
    | prim_expr OP_NE exp
    | prim_expr OP_LE exp
    | prim_expr OP_GE exp
    | prim_expr ASSIGN exp     
    }
      
\end{lstlisting}
Expressions with the additive operators \textbf{+} (PLUS) and \textbf{-} (MINUS) group left-to-right. The result of the \textit{PLUS} is the sum of the operands. The result of the \textit{MINUS} is the difference of the operands.

Expressions with multiplicative operators \textbf{*} (ASTERIX), \textbf{\textbackslash } (DIV) and \textbf{\%} (PERCENT)  group left-to-right. The \textit{ASTERIX} operator denotes multiplication. The  \textit{DIV} operator yields the quotient, and the \textit{PERCENT} operator the remainder, of the division of the first operand by the second.

There are several expressions with assignment operators( = , += , -= , *= , \textbackslash= , \%= ). In the simple assignment with =, the old value is replaced with the new value of the expression.   An expression of the form exp1 op= exp2 is equivalent to exp1 = exp1 op exp2, In the simple assignment with =, the old value is replaced with the new value of the expression.  An expression of the form exp1 op = exp2 except that exp1 is evaluated only once. \textbf{Need some help here, not able to format it properly}

There are 6 comparison operators in Sketch - ?= (check for equality) , ?\textless (check for less than) , ?\textgreater (check for greater than) , != (check for inequality ) , !\textgreater(check for less than or equal), !\textless (check for greater than or equal). All of them return either \textbf{true} or \textbf{false}. 

Operators \textbf{++} and \textbf{- -} decrements or increments the value of the operand after which they are place by one.

The \textbf{OP\_AND} operator groups left-to-right. It returns \textbf{true}  if both its operands compare to \textbf{true}, \textbf{false} otherwise. THe \textbf{OP\_OR} operator also groups left-to-right. If returns \textbf{true} if either of it operands compare unequal to \textbf{false}, and \textbf{true} otherwise. 
\subsection{Primary Expressions}
Primary expressions are identifiers, numeric constants, boolean values,negation of primary expression, expressions in parenthesis, function calls, point declarations  and list of comma separated primary expressions.\\
An identifier is a primary expression if specified in a proper way, described in section \ref{ident}.\\ All numerical constants can be used as a primary expression.\\ Boolean values ``true'' and ``false'' can be used as primary expressions with comparison operators.\\ A parenthesized expression is primary expression as long as it represents a valid expression.\\ Functions calls are primary expressions as long as they corresponds to a function definition provided in the source code. \\Point declarations are valid primary  if they are surrounded by braces and each of the component are comma separated.\\ A list of comma separated primary expression is used only when the function draw() is called.  

\section {Declarations}
\subsection{Variable and function declarations}
There are two types of declarations - in-decl (used for variable declaration) and out-decl (used for function declaration).
\begin{lstlisting}
out-decl
  :FUNCTION declarator declaration_list func_return body 
  ;

in-decl 
  : param ASSIGN exp semi
  | param semi 
    
;
\end{lstlisting}

Function declarations begin with \textbf{function} keyword followed by declarator (which is identifier, specifying the name of the function) followed by declaration\_list, func\_return and body. 
Declaration list can be empty  or  a list of parameters (param\_list),which specifies the type and identifier of different parameters passed to the function separated by comma. Function return consist of ``-\textgreater'' and the return type of the function.The return type can be any on the return types of the language specified in Section \ref{types_man} or can be omitted, which means that the function is implicitly void. Function body (body)  is described in Section \ref{body}

Variable declaration consist of type and identifier (param) or type and identifier (param) followed by ``='' and expression. At the end of both of these declaration optional semicolon can be placed. 
\begin{lstlisting}
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
\end{lstlisting}
\subsection{Types}
\label{types_man}
The types of Sketch are \textbf{void ,int, float, bool, Point, Line} and \textbf{Polygon}.
\begin{lstlisting}
type
   :VOID 
   |INT
   |FLOAT 
   |BOOL
   |POINT
   |LINE
   |POLYGON
;

\end{lstlisting}
\section {Statements}
Statements are executed in sequence. A statement can be expression, a sequence of statements surrounded by braces(body), function declarations, condition statements, iteration statements and jump statements.

\begin{lstlisting}

statement
  : exp semi
  | body
  | function
  | condition_statements
  | iteration_statements
  | jump_statements

;

\end{lstlisting}

\subsection{Expressions} 
Expression are every statement describe in Section \ref{expr-man} followed by semicolon or not. All the side effects form the expression are completed before the next statement is executed. Most of them are assignments. 

\subsection{Body}
\label{body}
Body is every sequence of declarations and/or statements surrounded by braces. The body cannot be used on is own. It should be used as  function body or as body after condition statements or iteration statements. The body can be empty(i.e no declaration and statements in it), but is not recommended as it would not provide any functionality. 
\begin{lstlisting}

body
  : OPEN_BRACE CLOSE_BRACE
  | OPEN_BRACE statement_list CLOSE_BRACE
  | OPEN_BRACE decl_list CLOSE_BRACE
  | OPEN_BRACE decl_list statement_list CLOSE_BRACE
;


\end{lstlisting}


\subsection{Function declarations}
Function declarations can be used as only when they are defined within Sketch's two main functions(init() and render() ); Most of them should have a function body (\ref{body}), but functions with empty body are allowed as well, even though not recommended since they do not provide any functionality. More information about functions can be fount in Section ??.

\subsection{Condition statements} 
Condition statements are if statement or if statement followed by else clause.  They choose one of several flows of control.
\begin{lstlisting}

condition_statements  
  : IF OPEN_PARENS exp CLOSE_PARENS statement %prec IF_WITHOUT_ELSE
  | IF OPEN_PARENS exp CLOSE_PARENS statement ELSE statement 
  ;
\end{lstlisting}

The expression of this clauses should return boolean values, any other values is invalid. A given \textit{else} is connected with the last encountered \textit{else}-less \textit{if}. 

\subsection{Iteration statements}
Iteration statements specify looping. There are three types of loops in Sketch. 
\begin{lstlisting}
iteration_statements  
  : WHILE OPEN_PARENS exp CLOSE_PARENS statement
  | DO statement WHILE OPEN_PARENS exp CLOSE_PARENS semi
  | FOR OPEN_PARENS in-decl semi exp semi exp CLOSE_PARENS statement
;
\end{lstlisting}
In the \textit{while} and \textit{do} statements, the sub-statement is execute repeatedly as long as the value of expression is equal to \textit{true}, the expression must use comparison operators. With \textit{while}, the test, including all side effects from the expression, occurs before each execution of statement. With \textit{do}, the test follows each iteration. 

In the \textit{for} statements, the declarations specifies initialization the loop. The first expression must evaluate to a boolean value and it is evaluated before each iteration. If its value is \textit{false}, the \textit{for} loop is terminated. The second expression is evaluated after each iteration and specifies a reinitialization for the loop. For this statement to be valid, the declaration and two expressions should be present. Otherwise, it is an invalid statement. 
\subsection{Jump statements} 
Jump statements transfer control unconditionally. 
\begin{lstlisting}
jump_statements 
  : CONTINUE semi
  | BREAK semi 
  | RETURN exp  semi 
  | RETURN  semi 
;
\end{lstlisting}
Each of the jump statements are followed by optional semicolon. 

A \textit{continue} statement may appear only within and iteration statement. It causes control to pass to the loop-continuation portion of the smallest enclosing such statement.

A \textit{break} can appear only in iteration statement. It cause the terminations of such statements. 

A function returns to its caller by the two types of the \textit{return} statement. When \textit{return} is followed by an expression, the value is returned to the caller of the function. Otherwise, when there is no expression to be returned, the return value is undefined. 

\section{The last one I think}

%==============================================================================
\chapter{Source Listing}
\label{appa}

Includes full source listing of compiler


%==============================================================================
\bibliographystyle{plain}
\bibliography{example}
\end{document}
