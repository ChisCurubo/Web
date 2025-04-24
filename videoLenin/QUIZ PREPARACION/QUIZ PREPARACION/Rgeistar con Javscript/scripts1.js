function validarSoloLetras(valor, campo) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(valor.trim())) {
      alert(`El campo ${campo} solo debe contener letras.`);
      return false;
    }
    return true;
  }
  
  function validarSoloNumeros(valor, campo) {
    const regex = /^[0-9]+$/;
    if (!regex.test(valor.trim())) {
      alert(`El campo ${campo} solo debe contener números.`);
      return false;
    }
    return true;
  }
  
  function validarMinCaracteres(valor, min, campo) {
    if (valor.trim().length < min) {
      alert(`El campo ${campo} debe tener al menos ${min} caracteres.`);
      return false;
    }
    return true;
  }
  
  function validarEmail(valor) {
    if (!valor.includes("@")) {
      alert("El correo electrónico debe contener un '@'.");
      return false;
    }
    return true;
  }
  
  function validarContrasena(valor) {
    const mayus = /[A-Z]/;
    const minus = /[a-z]/;
    const simbolo = /[^A-Za-z0-9]/;
  
    if (!mayus.test(valor)) {
      alert("La contraseña debe tener al menos una letra mayúscula.");
      return false;
    }
    if (!minus.test(valor)) {
      alert("La contraseña debe tener al menos una letra minúscula.");
      return false;
    }
    if (!simbolo.test(valor)) {
      alert("La contraseña debe contener al menos un símbolo.");
      return false;
    }
    return true;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRegistro");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      
      const nombre = document.getElementById("inputNombre").value;
      const apellido = document.getElementById("inputApellido").value;
      const cedula = document.getElementById("inputCedula").value;
      const direccion = document.getElementById("inputDireccion").value;
      const telefono = document.getElementById("inputTelefono").value;
      const email = document.getElementById("inputEmail").value;
      const contrasena = document.getElementById("inputContrasena").value;
  
      if (!validarSoloLetras(nombre, "Nombre")) return;
      if (!validarSoloLetras(apellido, "Apellido")) return;
      if (!validarSoloNumeros(cedula, "Cédula")) return;
      if (!validarMinCaracteres(direccion, 80, "Dirección")) return;
      if (!validarSoloNumeros(telefono, "Teléfono")) return;
      if (!validarEmail(email)) return;
      if (!validarContrasena(contrasena)) return;
  
      alert("Formulario válido. Puedes enviarlo.");
      form.submit();
    });
  });
  