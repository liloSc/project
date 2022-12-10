

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
                if(c==document.getElementById("place").innerHTML)
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
                    var icon= document.createElement("i");
                    icon.id=index;
                    if(d["cities"][c][a]["visited"]=="yes"){ icon.innerHTML="check_circle";
                    icon.setAttribute(
                        'style',
                        'font-size: 2em;color:green',
                    );
                  
                    icon.setAttribute(
                        'class',
                        'material-symbols-rounded',
                    );}
                    else  if(d["cities"][c][a]["visited"]=="no"){ 
                        icon.innerHTML="circle";
                    icon.setAttribute(
                        'style',
                        'font-size: 2em;color:grey',
                    );
                    icon.setAttribute(
                        'class',
                        'material-symbols-outlined',
                    );}
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
                    divText.innerHTML=d["cities"][c][a]["name"];
                    divAttraction.appendChild(divText);
                 /*   var button = document.createElement("button");
                    button.id = index;
    
                    button.innerHTML = "Change";
                    button.setAttribute(
                        'style',
                        'background-color: blue; color: white; width: 100px; ',
                    );
                    //   var testdata="testliloClick";
                    //TODO: Implement Functionality, that when button is pressed, the visit attribute changes --> JSON File gets overwritten
                    button.onclick = function (id) {
                        changeData(data, id);
    
                    }
                    divAttraction.appendChild(button);*/
                    mainContainer.appendChild(divAttraction);
                    index++;
                })
            })


        })

       
      /*  var mainContainer = document.getElementById("myData");
        var index = 0;
        data.forEach(d => {
            //TODO: Only the user, how to get current userid??
            //   if (d.userid == userid) {
            listCities.forEach(c => {
                var divCity = document.createElement("h3");
                divCity.innerHTML = c;
                var divAttraction1 = document.createElement("div");
    
    /*Status */
    /*divAttraction1.appendChild(divCity);
                listattractions.forEach(a => {
                    var status = document.createElement("i");
                    if(d["cities"][c][a]["visited"]=="yes"){
                        status.innerHTML="check_circle";
                        status.setAttribute(
                            'style',
                            'font-size: 2em;color:green',
                        );
                        status.setAttribute(
                            'class',
                            'material-symbols-rounded',
                        );
                    }else if(d["cities"][c][a]["visited"]=="no"){
                        status.innerHTML="circle";
                        status.setAttribute(
                            'style',
                            'font-size: 2em;color:grey',
                        );
                        status.setAttribute(
                            'class',
                            'material-symbols-outlined',
                        );
                    }
                    mainContainer.appendChild(status);


/* Attraction name*/


                /*    var divAttraction = document.createElement("div");
                    divAttraction.innerHTML = d["cities"][c][a]["name"] + ": " + d["cities"][c][a]["visited"];
                    mainContainer.appendChild(divAttraction);
                
                    var button = document.createElement("button");
                    button.id = c + "_" + d["cities"][c][a]["name"].replaceAll(" ", "");
                    button.id = index;
    
                    button.innerHTML = "Change";
                    button.setAttribute(
                        'style',
                        'background-color: blue; color: white; width: 100px; ',
                    );
                    //   var testdata="testliloClick";
                    //TODO: Implement Functionality, that when button is pressed, the visit attribute changes --> JSON File gets overwritten
                    button.onclick = function (id) {
                        changeData(data, id);
    
                    }
                  
                    mainContainer.appendChild(button);
                 
                    index++;
                });
            }
            )
    
            //  }
        })
    
    */
      
    }  
function appendDataArchive(data) {
    //  const datatoString = JSON.stringify(data);
    //  console.log(datatoString);
    //  console.log("data " + JSON.stringify(data));
    // data[0]["cities"]["Paris"]["attraction1"]["visited"] = "newTest";
    //   console.log(" new data " + JSON.stringify(data));

    var mainContainer = document.getElementById("myData");
    var index = 0;
    data.forEach(d => {
        //TODO: Only the user, how to get current userid??
        //   if (d.userid == userid) {
        listCities.forEach(c => {
            var divCity = document.createElement("h3");
            divCity.innerHTML = c;


            mainContainer.appendChild(divCity);
            listattractions.forEach(a => {
                var divAttraction = document.createElement("div");
                divAttraction.innerHTML = d["cities"][c][a]["name"] + ": " + d["cities"][c][a]["visited"];
                mainContainer.appendChild(divAttraction);
                var button = document.createElement("button");
                button.id = c + "_" + d["cities"][c][a]["name"].replaceAll(" ", "");
                button.id = index;

                button.innerHTML = "Change";
                button.setAttribute(
                    'style',
                    'background-color: blue; color: white; width: 100px; ',
                );
                //   var testdata="testliloClick";
                //TODO: Implement Functionality, that when button is pressed, the visit attribute changes --> JSON File gets overwritten
                button.onclick = function (id) {
                    changeData(data, id);

                }
                /*  button.onclick = //function () {
                    //   alert('here be dragons');

                    /*   $.ajax({"url":"/saveData","data":data}).done(function(){
                          // console.log(res)
                          console.log("res")
   
                       }).error(function(e){
                           console.log(e)
                       })*/
                /*   $.ajax({
                    //   type: "GET",
                       url: "/saveData",
                       data: datatoString,
                    //   contentType: "application/json; charset=utf-8",
                       //  async: false,
                       //   cache: false
                   }).done(function (Response) {
                     //  console.log(Response)
                       console.log(Response)
                       //do something when get response            
                   })
                       .fail(function (Response) {
                           //do something when any error occurs.
                           console.log(Response)
                       });*/

                //  return false;
                //  };
                mainContainer.appendChild(button);
                var status = document.createElement("i");
                if(d["cities"][c][a]["visited"]=="yes"){
                    status.innerHTML="check_circle";
                    status.setAttribute(
                        'style',
                        'font-size: 2em;color:green',
                    );
                    status.setAttribute(
                        'class',
                        'material-symbols-rounded',
                    );
                }else if(d["cities"][c][a]["visited"]=="no"){
                    status.innerHTML="circle";
                    status.setAttribute(
                        'style',
                        'font-size: 2em;color:grey',
                    );
                    status.setAttribute(
                        'class',
                        'material-symbols-outlined',
                    );
                }
                mainContainer.appendChild(status);
                index++;
            });
        }
        )

        //  }
    })


    /*  for (var i = 0; i < data.length; i++) {
          var div = document.createElement("div");
          //   div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
          div.innerHTML = data[i]["cities"]["Paris"]["attraction1"]["name"] + ": " + data[i]["cities"]["Paris"]["attraction1"]["visited"];
 
          mainContainer.appendChild(div);
      }*/
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
    console.log(e.target.id)

    var indexChange = 0;
    data.forEach(d => {
        //TODO: Only the user, how to get current userid??
        //   if (d.userid == userid) {
        listCities.forEach(c => {

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

        //  }

        saveData(data);
    }

    )
}