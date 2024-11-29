var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var searchInput = document.getElementById("searchInput");
var btnSubmit = document.getElementById("btnSubmit");
var btnUpdate = document.getElementById("btnUpdate");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var currentIndex = 0;
var siteList = [];
var msgName = document.getElementById("msgName");
if (localStorage.getItem("item") != null) {
  siteList = JSON.parse(localStorage.getItem("item"));
  displayData();
}

function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function submit() { 
  if(validationName() && validationUrl()){
  
    var item = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    siteList.push(item);
    localStorage.setItem("item", JSON.stringify(siteList));
    displayData();
    msgName.classList.add("d-none");
  
    clear();
  }
  else{
    msgName.classList.remove("d-none");
  }
}

function displayData() {
  var siteData = "";
  for (var i = 0; i < siteList.length; i++) {
    siteData += `<tr>
                <td>${i + 1}</td>
                <td>${siteList[i].siteName}</td>
                <td>
                  <a href="https://${
                    siteList[i].siteUrl
                  }" target="_blank"> <button class="visit btn"><i class="fa-regular fa-eye"></i> Visit</button></a>
                 </td>
                <td><button onclick="setUpdateInfo(${i})" class="update btn btn-warning"><i class="fa-solid fa-arrow-up-from-bracket"></i> update</button></td>
                <td><button onclick="deleteItem(${i})" class="delete btn btn-danger"><i class="fa-solid fa-trash-can"></i> delete</button></td>
            </tr>`;
  }
  document.getElementById("myTable").innerHTML = siteData;
}

function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("item", JSON.stringify(siteList));
  displayData();
}

function setUpdateInfo(index) {
  currentIndex = index;
  siteNameInput.value = siteList[index].siteName;
  siteUrlInput.value = siteList[index].siteUrl;
  btnSubmit.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateItem() {
  var item = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };

  siteList.splice(currentIndex, 1, item);
  localStorage.setItem("item", JSON.stringify(siteList));
  displayData();
  btnSubmit.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clear();
}

function searchData() {
  var term = searchInput.value;

  var siteData = "";
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].siteName.toLowerCase().includes(term.toLowerCase())) {
      siteData += `<tr>
  <td>${i + 1}</td>
  <td>${siteList[i].siteName}</td>
  <td><a href="https://${
    siteList[i].siteUrl
  }" target="_blank"> <button class="visit btn"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
  <td><button onclick="updateItem()" class="update btn btn-warning"><i class="fa-solid fa-arrow-up-from-bracket"></i> update</button></td>
  <td><button onclick="deleteItem(${i})" class="delete btn btn-danger"><i class="fa-solid fa-trash-can"></i> delete</button></td>
</tr>`;
    }
  }
  document.getElementById("myTable").innerHTML = siteData;
}

function validationName(){
  var text = siteNameInput.value;
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  // var msgName = document.getElementById("msgName");
  if(nameRegex.test(text)){
    siteNameInput.classList.add("is-valid")
    siteNameInput.classList.remove("is-invalid")
    // msgName.classList.add("d-none");
    return true
  }else{
 siteNameInput.classList.add("is-invalid")
 siteNameInput.classList.remove("is-valid")

//  msgName.classList.remove("d-none");
 return false
  }
}

function validationUrl(){
  var text = siteUrlInput.value;
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  // var msgName = document.getElementById("msgName");
  if(urlRegex.test(text)){
    siteUrlInput.classList.add("is-valid")
    siteUrlInput.classList.remove("is-invalid")
    // msgName.classList.add("d-none");
    return true
  }else{
    siteUrlInput.classList.add("is-invalid")
    siteUrlInput.classList.remove("is-valid")
//  msgName.classList.remove("d-none");
 return false
  }
}

function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
