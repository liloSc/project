/*const fs = require('fs');

fs.readFile('./data/attractions.json', 'utf8', function (err, datastring) {
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