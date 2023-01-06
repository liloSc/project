var overview = document.getElementById("overview");
var listCities = [];


fetch('/data/' + "lilo" + '_cities.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (dataUserCities) {
        updateCities(dataUserCities);

    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function updateCities(dataUserCities) {
    listCities = [];
    dataUserCities.forEach(d => {
        listCities.push(d["cityname"]);
    })
    setupSite(dataUserCities);
}

function setupSite() {

    listCities.forEach(c => {
        var pathClick = "location.href='/city?place=" + c + "'";

        var counterProgress = 0;
        var maximumAttractions = 0;
        fetch('/data/attractions.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (dataattractions) {
                dataattractions.forEach(d => {
                    var lengthAttractions = Object.keys(d["cities"][c]).length || {};
                    maximumAttractions = lengthAttractions;
                    for (var i = 0; i < lengthAttractions; i++) {
                        var currentAttraction = i + 1;
                        var currentAttractionName = "attraction" + currentAttraction;
                        if (d["cities"][c][currentAttractionName]["visited"] == "yes") {
                            counterProgress++;
                        }
                    }
                    var place = document.createElement("div");
                    place.classList.add("section");
                    place.setAttribute(
                        'onclick',
                        pathClick,
                    )
                    /** Image*/
                    var place_img = document.createElement("img");
                    place_img.src = "../resources/" + c + ".jpg";

                    place_img.setAttribute(
                        'style',
                        'width:150px;height:auto;border-radius: 50%;',
                    );
                    place.appendChild(place_img);
                    //right
                    var divRight = document.createElement("div");

                    /** Text */
                    var place_title = document.createElement("h3");
                    place_title.innerHTML = c;
                    divRight.appendChild(place_title);
                    overview.appendChild(place);

                    /** Progressbar*/
                    var divProgress = document.createElement("div");
                    divProgress.setAttribute(
                        'class',
                        'progress',
                    );
                    var idname = "progressbar" + c;
                    divProgress.id = idname;
                    divProgress.setAttribute(
                        'style',
                        'width: 200px;height:5px',

                    );

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
                    divProgress.appendChild(divProgressbar);
                    divRight.appendChild(divProgress);

                    var divProgress = document.createElement("div");
                    divProgress.innerHTML = counterProgress + "/" + maximumAttractions;
                    divRight.appendChild(divProgress);

                    place.appendChild(divRight);

                })


            })
            .catch(function (err) {
                console.log('error: ' + err);
            });

    });
}


