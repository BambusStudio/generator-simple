module.exports = function(grunt) {

    
    
  // Project configuratasdion.
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        templates:{
            files: ['app/templates/**/*.html','app/templates/**/*.json'], 
            tasks:['mustache_render']
        },
        sass: {
            files: ['scss/**/*.scss'],
            tasks: ['sass:dist']
        },
        css: {
            files: ['temp/_app.css'],
            tasks: ['autoprefixer']
        }
    },
    mustache_render: {
        options: {
            directory:'app/templates/partials',
            extension:'.html',
            prefix:'_'
            //clear_cache:true
        },
        all: {
          files : [
            {
              data: 'app/templates/data/index.json',
              template: 'app/templates/_index.html',
              dest:'app/index.html'
            }
          ]
        },
    },
    sass: {
        dist: {
            options:{
                outputStyle:'expanded',  
                includePaths: [
                    'bower_components/foundation/scss/'
                ]
            },
            files: {
                'temp/_app.css': 'scss/app.scss'
            }
        }
    },
    autoprefixer: {
        single_file: {
          options: {
            browsers: ['last 1 version']          
          },
          src: 'temp/_app.css',
          dest: 'app/css/app.css'
        },
    },
    browser_sync: {
        files: {
            src : [
                'app/index.html',
                'app/js/**/*.js',
                'app/css/app.css'
            ]
        },
        options: {
            //host: "192.168.0.15",
            reloadFileTypes: ['php', 'html', 'js', 'erb', 'svg'],
            injectFileTypes: ['css', 'png', 'jpg', 'svg', 'gif'],
            watchTask: true,
            debugInfo: true,
            ghostMode: {
                scroll: true,
                links: true,
                forms: true,
                clicks: true
            },
            open: true,
            server: {
                baseDir: "",
                index: "app/index.html"
            }
        }
    }
  });
 
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.config.set('myFile', filepath);
        grunt.config.set('_myFile', filepath.replace(/\\/g,'/'));
        console.log(filepath.replace(/\\/g,'/'))
    });
    
     
    // Default task(s).
    grunt.registerTask('default', ['browser_sync','sass','watch']);

};
