// show password
export function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password-input");
    const eyeIcon = document.querySelector(".eyeIcon");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    }
  }