'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({dest:'uploads/'})

// require and use "multer"...

var app = express();
app.set('json spaces', 2)

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  let fileName = req.file.originalname;
  let fileSize = req.file.size;
  let fileType = req.file.mimetype;
  let fieldName = req.file.fieldname;
  
  res.json({"name": fileName, "type": fileType, "size": fileSize})
  
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
