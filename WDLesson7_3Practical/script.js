
let data, info, leftPanel;

async function init() {


  let link = "wifi.json";

  info = await fetch(link);
  data = await info.json();

  leftPanel = get("leftPanel");

  let build = "";

  
  for(let i = 0; i < data.length; i += 1) {
    let wifi = data[i];
    build += card(wifi);
  }

 
  leftPanel.innerHTML = build;
}


function card(wifi){

  return `
  <div class="card">
    <h3>${wifi.name}</h3>
    <hr>
    <p><b>Provider:</b> ${wifi.provider}</p>
    <p><b>Location:</b> ${wifi.location}</p>
    <p><b>Borough:</b> ${wifi.boroname}</p>
    <p><b>SSID:</b> ${wifi.ssid}</p>
    <p><b>Coordinates:</b> ${wifi.latitude}, ${wifi.longitude}</p>
  </div>`;
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

function get(id){
  return document.getElementById(id);
}