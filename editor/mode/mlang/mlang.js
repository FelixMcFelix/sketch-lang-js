CodeMirror.defineSimpleMode("mlang",{
    start:[
        {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},
		{regex: /(function)(\s+)([a-z$][\w$]*)/,
			token: ["keyword", null, "variable-2"]},
		{regex: /#.*/, token: "comment"},
		{regex: /\/\/.*/, token:"comment"},
		{regex: /true|false/, token: "atom"},
		{regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
			token: "number"},
		{regex: /\/(?:[^\\]|\\.)*?\//, token: "variable"},
		{regex: /\b(?:function|return|if|for|while|else|do|this|draw|clear)\b/, token: "keyword"},
		{regex: /\b(?:int|float|bool|string|Line|Point|Polygon)\b/, token: "keyword"},
		{regex: /\b(?:vector\([234]\))\b/, token: "keyword"},
		{regex: /[-+\/*=<>!]+/, token: "operator"},
		{regex: /[a-z$][\w$]*/, token: "variable"},
		{regex: /([a-z$][\w$]*)(?=(\s*)\()/, token:"keyword"}
    ],
    comment:[

    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});