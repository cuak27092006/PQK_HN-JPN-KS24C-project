let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let registerButton = document.getElementById("btn");
let errorEmail = document.getElementById("email-error");
let errorName = document.getElementById("name-error");
let errorPassword = document.getElementById("password-error");
let errorCP = document.getElementById("confirmPassword-error");
nameInput.addEventListener("input", function () {
  checkName();
});
emailInput.addEventListener("input", function () {
  checkEmail();
});
passwordInput.addEventListener("input", function () {
  checkPassword();
});
confirmPasswordInput.addEventListener("input", function () {
  checkConfirmPassword();
});
registerButton.onclick = function () {
  let isValidName = checkName();
  let isValidEmail = checkEmail();
  let isValidPassword = checkPassword();
  let isValidConfirmPassword = checkConfirmPassword();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (
    isValidName &&
    isValidEmail &&
    isValidPassword &&
    isValidConfirmPassword
  ) {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    // lưu thông tin vào localstorage
    let userData = {
      id: Math.floor(Math.random() * 1000000),
      name: name,
      email: email,
      password: password,
    };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(userData));
    Swal.fire({
      title: "Đăng kí thành công!",
      text: "Đang chuyển hướng đến trang chính.",
      icon: "success",
      showConfirmButton: false,
    });
    setTimeout(function () {
      window.location.href = "http://127.0.0.1:5500/pages/auth/home%20.html";
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      confirmPasswordInput.value = "";
    }, 1000);
  }
};
function checkName() {
  let valueName = nameInput.value.trim();
  if (valueName === "") {
    errorName.innerText = "Tên không được để trống";
    return false;
  } else {
    errorName.innerText = "";
    return true;
  }
}
function checkEmail() {
  let valueEmail = emailInput.value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (valueEmail === "") {
    errorEmail.innerText = "Email không được để trống";
    return false;
  } else if (!valueEmail.includes("@") || !valueEmail.endsWith(".com")) {
    errorEmail.innerText = "Email sai định dạng";
    return false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === valueEmail) {
        errorEmail.innerText = "Email đã tồn tại, vui lòng chọn email khác";
        return false;
      }
    }
    errorEmail.innerText = "";
    return true;
  }
}
function checkPassword() {
  let valuePassword = passwordInput.value.trim();

  if (valuePassword === "") {
    errorPassword.innerText = "Mật khẩu không được để trống";
    return false;
  } else if (valuePassword.length < 6) {
    errorPassword.innerText = "Mật khẩu phải có ít nhất 6 ký tự";
    return false;
  } else {
    errorPassword.innerText = "";
    return true;
  }
}
function checkConfirmPassword() {
  let valueCP = confirmPasswordInput.value.trim();
  let valuePassword = passwordInput.value.trim();
  if (valueCP === "") {
    errorCP.innerText = "Vui lòng nhập lại mật khẩu";
    return false;
  } else if (valueCP !== valuePassword) {
    errorCP.innerText = "Mật khẩu xác nhận không khớp";
    return false;
  } else {
    errorCP.innerText = "";
    return true;
  }
}
