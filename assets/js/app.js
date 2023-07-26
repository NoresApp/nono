console.log("Chargement du script app.js");

async function loadData() {
  try {
    toggleLoader("#listApps", true);
    toggleLoader("#footerApps", true);
    toggleLoader("#appCount", true, true);
    const response = await fetch("data/apps.json");
    const data = await response.json();
    displayData(data);
    displayFooterApps(data);
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  const { message } = error;
  toggleLoader(
    "#appCount",
    false,
    false,
    `<i class="fas fa-times text-danger"></i>`
  );
  toggleLoader("#footerApps", false, false ,`<p class="text text-danger">Recuperación de aplicaciones imposible.</p>` )
  // add class container
  document.querySelector("#listAppsBefore").classList.add('container');
  toggleLoader(
    "#listApps",
    false,
    false,`
    <div class="container alert alert-danger mt-3">
    <div class="d-flex flex-column justify-content-center">
      <h2>Error del cliente</h2>
      <p>Se produjo un error al recuperar los datos del servidor.<br>Por favor, póngase en contacto con el administrador o inténtelo de nuevo más tarde o recargue la página.</p>
      <p>Mensaje técnico del error - <strong>${message}</strong></p>
    </div>
      <a class="btn btn-outline-danger" href="index.html"><i class="fas fa-sync-alt"></i> Recargar la página</a>
    </div>`
  );
  console.log(message);
}

function toggleLoader(selector, state, isSmall = false, content = "") {
  if (state) {
    document.querySelector(
      selector
    ).innerHTML = `<div id="loader" class="spinner-grow ${
      !isSmall ? "mx-auto text-center mt-5 p-5" : ""
    } text-dark"></div>`;
  } else {
    console.log("coco", content);
    document.querySelector(selector).innerHTML = content;
  }
}

async function displayData(data) {
  const listApp = document.querySelector("#listApps");
  const appCount = document.getElementById("appCount");

  toggleLoader("#listApps", false);
  toggleLoader("#appCount", false);
  appCount.innerText = `(${data.length})`;
  let item = "";
  data.forEach((app) => {
    console.log(app);
    item += `
        <div class="col-sm-6">
					<div class="app-card">
						<div class="app-card__content">
							<div class="app-card_img">
								<img src="${app.image_url}" alt="${app.name} Logo">
							</div>
							<div class="app-card_info">
                <h4 class="mb-2"><a href="${app.link_url}" target='__blank' class="text-muted"><span class="app-card_company">${app.name}</span> </a></h4>
								<p class="mb-0">${app.placeholder}</p>
							</div>
						</div>
					</div>
				</div>`;
  });
  listApp.innerHTML = item;
}

async function displayFooterApps(data) {
  const footerApps = document.querySelector("#footerApps");
  toggleLoader("#footerApps", false);
  let item = "";
  data.forEach((app) => {
    item += `<li class="nav-item mb-2"><a target="__blank" href="${app.link_url}" class="nav-link p-0 text-muted">
    ${app.name} <i class="fas fa-external-link-alt"></i></a></li>`;
  });
  footerApps.innerHTML = item;
}

loadData();
