window.addEventListener('load', function () {
  //Captura de campos del formulario
  const formulario = document.querySelector('#form');
  const nombre = document.querySelector('#nombre');
  const apellido = document.querySelector('#apellido');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const image = document.querySelector('#image');
  
  //Captura de divs de errores del formulario
  const nombreError = document.querySelector('#nombreError');
  const apellidoError = document.querySelector('#apellidoError');
  const emailError = document.querySelector('#emailError');
  const passwordError = document.querySelector('#passwordError');
  const imageError = document.querySelector('#imageError');
  const error = document.querySelector('#error');

  const campos = {
    nombre: false,
    apellido: false,
    email: false,
    password: false,
    image: false,
  }

  // Funciones
  // Mínimo 2 caracteres para Nombre y Apellido
  function validateLength(valueInput, divInput, divError) {
    if (valueInput.length < 2) {
      showError(divInput, divError);
      campos[divInput.name] = false;
    } else {
      hideError(divInput, divError);
      campos[divInput.name] = true;
    }
  }

  // Muestra borde rojo del input y div con texto de error para Nombre y Apellido
  function showError(divInput, divError) {
    divInput.style.border = "1px solid coral";
    divError.innerHTML = `Debe introducir un ${divInput.id} de al menos 2 caracteres`;
  }

  // Esconde borde rojo del input y div con texto de error para Nombre y Apellido
  function hideError(divInput, divError) {
    divInput.style.border = "";
    divError.innerHTML = "";
  }

  // Valida formato válido de email a partir de expresiones regulares
  function validateEmail(valueInput, divInput) {
    let regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    if (regExpEmail.test(valueInput)) {
      divInput.style.border = "";
      emailError.innerHTML = "";
      campos[divInput.name] = true;
      console.log(campos[divInput], campos)
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

  function validateImage(valueInput, divInput, divError) {
    let regExpExtension = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    console.log(regExpExtension.test(valueInput), valueInput)
    if (!regExpExtension.test(valueInput)) {
      divInput.style.border = "1px solid coral";
      divError.innerHTML = "Las extensiones permitidas son .gif, .jpg, .jpeg y .png";
      valueInput = "";
      campos.image = false;
    } else {
      divInput.style.border = "";
      divError.innerHTML = "";
      campos.image = true;
    }
  }
  //Eventos Blur
  nombre.addEventListener('blur', function () {
    validateLength(nombre.value, nombre, nombreError);
  })

  apellido.addEventListener('blur', function () {
    validateLength(apellido.value, apellido, apellidoError);
  })

  email.addEventListener('blur', function () {
    validateEmail(email.value, email)
  })

  password.addEventListener('blur', function () {
    validatePassword(password.value, password)
  })

  //Eventos Keyup
  nombre.addEventListener('keyup', function () {
    validateLength(nombre.value, nombre, nombreError);
  })

  apellido.addEventListener('keyup', function () {
    validateLength(apellido.value, apellido, apellidoError);
  })

  email.addEventListener('keyup', function () {
    validateEmail(email.value, email)
  })

  password.addEventListener('keyup', function () {
    validatePassword(password.value, password)
  })

  image.addEventListener('change', function () {
    validateImage(image.value, image, imageError)
  })

  formulario.addEventListener('submit', e => {
    if (campos.nombre && campos.apellido && campos.email && campos.password && campos.image) {
      console.log(campos)
    } else {
      e.preventDefault();
      error.innerHTML = "Todos los campos son obligatorios y deben completarse de forma correcta";
      error.style.marginLeft = "50px";
      error.style.fontSize = "24px";
      error.style.fontWeight = "bolder";

      console.log(campos)
    }
  })

})