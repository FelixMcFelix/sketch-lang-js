var configs = {
		srcDir: "./src/",
		destDir: "./build/",
		interDir: "./mid-build/",
		docsDir: "./docs/"
	},
	browserify = require("browserify"),
	gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	jison  = require("gulp-jison"),
	del    = require("del"),
	transform = require('vinyl-transform'),
	jsdoc  = require("gulp-jsdoc"),
	browserified = transform(function(filename) {
		var b = browserify({entries: filename, debug: true});
		return b.bundle();
	});

gulp.task("default", ["clean"], function(){
	gulp.start("build", "doc");
});


//BUILD TASKS
gulp.task("build",["build:Palette", "build:parser", "build:MVM","build:generator","build:Sketch","build:editor"], function(){
	return gulp.src(configs.interDir+"*.js")
			.pipe(concat("main.js"))
			.pipe(gulp.dest(configs.destDir))
			.pipe(rename({suffix: ".min"}))
			.pipe(uglify())
			.pipe(gulp.dest(configs.destDir));
});

gulp.task("build:parser", function(){
	return gulp.src([configs.srcDir+"grammar/MLang.jison"])
			.pipe(jison({moduleName: "sketchParse"}))
			//.pipe(gulp.rename("sketchParse.js"))
			.pipe(gulp.dest(configs.interDir));
});

gulp.task("build:Palette", function(){
	return gulp.src([configs.srcDir+"Palette/Palette.js",configs.srcDir+"Palette/*.js","./node_modules/earcut/src/earcut.js"])
			.pipe(concat("Palette.js"))
			//.pipe(browserified)
			.pipe(gulp.dest(configs.interDir));
			//.pipe(rename({suffix: ".min"}))
			//.pipe(uglify())
			//.pipe(gulp.dest(configs.destDir));
});

gulp.task("build:MVM", function(){
	return gulp.src([configs.srcDir+"MVM/*.js"])
			.pipe(concat("MVM.js"))
			.pipe(gulp.dest(configs.interDir));
});

gulp.task("build:generator", function(){
	return gulp.src([configs.srcDir+"Code Generator/*.js"])
			.pipe(concat("generator.js"))
			.pipe(gulp.dest(configs.interDir));
});

gulp.task("build:Sketch", function(){
	return gulp.src([configs.srcDir+"Sketch/Sketch.js",configs.srcDir+"Sketch/*.js"])
			.pipe(concat("Sketch.js"))
			.pipe(gulp.dest(configs.interDir));
});

gulp.task("build:editor", function(){
	//Copy shaders/ into editor/, so that it has the latest copy of the module's shaders.
	return gulp.src("shaders/*.json")
		.pipe(gulp.dest("./editor/shaders/"));
});

//CLEAN TASKS
gulp.task("clean",["clean:build", "clean:docs","clean:mid-build"], function(){
	
});

gulp.task("clean:build", function(cb){
	del(configs.destDir+"*", cb);
});

gulp.task("clean:docs", function(cb){
	del(configs.docsDir+"*", cb);
});

gulp.task("clean:mid-build", function(cb){
	del(configs.interDir+"*", cb);
});

//TESTING TASKS
gulp.task("test:lint", function(){
	return gulp.src(configs.srcDir+"*/*.js")
			.pipe(jshint())
			.pipe(jshint.reporter("jshint-stylish"));
			//.pipe(jshint.reporter("fail"));
});

gulp.task("test", ["test:lint", "build"], function(){
	
});

//DOCUMENTATION TASKS
gulp.task("doc", function(){
	gulp.src(configs.srcDir+"*/*.js")
			.pipe(jsdoc(configs.docsDir));
});
