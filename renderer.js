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

      var pdf = this.convertHTMLToPDF(compiledTemplate);
      return pdf;
    } catch (e) {
      return e;
    }
  },

  // Read template source from FileSystem
  getTemplateSource : function(path) {
    path = config.template_dir + '/' + path;
    return fs.readFileSync(path, 'utf8');
  },

  convertHTMLToPDF : function(html, callback) {
    var filename = Crypto.randomBytes(20).toString('hex') + ".pdf",
        filePath = config.output_dir + "/" + filename;

    wkhtmltopdf_opts['output'] = filePath;
    wkhtmltopdf(html, wkhtmltopdf_opts);

    return filePath;
  }

};

module.exports = Renderer;
