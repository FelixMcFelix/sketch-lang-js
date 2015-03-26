/**
 * @namespace Sketch
 */
var Sketch = Sketch || {};

/**
 * @method Sketch.createSketch
 * @param inCanvas
 * @returns {Sketch.Driver}
 * @public
 */
Sketch.createSketch = function(inCanvas){
	var out = new Sketch.Driver(inCanvas);
	out.addShader("shaders/simpleSquareShader.json");
	return out;
};