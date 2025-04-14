let addBtn = document.getElementsByClassName("add-btn")[0];
let addModal = document.getElementById("add-schedule-modal");
let addForm = document.getElementById("add-schedule-form");
let cancelBtn = document.getElementById("cancel-btn");
let editIndex = -1; // biến theo dõi hàng chỉnh sửa
let schedules = []; // mảng lưu trữ lịch tập
// hàm tải dữ liệu
function loadSchedules() {
  const storedSchedules = localStorage.getItem("schedules"); // lấy dữ liệu từ localstorage
  if (storedSchedules) {
    // nếu có dữ liệu
    schedules = JSON.parse(storedSchedules);
    //hiển thị
    renderSchedules();
  }
}
// lưu dữ liệu vào localstorage
function saveSchedules() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}
// hiển thị lịch tập lên bảng
function renderSchedules() {
  let tableBody = document.getElementById("schedule-table-body");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;
  tableBody.innerHTML = "";
  // for (let i = 0; i < schedules.length - 1; i++) {
  //   for (let j = 0; j < schedules.length - i - 1; j++) {
  //     let name1 = schedules[j].classType.toLowerCase();
  //     let name2 = schedules[j + 1].classType.toLowerCase();
  //     if (name1 > name2) {
  //       let temp = schedules[j];
  //       schedules[j] = schedules[j + 1];
  //       schedules[j + 1] = temp;
  //     }
  //   }
  // }
  let schedulesort = schedules.sort(
    (a, b) => a.classType.length - b.classType.length
  );
  schedulesort.forEach((schedule, index) => {
    if (schedule.userEmail !== currentUser.email) return;
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${schedule.classType}</td>
    <td>${schedule.date}</td>
    <td>${schedule.time}</td>
    <td>${schedule.fullName}</td>
    <td>${schedule.email}</td>
    <td>
        <button class="edit-btn" style="background-color: white; color: #3498db; cursor: pointer; padding: 0px;">Sửa</button>
        <button class="delete-btn" style="background-color: white; color: tomato; cursor: pointer;">Xóa</button>
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
// ẩn các modal
addModal.style.display = "none";
// show khi đặt lịch mới
addBtn.onclick = function () {
  addModal.style.display = "block";
  document.getElementById("modal-title").innerHTML = "Đặt lịch mới";
  editIndex = -1; // đặt chỉ số để thêm mới
};
function closeModal() {
  addModal.style.display = "none";
  // đặt lại các giá trị
  document.getElementById("class-type").value = "Gym";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "07:00-08:00";
  document.getElementById("full-name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("modal-title").innerHTML = "Đặt lịch mới";
  document.getElementById("error-date").innerHTML = "";
  document.getElementById("error-name").innerHTML = "";
  document.getElementById("error-email").innerHTML = "";
  editIndex = -1;
}
// gán sự kiện cho nút hủy
cancelBtn.onclick = closeModal;
let date = document.getElementById("date");
let errorDate = document.getElementById("error-date");
function checkDate() {
  let dateValue = date.value.trim();
  if (dateValue === "") {
    errorDate.innerHTML = "Bạn chưa nhập ngày tháng năm. Vui lòng nhập lại.";
    return false;
  } else {
    errorDate.innerHTML = "";
    return true;
  }
}
let namee = document.getElementById("full-name");
let errorName = document.getElementById("error-name");
function checkName() {
  let nameValue = namee.value.trim();
  if (nameValue === "") {
    errorName.innerHTML = "Bạn chưa nhập họ và tên. Vui lòng nhập lại.";
    return false;
  } else {
    errorName.innerHTML = "";
    return true;
  } 
}
let email = document.getElementById("email");
let errorEmail = document.getElementById("error-email");
function checkEmail() {
  let emailValue = email.value.trim();
  if (emailValue === "") {
    errorEmail.innerHTML = "Email đang bị trống. Vui lòng nhập lại.";
    return false;
  } else if (!emailValue.includes("@gmail.com")) {
    errorEmail.innerHTML = "Email sai định dạng. Vui lòng nhập lại.";
    return false;
  } else {
    errorEmail.innerHTML = "";
    return true;
  }
}
addForm.onsubmit = function () {
  let isDateValid = checkDate();
  let isNameValid = checkName();
  let isEmailValid = checkEmail();
  if (isDateValid && isNameValid && isEmailValid) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Không xác định được người dùng.");
      return false;
    }
    let classType = document.getElementById("class-type").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let fullName = document.getElementById("full-name").value.trim();
    let email = document.getElementById("email").value.trim();
    let uperCaseName;
    uperCaseName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    for (let i=1; i < uperCaseName.length; i++) {
      if (uperCaseName[i] === " ") {
        uperCaseName = uperCaseName.slice(0, i + 1) + uperCaseName.charAt(i + 1).toUpperCase() + uperCaseName.slice(i + 2);
      }
    }
    let schedule = {
      classType: classType,
      date: date,
      time: time,
      fullName: uperCaseName,
      email: email,
      userEmail: currentUser.email,
    };
    if (editIndex === -1) {
      schedules.push(schedule);
    } else {
      schedules[editIndex] = schedule;
    }
    saveSchedules();
    renderSchedules();
    closeModal();
  }
  return false;
};
function editRow(index) {
  editIndex = index;
  let schedule = schedules[index];
  document.getElementById("class-type").value = schedule.classType;
  document.getElementById("date").value = schedule.date;
  document.getElementById("time").value = schedule.time;
  document.getElementById("full-name").value = schedule.fullName;
  document.getElementById("email").value = schedule.email;
  document.getElementById("modal-title").innerHTML = "Sửa lịch tập";
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
      schedules.splice(index, 1);
      saveSchedules();
      renderSchedules();
    }
  });
}
loadSchedules();
