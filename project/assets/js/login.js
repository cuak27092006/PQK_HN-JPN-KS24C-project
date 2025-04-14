let loginBtn = document.getElementById("loginBtn");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let errorEmail = document.getElementById("email-error");
let errorPassword = document.getElementById("password-error");
let admin = {
  name: "Admin",
  email: "Admin@gmail.com",
  password: "admin123456",
};
emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();
  let isValidEmail = checkEmail();
  let isValidPassword = checkPassword();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let matchedUser = null;
  if (!isValidEmail || !isValidPassword) {
    return;
  }
  if (email === admin.email && password === admin.password) {
    Swal.fire({
      title: "Đăng nhập thành công với tư cách là admin!",
      text: "Đang chuyển hướng đến trang chính.",
      icon: "success",
      showConfirmButton: false,
    });
    setTimeout(function () {
      resetForm();
      window.location.href = "http://127.0.0.1:5500/pages/admin/services.html";    
    }, 1000);
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      matchedUser = users[i];
      break;
    }
  }
  if (!matchedUser) {
    errorEmail.innerText = "Tài khoản không tồn tại";
    return;
  }
  if (matchedUser.password !== password) {
    errorPassword.innerText = "Mật khẩu không đúng";
    return;
  }
  localStorage.setItem("currentUser", JSON.stringify(matchedUser));
  Swal.fire({
    title: "Đăng nhập thành công!",
    text: "Đang chuyển hướng đến trang chính.",
    icon: "success",
    showConfirmButton: false,
  });
  setTimeout(function () {
    resetForm();
    window.location.href = "http://127.0.0.1:5500/pages/admin/services.html";
  }, 1000);
});

function checkEmail() {
  let email = emailInput.value.trim();
  if (email === "") {
    errorEmail.innerText = "Vui lòng nhập email";
    return false;
  } else if (!email.includes("@gmail.com")) {
    errorEmail.innerText = "Email không hợp lệ";
    return false;
  } else {
    errorEmail.innerText = "";
    return true;
  }
}

function checkPassword() {
  let password = passwordInput.value.trim();
  if (password === "") {
    errorPassword.innerText = "Vui lòng nhập mật khẩu";
    return false;
  } else if (password.length < 8) {
    errorPassword.innerText = "Mật khẩu phải có ít nhất 8 ký tự";
    return false;
  } else {
    errorPassword.innerText = "";
    return true;
  }
}

function resetForm() {
  emailInput.value = "";
  passwordInput.value = "";
  errorEmail.innerText = "";
  errorPassword.innerText = "";
}
