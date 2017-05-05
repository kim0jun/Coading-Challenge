var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('check', function() {
  gulp.src(['list/**/*'])
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('list/**/*', ['check']);
});

gulp.task('default',['check','watch'])