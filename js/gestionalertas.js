class Alerta {
    constructor(tipoAlerta, fechayHoraAlerta, descripcionAlerta) {
        this.tipoAlerta = tipoAlerta
        this.fechayHoraAlerta = fechayHoraAlerta
        this.descripcionAlerta = descripcionAlerta
    }
}

function guardarAlerta() {
    //localStorage.setItem("empleados", "[]")
    var tipoAlerta = document.getElementById('tipoAlerta')
    var fechayHoraAlerta = document.getElementById('fechayHoraAlerta')
    var descripcionAlerta = document.getElementById('descripcionAlerta')

    // Verificar si los campos obligatorios están llenos
    if (!tipoAlerta.value || !fechayHoraAlerta.value || !descripcionAlerta.value) {
        alert("Por favor, complete los campos obligatorios (codigo, nombre de tipo y tipo).")
        nuevaAlerta()
        return; // Salir de la función sin guardar el evento
    }

    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]")
    // Obtener los datos de los participantes de la tabla
    var alerta = new Alerta(tipoAlerta.value, fechayHoraAlerta.value, descripcionAlerta.value)
    alertas.push(alerta)
    // Almacenar en localStorage (puede usarse para almacenamiento persistente en el navegador)
    localStorage.setItem('alertas', JSON.stringify(alertas));

    adicionarAlerta()
    alert("Alerta configurada exitosamente")
    nuevaAlerta()
}

function actualizarAlerta() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    var tipoAlerta = document.getElementById("tipoAlerta").value;
    var fechayHoraAlerta = document.getElementById("fechayHoraAlerta").value;
    var descripcionAlerta = document.getElementById("descripcionAlerta").value;

    var indiceEvento = -1;
    for (let i = 0; i < alertas.length; i++) {
        if (alertas[i].fechayHoraAlerta == fechayHoraAlerta) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        alertas[indiceEvento].tipoAlerta = tipoAlerta;
        alertas[indiceEvento].descripcionAlerta = descripcionAlerta;

        localStorage.setItem("alertas", JSON.stringify(alertas));
    }
    alert("Alerta actualizada exitosamente")
    nuevaAlerta()
}

function eliminarAlerta() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    var fechayHoraAlerta = document.getElementById("fechayHoraAlerta").value;
    //var descripcion = document.getElementById("descripcion").value;

    var indiceEvento = -1;
    for (let i = 0; i < alertas.length; i++) {
        if (alertas[i].fechayHoraAlerta == fechayHoraAlerta) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        //localStorage.setItem("eventos", JSON.stringify(eventos));
        var confirmacion = confirm("¿Está seguro de que desea eliminar esta alerta?");
        if (confirmacion) {
            alertas.splice(indiceEvento, 1);
            localStorage.setItem("alertas", JSON.stringify(alertas));
            nuevaAlerta();
        }
    }
    //nuevoEvento()
}

function consultarAlerta() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    var fechayHoraAlerta = document.getElementById("fechayHoraAlerta").value;
    var eventoEncontrado = false;

    for (let i = 0; i < alertas.length; i++) {
        if (alertas[i].fechayHoraAlerta == fechayHoraAlerta /*&& eventos[i].descripcion == descripcion*/) {

            document.getElementById('tipoAlerta').value = alertas[i].tipoAlerta
            document.getElementById('descripcionAlerta').value = alertas[i].descripcionAlerta
            eventoEncontrado = true;

            break;
        }
    }
    if (!eventoEncontrado) {
        alert('No hay alertas en esta fecha . Por favor, verifique la fecha.');
    }
}

function listarAlertas() {
    var alertas = JSON.parse(localStorage.getItem("alertas") || "[]")
    var tablaAlertas = document.getElementById('tablaAlertas')

    alertas.forEach(alerta => {
        var fila = tablaAlertas.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(alerta.tipoAlerta)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(alerta.fechayHoraAlerta)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(alerta.descripcionAlerta)
        columnaTres.appendChild(textoColumnaTres)

        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var fechayHoraAlerta = filaActual.cells[1].textContent;
            document.getElementById('fechayHoraAlerta').value = fechayHoraAlerta

            eliminarAlerta()
            fila.parentNode.removeChild(fila)
        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var tipoAlerta = filaActual.cells[0].textContent;
            document.getElementById('tipoAlerta').value = tipoAlerta
            var fechayHoraAlerta = filaActual.cells[1].textContent;
            document.getElementById('fechayHoraAlerta').value = fechayHoraAlerta
            var descripcionAlerta = filaActual.cells[2].textContent; 
            document.getElementById('descripcionAlerta').value = descripcionAlerta
        })
        

        var columnaCuatro = fila.insertCell(3)
        columnaCuatro.appendChild(botonEditar)
        columnaCuatro.appendChild(botonEliminar)
    });

}

function nuevaAlerta() {
    document.getElementById('tipoAlerta').value = "";
    document.getElementById('fechayHoraAlerta').value = "";
    document.getElementById('descripcionAlerta').value = "";
    document.getElementById('tipoAlerta').focus()
}

function adicionarAlerta() {

    var tipoAlerta = document.getElementById('tipoAlerta')
    var fechayHoraAlerta = document.getElementById('fechayHoraAlerta')
    var descripcionAlerta = document.getElementById('descripcionAlerta')

    if (tipoAlerta.value.length > 0) {
        var tablaAlertas = document.getElementById('tablaAlertas')
        var fila = tablaAlertas.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(tipoAlerta.value)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(fechayHoraAlerta.value)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(descripcionAlerta.value)
        columnaTres.appendChild(textoColumnaTres)

        //se configura la columna con los botones

        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var fechayHoraAlerta = filaActual.cells[1].textContent;
            document.getElementById('fechayHoraAlerta').value = fechayHoraAlerta

            eliminarAlerta()
            fila.parentNode.removeChild(fila)
        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var tipoAlerta = filaActual.cells[0].textContent;
            document.getElementById('tipoAlerta').value = tipoAlerta
            var fechayHoraAlerta = filaActual.cells[1].textContent;
            document.getElementById('fechayHoraAlerta').value = fechayHoraAlerta
            var descripcionAlerta = filaActual.cells[2].textContent; 
            document.getElementById('descripcionAlerta').value = descripcionAlerta
        })

        var columnaCuatro = fila.insertCell(3)
        columnaCuatro.appendChild(botonEditar)
        columnaCuatro.appendChild(botonEliminar)
    }
}