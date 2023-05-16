console.log("Chargement du script app.js");

async function loadData(){
    const response = await fetch("apps.json");
    const data =  await response.json();
    displayData(data);
}

async function displayData(data){
    const listApp = document.querySelector('#listApps');
    const appCount = document.getElementById("appCount");

    appCount.innerText = `(${data.length})`
    let item = "";
    data.forEach(app => {
        console.log(app);
        item += `
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div class="box-part text-center shadow-sm bg-dark rounded">
          <img src="${app.image_url}" width="50" alt="${app.name}">
          <div class="title">
            <h4 class="fw-bolder mt-3">${app.name}</h4>
          </div>
          <div class="text">
            <span>${app.placeholder}</span>
          </div>
          <a class="btn btn-light" target="_blank" href="${app.link_url}">Learn More</a>
        </div>
      </div>`
    });
    listApp.innerHTML = item;
}

loadData();