//=====================================================
// OBTENER VENTAS
//=====================================================

function obtenerVentas(){

    return JSON.parse(

        localStorage.getItem("ventas")

    ) || [];

}

//=====================================================
// GUARDAR VENTAS
//=====================================================

function guardarVentas(ventas){

    localStorage.setItem(

        "ventas",

        JSON.stringify(ventas)

    );

}

//=====================================================
// REGISTRAR VENTA
//=====================================================

function registrarVenta(datosCliente){

    const carrito = JSON.parse(

        localStorage.getItem("carrito")

    ) || [];

    if(carrito.length === 0){

        alert("El carrito está vacío.");

        return;

    }

    const ventas = obtenerVentas();

    const eventos = JSON.parse(

        localStorage.getItem("eventos")

    ) || [];

    carrito.forEach(evento=>{

        ventas.push({

            id: Date.now() + Math.random(),

            codigo: evento.codigo,

            evento: evento.nombre,

            cliente: datosCliente.nombre,

            cedula: datosCliente.cedula,

            direccion: datosCliente.direccion,

            telefono: datosCliente.telefono,

            correo: datosCliente.correo,

            fechaCompra: new Date().toLocaleString(),

            total: evento.precio

        });

        const eventoAdmin = eventos.find(

            e=>e.id===evento.id

        );

        if(eventoAdmin){

            eventoAdmin.vendido = true;

        }

    });

    guardarVentas(ventas);

    localStorage.setItem(

        "eventos",

        JSON.stringify(eventos)

    );

    localStorage.removeItem("carrito");

}