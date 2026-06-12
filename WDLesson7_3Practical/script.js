function filterByLocation(){

let output = document.getElementById("output");
let result = document.getElementById("result");

let location = document.getElementById("location").value;

let build = "";
let ct = 0;

for(let i = 0; i < data.length; i += 1){

let wifi = data[i];

if(wifi.location == location){

build += `
<div class="fitted card">
<h3>${wifi.name}</h3>
<hr>
<p>Provider: ${wifi.provider}</p>
<p>Location: ${wifi.location}</p>
<p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
</div>`;

ct += 1;
}
}

result.innerHTML = `${ct} Results Found`;
output.innerHTML = build;
}

function filterByProvider(){

let output = document.getElementById("output");
let result = document.getElementById("result");

let provider = document.getElementById("provider").value;

let build = "";
let ct = 0;

for(let i = 0; i < data.length; i += 1){

let wifi = data[i];

if(wifi.provider == provider){

build += `
<div class="fitted card">
<h3>${wifi.name}</h3>
<hr>
<p>Provider: ${wifi.provider}</p>
<p>Location: ${wifi.location}</p>
<p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
</div>`;

ct += 1;
}
}

result.innerHTML = `${ct} Results Found`;
output.innerHTML = build;
}

function filterMultiple(){

let output = document.getElementById("output");
let result = document.getElementById("result");

let location = document.getElementById("multiLocation").value;
let provider = document.getElementById("multiProvider").value;

let build = "";
let ct = 0;

for(let i = 0; i < data.length; i += 1){

let wifi = data[i];

if(wifi.location == location && wifi.provider == provider){

build += `
<div class="fitted card">
<h3>${wifi.name}</h3>
<hr>
<p>Provider: ${wifi.provider}</p>
<p>Location: ${wifi.location}</p>
<p>Coordinates: ${wifi.latitude}, ${wifi.longitude}</p>
</div>`;

ct += 1;
}
}

result.innerHTML = `${ct} Results Found`;
output.innerHTML = build;
}