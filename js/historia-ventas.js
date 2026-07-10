//=====================================================
// VARIABLES
//=====================================================

const listaVentas = document.getElementById("listaVentas");
const buscarVenta = document.getElementById("buscarVenta");

//=====================================================
// OBTENER VENTAS
//=====================================================

function obtenerVentas(){

    return JSON.parse(
        localStorage.getItem("ventas")
    ) || [];

}

//=====================================================
// MOSTRAR VENTAS
//=====================================================

function mostrarVentas(){

    const ventas = obtenerVentas();

    listaVentas.innerHTML = "";

    if(ventas.length === 0){

        listaVentas.innerHTML = `

            <div class="sinVentas">

                <h2>No hay ventas registradas.</h2>

            </div>

        `;

        return;

    }

    ventas.forEach(venta=>{

        listaVentas.innerHTML += `

        <div class="cardVenta">

            <div class="tituloVenta">

                <h2>${venta.evento}</h2>

            </div>

            <div class="datosVenta">

                <p><strong>Cliente:</strong> ${venta.cliente}</p>

                <p><strong>Cédula:</strong> ${venta.cedula}</p>

                <p><strong>Dirección:</strong> ${venta.direccion}</p>

                <p><strong>Teléfono:</strong> ${venta.telefono}</p>

                <p><strong>Correo:</strong> ${venta.correo}</p>

                <hr>

                <p><strong>Artista:</strong> ${venta.artista}</p>

                <p><strong>Ciudad:</strong> ${venta.ciudad}</p>

                <p><strong>Fecha del evento:</strong> ${venta.fechaEvento}</p>

                <p><strong>Hora:</strong> ${venta.hora}</p>

                <p><strong>Cantidad:</strong> ${venta.cantidad}</p>

                <p><strong>Total pagado:</strong> $${Number(venta.total).toLocaleString()}</p>

                <p><strong>Fecha de compra:</strong> ${venta.fechaCompra}</p>

            </div>

        </div>

        `;

    });

}

//=====================================================
// BUSCADOR
//=====================================================

if(buscarVenta){

    buscarVenta.addEventListener("input",()=>{

        const texto = buscarVenta.value.toLowerCase();

        document.querySelectorAll(".cardVenta").forEach(card=>{

            const contenido = card.textContent.toLowerCase();

            card.style.display = contenido.includes(texto)
                ? "block"
                : "none";

        });

    });

}

//=====================================================
// INICIO
//=====================================================

window.addEventListener("DOMContentLoaded",()=>{

    mostrarVentas();

});