module.exports = function(grunt) {

  grunt.initConfig({
    browserSync: {
    bsFiles: {
        src : '*'
    },
      options: {
          server: {
              baseDir: "./"
          }
      }
    }
  });


  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserSync']);

};