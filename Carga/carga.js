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

    if (selectAll || murcia) {
      postToAPI("murcia");
    }
    if (selectAll || valencia) {
      postToAPI("valencia");
    }
    if (selectAll || catalunya) {
      postToAPI("catalunya");
    }
  });
});

function postToAPI(region) {
  fetch(`http://iei-t2104-v0.dsicv.upv.es:3000/${region}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* tus datos aquí */
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
