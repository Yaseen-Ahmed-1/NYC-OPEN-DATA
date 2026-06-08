let data, info;

async function init(){   
  let link = "wifi.json";  
  info = await fetch(link);
  data = await info.json();
  
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < data.length; i += 1){
    let wifi = data[i];

    build += `
    <div class="fitted card">
      <h3>${wifi.name}</h3>
      <hr>
      <p>Provider: ${wifi.provider}</p>
      <p>Location: ${wifi.location}</p>
      <p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
    </div>`;
  }

  output.innerHTML = build;
}

function filterByLocation() {
let location = document.getElementById("location").value.toLowerCase();

let filtered = data.filter(function(item) {
return item.location.toLowerCase() == location;
});

displayCards(filtered);
}

function filterByProvider(){
  let provider = document.getElementById("provider").value;

  let filtered = data.filter(function(item){
    return item.provider == provider;
  });

  displayCards(filtered);
}

function filterMultiple(){
let location = document.getElementById("multiLocation").value;
let provider = document.getElementById("multiProvider").value;

let filtered = data.filter(function(item){
return item.location == location && item.provider == provider;
});

displayCards(filtered);
}

function displayCards(list){
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < list.length; i += 1){
    let wifi = list[i];

    build += `
    <div class="fitted card">
      <h3>${wifi.name}</h3>
      <hr>
      <p>Provider: ${wifi.provider}</p>
      <p>Location: ${wifi.location}</p>
      <p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
    </div>`;
  }

  output.innerHTML = build;
}

let providerData = [
["SPECTRUM", 3000],
["LinkNYC", 1800],
["ALTICEUSA", 1200]
];

let boroughData = [
["Queens", 2500],
["Brooklyn", 2200],
["Manhattan", 2000],
["Bronx", 1500],
["Staten Island", 500]
];

let typeData = [
["Limited Free", 4000],
["Free", 3000]
];


function displayChart(data, chart_id, chart_type) {

c3.generate({
bindto: `#${chart_id}`,

data: {
columns: data,
type: chart_type
}
});

}


function providerChart() {
displayChart(providerData, "chart", "pie");
}


function boroughChart() {
displayChart(boroughData, "chart", "bar");
}


function typeChart() {
displayChart(typeData, "chart", "pie");
}

let wifiData;
let map;

async function initMap(){

let link = "wifi.json";
let info = await fetch(link);
wifiData = await info.json();

if(map){
map.remove();
}

map = L.map("map").setView([40.7128, -74.0060], 11);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
maxZoom: 19,
attribution: "&copy; OpenStreetMap"
}).addTo(map);

for(let i = 0; i < wifiData.length; i += 1){

let wifi = wifiData[i];

let lat = Number(wifi.latitude);
let lon = Number(wifi.longitude);

if(!isNaN(lat) && !isNaN(lon)){

L.marker([lat, lon]).addTo(map)
.bindPopup(`
<h3>${wifi.name}</h3>
<p>Provider: ${wifi.provider}</p>
<p>Location: ${wifi.location}</p>
<p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
`);

}
}
}

function displayLocation(){

let lat = Number(document.getElementById("lat").value);
let lon = Number(document.getElementById("lon").value);

if(isNaN(lat) || isNaN(lon)){
alert("Please enter valid coordinates.");
return;
}

if(map){
map.remove();
}

map = L.map("map").setView([lat, lon], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
maxZoom: 19,
attribution: "&copy; OpenStreetMap"
}).addTo(map);

L.marker([lat, lon]).addTo(map)
.bindPopup(`
<h3>Selected Location</h3>
<p>Latitude: ${lat}</p>
<p>Longitude: ${lon}</p>
`)
.openPopup();
}