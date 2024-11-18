
function guardarRecomendacion(){
    alert("Mensaje enviado exitozamente gracias por sus sugerencias")
    document.getElementById('nombreUsuario').value = "";
    document.getElementById('correoElectronico').value = "";
    document.getElementById('asunto').value = "";
    document.getElementById('contenido').value = "";
    document.getElementById('fechayHoraMensaje').value = "";
    document.getElementById('nombreUsuario').focus()
}
