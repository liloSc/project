var listCities = ["Paris", "Berlin"];
var listattractions = ["attraction1", "attraction2", "attraction3"];

fetch('/data/attractions.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("myData");
    var index = 0;
    data.forEach(d => {
        listCities.forEach(c => {
            if (c == document.getElementById("place").innerHTML)
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

                    mainContainer.appendChild(divAttraction);
                    index++;
                })
        })


    })




}

function saveData(data) {
    var datatoString = JSON.stringify(data);
    // console.log(datatoString)
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
                listattractions.forEach(a => {
                    if (indexChange == e.target.id) {
                        if (d["cities"][c][a]["visited"] == "no") {
                            d["cities"][c][a]["visited"] = "yes";
                        } else {
                            d["cities"][c][a]["visited"] = "no";
                        }
                    }
                    indexChange++;
                });
        }
        )
        saveData(data);
    }

    )
}