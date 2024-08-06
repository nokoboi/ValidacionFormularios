function validarNombre() {
    // Obtenemos el valor del nombre
    let nombreInput = document.getElementById('nombre').value;
    // Obtenemos el div del error
    let errorNombre = document.getElementById('nombreError');

    // Comprobamos si el nombre es valido
    if (nombreInput.trim().length < 3) {
        errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres'
        document.getElementById('nombre').classList.remove('errorInput')
        document.getElementById('nombre').classList.add('success')
        return false;
    } else {
        errorNombre.textContent = ''
        document.getElementById('nombre').classList.add('errorInput')
        document.getElementById('nombre').classList.remove('success')
        return true;
    }
}

function validarEmail() {
    let esCorrecto = true;
    let emailInput = document.getElementById('email').value;
    let errorEmail = document.getElementById('emailError');
    let emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');

    // Comprobamos la expresión regular si es valido el email
    if (emailRegex.test(emailInput.trim())) {
        errorEmail.textContent = '';
        document.getElementById('email').classList.remove('errorInput')
        document.getElementById('email').classList.add('success')
    } else {
        errorEmail.textContent = 'El email no es válido';
        esCorrecto = false;

        document.getElementById('email').classList.add('errorInput')
        document.getElementById('email').classList.remove('success')
    }

    return esCorrecto;
}

function validarFechaNacimiento() {
    let fechaUsuario = document.getElementById('fecha').value
    let fechaUsuarioError = document.getElementById('fechaError')

    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth();
    let diaActual = fechaActual.getDay();
    const fechaMinima = new Date(anioActual - 120, mesActual, diaActual);
    fechaUsuario = new Date(fechaUsuario);

    if (fechaUsuario > fechaActual || fechaUsuario < fechaMinima) {
        fechaUsuarioError.textContent = 'Por favor introduce una fecha válida';
        document.getElementById('fecha').classList.add('errorInput')
        document.getElementById('fecha').classList.remove('success')
        return false

    } else {
        fechaUsuarioError = ''
        document.getElementById('fecha').classList.remove('errorInput')
        document.getElementById('fecha').classList.add('success')
        return true
    }
}

function validarTelefono() {
    let telefonoUsuario = document.getElementById('tele').value;
    let telefonoError = document.getElementById('telError');
    let telRegex = new RegExp('^[9|6|7][0-9]{8}$');

    if(!telRegex.test(telefonoUsuario.trim())){
        telefonoError.textContent = 'Por favor inserta un teléfono válido';
        document.getElementById('tele').classList.add('errorInput')
        document.getElementById('tele').classList.remove('success')
        return false
    }else{
        telefonoError.textContent = '';
        document.getElementById('tele').classList.remove('errorInput')
        document.getElementById('tele').classList.add('success')
        return true
    }
}

function validarPassword() {
    let esCorrecto = true;
    let passInput = document.getElementById('pass').value
    let errorPass = document.getElementById('passError');
    let passRegex = new RegExp('^.{6,}$');

    if (passRegex.test(passInput.trim())) {
        errorPass.textContent = ''

        document.getElementById('pass').classList.remove('errorInput')
        document.getElementById('pass').classList.add('success')
    } else {
        errorPass.textContent = 'La contraseña debe tener al menos 6 caracteres'
        esCorrecto = false;

        document.getElementById('pass').classList.add('errorInput')
        document.getElementById('pass').classList.remove('success')
    }

    return esCorrecto;
}

function confirmarPassword() {
    let esCorrecto = true;
    let passInput = document.getElementById('pass').value;
    let confirmPass = document.getElementById('pass2').value;
    let errorPassConfirm = document.getElementById('passwordError2');

    if (passInput.trim() !== confirmPass.trim()) {
        errorPassConfirm.textContent = 'Las contraseñas no coinciden';
        esCorrecto = false
        document.getElementById('pass2').classList.add('errorInput')
        document.getElementById('pass2').classList.remove('success')
    } else {
        errorPassConfirm.textContent = '';
        document.getElementById('pass2').classList.remove('errorInput')
        document.getElementById('pass2').classList.add('success')
    }

    return esCorrecto;

}

function succes() {
    document.getElementById('pass2').classList.remove('errorInput')
    document.getElementById('pass2').classList.add('success')
}

function fail() {
    document.getElementById('pass2').classList.add('errorInput')
    document.getElementById('pass2').classList.remove('success')
}

// Agregamos eventos para la validacion en tiempo real
// Evento Input
document.getElementById('nombre').addEventListener('input', validarNombre) // sin parentesis, asi se ejecuta cuando se dispara el evento
document.getElementById('email').addEventListener('input', validarEmail)
document.getElementById('pass').addEventListener('input', validarPassword)
document.getElementById('pass2').addEventListener('input', confirmarPassword)
document.getElementById('fecha').addEventListener('input', validarFechaNacimiento)
document.getElementById('tele').addEventListener('input', validarTelefono)

// Capturar evento submit del botón de formulario
document.getElementById('registroForm').addEventListener('submit', function (event) {
    // El submit lo que hace es limpiar el formulario y recarga la pagina, hay que pararlo
    event.preventDefault()
    console.log('Tipo de evento:', event)
    // Especifica el tipo de evento
    console.log('Tipo de evento: ', event.type)
    // Contiene una referencia al DOM que dispara el evento
    console.log('Elemento:', event.currentTarget)
    console.log('Todos los elementos:', event.target)
    // Tiempo en milisegundos desde que carga la pagina a cuando le das a enviar
    console.log('Tiempo desde hasta que pulsas enviar:', event.timeStamp)
    // Booleano que indica si fue iniciado por un usuario(true) o script(false)
    console.log('Si es humano el que envia y no bot:', event.isTrusted)

    let isNombreValid = validarNombre();
    let isEmailValid = validarEmail();
    let isPassValid = validarPassword();
    let isPassConfirmed = confirmarPassword();
    let isFechaValid = validarFechaNacimiento();
    let isTelfValid = validarTelefono();

    if (isNombreValid && isEmailValid && isPassValid && isPassConfirmed && isFechaValid && isTelfValid) {
        alert('Formulario enviado con éxito');
        this.reset();
    } else {
        // alert('Corrige los errores del formulario')
    }
});