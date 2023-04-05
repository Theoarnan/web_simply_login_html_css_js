// Show or hide password
const showHiddenPassword = (inputPassword, checkboxShowPass) => {
  var idInputPass = document.getElementById(inputPassword);
  var idCheckboxShowPass = document.getElementById(checkboxShowPass);
  idCheckboxShowPass.checked = false;
  idCheckboxShowPass.addEventListener("change", () => {
    if (idInputPass.type === "password") {
      idInputPass.type = "text";
      idCheckboxShowPass.checked = true;
    } else {
      idInputPass.type = "password";
      idCheckboxShowPass.checked = false;
    }
  });
};

// Show or hide password
const processLogin = () => {
  var idInputUsername = document.querySelector("#username");
  var idInputPass = document.querySelector("#pass");
  var idErrorUser = document.querySelector(".error-msg-user");
  var idErrorPass = document.querySelector(".error-msg-pass");
  var form = document.getElementById("forms");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValidUsername = checkUsername(idInputUsername);
    let isValidPassword = checkPassword(idInputPass);
    let isFormValid = isValidUsername && isValidPassword;
    if (isFormValid) {
      console.log("Form Valid");
    }
  });

  const isRequired = (value) => (value === "" ? false : true);
  const checkUsername = (idInputUsername) => {
    let valid = false;
    const min = 3,
      max = 25;
    const username = idInputUsername.value.trim();

    if (!isRequired(username)) {
      showErrorUser("* Username cannot be blank.");
    } else if (!isBetween(username.length, min, max)) {
      showErrorUser("* Username must be between ${min} and ${max} characters.");
    } else {
      showSuccess(idErrorUser);
      valid = true;
    }
    return valid;
  };

  const checkPassword = (idInputPass) => {
    let valid = false;
    const password = idInputPass.value.trim();

    if (!isRequired(password)) {
      showErrorPassword("* Password cannot be blank.");
    } else if (!isPasswordSecure(password)) {
      showErrorPassword(
        "* Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
      );
    } else {
      showSuccess(idErrorPass);
      valid = true;
    }
    return valid;
  };

  const showSuccess = (idError) => {
    idError.style.display = "none";
    idInputUsername.style.border = "1px solid #F89E36";
}

  const showErrorUser = (message) => {
    idErrorUser.style.display = "inline-block";
    idInputUsername.style.border = "1px solid #f74040";
    idErrorUser.style.paddingBottom = "8px";
    idErrorUser.textContent = message;
  };

  const showErrorPassword = (message) => {
    idErrorPass.style.display = "inline-block";
    idInputPass.style.border = "1px solid #f74040";
    idErrorPass.textContent = message;
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;
};

showHiddenPassword("pass", "showHidePass");
processLogin();
