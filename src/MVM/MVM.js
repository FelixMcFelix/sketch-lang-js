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