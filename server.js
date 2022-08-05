const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const PDFParser = require("pdf2json");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));
app.set('port', 3000);
app.listen(app.get('port'), () => {
    console.log('%s server running on port', app.get('port'));
    console.log('  Press CTRL-C to stop\n');
  });

app.get("/", function(req, res) {

    let pdfParser = new PDFParser(this,1);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile(path.join(__dirname,"sample.txt"), JSON.stringify(pdfData),function(err, result) {
     if(err) console.log('error', err);
   });
        res.send(JSON.stringify(pdfData));
    });

    pdfParser.loadPDF(path.join(__dirname,"sample.pdf"));

});
