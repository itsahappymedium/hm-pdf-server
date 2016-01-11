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

      var pdf_location = renderer.genPdf(template, req.query);
      console.log('Successfully generated PDF at ' + pdf_location + '. Sending now...');

      // FIXME: fix file routing bug
      res.download(__dirname + '/' + pdf_location);

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

module.exports = router;
