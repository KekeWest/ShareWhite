module.exports = function(grunt) {
  grunt.initConfig({

    typescript: {
      compile: {
        src: ['src/**/*.ts'],
        dest: 'dist/js',
        options: {
          module: 'amd',
          target: 'es5',
          noImplicitAny: true,
        }
      }
    },

    tslint: {
      ts: {
        options: {
          configuration: grunt.file.readJSON('tslint.json')
        },
        files: {
          src: ['src/**/*.ts', '!src/typings/**/*.ts']
        }
      }
    },
   
    jst: {
      compile: {
        options: {
          processName: function (filename) {
            return filename.replace(/(src\/template\/|.html)/g, '');
          },
          processContent: function (src) {
            return src.replace(/(^\s+|\s+$)/gm, '');
          },
          amd: true
        },
        files: {
          'dist/js/jst.js': [
            'src/template/**/*.html'
          ]
        }
      }
    },

    compass: {
      compile: {
        options: {
          sassDir: 'resources/scss',
          cssDir: 'dist/css',
          spriteLoadPath: 'resources/images',
          imagesDir: 'dist/images',
          outputStyle: 'expanded',
          noLineComments: false,
        }
      }
    },

    tsd : {
      refresh: {
        options: {
          command: 'reinstall',
          latest: true,
          config: './src/tsd.json',
          opts: {}
        }
      }
    },

    connect: {
      local: {
        options: {
          keepalive: true,
          hostname: '*',
          port: 9001
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-tsd');


  grunt.registerTask("build", 
    [
      "tslint:ts",
      "jst:compile", 
      "typescript:compile", 
      "compass:compile"
    ]
  );

};

