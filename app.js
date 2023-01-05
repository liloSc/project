const express = require('express'); //Import the express dependency
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts') // Import express layouts 
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening
const visPathController = require('./controllers/vis-path');

/*********************************/
/** DEFINITIONS TO USE SESSIONS **/
/*********************************/
// Declare sessions
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));


// a variable to save a session
var session;

// to make session user variable available everywhere
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});



/*********************************/
/*********** USING FILES *********/
/*********************************/
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// Adding css and js files from installed apps
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))




/*********************************/
/** TEMPLATE ENGINES AND LAYOUTS */
/*********************************/

// This requires a folder called views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(expressLayouts)
app.set('layout', './layouts/base-layout.ejs')


/*********************************/
/************ Routes *************/
/*********************************/

// MAIN
app.get('/saveData', (req, res) => {

  //TODO: Is there any better way to get rid of the %22 or %20 after transforming the data?
  var datatoString = req._parsedOriginalUrl.query;
  datatoString = datatoString.replaceAll("%22", "\"");
  datatoString = datatoString.replaceAll("%20", " ");

  fs.writeFile('./data/attractions.json', datatoString, err => {
    if (err) {
      throw err;
    } else {
      console.log('JSON String is saved')

    }
  })
})
app.get('/', (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index.ejs", { 'userid': session.userid, 'username': session.username })

  } else
    res.sendFile('views/login.html', { root: __dirname })
})
app.get('/getuser', (req, res) => {
  session = req.session;
  console.log(session.userid)
})
app.get('/checkPosition', (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("checkPosition.ejs", { 'userid': session.userid, 'username': session.username })

  } else
    res.sendFile('views/login.html', { root: __dirname })
})

app.get("/get-path", visPathController.getPath);
module.exports = app; 

app.get('/map', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("map.ejs", { 'userid': session.userid, 'username': session.username })
  } else
    res.sendFile('views/login.html', { root: __dirname })
})

app.get('/cities', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("cities.ejs", { 'userid': session.userid, 'username': session.username })
  } else
    res.sendFile('views/login.html', { root: __dirname })
})
app.get('/history', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("overview.ejs", { 'userid': session.userid, 'username': session.username })
  } else
    res.sendFile('views/login.html', { root: __dirname })
})

app.get('/my-attractions', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("my-attractions.ejs", { 'userid': session.userid, 'username': session.username })
  } else
    res.sendFile('views/login.html', { root: __dirname })
})

app.get('/city', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("city.ejs", { 'userid': session.userid, 'username': session.username })
  } else
    res.sendFile('views/login.html', { root: __dirname })
})

const userRoutes = require('./routes/user')
app.use(userRoutes);

const visPathRoutes = require('./routes/vis-path')
app.use(visPathRoutes);

/*********************************/
/******* Application start *******/
/*********************************/

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});