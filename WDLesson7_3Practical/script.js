//Global variables
let data, info, leftPanel, mapObj;

async function init(){
let link = "wifi.json";

info = await fetch(link);
data = await info.json();

leftPanel = get("leftPanel");
let build = "";

for(let i = 0; i < data.length; i+=1) {
let wifi = data[i];
build += card(wifi);
}

leftPanel.innerHTML = build;
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
function displayChart( data, chart_id, chart_type ){
c3.generate({
bindto: `#${chart_id}`,
data: {
columns: data,
type: chart_type
}
});
}

function providerChart(){
let spectrum = 0;
let transit = 0;
let downtown = 0;

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.provider == "SPECTRUM"){
spectrum++;
}
if(wifi.provider == "Transit Wireless"){
transit++;
}
if(wifi.provider == "Downtown Brooklyn"){
downtown++;
}
}

let chartData = [
["SPECTRUM", spectrum],
["Transit Wireless", transit],
["Downtown Brooklyn", downtown]
];

displayChart(chartData, "chart", "pie");
}

function boroughChart(){
let queens = 0;
let brooklyn = 0;
let manhattan = 0;
let bronx = 0;
let staten = 0;

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.boroname == "Queens"){
queens++;
}
if(wifi.boroname == "Brooklyn"){
brooklyn++;
}
if(wifi.boroname == "Manhattan"){
manhattan++;
}
if(wifi.boroname == "Bronx"){
bronx++;
}
if(wifi.boroname == "Staten Island"){
staten++;
}
}

let chartData = [
["Queens", queens],
["Brooklyn", brooklyn],
["Manhattan", manhattan],
["Bronx", bronx],
["Staten Island", staten]
];

displayChart(chartData, "chart", "bar");
}

function typeChart(){
let free = 0;
let limited = 0;

for(let i = 0; i < data.length; i++){
let wifi = data[i];

if(wifi.type == "Free"){
free++;
}
if(wifi.type == "Limited Free"){
limited++;
}
}

let chartData = [
["Free", free],
["Limited Free", limited]
];

displayChart(chartData, "chart", "pie");
}