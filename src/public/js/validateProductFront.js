window.addEventListener('load', function () {
  const titulo = document.querySelector('#titulo');
  const descripcion = document.querySelector('#descripcion');
  const imagen = document.querySelector('#imagen');
  const formulario = document.querySelector('#formulario');

  const tituloError = document.querySelector('#tituloError');
  const descripcionError = document.querySelector('#descripcionError');
  const imagenError = document.querySelector('#imagenError');
  
  const error = document.querySelector('#error');

  const campos = {
    titulo: false,
    descripcion: false,
    imagen: false,
  }

  function validateLengthTitulo(valueInput, divInput, divError) {
    if (valueInput.length < 5) {
      divInput.style.border = "1px solid coral";
      divError.innerHTML = `Debe introducir un ${divInput.id} de al menos 5 caracteres`;
      campos[divInput.name] = false;
    } else {
      hideError(divInput, divError);
      campos[divInput.name] = true;
    }
  }

  function validateLengthDescripcion(valueInput, divInput, divError) {
    if (valueInput.length < 20) {
      divError.innerHTML = `Debe introducir una ${divInput.id} de al menos 20 caracteres`;
      campos[divInput.name] = false;
    } else {
      hideError(divInput, divError);
      campos[divInput.name] = true;
    }
  }

  // Esconde borde rojo del input y div con texto de error para Nombre y Apellido
  function hideError(divInput, divError) {
    divInput.style.border = "";
    divError.innerHTML = "";
  }

  function validateImage(valueInput, divInput, divError) {
    let regExpExtension = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    console.log(regExpExtension.test(valueInput), valueInput)
    if (!regExpExtension.test(valueInput)) {
      divInput.style.border = "1px solid coral";
      divError.innerHTML = "Las extensiones permitidas son .gif, .jpg, .jpeg y .png";
      valueInput = "";
      campos.imagen = false;
    } else {
      divInput.style.border = "";
      divError.innerHTML = "";
      campos.imagen = true;
    }
  }

  titulo.addEventListener('blur', function () {
    validateLengthTitulo(titulo.value, titulo, tituloError);
  })

  descripcion.addEventListener('blur', function () {
    validateLengthDescripcion(descripcion.value, descripcion, descripcionError);
  })
  titulo.addEventListener('keyup', function () {
    validateLengthTitulo(titulo.value, titulo, tituloError);
  })

  descripcion.addEventListener('keyup', function () {
    validateLengthDescripcion(descripcion.value, descripcion, descripcionError);
  })
  
  imagen.addEventListener('change', function () {
    validateImage(imagen.value, imagen, imagenError)
  })

  formulario.addEventListener('submit', e => {
    if (campos.titulo && campos.descripcion && campos.imagen) {
      console.log(campos)
    } else {
      e.preventDefault();
      error.innerHTML = "Debe completar los campos correctamente";
      error.style.marginLeft = "50px";
      error.style.fontSize = "20px";
      error.style.fontWeight = "bold";

      console.log(campos)
    }
  })
})