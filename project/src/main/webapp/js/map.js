var map_is_shown = 0;
var markers;
var mar;
var map;

function centerMap(position) {
  const zoom = 15;
  map.setCenter(position, zoom);
}

//Orismos Thesis
function setPosition(lat, lon) {
  var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
  var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
  var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
  return position;
}

function make_map(lat, lon) {
  console.log(lat);
  console.log(lon);

  map = new OpenLayers.Map("Map");
  //Orismos Marker
  var mapnik = new OpenLayers.Layer.OSM();
  map.addLayer(mapnik);

  markers = new OpenLayers.Layer.Markers("Markers")
  map.addLayer(markers);
  var position = setPosition(lat, lon);

  //Orismos zoom
  centerMap(position);
  map_is_shown = 1;
}

function make_marker(lat, lon) {
  //Orismos Handler
  function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup",
      position, null,
      message, null,
      true
    );
    map.addPopup(popup);
  }

  if (mar) {
    markers.removeMarker(mar);
  }

  var position = setPosition(lat, lon);
  mar = new OpenLayers.Marker(position);
  markers.addMarker(mar);
  mar.events.register('mousedown', mar, function(evt) {
    handler(position, 'Address Found');
  });

  centerMap(position);
}

function request_ajax(address, callback) {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === this.DONE) {
      const response = JSON.parse(this.responseText);
      callback(response); // Call the provided callback with the response data
    }
  });

  xhr.open('GET', 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=' + address + '&accept-language=en&polygon_threshold=0.0');
  xhr.setRequestHeader('X-RapidAPI-Key', '894138726dmsh7b562197241de1dp144a9ejsn0deba5a00432');
  xhr.setRequestHeader('X-RapidAPI-Host', 'forward-reverse-geocoding.p.rapidapi.com');

  xhr.send(data);
}

function check_addr() {
  var icon = document.getElementById("icon");
  var map_div = document.getElementById('map-inner');
  var err_msg0 = document.getElementById("err-msg0");
  var err_msg1 = document.getElementById("err-msg1");

  var country = document.getElementById("country").value;
  var city = document.getElementById("city").value;
  var addr = document.getElementById("address").value;

  if (city !== "" && addr !== "") {
    var address = addr + " " + city + " " + country;
    var addr_lon;
    var addr_lat;

    request_ajax(address, function(ret) {
      err_msg0.style.display = "";
      err_msg1.style.display = "";
      icon.style.display = "";
      map_div.style.display = "";

      if (ret && ret.length > 0) {
        console.log(ret);
        console.log("Lon:", ret[0].lon);
        console.log("Lat:", ret[0].lat);
        addr_lon = parseFloat(ret[0].lon);
        addr_lat = parseFloat(ret[0].lat);


        // Check if it contains "Region of Crete" in the display_name
        if (ret[0].display_name.includes("Region of Crete")) {
          icon.style.display = "none";
          map_div.style.display = "block";
          console.log("Contains Region of Crete");
          if (!map_is_shown)
            make_map(addr_lat, addr_lon);

          make_marker(addr_lat, addr_lon);
        } else {
          icon.style.display = "";
          map_div.style.display = "";
          console.log("Doesn't contain Region of Crete");
          err_msg0.style.display = "flex";
        }
      } else {
        err_msg1.style.display = "flex";
      }
    });
  }
}

function chech_if_heraklion() {
  var err_msg = document.getElementById("err-msg0");
  var city = document.getElementById("city").value;

  err_msg.style.display = "none";
  if (city !== "Heraklion")
    err_msg.style.display = "flex";

}
