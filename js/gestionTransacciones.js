class Transaccion {
    constructor(tipoDeTransaccion, tipoIngresoEgreso, valor, cuentaBancaria, fechaTransaccion, descripcionTransaccion, adjuntar) {
        this.tipoDeTransaccion = tipoDeTransaccion
        this.tipoIngresoEgreso = tipoIngresoEgreso
        this.valor = valor
        this.cuentaBancaria = cuentaBancaria
        this.fechaTransaccion = fechaTransaccion
        this.descripcionTransaccion = descripcionTransaccion
        this.adjuntar = adjuntar
    }
}

//falta ajustar todo este js

function guardarTransaccion() {
    //localStorage.setItem("empleados", "[]")
    var tipoDeTransaccion = document.getElementById('tipoDeTransaccion')
    var tipoIngresoEgreso = document.getElementById('tipoIngresoEgreso')
    var valor = document.getElementById('valor')
    var cuentaBancaria = document.getElementById('cuentaBancaria')
    var fechaTransaccion = document.getElementById('fechaTransaccion')
    var descripcionTransaccion = document.getElementById('descripcionTransaccion')
    var adjuntar = document.getElementById('adjuntar')

    // Verificar si los campos obligatorios están llenos
    if (!tipoDeTransaccion.value || !tipoIngresoEgreso.value || !valor.value || !cuentaBancaria.value || !fechaTransaccion.value) {
        alert("Por favor, complete los campos obligatorios (opcional adjuntar).")
        nuevaTransaccion()
        return; // Salir de la función sin guardar el evento
    }

    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]")
    // Obtener los datos de los participantes de la tabla
    var transaccion = new Transaccion(tipoDeTransaccion.value, tipoIngresoEgreso.value, valor.value, cuentaBancaria.value, fechaTransaccion.value, descripcionTransaccion.value, adjuntar.value)
    transacciones.push(transaccion)
    // Almacenar en localStorage (puede usarse para almacenamiento persistente en el navegador)
    localStorage.setItem('transacciones', JSON.stringify(transacciones));

    adicionarTransaccion()
    alert("Transaccion realizada exitosamente")
    nuevaTransaccion()
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

function eliminarTransaccion() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

    var fechaTransaccion = document.getElementById("fechaTransaccion").value;

    var indiceEvento = -1;
    for (let i = 0; i < transacciones.length; i++) {
        if (transacciones[i].fechaTransaccion == fechaTransaccion) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        //localStorage.setItem("eventos", JSON.stringify(eventos));
        var confirmacion = confirm("¿Está seguro de que desea eliminar esta historia de transaccion?");
        if (confirmacion) {
            transacciones.splice(indiceEvento, 1);
            localStorage.setItem("transacciones", JSON.stringify(transacciones));
            nuevaTransaccion()
        }
    }
}

function consultarTransaccion() {
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

function listarTransacciones() {
    var transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]")
    var tablaTransacciones = document.getElementById('tablaTransacciones')

    transacciones.forEach(transaccion => {
        var fila = tablaTransacciones.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(transaccion.tipoDeTransaccion)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(transaccion.tipoIngresoEgreso)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(transaccion.valor)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(transaccion.cuentaBancaria)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(transaccion.fechaTransaccion)
        columnaCinco.appendChild(textoColumnaCinco)

        var columnaSeis = fila.insertCell(5)
        var textoColumnaSeis = document.createTextNode(transaccion.descripcionTransaccion)
        columnaSeis.appendChild(textoColumnaSeis)

        var columnaSiete = fila.insertCell(6)
        var textoColumnaSiete = document.createTextNode(transaccion.adjuntar)
        columnaSiete.appendChild(textoColumnaSiete)

        //se configura la columna con los botones
        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var fechaTransaccion = filaActual.cells[4].textContent;
            document.getElementById('fechaTransaccion').value = fechaTransaccion
            eliminarTransaccion()
            fila.parentNode.removeChild(fila)
        })

        var columnaOcho = fila.insertCell(7)
        columnaOcho.appendChild(botonEliminar)
    });

}

function nuevaTransaccion() {
    document.getElementById('tipoDeTransaccion').value = "";
    document.getElementById('tipoIngresoEgreso').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('cuentaBancaria').value = "";
    document.getElementById('fechaTransaccion').value = "";
    document.getElementById('descripcionTransaccion').value = "";
    document.getElementById('adjuntar').value = "";
    document.getElementById('tipoDeTransaccion').focus()
}

function adicionarTransaccion() {
    var tipoDeTransaccion = document.getElementById('tipoDeTransaccion')
    var tipoIngresoEgreso = document.getElementById('tipoIngresoEgreso')
    var valor = document.getElementById('valor')
    var cuentaBancaria = document.getElementById('cuentaBancaria')
    var fechaTransaccion = document.getElementById('fechaTransaccion')
    var descripcionTransaccion = document.getElementById('descripcionTransaccion')
    var adjuntar = document.getElementById('adjuntar')

    if (tipoDeTransaccion.value.length > 0) {
        var tablaTransacciones = document.getElementById('tablaTransacciones')
        var fila = tablaTransacciones.insertRow(-1)//para agregar al inicio 0  final -1
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(tipoDeTransaccion.value)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(tipoIngresoEgreso.value)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(valor.value)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(cuentaBancaria.value)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(fechaTransaccion.value)
        columnaCinco.appendChild(textoColumnaCinco)

        var columnaSeis = fila.insertCell(5)
        var textoColumnaSeis = document.createTextNode(descripcionTransaccion.value)
        columnaSeis.appendChild(textoColumnaSeis)

        var columnaSiete = fila.insertCell(6)
        var textoColumnaSiete = document.createTextNode(adjuntar.value)
        columnaSiete.appendChild(textoColumnaSiete)

        //se configura la columna con los botones
        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var fechaTransaccion = filaActual.cells[4].textContent;
            document.getElementById('fechaTransaccion').value = fechaTransaccion
            eliminarTransaccion()
            fila.parentNode.removeChild(fila)
        })

        var columnaOcho = fila.insertCell(7)
        columnaOcho.appendChild(botonEliminar)
    }
}