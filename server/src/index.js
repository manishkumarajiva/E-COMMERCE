require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const DBconnection = require('./database/DBconnect.js');
const indexRoutes = require('./routes/version.js');

const app = express();
const port = process.env.PORT || 5555;

app.use(cors())
app.use(bodyParser.json({ limit : '100kb' }));
app.use(bodyParser.urlencoded({ extended : true }));

const views = path.join(__dirname, 'views').split('src')[0] +"public/views";
const assets = path.join(__dirname, 'assets').split('src')[0]+"\public\\assets";


app.set('views', views);
app.set('view engine', 'ejs');
app.use(express.static(assets));


app.get('/',function(req,res){
    res.render('server');
})

app.use('/api', indexRoutes);



createServer(app).listen(port, () => console.log(`Express listening on PORT :: ${port}`));




