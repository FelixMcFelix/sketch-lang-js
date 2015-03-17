// M Bytecode interperator

var MVM = function() {

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
		RETURN: 20 
	};

	// Holds program instructions
	this.codeStore =	[this.opCodes.LOADC,	16,
						 this.opCodes.STOREG,	0,		// 	LIMIT = 10
						 this.opCodes.LOADC,	0,
						 this.opCodes.STOREL,	0,		//	i = 0
						 this.opCodes.LOADC,	2,
						 this.opCodes.STOREL,	1,		//	j = 1
						 this.opCodes.LOADL,	0,
						 this.opCodes.LOADG,	0,
						 this.opCodes.NCMPLT,			//	i < LIMIT
						 this.opCodes.JUMPF,	35,
						 this.opCodes.LOADL,	1,
						 this.opCodes.LOADC,	2,
						 this.opCodes.IMUL,
						 this.opCodes.STOREL,	1,		//	j = j * 2
						 this.opCodes.LOADL,	0,
						 this.opCodes.LOADC,	1,
						 this.opCodes.IADD,
						 this.opCodes.STOREL,	0,		//	i++
						 this.opCodes.JUMP,		12,		//	JUMP
						 this.opCodes.LOADL,	1,
						 999];	//					37

	// Points to the next instruction in the code store to execute
	this.cp = 0;

	// Points to the first free location after the program
	this.cl = 38;

	// Data store (Stack)
	this.dataStore = [];

	// Points to the first free space at the top of the data store
	this.sp = 0;

	// Points to the first location of the top most frame
	this.fp = 0;

	// Local Offset. The off set of the first local address from the frame pointer
	this.LO = 2;

	// Address of the dynamic link in a frame
	this.DLA = 0;

	// Retrun address of a frame
	this.RA = 1;

	// Global data store
	this.globalStore = [];

	// (May not be required)
	// Points to the first free space at the top of the global store
	//var gp = 0;

	// Prints details to the console. For Debugging
	this.debugMode = 0;

/*
*		Need a way to determine the size of each frame.
*		Maybe all data local to a frame is stored before anything is pushed onto the stack for that frame.
*/
	this.interpret = function() {

		// For debugging
		var lc = 0;

		var opCodes = this.opCodes;
		while (this.cp < this.cl) {
			lc++
			var opCode = this.codeStore[this.cp];
			//console.log(this.cp + " " + opCode);
			this.cp++;
			switch (opCode) {
				case opCodes.STOREG:
					var address = this.codeStore[this.cp]
					this.cp++;
					this.sp--;
					var i = this.dataStore[this.sp];
					this.globalStore[address] = i;
					if(this.debugMode) console.log("STOREG: " + i + " " + address);
					break;
				case opCodes.LOADG:
					var address = this.codeStore[this.cp];
					this.cp++;
					this.dataStore[this.sp] = this.globalStore[address];
					this.sp++;
					if(this.debugMode) console.log("LOADG: " + i + " " + address);
					break;
				case opCodes.STOREL:
					var localAddress = this.codeStore[this.cp];
					this.cp++;
					this.sp--;
					this.dataStore[this.fp + localAddress] = this.dataStore[this.sp];
					this.sp++;
					if(this.debugMode) console.log("STOREL: " + this.dataStore[this.sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADL:
					var localAddress = this.codeStore[this.cp];
					this.cp++;
					this.dataStore[this.sp] = this.dataStore[this.fp + localAddress];
					this.sp++;
					if(this.debugMode) console.log("LOADL: " + this.dataStore[this.sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADC:
					var contsant = this.codeStore[this.cp];
					this.cp++;
					this.dataStore[this.sp] = contsant;
					this.sp++;
					if(this.debugMode) console.log("LOADC: " + contsant);
					break;
				case opCodes.IADD:
					this.sp--;
					var i = Math.floor(this.dataStore[this.sp]);
					this.sp--;
					var j = Math.floor(this.dataStore[this.sp]);
					var result = j + i
					this.dataStore[this.sp] = result;
					this.sp++
					if(this.debugMode) console.log("IADD: " + j + " + " + i + " = " + result);
					break;
				case opCodes.ISUB:
					this.sp--;
					var i = Math.floor(this.dataStore[this.sp]);
					this.sp--;
					var j = Math.floor(this.dataStore[this.sp]);
					var result = j - i;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("ISUB: " + j + " - " + i + " = " + result);
					break;
				case opCodes.IMUL:
					this.sp--;
					var i = Math.floor(this.dataStore[this.sp]);
					this.sp--;
					var j = Math.floor(this.dataStore[this.sp]);
					var result = j * i;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("IMUL: " + j + " * " + i + " = " + result);
					break;
				case opCodes.IDIV:
					this.sp--;
					var i = Math.floor(this.dataStore[this.sp]);
					this.sp--;
					var j = Math.floor(this.dataStore[this.sp]);
					var result = Math.floor(j / i);
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("IDIV: " + j + " / " + i + " = " + result);
					break;
				case opCodes.FADD:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = j + i;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("FADD: " + j + " + " + i + " = " + result);
					break;
				case opCodes.FSUB:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					this.dataStore[this.sp] = j - i;
					this.sp++;
					if(this.debugMode) console.log("FSUB: " + j + " - " + i + " = " + result);
					break;
				case opCodes.FMUL:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = j * i;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("FMUL: " + j + " * " + i + " = " + result);
					break;
				case opCodes.FDIV:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = j / i;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("FMUL: " + j + " / " + i + " = " + result);
					break;
				case opCodes.NCMPEQ:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = (j == i) ? 1 : 0;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("NCMPEQ: " + j + " == " + i + " = " + result);
					break;
				case opCodes.NCMPLT:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = (j < i) ? 1 : 0;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("NCMPLT: " + j + " < " + i + " = " + result);
					break;
				case opCodes.NCMPGT:
					this.sp--;
					var i = this.dataStore[this.sp];
					this.sp--;
					var j = this.dataStore[this.sp];
					var result = (j > i) ? 1 : 0;
					this.dataStore[this.sp] = result;
					this.sp++;
					if(this.debugMode) console.log("NCMPLT: " + j + " > " + i + " = " + result);
					break;
				case opCodes.JUMP:
					var address = this.codeStore[this.cp];
					this.cp = address;
					if(this.debugMode) console.log("JUMP: " + address);
					break;
				case opCodes.JUMPT:
					var address = this.codeStore[this.cp];
					this.sp--;
					var i = this.dataStore[this.sp];
					result = i == 1;
					if (result) {
						this.cp = this.codeStore[this.cp];
					}
					else {
						this.cp++;
					}
					if(this.debugMode) console.log("JUMPT: " + i + " " + result);
					break;
				case opCodes.JUMPF:
					var address = this.codeStore[this.cp];
					this.sp--;
					var i = this.dataStore[this.sp];
					var result = i == 0;
					if(this.debugMode) console.log("JUMPF: " + i + " " + result);
					if (result) {
						this.cp = this.codeStore[this.cp];
					}
					else {
						this.cp++;
					}
					break;
				case opCodes.CALL:
					var address = this.codeStore[this.cp];
					cp++;
					var numArgs = this.codeStore[this.cp];
					cp++;
					var returnAddress = this.cp;
					var dynamicLink = this.fp;
					var args = [];
					// Copy Args
					int i = 0;
					while(i < numArgs) {
						sp--;
						args[i] = this.dataStore[sp];
						i++;
					}
					// Add new Frame
					this.fp = this.sp;
					this.dataStore[sp] = dynamicLink;
					this.sp++;
					this.dataStore[sp] = returnAddress;
					this.sp++;
					// Add args as locals
					while(i >= 0) {
						i--;
						this.dataStore[this.sp] = arg[i];
						sp++;
					}
					break;
				case opCodes.RETURN:
					
				case 999: // Print top of stack
					if(this.debugMode) console.log(this.dataStore[this.sp - 1]);
					break;
			}
			lc++;
			if (lc > 100000) {console.log("INF LOOP");break};
		}
	}
}