
function iniciarSeccion() {
    /* 
     administrador - 123
     general - 123
    */
    var usuario = document.getElementById("usuario").value
    var password = document.getElementById("password").value

    if(usuario == "administrador" && password == "123"){
        window.location.href = "menuadministrador.html"
    }else if(usuario == "general" && password == "123"){
        window.location.href = "menugeneral.html"
    }else{
        alert("Usuario o password errado")
        nuevo()
    }
}

function nuevo() {
    var usuario = document.getElementById("usuario")
    var password = document.getElementById("password")

    usuario.value = ""
    password.value = ""
    usuario.focus()
}

document.addEventListener('DOMContentLoaded', function() {
    var cuentasSelect = document.getElementById('cuentaBancaria');
    var cuentasSelectTipo = document.getElementById('tipoIngresoEgreso');
    
    // Obtener las cuentas bancarias desde el localStorage
    var cuentasBancarias = JSON.parse(localStorage.getItem('cuentasBancarias')) || [];
    var tiposIngresosyEgresos = JSON.parse(localStorage.getItem('tiposIngresosyEgresos')) || [];
    
    // Agregar cada cuenta bancaria como una opción en el select
    cuentasBancarias.forEach(function(cuenta) {
        var option = document.createElement('option');
        option.value = cuenta.numeroDeCuenta;
        option.textContent = cuenta.numeroDeCuenta;
        cuentasSelect.appendChild(option);
    });

    tiposIngresosyEgresos.forEach(function(tipo) {
        var option = document.createElement('option');
        option.value = tipo.nombreDeTipo;
        option.textContent = tipo.nombreDeTipo;
        cuentasSelectTipo.appendChild(option);
    });
});