var MVM = MVM || {};

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

	call: function(argc, rel){
		var prev = this.current();
		var parent = this.relative(rel);
		this.stack.push(new MVM.DataModel.StackFrame(parent));

		while (argc>0){
			this.current()
				.setVar(argc-1, prev.pop());	
			argc--;
		}

		return this;
	},

	funcreturn: function(value){
		this.stack.pop();

		this.stack.current.push(value);

		return this;
	}
}

MVM.DataModel.StackFrame = function(parent){
	this.parent = parent;
	this.variables = [];
	this.stack = [];
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