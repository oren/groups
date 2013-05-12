module.exports = function(grunt) {

 // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'public/styles/app.css': ['public/styles/*.styl'] // compile and concat into single file
        }
      }
    },
    watch: {
      scripts: {
        files: ['public/styles/*.styl'],
        tasks: ['stylus'],
        options: {
          nospawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['stylus']);

};
