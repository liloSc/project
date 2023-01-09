var listCities = [];

/*var data = "alex@alex.com";
const array = data.split("@");
fetch('/data/' + array[0] + '_cities.json')*/
//Load Data
fetch('/data/' + "lilo" + '_cities.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (dataUserCities) {
        updateCities(dataUserCities);
        // insertVisualization();

    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
var arraychart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function insertVisualization() {
    /*  const ctx = document.getElementById('chartexample');
      ctx.width = 100;
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['1', '2', '3', '4', '5', '6'],
              datasets: [{
                  label: 'Elevation',
                  data: [12, 19, 30, 50, 20, 30], //Height Data
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });*/
    //Bubble Chart
    const bubblechart = document.getElementById('bubblechart');

    new Chart(bubblechart, {
        type: 'bar',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                label: '# Visits',
                data: arraychart, //Height Data
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCities(dataUserCities) {
    listCities = [];
    dataUserCities.forEach(d => {

        listCities.push(d["cityname"]);

    })
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
}

function appendAttractionsData(data) {
    var containerAttractions = document.getElementById("loadAttractions");
    var containerProgress = document.getElementById("loadProgress");
    var containerProgressbar = document.getElementById("loadProgressbar");

    var index = 0;
    var counterProgress = 0;
    var maximumAttractions = 0;

    //Iterate through attractions data
    data.forEach(d => {

        listCities.forEach(c => {
            if (c == document.getElementById("place").innerHTML) {
                var lengthAttractions = Object.keys(d["cities"][c]).length || {};

                //Iterate through attractions in the city
                for (var i = 0; i < lengthAttractions; i++) {
                    //  console.log(i)
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
                        var date = d["cities"][c][currentAttractionName]["visitdate"];
                        var splitdate = date.split('.');
                        var currentvalueVisited = arraychart[parseInt(splitdate[1]) - 1];
                        arraychart[parseInt(splitdate[1]) - 1] = currentvalueVisited + 1;
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
                        arraychart[parseInt(splitdate[1]) - 1] = " ";
                  
                    }
                    icon.onclick = function (id) {
                        //   console.log(id.target.id);
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
    var divProgressbar = document.createElement("div");
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
    insertVisualization();
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
                    let date = new Date().toLocaleDateString("de-DE");
                    console.log(date);
                    if (indexChange == e.target.id) {
                        if (d["cities"][c][a]["visited"] == "no") {
                            d["cities"][c][a]["visited"] = "yes";
                            d["cities"][c][a]["visitdate"] = date;
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