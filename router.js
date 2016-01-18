var router = require('express').Router(),
    renderer = require('./renderer'),
    template_maps = require('./config/template_maps.json').maps;

// Read request to determine what PDF template to load
router.get('/:id', function(req, res){
  var id = req.params.id,
      template = get_template_by_id(id);

    console.log(); // Prepend newline to each request log
    console.log('Template requested: ' + id);
    console.log('Template Data: ', req.query);

    if (typeof template === 'string' && template.length) {
      console.log('Successfully found template. Generating PDF with data...');

      var fileStream = renderer.genPdf(template, req.query, sendFileUponCreation.bind(res));
      if (fileStream) {
        res.setHeader("Content-disposition", 'attachment; filename=' + id + '.pdf');
        res.setHeader("content-type", "file/pdf");
        fileStream.pipe(res);
      } else {
          console.error('Failed to build stream ' + id);
          res.status(500).send();
      }

    } else {
      console.error('Failed to find template ' + id + ' for client');
      res.status(404).send('Not found');
    }
});

// Consult template_maps for id=>template_file matching
function get_template_by_id( id ) {
  for (var i = 0; i < template_maps.length; i++) {
    var map = template_maps[i];
    if (map.id === id) {
      return map.template;
    }
  }
}

// Async callback cuz file gen
// Express response object bound to this
function sendFileUponCreation( fileLocation ) {
    console.log('Downloading: ' + fileLocation);

    this.contentType('application/pdf');
    this.download(fileLocation);
}

module.exports = router;
