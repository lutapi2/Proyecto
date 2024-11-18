class TipoIngresoyEgreso {
    constructor(codigo, nombreDeTipo, descripcion, tipo, categoria) {
        this.codigo = codigo
        this.nombreDeTipo = nombreDeTipo
        this.descripcion = descripcion
        this.tipo = tipo
        this.categoria = categoria
    }
}

function guardarTipo() {
    //localStorage.setItem("empleados", "[]")
    var codigo = document.getElementById('codigo')
    var nombreDeTipo = document.getElementById('nombreDeTipo')
    var descripcion = document.getElementById('descripcion')
    var tipo = document.getElementById('tipo')
    var categoria = document.getElementById('categoria')

    // Verificar si los campos obligatorios están llenos
    if (!codigo.value || !nombreDeTipo.value || !tipo.value) {
        alert("Por favor, complete los campos obligatorios (codigo, nombre de tipo y tipo).")
        nuevoTipo()
        return; // Salir de la función sin guardar el evento
    }

    var tiposIngresosyEgresos = JSON.parse(localStorage.getItem("tiposIngresosyEgresos") || "[]")
    // Obtener los datos de los participantes de la tabla
    var tipoIngresoyEgreso = new TipoIngresoyEgreso(codigo.value, nombreDeTipo.value, descripcion.value, tipo.value, categoria.value)
    tiposIngresosyEgresos.push(tipoIngresoyEgreso)
    // Almacenar en localStorage (puede usarse para almacenamiento persistente en el navegador)
    localStorage.setItem('tiposIngresosyEgresos', JSON.stringify(tiposIngresosyEgresos));

    adicionarTipoDeIngresoYEgreso()
    alert("Tipo de ingreso o egreso guardado exitosamente")
    nuevoTipo()
}

function actualizarTipo() {
    var tipos = JSON.parse(localStorage.getItem("tiposIngresosyEgresos") || "[]");

    var codigo = document.getElementById('codigo').value
    var nombreDeTipo = document.getElementById('nombreDeTipo').value
    var descripcion = document.getElementById('descripcion').value
    var tipo = document.getElementById('tipo').value
    var categoria = document.getElementById('categoria').value

    var indiceEvento = -1;
    for (let i = 0; i < tipos.length; i++) {
        if (tipos[i].codigo == codigo) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        tipos[indiceEvento].nombreDeTipo = nombreDeTipo;
        tipos[indiceEvento].descripcion = descripcion;
        tipos[indiceEvento].tipo = tipo;
        tipos[indiceEvento].categoria = categoria;

        localStorage.setItem("tiposIngresosyEgresos", JSON.stringify(tipos));
    }

    alert("Evento actualizado exitosamente")
    nuevoTipo()
}

function eliminarEvento() {
    var tipos = JSON.parse(localStorage.getItem("tiposIngresosyEgresos") || "[]");

    var codigo = document.getElementById("codigo").value;
    //var descripcion = document.getElementById("descripcion").value;

    var indiceEvento = -1;
    for (let i = 0; i < tipos.length; i++) {
        if (tipos[i].codigo == codigo /*&& eventos[i].descripcion == descripcion*/) {
            indiceEvento = i;
            break;
        }
    }

    if (indiceEvento !== -1) {
        // eventos.splice(indiceEvento, 1);
        //localStorage.setItem("eventos", JSON.stringify(eventos));
        var confirmacion = confirm("¿Está seguro de que desea eliminar este evento?");
        if (confirmacion) {
            tipos.splice(indiceEvento, 1);
            localStorage.setItem("tiposIngresosyEgresos", JSON.stringify(tipos));
            nuevoTipo();
        }
    }
}

function consultarTipo() {
    var tiposIngresosyEgresos = JSON.parse(localStorage.getItem("tiposIngresosyEgresos") || "[]");

    var codigo = document.getElementById("codigo").value;
    var eventoEncontrado = false;

    for (let i = 0; i < tiposIngresosyEgresos.length; i++) {
        if (tiposIngresosyEgresos[i].codigo == codigo /*&& eventos[i].descripcion == descripcion*/) {

            document.getElementById('nombreDeTipo').value = tiposIngresosyEgresos[i].nombreDeTipo
            document.getElementById('descripcion').textContent = tiposIngresosyEgresos[i].descripcion
            document.getElementById('tipo').value = tiposIngresosyEgresos[i].tipo
            document.getElementById('categoria').value
                = tiposIngresosyEgresos[i].categoria
            eventoEncontrado = true;
            break;
        }
    }
    if (!eventoEncontrado) {
        alert('No hay tipos creado con este codigo . Por favor, verifique el codigo.');
    }
}

function listarTipo() {
    var tiposIngresosyEgresos = JSON.parse(localStorage.getItem("tiposIngresosyEgresos") || "[]")
    var tablaTiposIngresoYEgreso = document.getElementById('tiposDeIngresoyEgreso')

    tiposIngresosyEgresos.forEach(tiposIngresosyEgresos => {
        var fila = tablaTiposIngresoYEgreso.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(tiposIngresosyEgresos.codigo)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(tiposIngresosyEgresos.nombreDeTipo)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(tiposIngresosyEgresos.descripcion)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(tiposIngresosyEgresos.tipo)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(tiposIngresosyEgresos.categoria)
        columnaCinco.appendChild(textoColumnaCinco)

        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var codigoValor = filaActual.cells[0].textContent;

            document.getElementById('codigo').value = codigoValor
            eliminarEvento()
            fila.parentNode.removeChild(fila)
        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var codigo = filaActual.cells[0].textContent;
            document.getElementById('codigo').value = codigo
            var nombreDeTipo = filaActual.cells[1].textContent;
            document.getElementById('nombreDeTipo').value = nombreDeTipo
            var descripcion = filaActual.cells[2].textContent;
            document.getElementById('descripcion').value = descripcion
            var tipo = filaActual.cells[3].textContent;
            document.getElementById('tipo').value = tipo
            var categoria = filaActual.cells[4].textContent;
            document.getElementById('categoria').value = categoria
        })

        var columnaSeis = fila.insertCell(5)
        columnaSeis.appendChild(botonEditar)
        columnaSeis.appendChild(botonEliminar)
    });

}

function nuevoTipo() {
    document.getElementById('codigo').value = "";
    document.getElementById('nombreDeTipo').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('tipo').value = "";
    document.getElementById('categoria').value = "";
    document.getElementById('codigo').focus();
}

function adicionarTipoDeIngresoYEgreso() {
    var codigo = document.getElementById('codigo')
    var nombreDeTipo = document.getElementById('nombreDeTipo')
    var descripcion = document.getElementById('descripcion')
    var tipo = document.getElementById('tipo')
    var categoria = document.getElementById('categoria')

    if (codigo.value.length > 0) {
        var tablaTiposIngresoYEgreso = document.getElementById('tiposDeIngresoyEgreso')
        var fila = tablaTiposIngresoYEgreso.insertRow(-1)//para agregar al inicio 0
        //se configura la columna con el nombre
        var columnaUno = fila.insertCell(0)
        var textoColumna = document.createTextNode(codigo.value)
        columnaUno.appendChild(textoColumna)

        var columnaDos = fila.insertCell(1)
        var textoColumnaDos = document.createTextNode(nombreDeTipo.value)
        columnaDos.appendChild(textoColumnaDos)

        var columnaTres = fila.insertCell(2)
        var textoColumnaTres = document.createTextNode(descripcion.value)
        columnaTres.appendChild(textoColumnaTres)

        var columnaCuatro = fila.insertCell(3)
        var textoColumnaCuatro = document.createTextNode(tipo.value)
        columnaCuatro.appendChild(textoColumnaCuatro)

        var columnaCinco = fila.insertCell(4)
        var textoColumnaCinco = document.createTextNode(categoria.value)
        columnaCinco.appendChild(textoColumnaCinco)

        //se configura la columna con los botones

        var botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var codigoValor = filaActual.cells[0].textContent;

            document.getElementById('codigo').value = codigoValor
            eliminarEvento()
            fila.parentNode.removeChild(fila)

        })
        var botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.addEventListener('click', function () {
            var filaActual = this.parentNode.parentNode;
            var codigo = filaActual.cells[0].textContent;
            document.getElementById('codigo').value = codigo
            var nombreDeTipo = filaActual.cells[1].textContent;
            document.getElementById('nombreDeTipo').value = nombreDeTipo
            var descripcion = filaActual.cells[2].textContent;
            document.getElementById('descripcion').value = descripcion
            var tipo = filaActual.cells[3].textContent;
            document.getElementById('tipo').value = tipo
            var categoria = filaActual.cells[4].textContent;
            document.getElementById('categoria').value = categoria
        })

        var columnaSeis = fila.insertCell(5)
        columnaSeis.appendChild(botonEditar)
        columnaSeis.appendChild(botonEliminar)
    }
}