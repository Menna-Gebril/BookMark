var bookmarkName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("siteURL");

var sites = [];

if (JSON.parse(localStorage.getItem("siteContainer")) != undefined) {
  sites = JSON.parse(localStorage.getItem("siteContainer"));
  displaySite();
}
function validationInputs(element) {
  var text = element.value;
  var regex = {
    bookmarkName: /^[a-zA-Z][a-z]{3,8}$/,
    siteURL:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    document.getElementById("msg").classList.add("d-none");
    document.getElementById("msgURL").classList.add("d-none");
    element.classList.remove("is-invalid");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    return false;
  }
}

function addSite() {
  if (validationInputs(bookmarkName) && validationInputs(siteURL)) {
    for (var i = 0; i < sites.length; i++) {
      if (
        sites[i].siteName.toLowerCase() === bookmarkName.value.toLowerCase()
      ) {
        document.getElementById("msg").classList.remove("d-none");

        return;
      }

      if (sites[i].siteURL.toLowerCase() === siteURL.value.toLowerCase()) {
        document.getElementById("msgURL").classList.remove("d-none");
        return;
      }
    }

    var site = {
      siteName: bookmarkName.value,
      siteURL: siteURL.value,
    };
    sites.push(site);
    console.log(sites);
    localStorage.setItem("siteContainer", JSON.stringify(sites));
    displaySite();
    clearData();
  } else {
    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
  }
}

function displaySite() {
  var cartona = "";
  for (var i = 0; i < sites.length; i++) {
    cartona += `
            <tr>
              <td>${i + 1}</td>
              <td>${sites[i].siteName}</td>
              <td>
                <button onclick="visitSite(${i})" class="btn visit">
                  <i class="fa-solid fa-eye pe-1"></i>
                  Visit
                </button>
              </td>
              <td>
                <button onclick="deleteSite(${i})" class="btn delete">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>       
        `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteSite(i) {
  sites.splice(i, 1);
  localStorage.setItem("siteContainer", JSON.stringify(sites));
  displaySite();
}

function visitSite(index) {
  window.open(sites[index].siteURL, "_blank");
}

function clearData() {
  bookmarkName.value = null;
  siteURL.value = null;
  bookmarkName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");
}
