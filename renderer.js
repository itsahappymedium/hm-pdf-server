var config = require('./config/config.json');
var Handlebars = require('handlebars');
var fs = require('fs');

var Renderer = {

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

  convertHTMLToPDF : function(html) {
    // TODO: use phantom.js to convert html to pdf and return pdf
    return html;
  },

  getTemplateSource : function(path) {
    path = config.template_dir + '/' + path;
    return fs.readFileSync(path, 'utf8');
  }

};

module.exports = Renderer;
