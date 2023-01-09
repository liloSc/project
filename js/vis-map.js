
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*
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
]).addTo(map);*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const city = urlParams.get('city');
//console.log("This is the current place" + city)
$.getJSON('/get-path?city=' + city, function (data) {
    var polyline = L.polyline(data.path, { color: 'blue' }).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
    for (datapoint of data.path) {
        L.marker([datapoint[0],
        datapoint[1]]).addTo(map);
    }

})