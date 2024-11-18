class CuentaBancaria {
    constructor(numeroDeCuenta, nombreDeBanco, tipoDeCuenta, saldoActual, estadoDeCuenta, fechaApertura, descripcionCuenta) {
        this.numeroDeCuenta = numeroDeCuenta
        this.nombreDeBanco = nombreDeBanco
        this.tipoDeCuenta = tipoDeCuenta
        this.saldoActual = saldoActual
        this.estadoDeCuenta = estadoDeCuenta
        this.fechaApertura = fechaApertura
        this.descripcionCuenta = descripcionCuenta
    }
}

function guardarCuentaBancaria() {
    //localStorage.setItem("empleados", "[]")
    var numeroDeCuenta = document.getElementById('numeroDeCuenta')
    var nombreDeBanco = document.getElementById('nombreDeBanco')
    var tipoDeCuenta = document.getElementById('tipoDeCuenta')
    var saldoActual = document.getElementById('saldoActual')
    var estadoDeCuenta = document.getElementById('estadoDeCuenta')
    var fechaApertura = document.getElementById('fechaApertura')
    var descripcionCuenta = document.getElementById('descripcionCuenta')

    // Verificar si los campos obligatorios están llenos
    if (!numeroDeCuenta.value || !nombreDeBanco.value || !tipoDeCuenta.value || !saldoActual.value || !estadoDeCuenta.value) {
        alert("Por favor, complete los campos obligatorios (codigo, nombre de tipo y tipo).")
        nuevaCuentaBancaria()
        return; // Salir de la función sin guardar el evento
    }

    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]")
    // Obtener los datos de los participantes de la tabla
    var cuentaBancaria = new CuentaBancaria(numeroDeCuenta.value, nombreDeBanco.value, tipoDeCuenta.value, saldoActual.value, estadoDeCuenta.value, fechaApertura.value, descripcionCuenta.value)
    cuentasBancarias.push(cuentaBancaria)
    // Almacenar en localStorage (puede usarse para almacenamiento persistente en el navegador)
    localStorage.setItem('cuentasBancarias', JSON.stringify(cuentasBancarias));

    adicionarCuentaBancaria()
    alert("Cuenta bancaria guardada exitosamente")
    nuevaCuentaBancaria()
}

function actualizarCuenta() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    var numeroDeCuenta = document.getElementById('numeroDeCuenta').value
    var nombreDeBanco = document.getElementById('nombreDeBanco').value
    var tipoDeCuenta = document.getElementById('tipoDeCuenta').value
    var saldoActual = document.getElementById('saldoActual').value
    var estadoDeCuenta = document.getElementById('estadoDeCuenta').value
    var fechaApertura = document.getElementById('fechaApertura').value
    var descripcionCuenta = document.getElementById('descripcionCuenta').value

    var indiceEvento = -1;
    for (let i = 0; i < cuentasBancarias.length; i++) {
        if (cuentasBancarias[i].numeroDeCuenta == numeroDeCuenta) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        cuentasBancarias[indiceEvento].nombreDeBanco = nombreDeBanco;
        cuentasBancarias[indiceEvento].tipoDeCuenta = tipoDeCuenta;
        cuentasBancarias[indiceEvento].saldoActual = saldoActual;
        cuentasBancarias[indiceEvento].estadoDeCuenta = estadoDeCuenta;
        cuentasBancarias[indiceEvento].fechaApertura = fechaApertura;
        cuentasBancarias[indiceEvento].descripcionCuenta = descripcionCuenta;

        localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));
    }
    alert("Cuenta bancaria actualizado exitosamente")
    nuevaCuentaBancaria()
}

function eliminarCuenta() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;

    var indiceEvento = -1;
    for (let i = 0; i < cuentasBancarias.length; i++) {
        if (cuentasBancarias[i].numeroDeCuenta == numeroDeCuenta) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        //localStorage.setItem("eventos", JSON.stringify(eventos));
        var confirmacion = confirm("¿Está seguro de que desea eliminar esta cuenta?");
        if (confirmacion) {
            cuentasBancarias.splice(indiceEvento, 1);
            localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));
            nuevaCuentaBancaria()
        }
    }
}

function consultarCuenta() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

    var numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
    var eventoEncontrado = false;

    for (let i = 0; i < cuentasBancarias.length; i++) {
        if (cuentasBancarias[i].numeroDeCuenta == numeroDeCuenta) {

            document.getElementById('nombreDeBanco').value = cuentasBancarias[i].nombreDeBanco
            document.getElementById('tipoDeCuenta').value = cuentasBancarias[i].tipoDeCuenta
            document.getElementById('saldoActual').value = cuentasBancarias[i].saldoActual
            document.getElementById('estadoDeCuenta').value = cuentasBancarias[i].estadoDeCuenta
            document.getElementById('fechaApertura').value = cuentasBancarias[i].fechaApertura
            document.getElementById('descripcionCuenta').value = cuentasBancarias[i].descripcionCuenta

            eventoEncontrado = true;

            break;
        }
    }
    if (!eventoEncontrado) {
        alert('No hay cuentas creadas con este numero . Por favor, verifique el numero de cuenta.');
    }
}

function listarCuentasBancarias() {
    var cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]")
    var tablaCuentasBancarias = document.getElementById('tablaCuentasBancarias')

    cuentasBancarias.forEach(cuentaBancaria => {
        var fila = tablaCuentasBancarias.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(cuentaBancaria.numeroDeCuenta)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(cuentaBancaria.nombreDeBanco)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(cuentaBancaria.tipoDeCuenta)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(cuentaBancaria.saldoActual)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(cuentaBancaria.estadoDeCuenta)
        columnaCinco.appendChild(textoColumnaCinco)

        var columnaSeis = fila.insertCell(5)
        var textoColumnaSeis = document.createTextNode(cuentaBancaria.fechaApertura)
        columnaSeis.appendChild(textoColumnaSeis)

        var columnaSiete = fila.insertCell(6)
        var textoColumnaSiete = document.createTextNode(cuentaBancaria.descripcionCuenta)
        columnaSiete.appendChild(textoColumnaSiete)

        //se configura la columna con los botones
        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var numeroDeCuenta = filaActual.cells[0].textContent;
            document.getElementById('numeroDeCuenta').value = numeroDeCuenta
            eliminarCuenta()
            fila.parentNode.removeChild(fila)
        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var numeroDeCuenta = filaActual.cells[0].textContent;
            document.getElementById('numeroDeCuenta').value = numeroDeCuenta
            var nombreDeBanco = filaActual.cells[1].textContent;
            document.getElementById('nombreDeBanco').value = nombreDeBanco
            var tipoDeCuenta = filaActual.cells[2].textContent; 
            document.getElementById('tipoDeCuenta').value = tipoDeCuenta
            var saldoActual = filaActual.cells[3].textContent; 
            document.getElementById('saldoActual').value = saldoActual
            var estadoDeCuenta = filaActual.cells[4].textContent; 
            document.getElementById('estadoDeCuenta').value = estadoDeCuenta
            var fechaApertura = filaActual.cells[5].textContent; 
            document.getElementById('fechaApertura').value = fechaApertura
            var descripcionCuenta = filaActual.cells[6].textContent; 
            document.getElementById('descripcionCuenta').value = descripcionCuenta
        })

        var columnaOcho = fila.insertCell(7)
        columnaOcho.appendChild(botonEditar)
        columnaOcho.appendChild(botonEliminar)
    });

}

function nuevaCuentaBancaria() {
    document.getElementById('numeroDeCuenta').value = "";
    document.getElementById('nombreDeBanco').value = "";
    document.getElementById('tipoDeCuenta').value = "";
    document.getElementById('saldoActual').value = "";
    document.getElementById('estadoDeCuenta').value = "";
    document.getElementById('fechaApertura').value = "";
    document.getElementById('descripcionCuenta').value = "";
    document.getElementById('numeroDeCuenta').focus()
}

function adicionarCuentaBancaria() {
    var numeroDeCuenta = document.getElementById('numeroDeCuenta')
    var nombreDeBanco = document.getElementById('nombreDeBanco')
    var tipoDeCuenta = document.getElementById('tipoDeCuenta')
    var saldoActual = document.getElementById('saldoActual')
    var estadoDeCuenta = document.getElementById('estadoDeCuenta')
    var fechaApertura = document.getElementById('fechaApertura')
    var descripcionCuenta = document.getElementById('descripcionCuenta')

    if (numeroDeCuenta.value.length > 0) {
        var tablaCuentasBancarias = document.getElementById('tablaCuentasBancarias')
        var fila = tablaCuentasBancarias.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(numeroDeCuenta.value)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(nombreDeBanco.value)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(tipoDeCuenta.value)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(saldoActual.value)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(estadoDeCuenta.value)
        columnaCinco.appendChild(textoColumnaCinco)

        var columnaSeis = fila.insertCell(5)
        var textoColumnaSeis = document.createTextNode(fechaApertura.value)
        columnaSeis.appendChild(textoColumnaSeis)

        var columnaSiete = fila.insertCell(6)
        var textoColumnaSiete = document.createTextNode(descripcionCuenta.value)
        columnaSiete.appendChild(textoColumnaSiete)

        //se configura la columna con los botones
        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var numeroDeCuenta = filaActual.cells[0].textContent;
            document.getElementById('numeroDeCuenta').value = numeroDeCuenta
            eliminarCuenta()
            fila.parentNode.removeChild(fila)
        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var numeroDeCuenta = filaActual.cells[0].textContent;
            document.getElementById('numeroDeCuenta').value = numeroDeCuenta
            var nombreDeBanco = filaActual.cells[1].textContent;
            document.getElementById('nombreDeBanco').value = nombreDeBanco
            var tipoDeCuenta = filaActual.cells[2].textContent; 
            document.getElementById('tipoDeCuenta').value = tipoDeCuenta
            var saldoActual = filaActual.cells[3].textContent; 
            document.getElementById('saldoActual').value = saldoActual
            var estadoDeCuenta = filaActual.cells[4].textContent; 
            document.getElementById('estadoDeCuenta').value = estadoDeCuenta
            var fechaApertura = filaActual.cells[5].textContent; 
            document.getElementById('fechaApertura').value = fechaApertura
            var descripcionCuenta = filaActual.cells[6].textContent; 
            document.getElementById('descripcionCuenta').value = descripcionCuenta
        })

        var columnaOcho = fila.insertCell(7)
        columnaOcho.appendChild(botonEditar)
        columnaOcho.appendChild(botonEliminar)
    }
}