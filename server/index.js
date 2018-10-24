const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path =require('path');

const pairingSystemApiRouter = require('./pairingSystemApiRouter.js');
const db = require('../db')

app.use(express.static(path.join(__dirname, '../build')))




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/pairingSystem', pairingSystemApiRouter);


app.get('/', function (req, res) {
res.render("index");	
});






const PORT = process.env.PORT || 8080;

app.listen(PORT,function(){
  console.log('Server is running at PORT:',PORT);
});
