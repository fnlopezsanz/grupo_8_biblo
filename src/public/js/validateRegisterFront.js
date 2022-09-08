window.addEventListener('load', function() {
//Captura de campos del formulario
  const formulario = document.querySelector('#form');
  const nombre = document.querySelector('#nombre');
  const apellido = document.querySelector('#apellido');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  
//Captura de divs de errores del formulario
  const nombreError = document.querySelector('#nombreError');
  const apellidoError = document.querySelector('#apellidoError');
  const emailError = document.querySelector('#emailError');
  const passwordError = document.querySelector('#passwordError');

// Funciones
  function validateLength(valueInput, divInput, divError) {
    if (valueInput.length < 2) {
      showError(divInput, divError);
    } else {
      hideError(divInput, divError);
    }
  }

  function showError(divInput, divError) {
    divInput.style.border = "1px solid coral";
    divError.innerHTML = `Debe introducir un ${divInput.id} de al menos 2 caracteres`;
  }
  
  function hideError(divInput, divError) {
    divInput.style.border = "";
    divError.innerHTML = "";
  }
  
  function validateEmail(valueInput, divInput) {
    let regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    if(regExpEmail.test(valueInput)) {
      divInput.style.border = "";
      emailError.innerHTML = "";
    } else {
      divInput.style.border = "1px solid coral";
      emailError.innerHTML = "Debe introducir un formato de correo válido"
    }
  }

  function validatePassword(valueInput, divInput) {
    let regExpPassword = /^(?=[\x21-\x7E]*[0-9])(?=[\x21-\x7E]*[A-Z])(?=[\x21-\x7E]*[a-z])(?=[\x21-\x7E]*[\x21-\x2F|\x3A-\x40|\x5B-\x60|\x7B-\x7E])[\x21-\x7E]{6,}$/

    if (regExpPassword.test(valueInput)) {
      divInput.style.border = "";
      passwordError.innerHTML = "";
    } else {
      divInput.style.border = "1px solid coral";
      passwordError.innerHTML = "Debe introducir una contraseña válida"
    }
  }

//Eventos
  nombre.addEventListener('blur', function() {
    validateLength(nombre.value, nombre, nombreError);
  })
  
  apellido.addEventListener('blur', function() {
    validateLength(apellido.value, apellido, apellidoError);
  })
  
  email.addEventListener('blur', function() {
    validateEmail(email.value, email)
  })
  
  password.addEventListener('blur', function() {
    validatePassword(password.value, password)
  })
 
})