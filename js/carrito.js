//=====================================================
// VARIABLES
//=====================================================

const modalCarrito =
document.getElementById("modalCarrito");

const listaCarrito =
document.getElementById("listaCarrito");

const totalCompra =
document.getElementById("totalCompra");

const contadorCarrito =
document.getElementById("contadorCarrito");

const btnAbrirCarrito =
document.getElementById("abrirCarrito");

const btnCerrarCarrito =
document.getElementById("cerrarCarrito");

const btnComprarTodo =
document.getElementById("btnComprarTodo");

const formularioCompra =
document.getElementById("formularioCompra");

const btnConfirmarCompra =
document.getElementById("confirmarCompra");

//=====================================================
// LOCALSTORAGE
//=====================================================

function obtenerCarrito(){

    return JSON.parse(

        localStorage.getItem("carrito")

    ) || [];

}

function guardarCarrito(carrito){

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}


//=====================================================
// AGREGAR AL CARRITO
//=====================================================

function agregarAlCarrito(idEvento){

    const eventos = JSON.parse(

        localStorage.getItem("eventos")

    ) || [];

    const carrito = obtenerCarrito();

    const evento = eventos.find(

        evento => evento.id == idEvento

    );

    if(!evento){

        alert("No se encontró el evento.");

        return;

    }

    carrito.push(evento);

    guardarCarrito(carrito);

    actualizarContador();

    mostrarCarrito();

    alert("Concierto agregado al carrito.");

}

//=====================================================
// ABRIR Y CERRAR
//=====================================================

btnAbrirCarrito.addEventListener("click",()=>{

    mostrarCarrito();

    modalCarrito.classList.remove("oculto");

});

btnCerrarCarrito.addEventListener("click",()=>{

    modalCarrito.classList.add("oculto");

});


//=====================================================
// MOSTRAR CARRITO
//=====================================================

function mostrarCarrito(){

    const carrito = obtenerCarrito();

    listaCarrito.innerHTML = "";

    let total = 0;

    if(carrito.length === 0){

        listaCarrito.innerHTML = `

            <p style="text-align:center">

                Tu carrito está vacío.

            </p>

        `;

    }

    carrito.forEach((evento,index)=>{

        total += evento.precio;

        listaCarrito.innerHTML += `

        <div class="itemCarrito">

            <img

                src="${evento.imagen}"

                alt="${evento.nombre}"

            >

            <div class="itemInfo">

                <h4>

                    ${evento.nombre}

                </h4>

                <p>

                    ${evento.fecha}

                </p>

                <strong>

                    $${evento.precio}

                </strong>

            </div>

            <button

                class="btnEliminar"

                data-index="${index}"

            >

                Eliminar

            </button>

        </div>

        `;

    });

    totalCompra.textContent = total.toLocaleString();

}

//=====================================================
// ACTUALIZAR CONTADOR
//=====================================================

function actualizarContador(){

    contadorCarrito.textContent =

        obtenerCarrito().length;

}

//=====================================================
// ELIMINAR DEL CARRITO
//=====================================================

listaCarrito.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("btnEliminar")){

        return;

    }

    const index = Number(

        e.target.dataset.index

    );

    const carrito = obtenerCarrito();

    carrito.splice(index,1);

    guardarCarrito(carrito);

    mostrarCarrito();

    actualizarContador();

});

//=====================================================
// MOSTRAR FORMULARIO DE COMPRA
//=====================================================

btnComprarTodo.addEventListener("click",()=>{

    if(obtenerCarrito().length===0){

        alert("El carrito está vacío.");

        return;

    }

    formularioCompra.classList.remove("oculto");

});

//=====================================================
// CONFIRMAR COMPRA
//=====================================================

btnConfirmarCompra.addEventListener("click",()=>{

    const nombre =
    document.getElementById("clienteNombre").value.trim();

    const cedula =
    document.getElementById("clienteCedula").value.trim();

    const direccion =
    document.getElementById("clienteDireccion").value.trim();

    const telefono =
    document.getElementById("clienteTelefono").value.trim();

    const correo =
    document.getElementById("clienteCorreo").value.trim();

    if(

        nombre==="" ||

        cedula==="" ||

        direccion==="" ||

        telefono==="" ||

        correo===""

    ){

        alert("Complete todos los datos.");

        return;

    }

    registrarVenta({

        nombre,

        cedula,

        direccion,

        telefono,

        correo

    });

    actualizarContador();

    mostrarCarrito();

    formularioCompra.classList.add("oculto");

    modalCarrito.classList.add("oculto");

    alert("Compra realizada correctamente.");

});


//=====================================================
// MARCAR EVENTOS COMO VENDIDOS
//=====================================================

function marcarEventosVendidos(carrito){

    const eventos = JSON.parse(

        localStorage.getItem("eventos")

    ) || [];

    carrito.forEach(compra=>{

        const evento = eventos.find(

            e=>e.id==compra.id

        );

        if(evento){

            evento.vendido = true;

        }

    });

    localStorage.setItem(

        "eventos",

        JSON.stringify(eventos)

    );

}

//=====================================================
// INICIALIZACIÓN
//=====================================================

window.addEventListener("DOMContentLoaded",()=>{

    actualizarContador();

});