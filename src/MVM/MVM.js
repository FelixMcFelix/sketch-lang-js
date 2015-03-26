// M Bytecode interperator

var MVM = function(glctx, manager, codeStore, constantPool, debugMode) {

	/*	Op codes
	*	
	*	MNEMONIC	OPERANDS	DESCRIPTION
	*	STOREG		2			store global at address
	*	LOADG		1			push global at address
	*	STOREL		1			store local at address
	*	LOADL		1			push local at local address
	*	LOADC		1			push constant
	*	IADD		0			i = pop off stack. j = pop off stack. push j + i
	*	ISUB		0			i = pop off stack. j = pop off stack. push j - i
	*	IMUL		0			i = pop off stack. j = pop off stack. push j * i
	*	IDIV		0			i = pop off stack. j = pop off stack. push j / i
	*	FADD		0			i = pop off stack. j = pop off stack. push j + i
	*	FSUB		0			i = pop off stack. j = pop off stack. push j - i
	*	FMUL		0			i = pop off stack. j = pop off stack. push j * i
	*	FDIV		0			i = pop off stack. j = pop off stack. push j / i
	*	NCMPEQ		0			i = pop off stack. j = pop off stack. push result of j == i
	*	NCMPLT		0			i = pop off stack. j = pop off stack. push result of j < i
	*	NCMPGT		0			i = pop off stack. j = pop off stack. push result of j > i
	*	JUMP		1			jump to address
	*	JUMPT		1			pop value off stack. Jump to address if value == 1
	*	JUMPF		1			pop value off stack. Jump to address if value == 0
	*	CALL		2			arg 1 = address of function. arg2 = number of params
	*	RETURN		1			Takes the number of values to return

	*	LOADIDX		2			arg1 = index into the constant pool. arg2 = index into the array.
	*/

	/*
	*	Struct layouts
	*	
	*				  x    y
	*	Point 		[100, 150]
	*
	*				  r    g   b   a   x1  y1  x2  y2
	*	Line 		[ 0 ,  0 ,255,255,100,100,200,200]
	*
	*				  r    g   b   a   x1  y1  x2  y2  x3  y3 	0 or More points
	*	Polygon 	[ 0 ,  0 ,255,255,100,100,200,200,150, 0 ,.............]
	*
	*/

	var opCodes = {
		STOREG: 0,
		LOADG: 	1,
		STOREL: 2,
		LOADL: 	3,
		LOADC: 	4,
		IADD: 	5,
		ISUB: 	6,
		IMUL: 	7,
		IDIV: 	8,
		IMOD: 	9,
		FADD: 	10,
		FSUB: 	11,
		FMUL: 	12,
		FDIV: 	13,
		FMOD: 	14,
		LOADIDX:15,
		SETIDX: 16,
		NCMPEQ: 17,
		NCMPLT: 18,
		NCMPGT: 19,
		JUMP: 	20,
		JUMPT: 	21, 
		JUMPF: 	22,
		CALL: 	23, 
		RETURN: 24,
		LNDRAW: 25,
		PGDARW: 26,
		RENDER: 27,
		CLEAR: 	28,
		PTADD: 	29,
		LNTOPG: 30,
		LNMUL:  31,
		PRINTST:32,
		PRINTS: 33,
		EXIT: 	34
	};

	var glctx = glctx;
	var manager = manager;

	var lastRender;

	// Loop Counter - For debugging
	var lc = 0;

	// Points to the next instruction in the code store to execute
	var cp = 0;

	// Points to the first free location after the program
	var cl;

	// Data store (Stack)
	this.dataStore = [];

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

	var needsUpdate = 0;

	var needsClear = 0;

	this.interpret = function() {

		var dataStore = this.dataStore;

		cl = codeStore.length;

		//var opCodes = this.opCodes;
		while (cp < cl && needsUpdate == 0) {
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
					dataStore[fp + localAddress + 2] = dataStore[sp];
					sp++;
					if(debugMode) console.log("STOREL: " + dataStore[sp - 1] + " " + localAddress);
					break;
				case opCodes.LOADL:
					var localAddress = codeStore[cp];
					cp++;
					dataStore[sp] = dataStore[fp + localAddress + 2];
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
					dataStore.splice(sp, 1);
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
				case opCodes.IMOD:
					sp--;
					var i = Math.floor(dataStore[sp]);
					sp--;
					var j = Math.floor(dataStore[sp]);
					var result = Math.floor(j % i);
					dataStore[sp] = result;
					sp++;
					if(debugMode) console.log("IMOD: " + j + " % " + i + " = " + result);
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
				case opCodes.FMOD:
					sp--;
					var i = dataStore[sp];
					sp--;
					var j = dataStore[sp];
					var result = j % i;
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
					while(i > 0) {
						i--;
						dataStore[sp] = args[i];
						sp++;
					}
					// jump to address
					cp = address;
					if(debugMode) console.log("CALL: " + address + " " + numArgs);
					break;
				case opCodes.RETURN:
					var shouldReturnValue = codeStore[cp];
					var returnValue;
					if (shouldReturnValue) {
						returnValue = dataStore[sp - 1]
					}
					var returnAddress = dataStore[fp + RA];
					var firstElement = fp;
					if (shouldReturnValue) {firstElement++;}
					var elementsInFrame = sp - fp;
					cp = returnAddress;
					sp = fp;
					fp = dataStore[fp + DLA];
					dataStore[sp] = returnValue;
					sp++;
					dataStore.splice(firstElement,elementsInFrame);
					if(debugMode) console.log("RETURN: " + numArgs + " returnValue: " + returnValue);
					break;
				case opCodes.LNDRAW:
					// Get line
					sp--;
					var lineAddress = dataStore[sp];
					var lineStruct = constantPool[lineAddress];
					var r = lineStruct[0];
					var g = lineStruct[1];
					var b = lineStruct[2];
					var a = lineStruct[3];
					var pt1x = lineStruct[4];
					var pt1y = lineStruct[5];
					var pt2x = lineStruct[6];
					var pt2y = lineStruct[7];
					var theLine = new Float32Array([pt1x,pt1y,0,
													pt2x,pt2y,0]);
					var theColor = new Float32Array([r,g,b,a]);
					var prog = manager.getProgram("square", "square");
					prog.setDrawMode(Palette.Program.LINES);
					prog.draw(theLine, {width:[glctx.canvas.width], height: [glctx.canvas.height]}, {color: theColor})
					if(debugMode) console.log("LNDRAW: " + lineStruct);
					break;
				case opCodes.PGDARW:
					var polygonAddress = codeStore[cp];
					cp++;
					var polygonStruct = constantPool[polygonAddress];
					var r = polygonStruct[0];
					var g = polygonStruct[1];
					var b = polygonStruct[2];
					var a = polygonStruct[3];
					var theColor = Float32Array([r,g,b,a]);

					var points = [];
					var i;
					for (i = 4; i < polygonStruct.length; i+=2) {
						var pt = [polygonStruct[i],polygonStruct[i+1]];
					}
					var prog = manager.getProgram("square", "square");
					prog.setDrawMode(Palette.Program.POLYGON);
					prog.draw(points, {}, {color: theColor});
					break;
				case opCodes.RENDER:
					needsUpdate = 1;
					break;
				case opCodes.CLEAR:
					needsClear = 1;
					glctx.clearColor(0.0,0.0,0.0,1.0);
					glctx.clear(glctx.COLOR_BUFFER_BIT|glctx.DEPTH_BUFFER_BIT);
					break;
				case opCodes.REQAN:
					needsUpdate = 1;
					break;
				case opCodes.EXIT:
					cp = cl;
					console.log("EXIT");
					break;
				case opCodes.PRINTST: // Print top of stack
					if(debugMode) console.log(dataStore[sp - 1]);
					break;
				case opCodes.PRINTS: // Print top of stack
					if(debugMode) console.log(dataStore);
					break;
				case opCodes.LOADIDX:
					var constPoolindex = codeStore[cp];
					cp++;
					var arrayIndex = codeStore[cp];
					cp++;
					var arr = constantPool[constPoolindex];
					var value = arr[arrayIndex];
					dataStore[sp] = value;
					sp++;
					break;
				case opCodes.SETIDX:
					var constPoolindex = codeStore[cp];
					cp++;
					var arrayIndex = codeStore[cp];
					cp++;
					var arr = constantPool[constPoolindex];
					sp--;
					var value = dataStore[sp];
					arr[arrayIndex] = value;
					break;
				case opCodes.LNTOPG:
					sp--;
					var lineAddress = dataStore[sp];
					sp--;
					var numSides = dataStore[sp];
					var line = constantPool[lineAddress];
					var polygon = line.slice(0);
					var i = 2;
					var angle = 360 / numSides;
					var pt1xIdx = 0;
					var pt1yIdx = 1;
					var pt2xIdx = 2;
					var pt2yIdx = 3;
					var pt3xIdx = 4;
					var pt3yIdx = 5;
					while(i < numSides) {
						var pivot = [polygon[pt1xIdx],polygon[pt1yIdx]];
						var point = [polygon[pt2xIdx],polygon[pt2yIdx]];
						var newpt = rotatePoint(pivot,point,angle);
						// Shift new point
						offSetx = polygon[pt1xIdx] - polygon[pt2xIdx];
						offSety = polygon[pt1yIdx] - polygon[pt2yIdx];
						newpt[0] -= offSetx;
						newpt[1] -= offSety;
						// Add new point to polygon
						polygon[pt3xIdx] = newpt[0];
						polygon[pt3yIdx] = newpt[1];
						pt1xIdx += 2;
						pt1yIdx += 2;
						pt2xIdx += 2;
						pt2yIdx += 2;
						pt3xIdx += 2;
						pt3yIdx += 2;

						i++;
					}
					break;
				case opCodes.PTADD:
					sp--;
					var pt2Address = dataStore[sp];
					var pt2 = constantPool[pt2Address];
					sp--;
					var pt1Address = dataStore[sp];
					var pt1 = constantPool[pt1Address];
					var line = [pt1[0],pt1[1],pt2[0],pt2[1]];
					var lineAddress = codeStore[cp];
					cp++;
					constantPool[lineAddress] = line;
					break;
				case opCodes.LNMUL:
					sp--;
					var mulValue = dataStore[sp];
					sp--;
					var lineAddress = dataStore[sp];
					var line = constantPool[lineAddress];
					pt1x = line[4];
					pt1y = line[5];
					pt2x = line[6];
					pt2y = line[7];

					var xDist = pt2x - pt1x;
					var yDist = pt2y - pt1y;

					var xLen = (xDist * mulValue) - xDist; 
					var yLen = (yDist * mulValue) - yDist; 

					var targetLineAddress = codeStore[cp];
					cp++;

					var newLine = line.slice(0);
					newLine[6] += xLen;
					newLine[7] += yLen;
					constantPool[targetLineAddress] = newLine;

					break;
			}
			//console.log("cp:"+cp+"sp:"+sp+"fp"+fp);
			if(debugMode) console.log(JSON.stringify(dataStore));
			lc++;
			if (/*lc > 50*/0) {console.log("INF LOOP");break};
		}
		if (needsUpdate) {render();}
	};

	render = function() {
		if (needsClear) {
			needsClear = 0;
			glctx.clearColor(0.0,0.0,0.0,1.0);
			glctx.clear(glctx.COLOR_BUFFER_BIT|glctx.DEPTH_BUFFER_BIT);
		}
		needsUpdate = 0;
		window.requestAnimationFrame(window.mvm.interpret);
	}

	function rotatePoint(pivot, point, angle) {
		// Get origin x, y
		var pivx = pivot[0];
		var pivy = pivot[1];
		// Get point x, y
		var ptx = point[0];
		var pty = point[1];
		// Get sin and cos of angle
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		// Translate point back to origin
		ptx -= pivx;
		pty -= pivy;
		// Rotate point
		var newx = ptx * c - pty * s;
		var newy = ptx * s + pty * c;
		// Translate new point back
		newx += pivx;
		newy += pivy;
		// Create new point
		var newPt = [newx,newy];
		return newPt;
	}
}
