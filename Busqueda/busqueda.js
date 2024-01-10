var map = L.map("map").setView([40.416775, -3.70379], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Límites para el mapa de España
var southWest = L.latLng(36.0, -9.5), // Coordenadas aproximadas del extremo suroeste de España
  northEast = L.latLng(43.5, 3.5), // Coordenadas aproximadas del extremo noreste de España
  bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds); // Restringe la vista a estos límites

function buscar() {
  fetch("IEI-T2104-v0.dsicv.upv.es:3000/general", {
    method: "POST",
    body: JSON.stringify({
      localidad: document.getElementById("localidad").value,
      provincia: document.getElementById("provincia").value,
      cod_postal: document.getElementById("cod_postal").value,
      tipo: document.getElementById("selector").value,
    }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
// Centros educativos - Ejemplo de array
var centrosEducativos = [
  // Añade tus centros educativos aquí
  {
    latitud: 40.416775,
    longitud: -3.70379,
    nombre: "Centro Educativo Madrid",
    tipo: "Público",
  },
  {
    latitud: 41.387918266,
    longitud: 2.139598772,
    nombre: "Centro Educativo Barcelona",
    tipo: "Público",
  },
  // ...otros centros...
];

// Añadir marcadores para cada centro educativo
centrosEducativos.forEach(function (centro) {
  var popupContent = centro.nombre + "<br>Tipo: " + centro.tipo;
  L.marker([centro.latitud, centro.longitud])
    .bindPopup(popupContent)
    .addTo(map);
});

function cancelar() {
  document.getElementById("selector").value = "0";
  document.getElementById("cod_postal").value = "";
  document.getElementById("localidad").value = "";
  document.getElementById("provincia").value = "";
  document.getElementById("aceptar").disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
  let loc = document.getElementById("localidad");
  let cod = document.getElementById("cod_postal");
  let prov = document.getElementById("provincia");
  loc.addEventListener("input", updateValueLoc);
  cod.addEventListener("input", updateValueCod);
  prov.addEventListener("input", updateValueProv);
});

function updateValueLoc(e) {
  cod_length = document.getElementById("cod_postal").value.length;
  prov_lenth = document.getElementById("provincia").value.length;

  if (cod_length != 0 && cod_length != 5) {
    document.getElementById("aceptar").disabled = true;
    return;
  }

  if (e.target.value.length != 0 || prov_lenth != 0 || cod_length == 5) {
    document.getElementById("aceptar").disabled = false;
  } else {
    document.getElementById("aceptar").disabled = true;
  }
}

function updateValueCod(e) {
  loc_length = document.getElementById("localidad").value.length;
  prov_lenth = document.getElementById("provincia").value.length;

  if (e.target.value.length != 0 && e.target.value.length != 5) {
    document.getElementById("aceptar").disabled = true;
    return;
  }

  if (loc_length != 0 || prov_lenth != 0 || e.target.value.length == 5) {
    document.getElementById("aceptar").disabled = false;
  } else {
    document.getElementById("aceptar").disabled = true;
  }
}

function updateValueProv(e) {
  loc_length = document.getElementById("localidad").value.length;
  cod_length = document.getElementById("cod_postal").value.length;

  if (cod_length != 0 && cod_length != 5) {
    document.getElementById("aceptar").disabled = true;
    return;
  }

  if (loc_length != 0 || e.target.value.length != 0 || cod_length == 5) {
    document.getElementById("aceptar").disabled = false;
  } else {
    document.getElementById("aceptar").disabled = true;
  }
}
