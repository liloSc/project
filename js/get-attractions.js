var listCities = ["Paris", "Berlin"];
//var listCities = ["Paris0", "Paris2"];
//var listCities = [];
//var listattractions = ["attraction1", "attraction2", "attraction3", "attraction4", "attraction5", "attraction6", "attraction7", "attraction8"];

fetch('/data/attractions.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (dataattractions) {
        appendAttractionsData(dataattractions);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

//Load Data
fetch('/data/' + "lilo" + '_cities.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (dataUserCities) {
        dataUserCities.forEach(d => {
            //   var cityname= "Paris";
            //  listCities.push(d["cityname"]);
            //   listCities.push(cityname);

            listCities.push("Paris");
            // listCities = listCities + (d["cityname"]);

        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
console.log(listCities);
console.log(listCities[0][0]);

function appendAttractionsData(data) {
    var containerAttractions = document.getElementById("loadAttractions");
    var containerProgress = document.getElementById("loadProgress");
    var containerProgressbar = document.getElementById("loadProgressbar");

    var index = 0;
    var counterProgress = 0;
    var maximumAttractions = 0;

    //Iterate through attractions data


    /*   data.forEach(d => {
           //  console.log(JSON.stringify(d))
           console.log(d["cities"][0])
           console.log(d["cities"]["Paris"])
           console.log(Object.keys(d["cities"]["Paris"]).length)
           //Object.keys(myObject).length
           listCities.forEach(c => {
               if (c == document.getElementById("place").innerHTML) {
                   //Iterate through attractions in the city
   
           }
               )
       })*/
    data.forEach(d => {

        listCities.forEach(c => {
            if (c == document.getElementById("place").innerHTML) {
                //Iterate through attractions in the city
                for (var i = 0; i < Object.keys(d["cities"]["Paris"]).length; i++) {
                    console.log(i)
                    var divAttraction = document.createElement("div");
                    divAttraction.setAttribute(
                        'style',
                        'clear:both;',
                    );
                    var divIcon = document.createElement("div");
                    divIcon.setAttribute(
                        'style',
                        'float:left;',
                    );
                    var icon = document.createElement("i");
                    icon.id = index;
                    var currentAttraction = i + 1;
                    var currentAttractionName = "attraction" + currentAttraction;
                    // console.log(d["cities"][c]["attraction1"])
                    //  if (d["cities"][c]["attraction1"]["visited"] == "yes") {}
                    if (d["cities"][c][currentAttractionName]["visited"] == "yes") {
                        icon.innerHTML = "check_circle";
                        icon.setAttribute(
                            'style',
                            'font-size: 2em;color:green',
                        );

                        icon.setAttribute(
                            'class',
                            'material-symbols-rounded',
                        );
                        counterProgress++;
                    } else if (d["cities"][c][currentAttractionName]["visited"] == "no") {
                        icon.innerHTML = "circle";
                        icon.setAttribute(
                            'style',
                            'font-size: 2em;color:grey',
                        );
                        icon.setAttribute(
                            'class',
                            'material-symbols-outlined',
                        );
                    }
                    icon.onclick = function (id) {
                        console.log(id.target.id);
                        changeData(data, id);


                    }

                    divIcon.appendChild(icon);
                    divAttraction.appendChild(divIcon);
                    var divText = document.createElement("div");

                    divText.setAttribute(
                        'style',
                        'float:left; margin-left:10px;font-size: 20px; ',
                    );
                    divText.innerHTML = d["cities"][c][currentAttractionName]["name"];
                    divAttraction.appendChild(divText);

                    containerAttractions.appendChild(divAttraction);
                    index++;

                    maximumAttractions++;
                }
            }

        })
    })

    //Iterate through whole dataset
    /*  data.forEach(d => {
         // console.log(listCities[1]);
          // console.log(d["cities"])
          //   console.log(numberCities);
          //Iterate through list of cities
          listCities.forEach(c => {
              if (c == document.getElementById("place").innerHTML) {
                  //Iterate through attractions in the city
                  listattractions.forEach(a => {
  
                      var divAttraction = document.createElement("div");
                      divAttraction.setAttribute(
                          'style',
                          'clear:both;',
                      );
  
                      var divIcon = document.createElement("div");
                      divIcon.setAttribute(
                          'style',
                          'float:left;',
                      );
                      var icon = document.createElement("i");
                      icon.id = index;
                      if (d["cities"][c][a]["visited"] == "yes") {
                          icon.innerHTML = "check_circle";
                          icon.setAttribute(
                              'style',
                              'font-size: 2em;color:green',
                          );
  
                          icon.setAttribute(
                              'class',
                              'material-symbols-rounded',
                          );
                          counterProgress++;
                      }
                      else if (d["cities"][c][a]["visited"] == "no") {
                          icon.innerHTML = "circle";
                          icon.setAttribute(
                              'style',
                              'font-size: 2em;color:grey',
                          );
                          icon.setAttribute(
                              'class',
                              'material-symbols-outlined',
                          );
                      }
                      icon.onclick = function (id) {
                          console.log(id.target.id);
                          changeData(data, id);
  
  
                      }
  
                      divIcon.appendChild(icon);
                      divAttraction.appendChild(divIcon);
                      var divText = document.createElement("div");
  
                      divText.setAttribute(
                          'style',
                          'float:left; margin-left:10px;font-size: 20px; ',
                      );
                      divText.innerHTML = d["cities"][c][a]["name"];
                      divAttraction.appendChild(divText);
  
                      containerAttractions.appendChild(divAttraction);
                      index++;
  
                      maximumAttractions++;
                  })
  
  
              }
  
          })
      })*/
    var divProgressbar = document.createElement("div");
    // divProgressbar.innerHTML=counterProgress + "/"+ maximumAttractions;
    divProgressbar.setAttribute(
        'class',
        'progress-bar',
    );
    divProgressbar.setAttribute(
        'role',
        'progressbar',
    );
    divProgressbar.setAttribute(
        'style',
        'width: ' + counterProgress / maximumAttractions * 100 + '%',
    );


    containerProgressbar.appendChild(divProgressbar);
    var divProgress = document.createElement("div");
    divProgress.innerHTML = counterProgress + "/" + maximumAttractions;
    containerProgress.appendChild(divProgress);
}

function saveData(data) {
    var datatoString = JSON.stringify(data);

    $.ajax({
        url: "/saveData",
        data: datatoString,

    }).done(function (Response) {
        console.log(Response)


    })
        .fail(function (Response) {
            console.log(Response)
        });
    document.location.reload(true)
}

function changeData(data, e) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const place = urlParams.get('place')
    console.log("In ChangeData" + e.target.id)

    var indexChange = 0;
    data.forEach(d => {
        //TODO: Only the user, how to get current userid??
        //   if (d.userid == userid) {
        listCities.forEach(c => {
            if (c == place)
             //   listattractions.forEach(a => {
                for (var i = 0; i < Object.keys(d["cities"]["Paris"]).length; i++) {
                    var currentAttraction = i + 1;
                    var a = "attraction" + currentAttraction;
                  
                    if (indexChange == e.target.id) {
                        if (d["cities"][c][a]["visited"] == "no") {
                            d["cities"][c][a]["visited"] = "yes";
                        } else {
                            d["cities"][c][a]["visited"] = "no";
                        }
                    }
                    indexChange++;
                }
        }
        )
        saveData(data);
    }

    )
}