//=====================================================
// VARIABLES
//=====================================================

const contenedorEventos =
document.querySelector(".contenedor-cards");

const buscador =
document.getElementById("buscar");

const filtroCiudad =
document.getElementById("filtroCiudad");

const filtroCategoria =
document.getElementById("filtroCategoria");



//=====================================================
// OBTENER EVENTOS
//=====================================================

function obtenerEventos(){

    return JSON.parse(

        localStorage.getItem("eventos")

    ) || [];

}

//=====================================================
// MOSTRAR EVENTOS
//=====================================================

function mostrarEventos() {

    if (!contenedorEventos) return;

    const eventos = obtenerEventos();

    contenedorEventos.innerHTML = "";

    eventos
    .filter(evento => evento.publicado)
    .forEach(evento => {

        contenedorEventos.innerHTML += `

        <div class="card">

            <img
                src="${evento.imagen}"
                alt="${evento.nombre}"
            >

            <div class="contenido">

                <span>${evento.categoria}</span>

                <h3>${evento.nombre}</h3>

                <p>📍 ${evento.ciudad}</p>

                <p>📅 ${evento.fecha}</p>

                <p>🕒 ${evento.hora}</p>

                <h4>$${evento.precio}</h4>

                <button
                    class="agregarCarrito"
                    data-id="${evento.id}">
                    Comprar
                </button>

            </div>

        </div>

        `;

    });

}

//=====================================================
// EVENTOS DE LOS BOTONES
//=====================================================

document.addEventListener("click", (e) => {

    if(e.target.classList.contains("agregarCarrito")){

        agregarAlCarrito(
            Number(e.target.dataset.id)
        );

    }

});



//=====================================================
// CARGAR EVENTOS DESDE JSON
//=====================================================

async function cargarEventosJSON(){

    try{

        const respuesta = await fetch(

            "Data/Conciertos.json"

        );

        const eventos = await respuesta.json();

        localStorage.setItem(

            "eventos",

            JSON.stringify(eventos)

        );

        mostrarEventos();

    }

    catch(error){

        console.error(

            "Error cargando conciertos:",

            error

        );

    }

}

//=====================================================
// INICIALIZACIÓN
//=====================================================

if(obtenerEventos().length === 0){

    cargarEventosJSON();

}else{

    mostrarEventos();

}

if(typeof actualizarContador === "function"){

    actualizarContador();

}