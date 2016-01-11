# HM PDF Server

## Summary

`hm-pdf-gen` is a lightweight PDF generation server built on Node.js

The server manages a configuration of key=>template pairs that act as REST endpoints which return dynamically generated PDF files.

Templates are written in Handlebars and are built using data sent to the API through GET parameters. Any GET parameters not sent are ignored, so be sure to document your templates!

## Prerequisites

This server requires a few things to be installed on the server ecosystem, particularly:

- [Node.js](https://nodejs.org)
- [wkhtmltopdf binaries](http://wkhtmltopdf.org/downloads.html)

## Installation

Like pretty much every Node app, start by installing dependencies using `npm install`

```
npm install
```

## Running the Server

Run the server using NPM: `npm start`

```
npm start
```

## Configuration

All configuration is done using JSON files located in `./config`.

### config.JSON

Manages the configuration for the server as a whole. Current options include:

- `port` - the port the server runs on
- `template_dir` - the directory you wish to store your templates in
- `output_dir` - the directory to store generated PDF files in

### template_maps.JSON

This JSON file contains an array of key-template pairs (where the template is the name of the template file located within `template_dir`). Each new key-value pair establishes a REST endpoint at <server_url>/pdf/<key>.

Be sure to include the file extension (`.handlebars`) in the `maps` declaration.

#### Example

```
{
  "maps" : [
    {
      "id" : "template_id",
      "template" : "template_name.handlebars"
    }
  ]
}
```

### wkhtmltopdf_config.JSON

This will be translated (literally) to the `wkhtmltopdf_opts` in `renderer.js`. Refer to the [wkhtmltopdf documentation](https://www.npmjs.com/package/wkhtmltopdf) for further reading.
