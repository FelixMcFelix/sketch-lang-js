/**
 * @namespace MVM
 */

var MVM = MVM || {};


/**
 * @classdesc The data management subsystem of MVM. It works by maintaining a stack of scope frames - themselves parts of a wider scope tree. Variable modifications are made by chaining up parent scopes when necessary.
 * @class MVM.DataModel
 * @public
 * @author FelixMcFelix (Kyle S.)
 */
MVM.DataModel = function(){
	this.root = new MVM.StackFrame(null);
	this.stack = [this.root];
}

MVM.DataModel.prototype = {
	/**
	 * Retrieve the currently active scope frame.
	 * @method MVM.DataModel#current
	 * @return {MVM.StackFrame}
	 * @public
	 */
	current: function(){
		try{
			return this.stack[this.stack.length - 1];
		} catch(e){
			return undefined;
		}
	},

	/**
	 * Retrieve the scope frame a set height above the current frame, where 0 retrieves the current frame.
	 * @method MVM.DataModel#relative
	 * @param {number} count - the target relative height to retrieve a scope frame from.
	 * @return {MVM.StackFrame}
	 * @public
	 */
	relative: function(count){
		var cursor = this.current();
		while(count>0 && cursor && cursor.parent){
			cursor = cursor.parent;
			count--;
		}

		if(count>0) throw "Invalid relative call - too few parents.";

		return cursor;
	},

	/**
	 * Enter a new {@link MVM.StackFrame} - signifying a new block scope.
	 * @method MVM.DataModel#enter
	 * @return {MVM.DataModel} Returns self to allow for some degree of method chaining.
	 * @public
	 */
	enter: function(){
		var tmp = new MVM.StackFrame(this.current());
		this.stack[this.stack.length - 1] = tmp;

		return this;
	},

	/**
	 * Leave the current {@link MVM.StackFrame} - signifying an end to a block scope.
	 * @method MVM.DataModel#exit
	 * @return {MVM.DataModel} Returns self to allow for some degree of method chaining.
	 * @public
	 */
	exit: function(){
		if(this.current() !== this.root){
			this.stack[this.stack.length - 1] = this.current().parent;
		} else{
			throw "Tried to exit from scope past root level."
		}

		return this;
	},

	/**
	 * Call a function at another point in the code, moving any relevant data into the new {@link MVM.StackFrame}.
	 * @method MVM.DataModel#call
	 * @param {number} argc - the amount of arguments to copy into the new scope.
	 * @param {number} rel - the relative height in scope frames of where the function declaration occurred.
	 * @param {number} ret - the address the {@link MVM.VM} must return to once the function ends.
	 * @return {MVM.DataModel} Returns self to allow for some degree of method chaining.
	 * @public
	 */
	call: function(argc, rel, ret){
		var prev = this.current();
		var parent = this.relative(rel);
		this.stack.push(new MVM.StackFrame(parent));

		var c = this.current();
		c.returnAddr = ret;

		while (argc>0){
			c.setVar(argc-1, prev.pop());	
			argc--;
		}

		return this;
	},

	/**
	 * Return from the current function, moving back to the original scope.
	 * @method MVM.DataModel#funcreturn
	 * @param {*} value - the value to place into the {@link MVM.StackFrame} which we are returning to.
	 * @return {number} The return address that the {@link MVM.VM} must utilise.
	 * @public
	 */
	funcreturn: function(value){
		var p = this.stack.pop();
		
		if (value!==null) {
			this.current().push(value);
		};

		return p.returnAddr;
	}
}

/**
 * @classdesc An individual stack frame used by the {@link MVM.DataModel}.
 * @class MVM.StackFrame
 * @public
 * @author FelixMcFelix (Kyle S.)
 */
MVM.StackFrame = function(parent){
	this.parent = parent;
	this.variables = [];
	this.stack = [];
	this.returnAddr = undefined;
}

MVM.StackFrame.prototype = {
	/**
	 * Push a new value to the top of the stack.
	 * @method MVM.StackFrame#push
	 * @param {*} value - the value to place onto the top of the stack.
	 * @return {MVM.StackFrame} Returns self to allow for some degree of method chaining.
	 * @public
	 */
	push: function(value){
		this.stack.push(value);

		return this;
	},

	/**
	 * Pop off the top value from the stack, and return it.
	 * @method MVM.StackFrame#pop
	 * @return {*} The value retrieved from the top of the stack.
	 * @public
	 */
	pop: function(){
		return this.stack.pop();
	},

	/**
	 * Return the top value of the stack without modifying the frame's state.
	 * @method MVM.StackFrame#peek
	 * @return {*} The value retrieved from the top of the stack.
	 * @public
	 */
	peek: function(){
		try {
			return this.stack[this.stack.length-1];
		} catch (e){
			return undefined;
		}
	},

	/**
	 * Set a variable in this stack frame to a given value.
	 * @method MVM.StackFrame#setVar
	 * @param {number} varNo - the index of the variable's location.
	 * @param {*} value - the value to place into the variable store.
	 * @return {MVM.StackFrame} Returns self to allow for some degree of method chaining.
	 * @public
	 */
	setVar: function(varNo, val){
		this.variables[varNo] = val;

		return this;
	},

	/**
	 * Get the value of a variable in this stack frame.
	 * @method MVM.StackFrame#getVar
	 * @param {number} varNo - the index of the variable's location.
	 * @return {*} The value obtained from the specified variable index.
	 * @public
	 */
	getVar: function(varNo){
		return this.variables[varNo];
	}
}