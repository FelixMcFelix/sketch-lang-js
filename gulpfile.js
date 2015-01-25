var configs = {
		srcDir: "src/",
		destDir: "build/",
		docsDir: "docs/"
	},
	gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	del    = require("del"),
	jsdoc  = require("gulp-jsdoc");

gulp.task("default", ["clean"], function(){
	gulp.start("build", "doc");
});


//BUILD TASKS
gulp.task("build", function(){
	return gulp.src(configs.srcDir+"*/*.js")
			.pipe(concat("main.js"))
			.pipe(gulp.dest(configs.destDir))
			.pipe(rename({suffix: ".min"}))
			.pipe(uglify())
			.pipe(gulp.dest(configs.destDir));
});

//CLEAN TASKS
gulp.task("clean", function(cb){
	del(configs.destDir+"*", cb);
});

//TESTING TASKS
gulp.task("test:lint", function(){
	return gulp.src(configs.srcDir+"*/*.js")
			.pipe(jshint())
			.pipe(jshint.reporter("jshint-stylish"))
			.pipe(jshint.reporter("fail"));
});

gulp.task("test",["test:lint", "build"], function(){
	
});

//DOCUMENTATION TASKS
gulp.task("doc", function(){
	gulp.src(configs.srcDir+"*/*.js")
			.pipe(jsdoc(configs.docsDir));
});