// Config
var config = require('./config/config.json');
var wkhtmltopdf_opts = require('./config/wkhtmltopdf_config.json');

// Required Modules
var Crypto = require('crypto');
var Handlebars = require('handlebars');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

// returned Renderer Module
var Renderer = {

  // Glue everything together
  genPdf : function(template, templateData) {
    try {
      var templateSource = this.getTemplateSource(template),
          compiledTemplateFcn = Handlebars.compile(templateSource),
          compiledTemplate = compiledTemplateFcn(templateData);

      var fileSteam = this.convertHTMLToPDF(compiledTemplate);
      return fileSteam;

    } catch (e) {
      return e;
    }
  },

  // Read template source from FileSystem
  getTemplateSource : function(path) {
    path = config.template_dir + '/' + path;
    return fs.readFileSync(path, 'utf8');
  },

  convertHTMLToPDF : function(html) {
    console.log('Rendering PDF to file steam...');
    return wkhtmltopdf(html, wkhtmltopdf_opts);
  }

};

module.exports = Renderer;
