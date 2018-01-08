import * as gulp from 'gulp';
import tslint from 'gulp-tslint';
import * as nodemon from 'gulp-nodemon';
import * as tsc from 'gulp-typescript';

gulp.task('start', ['tslint', 'nodemon']);

gulp.task('nodemon', () => {
    gulp.run('tslint');
    nodemon({
        scripts: './index.js',
        tasks: ['tslint', 'compile']
    });
});

gulp.task('compile', () => {
    const tsProject = tsc.createProject('tsconfig.json');
    const result = tsProject.src().pipe(tsProject());

    result.js.pipe(gulp.dest('dist'));
});

gulp.task('tslint', () =>
    gulp.src('./src/**/**.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report())
);
