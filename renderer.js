var Handlebars = require('handlebars');

var Renderer = {

  genPdf : function(template, templateData) {
    try {
      var templateSource = this.getTemplateSource(template);
      var compiledTemplate = Handlebars.compile(templateSource);
      return compiledTemplate(templateData);
    } catch (e) {
      return e;
    }
  }

  getTemplateSource : function(path) {
    //TODO: get template source file as string - preferably synchronously
  }

};

module.exports = Renderer;
