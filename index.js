const express = require('express');
const app = express();
const bodyParser = require('body-parser')

if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}

// ENVIRONMENT VARIABLES
const DATABASE_URL = process.env.DATABASE_URL || ''
const PORT = process.env.PORT || 3000

// DATABASE
const db = require('./db.js')(DATABASE_URL)

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {  
  const callback = function(err, result){
    const rows = {}
    if(result.rowsCount > 1){
      rows = JSON.stringify(result.rows)
    }
    res.render('index', { rows });
    
  }

  const filters = {
    city: 'Test'
  }
  db.selectFromDB('markers', filters, callback)
});

app.post('/places', function(req, res){
  const data = req.body
  
  const callback = function(err, result){
    console.log(err, result)
    res.sendStatus(200)
  }

  const values = [data.city, data.title, data.description, data.submittedBy, data.lat, data.lng, data.icon]
  db.insertIntoDB('markers', values, callback)
})

app.listen(PORT, function () {
  console.log('Example app listening on: http://127.0.0.1:3000!');
});

