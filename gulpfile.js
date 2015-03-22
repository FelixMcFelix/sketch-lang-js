var configs = {
		srcDir: "src/",
		destDir: "build/",
		interDir: "mid-build/",
		docsDir: "docs/"
	},
	gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	jison  = require("gulp-jison"),
	del    = require("del"),
	jsdoc  = require("gulp-jsdoc");

gulp.task("default", ["clean"], function(){
	gulp.start("build", "doc");
});


//BUILD TASKS
gulp.task("build",["build:Palette", "build:parser", "build:MVM","build:generator","build:Sketch"], function(){
	return gulp.src(configs.interDir+"*.js")
			.pipe(concat("main.js"))
			.pipe(gulp.dest(configs.destDir))
			.pipe(rename({suffix: ".min"}))
			.pipe(uglify())
			.pipe(gulp.dest(configs.destDir));
});

gulp.task("build:parser", function(){
	return gulp.src([configs.srcDir+"grammar/MLang.jison"])
			.pipe(jison({}))
			.pipe(gulp.dest(configs.interDir));
});

gulp.task("build:Palette", function(){
	return gulp.src([configs.srcDir+"Palette/Palette.js",configs.srcDir+"Palette/*.js"])
			.pipe(concat("Palette.js"))
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
	return gulp.src([configs.srcDir+"Sketch/*.js"])
			.pipe(concat("Sketch.js"))
			.pipe(gulp.dest(configs.interDir));
});

//CLEAN TASKS
gulp.task("clean",["clean:build", "clean:docs"], function(){
	
});

gulp.task("clean:build", function(cb){
	del(configs.destDir+"*", cb);
});

gulp.task("clean:docs", function(cb){
	del(configs.docsDir+"*", cb);
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
