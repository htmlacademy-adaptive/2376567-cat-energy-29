import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";
import browser from "browser-sync";
import cheerio from "gulp-cheerio";

// Styles

export const stylesBuild = () => {
  return gulp.src("source/less/style.less", { sourcemaps: true })
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer(),
    csso()
  ]))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css", { sourcemaps: "." }))
  .pipe(browser.stream());
}

export const stylesSource = () => {
  return gulp.src("source/less/style.less", { sourcemaps: true })
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("source/css", { sourcemaps: "." }))
  .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"))
  .pipe(browser.stream());
}

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"))
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(gulp.dest("build/img"))
}

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(squoosh({
  webp: {}
  }))
  .pipe(gulp.dest("build/img"))
}

// SVG

const svg = () =>
  gulp.src(["source/img/*.svg", "!source/img/icons/*.svg"])
  .pipe(svgo())
  .pipe(gulp.dest("build/img"));

export const sprite = () => {
  return gulp.src("source/img/*.svg")
  .pipe(svgo())
  .pipe(svgstore({
    inlineSvg: true
    }))
  .pipe(rename("sprite.svg"))
  .pipe(cheerio({
    run: ($) => {
        $("[fill]").attr("fill", "currentColor");
    },
    parserOptions: { xmlMode: true }
  }))
.pipe(gulp.dest("build/img"));
}

// Copy

export const copy = (done) => {
  gulp.src([
    "source/fonts/*/**.{woff2,woff}",
    "source/*.ico",
    ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

// Clean

const clean = () => {
  return del("build");
};

// Server

// const serverSource = (done) => {
//   browser.init({
//     server: {
//     baseDir: "source"
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

const serverBuild = (done) => {
  browser.init({
    server: {
    baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

  const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(stylesSource));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  copyImages,
  optimizeImages,
    gulp.parallel(
    stylesBuild,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

// Default

// export default gulp.series(
//   stylesSource, serverSource, watcher, reload
// );

export default gulp.series(
clean,
copy,
copyImages,
optimizeImages,
gulp.parallel(
stylesBuild,
html,
scripts,
svg,
sprite,
createWebp
),
gulp.series(
serverBuild,
watcher,
reload
));
