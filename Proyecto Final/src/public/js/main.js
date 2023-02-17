const socket = io()
socket.emit('mensaje', "Hola, me estoy conectando")

function eliminar(id){
    socket.emit('eliminarProducto', id)
}

socket.on('productoEliminado' , correcto => {
    console.log(correcto)
    if (correcto)
        window.location.reload()
})


// socket.on('evento-admin', datos => {
//     console.log(datos)
// })

// socket.on('evento-general', datos => {
//     console.log(datos)
// })
