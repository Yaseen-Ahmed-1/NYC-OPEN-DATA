let data, info, leftPanel, mapObj;

async function init(){
let link = "wifi.json";

info = await fetch(link);
data = await info.json();

leftPanel = document.getElementById("leftPanel");

if(leftPanel){
let build = "";

for(let i = 0; i < data.length; i+=1){
let wifi = data[i];
build += card(wifi);
}

leftPanel.innerHTML = build;
}
}

function card( info ){
let build = `<div class="card fitted">
<h3>${info.name}</h3>
<hr>
<p>Provider: ${info.provider}</p>
<p>Location: ${info.location}</p>
<h5>${info.boroname}</h5>
<p>SSID: ${info.ssid}</p>`;
if(info.latitude && info.longitude){
build += `<input type="button" value="Map" onclick="showMap( ${info.latitude}, ${info.longitude} )">`;
}
build += `</div>`;
return build;
}

function filterByLocation(){
leftPanel = get("leftPanel");
let location = get("location").value;
let build = "";

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.location == location){
build += card(wifi);
}
}

leftPanel.innerHTML = build;
}

function filterByProvider(){
leftPanel = get("leftPanel");
let provider = get("provider").value;
let build = "";

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.provider == provider){
build += card(wifi);
}
}

leftPanel.innerHTML = build;
}

function filterMultiple(){
leftPanel = get("leftPanel");

let location = get("multiLocation").value;
let provider = get("multiProvider").value;

let build = "";

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.location == location && wifi.provider == provider){
build += card(wifi);
}
}

leftPanel.innerHTML = build;
}

function showMap(lat,lon){
let location = [lat, lon];

if(!mapObj){
mapObj = L.map("map");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
maxZoom: 18,
attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(mapObj);
}

mapObj.setView(location, 14);

L.marker(location).addTo(mapObj);
}

function wifiByBorough(){
let q = 0, bk = 0, bx = 0, m = 0, s = 0;

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.boroname == "Queens"){
q++;
}else if(wifi.boroname == "Manhattan"){
m++;
}else if(wifi.boroname == "Brooklyn"){
bk++;
}else if(wifi.boroname == "Bronx"){
bx++;
}else if(wifi.boroname == "Staten Island"){
s++;
}
}

let chartData = [
["Queens", q],
["Manhattan", m],
["Brooklyn", bk],
["Bronx", bx],
["Staten Island", s]
];

let chartType = document.getElementById("chartType").value;

displayChart(chartData, "output", chartType);
}

function displayChart( data, chart_id, chart_type ){
let chart = c3.generate({
bindto: `#${chart_id}`,
data: {
columns: data,
type: chart_type
}
});
}