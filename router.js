var router = require('express').Router(),
    renderer = require('./renderer'),
    template_maps = require('./config/template_maps.json').maps;

// Read request to determine what PDF template to load
router.get('/:id', function(req, res){
  var id = req.params.id,
      template = get_template_by_id(id);

    if (typeof template === 'string' && template.length) {
      var pdf = renderer.genPdf(template, req.body);
      res.download(pdf);
    } else {
      res.status(404).send('Not found');
    }
});

function get_template_by_id( id ) {
  for (var i = 0; i < template_maps.length; i++) {
    var map = template_maps[i];
    if (map.id === id) {
      return map.template;
    }
  }
}

module.exports = router;
