'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var yeoman = require('yeoman-generator');


var SimpleGenerator = module.exports = function SimpleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ 
        skipInstall: options['skip-install'],
        callback:function(){
            //clone foundation setting file to scss folder
            fs.createReadStream('bower_components/foundation/scss/foundation/_settings.scss').pipe(fs.createWriteStream('scss/_settings.scss'));
            console.log('dependencies installed !!!')
        }
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SimpleGenerator, yeoman.generators.Base);

SimpleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'Would you like to name new project?',
    default: true
  }];

  this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
    
        cb();
  }.bind(this));
};

SimpleGenerator.prototype.app = function app() {
    this.mkdir(this.projectName);
    process.chdir(this.projectName);
    
   
    
    this.directory('scss', 'scss');
    
    this.mkdir('temp');
    this.mkdir('app/css/fonts');
    this.mkdir('app/img');
    this.mkdir('app/pictures');    
    
    this.mkdir('app/js/app');
    this.mkdir('app/js/build');
    this.mkdir('app/js/vendor');
    
    this.mkdir('app/templates/data');
    this.mkdir('app/templates/partials');
    this.template('index.html', 'app/templates/_index.html');
    
    this.copy('Gruntfile.js', 'Gruntfile.js');
   
    this.template('_config.json', 'config.json');
    
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

SimpleGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
