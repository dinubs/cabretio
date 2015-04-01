module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            files: [{
                expand: true,
                cwd: 'assets/styles/',
                src: ['importer.scss'],
                dest: '.tmp/public/styles/',
                ext: '.css'
            }],
            options: {
                // loadPath: require('node-bourbon').with('other/path', 'another/path') 
                // - or - 
                loadPath: require('node-neat').includePaths
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};