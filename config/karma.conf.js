module.exports = function(config){
    config.set({
    basePath : '../',

    /*
     * Line commented out until angular-loader.js tests work again
     *
     *  https://github.com/angular/angular.js/issues/4437
     */
    files : [
      'public/lib/angular/angular.js',
      //'public/lib/angular/angular-*.js',
      'public/lib/angular/angular-mocks.js',
      'public/javascripts/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude: ['public/lib/angular/angular-scenario.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}