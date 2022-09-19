window.addEventListener('load', function () {
  const imagen = document.querySelector('#imagen');
  const imagenError = document.querySelector('#imagenError');
  
  const campos = {
    imagen: false,
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

  imagen.addEventListener('change', function () {
    validateImage(imagen.value, imagen, imagenError)
  })

  formulario.addEventListener('submit', e => {
    if (campos.imagen) {
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
