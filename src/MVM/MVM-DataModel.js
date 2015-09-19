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
	this.root = new MVM.DataModel.StackFrame(null);
	this.stack = [this.root];
}

MVM.DataModel.prototype = {
	current: function(){
		try{
			return this.stack[this.stack.length - 1];
		} catch(e){
			return undefined;
		}
	},

	relative: function(count){
		var cursor = this.current();
		while(count>0 && cursor && cursor.parent){
			cursor = cursor.parent;
			count--;
		}

		if(count>0) throw "Invalid relative call - too few parents.";

		return cursor;
	},

	enter: function(){
		var tmp = new MVM.DataModel.StackFrame(this.current());
		this.stack[this.stack.length - 1] = tmp;

		return this;
	},

	exit: function(){
		if(this.current() !== this.root){
			this.stack[this.stack.length - 1] = this.current().parent;
		} else{
			throw "Tried to exit from scope past root level."
		}

		return this;
	},

	call: function(argc, rel, ret){
		var prev = this.current();
		var parent = this.relative(rel);
		this.stack.push(new MVM.DataModel.StackFrame(parent));

		var c = this.current();
		c.returnAddr = ret;

		while (argc>0){
			c.setVar(argc-1, prev.pop());	
			argc--;
		}

		return this;
	},

	funcreturn: function(value){
		var p = this.stack.pop();
		
		if (value!==null) {
			this.stack.current().push(value);
		};

		return p.returnAddr;
	}
}

/**
 * @classdesc An individual stack frame used by the {@link MVM.DataModel}.
 * @class MVM.DataModel.StackFrame
 * @public
 * @author FelixMcFelix (Kyle S.)
 */
MVM.DataModel.StackFrame = function(parent){
	this.parent = parent;
	this.variables = [];
	this.stack = [];
	this.returnAddr = undefined;
}

MVM.DataModel.StackFrame.prototype = {
	push: function(value){
		this.stack.push(value);

		return this;
	},

	pop: function(){
		return this.stack.pop();
	},

	peek: function(){
		try {
			return this.stack[this.stack.length-1];
		} catch (e){
			return undefined;
		}
	},

	setVar: function(varNo, val){
		this.variables[varNo] = val;

		return this;
	},

	getVar: function(varNo){
		return this.variables[varNo];
	}
}