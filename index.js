/*const express = require('express'); //Import the express dependency
const ejs = require('ejs');
const fs = require('fs');
const session = require('express-session')


const app = express(); //Instantiate an express app, the main work horse of this server
const port = 8080; //Save the port number where your server will be listening
const path = require('path')
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.use(session({ secret: 'keybo#$%SFTHHET@#436tihuard cat', cookie: { maxAge: 60*60*24*1000 }}))
// to make session user variable available everywhere
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// parsing the incoming data
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// This requires a folder called views
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/bt.css', function (req, response) {
 fs.readFile('./node_modules/bootstrap/dist/css/bootstrap.css', function (err, data) {
 console.log(err)
 response.writeHeader(200, {'Content-Type': 'text/css'});
 response.write(data);
 response.end();
 }); 
});

app.get('/', function (req, res) {
 fs.readFile('data.json', 'utf8', function (err, datastring) {
 let data= JSON.parse(datastring)
 console.log(req.session)
 if (!req.session.vis)
 req.session.vis = 1;
 else 
 req.session.vis++;

 data.vis = req.session.vis;

 res.render("login.ejs", data)
 data.visit++;
 const datastring2= JSON.stringify(data)
 fs.writeFile('data.json', datastring2, err => {
 if (err) {
 throw err
 }
 console.log('JSON data is saved.')
 })
 }); 
 
 })

 app.get('/start', function (req, res) {
    fs.readFile('data.json', 'utf8', function (err, datastring) {
    let data= JSON.parse(datastring)
    console.log(req.session)
    if (!req.session.vis)
    req.session.vis = 1;
    else 
    req.session.vis++;
   
    data.vis = req.session.vis;
   
    res.render("start.ejs", data)
    data.visit++;
    const datastring2= JSON.stringify(data)
    fs.writeFile('data.json', datastring2, err => {
    if (err) {
    throw err
    }
    console.log('JSON data is saved.')
    })
    }); 
    
    })

 app.listen(port, () => {
 console.log(`Now listening on port ${port}`);
});*/