let addBtn = document.getElementsByClassName("add-btn")[0];
let addModal = document.getElementById("add-service-modal");
let addForm = document.getElementById("add-service-form");
let cancelBtn = document.getElementById("cancel-btn");
let editIndex = -1;
let services = [];

function loadServices() {
  const storedServices = localStorage.getItem("services");
  if (storedServices) {
    services = JSON.parse(storedServices);
    renderServices();
  }
}

function saveServices() {
  localStorage.setItem("services", JSON.stringify(services));
}

function renderServices() {
  let tableBody = document.getElementById("service-table-body");
  tableBody.innerHTML = "";
  services.forEach((service, index) => {
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${service.name}</td>
      <td>${service.description}</td>
      <td><img src="${service.image}"></td>
      <td>
        <button class="edit-btn" style="background-color: white; color: #3498db; cursor: pointer; border: none; margin-right: 10px">Sửa</button>
        <button class="delete-btn" style="background-color: white; color: tomato; cursor: pointer; border: none">Xóa</button>
      </td>
    `;
    newRow.querySelector(".edit-btn").onclick = function () {
      editRow(index);
    };
    newRow.querySelector(".delete-btn").onclick = function () {
      deleteRow(index);
    };
  });
}

function closeModal() {
  addModal.style.display = "none";
  document.getElementById("service-name").value = "";
  document.getElementById("service-description").value = "";
  document.getElementById("service-image").value = "";
  document.getElementById("error-name").innerHTML = "";
  document.getElementById("error-description").innerHTML = "";
  document.getElementById("error-image").innerHTML = "";
  editIndex = -1;
}
addModal.style.display = "none";
addBtn.onclick = function () {
  addModal.style.display = "block";
  document.getElementById("modal-title").innerHTML = "Thêm dịch vụ mới";
  editIndex = -1;
};
cancelBtn.onclick = closeModal;
let namee = document.getElementById("service-name");
let errorName = document.getElementById("error-name");
function checkName() {
  let nameValue = namee.value.trim();
  if (nameValue === "") {
    errorName.innerHTML = "Bạn chưa nhập tên dịch vụ. Vui lòng nhập lại.";
    return false;
  } else {
    errorName.innerHTML = "";
    return true;
  }
}

let description = document.getElementById("service-description");
let errorDescription = document.getElementById("error-description");
function checkDescription() {
  let descriptionValue = description.value.trim();
  if (descriptionValue === "") {
    errorDescription.innerHTML = "Bạn chưa nhập mô tả. Vui lòng nhập lại.";
    return false;
  } else {
    errorDescription.innerHTML = "";
    return true;
  }
}

let image = document.getElementById("service-image");
let errorImage = document.getElementById("error-image");
function checkImage() {
  let imageValue = image.value.trim();
  if (imageValue === "") {
    errorImage.innerHTML = "Bạn chưa nhập link hình ảnh. Vui lòng nhập lại.";
    return false;
  } else {
    errorImage.innerHTML = "";
    return true;
  }
}

addForm.onsubmit = function (event) {
  event.preventDefault();
  let isNameValid = checkName();
  let isDescriptionValid = checkDescription();
  let isImageValid = checkImage();
  if (isNameValid && isDescriptionValid && isImageValid) {
    let service = {
      id: services.length + 1,
      name: namee.value.trim(),
      description: description.value.trim(),
      image: image.value.trim(),
    };
    if (editIndex === -1) {
      services.push(service);
    } else {
      services[editIndex] = service;
    }
    saveServices();
    renderServices();
    closeModal();
  }
};

function editRow(index) {
  editIndex = index;
  let service = services[index];
  document.getElementById("service-name").value = service.name;
  document.getElementById("service-description").value = service.description;
  document.getElementById("service-image").value = service.image;
  document.getElementById("modal-title").innerHTML = "Sửa dịch vụ";
  addModal.style.display = "block";
}

function deleteRow(index) {
  Swal.fire({
    title: "Cảnh Báo!",
    text: "Bạn có muốn xóa mục này không?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Không",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Đã Xóa Thành Công!",
        icon: "success",
      });
      services.splice(index, 1);
      saveServices();
      renderServices();
    }
  });
}
loadServices();