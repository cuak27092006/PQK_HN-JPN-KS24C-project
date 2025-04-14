let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let currentEditIndex = -1;

function updateStats() {
  let gymCount = 0;
  let yogaCount = 0;
  let zumbaCount = 0;
  for (let i = 0; i < schedules.length; i++) {
    const type = schedules[i].classType.toLowerCase();
    if (type === "gym") gymCount++;
    else if (type === "yoga") yogaCount++;
    else if (type === "zumba") zumbaCount++;
  }
  document.getElementById("gym-value").textContent = gymCount;
  document.getElementById("yoga-value").textContent = yogaCount;
  document.getElementById("zumba-value").textContent = zumbaCount;
}

function renderTable(data = schedules) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  if (data.length === 0) return;

  for (let i = 0; i < data.length; i++) {
    const schedule = data[i];
    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${schedule.classType}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time}</td>
            <td>${schedule.fullName}</td>
            <td>${schedule.email}</td>
            <td>
                <button onclick="editSchedule(${i})" style="background-color: white; color: #3498db; cursor: pointer; padding: 0px; border: none; margin-right: 10px;">Sửa</button>
                <button onclick="deleteSchedule(${i})" style="background-color: white; color: tomato; cursor: pointer; border: none;">Xóa</button>
            </td>
        `;
  }
}

function filterSchedules() {
  const classValue = document.getElementById("filter-data").value.toLowerCase();
  const emailValue = document
    .querySelector("input#search-email")
    .value.toLowerCase();
  const dateValue = document.querySelector("input#search-time").value;
  let filteredSchedules = [];
  for (let i = 0; i < schedules.length; i++) {
    let s = schedules[i];
    let matchesClass =
      classValue === "all" || s.classType.toLowerCase() === classValue;
    let matchesEmail =
      !emailValue || s.email.toLowerCase().includes(emailValue);
    let matchesDate = !dateValue || s.date === dateValue;

    if (matchesClass && matchesEmail && matchesDate) {
      filteredSchedules.push(s);
    }
  }
  renderTable(filteredSchedules);
}

function editSchedule(index) {
  currentEditIndex = index;
  const schedule = schedules[index];

  document.getElementById("edit-class").value = schedule.classType;
  document.getElementById("edit-date").value = schedule.date;
  document.getElementById("edit-time").value = schedule.time;
  document.getElementById("edit-fullname").value = schedule.fullName;
  document.getElementById("edit-email").value = schedule.email;

  hideAllEditErrors();
  document.getElementById("edit-modal").style.display = "block";
}

function hideAllEditErrors() {
  document.getElementById("class-error").style.display = "none";
  document.getElementById("date-error").style.display = "none";
  document.getElementById("time-error").style.display = "none";
  document.getElementById("fullname-error").style.display = "none";
  document.getElementById("email-error").style.display = "none";
}

function saveEditedSchedule() {
  const classType = document.getElementById("edit-class").value;
  const date = document.getElementById("edit-date").value;
  const time = document.getElementById("edit-time").value;
  const fullName = document.getElementById("edit-fullname").value.trim();
  const email = document.getElementById("edit-email").value.trim();

  let isValid = true;
  hideAllEditErrors();

  if (!classType) {
    document.getElementById("class-error").style.display = "block";
    isValid = false;
  }
  if (!date) {
    document.getElementById("date-error").style.display = "block";
    isValid = false;
  }
  if (!time) {
    document.getElementById("time-error").style.display = "block";
    isValid = false;
  }
  if (!fullName) {
    document.getElementById("fullname-error").style.display = "block";
    isValid = false;
  }
  if (!email) {
    document.getElementById("email-error").style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  schedules[currentEditIndex] = { classType, date, time, fullName, email };
  localStorage.setItem("schedules", JSON.stringify(schedules));

  updateStats();
  renderTable();
  document.getElementById("edit-modal").style.display = "none";
  currentEditIndex = -1;
}

function deleteSchedule(index) {
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
      schedules.splice(index, 1);
      localStorage.setItem("schedules", JSON.stringify(schedules));
      updateStats();
      renderTable();
    }
  });
}

function loadPage() {
  updateStats();
  renderTable();
  document.getElementById("filter-data").onchange = filterSchedules;
  document.getElementById("search-email").oninput = filterSchedules;
  document.getElementById("search-time").onchange = filterSchedules;
  document.getElementById("save-btn").onclick = saveEditedSchedule;
  document.getElementById("cancel-btn").onclick = function () {
    document.getElementById("edit-modal").style.display = "none";
    currentEditIndex = -1;
  };
}

window.onload = loadPage;