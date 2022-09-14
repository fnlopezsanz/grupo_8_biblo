window.addEventListener('load', function () {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const formulario = document.querySelector('#formulario');
  
  const emailError = document.querySelector('#emailError');
  const passwordError = document.querySelector('#passwordError');
  const error = document.querySelector('#error');

  const campos = {
    email: false,
    password: false,
  }

  // Valida formato válido de email a partir de expresiones regulares
  function validateEmail(valueInput, divInput) {
    let regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    if (regExpEmail.test(valueInput)) {
      divInput.style.border = "";
      emailError.innerHTML = "";
      campos[divInput.name] = true;
      console.log(campos[divInput.name], campos)
    } else {
      divInput.style.border = "1px solid coral";
      emailError.innerHTML = "Debe introducir un formato de correo válido"
      campos[divInput.name] = false;
    }
  }

  // Valida password a partir de expresiones regulares. Debe contener 1 may, 1 min, 1 número y 1 caracter especial
  function validatePassword(valueInput, divInput) {
    let regExpPassword = /^(?=[\x21-\x7E]*[0-9])(?=[\x21-\x7E]*[A-Z])(?=[\x21-\x7E]*[a-z])(?=[\x21-\x7E]*[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E])[\x21-\x7E]{8,}$/

    if (regExpPassword.test(valueInput)) {
      divInput.style.border = "";
      passwordError.innerHTML = "";
      campos[divInput.name] = true;
    } else {
      divInput.style.border = "1px solid coral";
      passwordError.innerHTML = "Debe introducir una contraseña válida"
      campos[divInput.name] = false;
    }
  }

  email.addEventListener('blur', function () {
    validateEmail(email.value, email)
  })

  password.addEventListener('blur', function () {
    validatePassword(password.value, password)
  })

  email.addEventListener('keyup', function () {
    validateEmail(email.value, email)
  })

  password.addEventListener('keyup', function () {
    validatePassword(password.value, password)
  })
  

  formulario.addEventListener('submit', e => {
    if (campos.email && campos.password) {
      console.log(campos)
    } else {
      e.preventDefault();
      error.innerHTML = "Usuario y/o contraseña inválidos";
      error.style.marginLeft = "50px";
      error.style.fontSize = "20px";
      error.style.fontWeight = "bold";

      console.log(campos)
    }
  })
})