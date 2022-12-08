const express = require('express'); //Import the express dependency
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts') // Import express layouts 
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening

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
  
  //  console.log(req.query.data)
  // const datatoString = JSON.stringify(req._parsedOriginalUrl.query);
  
  //TODO: Is there any better way to get rid of the %22 or %20 after transforming the data?
  var datatoString =req._parsedOriginalUrl.query;
 
 //  var datatoString = JSON.stringify(req._parsedOriginalUrl.query);
   console.log(datatoString) ;
   datatoString.replaceAll("\"","\'");
   datatoString =datatoString.replaceAll("%22","\"");
   datatoString = datatoString.replaceAll("%20"," ");
 //  console.log(datatoString) ;
   fs.writeFile('./data/attractions.json', datatoString, err => {
      if (err) {
          throw err;
      } else {
          console.log('JSON String is saved')
         // res.render("my-attractions.ejs",datatoString);
      }
  })
 // res.render("my-attractions.ejs", { 'userid': session.userid, 'username': session.username })
  
 // location.reload;

  })
  app.get('/', (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index.ejs", { 'userid': session.userid, 'username': session.username })
    //Read File
    console.log("Here comes the data");
    /*fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });*/
    fs.readFile('data.json', 'utf8', function (err, datastring) {
      let data = JSON.parse(datastring)
      console.log(req.session)
      if (!req.session.vis)
        req.session.vis = 1;
      else
        req.session.vis++;

      data.vis = req.session.vis;
      ///Users/liloschulz/Master/WebDev/webdevproject/views/index.ejs
      //  res.render("index.ejs", data)
      data.visit++;
    //  const datastring2 = JSON.stringify(data)
      fs.writeFile('data.json', data, err => {
        if (err) {
          throw err
        }
        console.log('JSON data is saved.')
      })
    });
  } else
    res.sendFile('views/login.html', { root: __dirname })
})


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


var listCities = ["Paris", "Berlin"];
var listattractions=["attraction1", "attraction2","attraction3"];
app.get('/my-attractions', function (req, res) {
  session = req.session;
  if (session.userid) {
    console.log(session.userid)
    res.render("my-attractions.ejs", { 'userid': session.userid, 'username': session.username })
   /* fs.readFile('./data/attractions.json', 'utf8', function (err, datastring) {
      let data = JSON.parse(datastring)
      data.forEach(d => {
        if (d.userid == session.userid) {
          //   console.log(d.userid+ " "+d.Paris.TourEiffel)
          //  console.log(d.userid+ " "+d.countries.france.cities.Paris.TourEiffel)
          //  console.log(d.userid+ " "+d["countries"]["france"]["cities"]["Paris"]["TourEiffel"])
          listCities.forEach(c => {
            listattractions.forEach(a => {
            console.log(d.userid + " " + c + " " + d["cities"][c][a]["name"]+ " " + d["cities"][c][a]["visited"])
            })
          }
          )

        }
      });


    });*/


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