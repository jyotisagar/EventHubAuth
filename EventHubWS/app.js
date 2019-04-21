var express = require('express')
var path = require('path')
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const api = require('./routes/api')

var app = express() 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/authdb')
app.use(cors())
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use('/api',api)

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
