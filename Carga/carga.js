document.addEventListener("DOMContentLoaded", () => {
  const selectAllCheckbox = document.getElementById("select-all");
  const itemCheckboxes = document.querySelectorAll(".checkbox-item");

  selectAllCheckbox.addEventListener("change", function () {
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });

    if (this.checked) {
      document.getElementById("aceptar").disabled = false;
    } else {
      document.getElementById("aceptar").disabled = true;
    }
  });

  itemCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (!this.checked) {
        selectAllCheckbox.checked = false;
      } else {
        const allChecked = Array.from(itemCheckboxes).every((cb) => cb.checked);
        selectAllCheckbox.checked = allChecked;
      }

      let murcia = document.getElementById("murcia");
      let valencia = document.getElementById("valencia");
      let catalunya = document.getElementById("catalunya");

      if (murcia.checked || valencia.checked || catalunya.checked) {
        document.getElementById("aceptar").disabled = false;
      } else {
        document.getElementById("aceptar").disabled = true;
      }
    });
  });

  const aceptarBtn = document.getElementById("aceptar");
  aceptarBtn.addEventListener("click", () => {
    let murcia = document.getElementById("murcia").checked;
    let valencia = document.getElementById("valencia").checked;
    let catalunya = document.getElementById("catalunya").checked;
    let selectAll = document.getElementById("select-all").checked;

    document.getElementsByName("response")[0].value = "";

    if (selectAll || murcia) {
      loadMurciaData();
    }
    if (selectAll || valencia) {
      loadValenciaData();
    }
    if (selectAll || catalunya) {
      loadCatalunaData();
    }
  });
});

function reset() {
  const selectAllCheckbox = document.getElementById("select-all");
  let murcia = document.getElementById("murcia");
  let valencia = document.getElementById("valencia");
  let catalunya = document.getElementById("catalunya");

  selectAllCheckbox.checked = false;
  murcia.checked = false;
  valencia.checked = false;
  catalunya.checked = false;
  document.getElementById("aceptar").disabled = true;
}

function loadMurciaData() {
  // Usar fetch para obtener el archivo local
  fetch("http://localhost:3000/murcia")
    .then((response) => response.json()) // Convertir la respuesta a un objeto JSON
    .then((data) => {
      console.log(data);
      const conteo = `Datos introducidos correctamente: ${data.successCount}\n\nDatos no introducidos: ${data.errorCount}\n\nRegistros con errores:\n`;

      if (data.errors && Array.isArray(data.errors)) {
        const errores = data.errors.join("\n");
        console.log(errores);
        document.getElementsByName("response")[0].value = document
          .getElementsByName("response")[0]
          .value.concat(conteo, errores);
      } else {
        document.getElementsByName("response")[0].value =
          "No se encontraron errores o el formato es incorrecto.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loadCatalunaData() {
  // Usar fetch para obtener el archivo local
  fetch("http://localhost:3000/cataluna")
    .then((response) => response.json()) // Convertir la respuesta a un objeto JSON
    .then((data) => {
      const conteo = `Datos introducidos correctamente: ${data.successCount}\n\nDatos no introducidos: ${data.errorCount}\n\nRegistros con errores:\n`;

      if (data.errors && Array.isArray(data.errors)) {
        const errores = data.errors.join("\n");
        document.getElementsByName("response")[0].value = document
          .getElementsByName("response")[0]
          .value.concat(conteo, errores);
      } else {
        document.getElementsByName("response")[0].value =
          "No se encontraron errores o el formato es incorrecto.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loadValenciaData() {
  // Usar fetch para obtener el archivo local
  fetch("http://localhost:3000/valencia")
    .then((response) => response.json()) // Convertir la respuesta a un objeto JSON
    .then((data) => {
      const conteo = `Datos introducidos correctamente: ${data.successCount}\n\nDatos no introducidos: ${data.errorCount}\n\nRegistros con errores:\n`;

      if (data.errors && Array.isArray(data.errors)) {
        const errores = data.errors.join("\n");
        document.getElementsByName("response")[0].value = document
          .getElementsByName("response")[0]
          .value.concat(conteo, errores);
      } else {
        document.getElementsByName("response")[0].value =
          "No se encontraron errores o el formato es incorrecto.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
