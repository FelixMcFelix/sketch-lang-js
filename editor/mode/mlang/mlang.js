CodeMirror.defineSimpleMode("mlang",{
    start:[
        {regex: /"(?:[^\\]|\\.)*?"/, token: "string"}
    ],
    comment:[
        {regex: /#.*/, tag: "comment", next:"start"}
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});