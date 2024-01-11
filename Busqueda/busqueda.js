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

function cancelar() {
  document.getElementById("selector").value = "Público";
  document.getElementById("cod_postal").value = "";
  document.getElementById("localidad").value = "";
  document.getElementById("provincia").value = "";
}

const urlAPI = "http://localhost:3000/general";

function fillTableWithData(data) {
  const tableBody = document.getElementById("tabla").querySelector("tbody");
  tableBody.innerHTML = ""; // Limpiar el cuerpo de la tabla para evitar duplicados

  // Verificar que los datos sean un array
  if (!Array.isArray(data)) {
    console.error("La respuesta no es un array:", data);
    return;
  }

  // Iterar sobre cada elemento de los datos
  data.forEach((item) => {
    const row = tableBody.insertRow(); // Crear una fila

    row.innerHTML = `
      <td>${item.nombre || "-"}</td>
      <td>${item.tipo || "-"}</td>
      <td>${item.direccion || "-"}</td>
      <td>${item.codigoPostal || "-"}</td>
      <td>${item.longitud || "-"}</td>
      <td>${item.latitud || "-"}</td>
      <td>${item.telefono || "-"}</td>
      <td>${item.descipcion || "-"}</td>
      <td>${item.localidad || "-"}</td>
      <td>${item.provincia || "-"}</td>
    `;
  });
}

function buscar() {
  const datos = {
    localidad: document.getElementById("localidad").value,
    provincia: document.getElementById("provincia").value,
    cod_postal: document.getElementById("cod_postal").value,
    tipo: document.getElementById("selector").value,
  };

  // Convertir el objeto de datos a una cadena de texto
  const cuerpo = `{ "localidad": "${datos.localidad}", "cp": "${datos.cod_postal}", "provincia": "${datos.provincia}", "tipo": "${datos.tipo}" }`;

  fetch(urlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain", // Indicar que estás enviando texto
    },
    body: cuerpo,
  })
    .then((res) => res.json())
    .then((res) => fillTableWithData(res))
    .catch((err) => console.log(err));
}

/**
 * en caso de que no sea una llamada POST y sea una de tipo GET
 * recordar que habría que cambiar la url y seguramente separar
 * el base
 * Url de "general" en el método buscar()
 */

fetch(urlAPI, {
  method: "GET",
})
  .then((centrosEducativos) => centrosEducativos.json())
  .then((centrosEducativos) => {
    loadCentrosEducativos(centrosEducativos);
  })
  .catch((err) => console.log(err));

function loadCentrosEducativos(centrosEducativos) {
  centrosEducativos.forEach(function (centro) {
    var popupContent =
      centro.nombre +
      "<br>Tipo: " +
      centro.tipo +
      "<br>Direccion: " +
      centro.direccion +
      "<br>Código Postal: " +
      centro.codigoPostal +
      "<br>Localidad: " +
      centro.localidad +
      "<br>Provincia: " +
      centro.provincia;
    L.marker([centro.latitud, centro.longitud])
      .bindPopup(popupContent)
      .addTo(map);
  });
}
