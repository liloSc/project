
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// create a red polyline from an array of LatLng points
var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const city = urlParams.get('city');
console.log("This is the current place" + city)

$.getJSON('/get-path?city=' + city, function (data) {
    var polyline = L.polyline(data.path, { color: 'red' }).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
    /*  var polygon = L.polygon([
          data.path
      ]).addTo(map);
      map.fitBounds(polygon.getBounds());*/
  //  console.log(data.path);
    var array1 = data.path;
    var marker = L.marker([array1[0], array1[1]]).addTo(map);
    //  var marker = L.marker  ([ 48.85851125395903, 2.2945349423630814 ]).addTo(map);
    /* data.forEach(d => {
         console.log(d);
         var marker = L.marker(d[0],d[1]).addTo(map);
 
     })*/
})