/**
 * @namespace Sketch
 */
var Sketch = Sketch || {};

/**
 * Creates an instance of the Sketch module with standard configuration.
 * @method Sketch.createSketch
 * @param {HTMLCanvasElement} inCanvas
 * @returns {Sketch.Driver}
 * @public
 * @author FelixMcFelix (Kyle S.)
 */
Sketch.createSketch = function(inCanvas){
	var out = new Sketch.Driver(inCanvas);
	out.addShaderURL("shaders/sketch-default.json");
	return out;
};