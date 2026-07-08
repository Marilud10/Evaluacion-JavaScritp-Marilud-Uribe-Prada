//=====================================================
// VARIABLES
//=====================================================

// Dashboard

const totalEventos = document.getElementById("totalEventos");
const eventosPublicados = document.getElementById("eventosPublicados");
const eventosVendidos = document.getElementById("eventosVendidos");

//=====================================================
// FORMULARIO
//=====================================================

const idEvento = document.getElementById("idEvento");
const nombreEvento = document.getElementById("nombreEvento");
const artistaEvento = document.getElementById("artistaEvento");
const fechaEvento = document.getElementById("fechaEvento");
const horaEvento = document.getElementById("horaEvento");
const ciudadEvento = document.getElementById("ciudadEvento");
const categoriaEvento = document.getElementById("categoriaEvento");
const precioEvento = document.getElementById("precioEvento");
const imagenEvento = document.getElementById("imagenEvento");
const descripcionEvento = document.getElementById("descripcionEvento");

//=====================================================
// BOTONES
//=====================================================

const btnGuardarEvento = document.getElementById("btnGuardarEvento");
const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");

//=====================================================
// LISTA
//=====================================================

const listaEventos = document.getElementById("listaEventos");
const buscarEvento = document.getElementById("buscarEvento");

//=====================================================
// LOCALSTORAGE
//=====================================================

function obtenerEventos() {

    return JSON.parse(

        localStorage.getItem("eventos")

    ) || [];

}

function guardarEventos(eventos) {

    localStorage.setItem(

        "eventos",

        JSON.stringify(eventos)

    );

}

///=====================================================
// LIMPIAR FORMULARIO
//=====================================================

function limpiarFormulario() {

    idEvento.value = "";
    nombreEvento.value = "";
    artistaEvento.value = "";
    fechaEvento.value = "";
    horaEvento.value = "";

    ciudadEvento.selectedIndex = 0;
    categoriaEvento.selectedIndex = 0;

    precioEvento.value = "";
    imagenEvento.value = "";
    descripcionEvento.value = "";

    btnGuardarEvento.textContent = "Guardar Evento";

}

//=====================================================
// CARGAR CIUDADES DESDE API
//=====================================================

async function cargarCiudades() {

    try {

        const respuesta = await fetch(
            "https://api-colombia.com/api/v1/City"
        );

        const ciudades = await respuesta.json();

        ciudadEvento.innerHTML = `
            <option value="">
                Seleccione una ciudad
            </option>
        `;

        ciudades
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(ciudad => {

                ciudadEvento.innerHTML += `
                    <option value="${ciudad.name}">
                        ${ciudad.name}
                    </option>
                `;

            });

    } catch (error) {

        console.error(error);

        alert("No fue posible cargar las ciudades.");

    }

}

//=====================================================
// GENERAR CÓDIGO
//=====================================================

function generarCodigoEvento(){

    const eventos = obtenerEventos();

    if(eventos.length===0){

        return "EVT-001";

    }

    let mayor = 0;

    eventos.forEach(evento=>{

        const numero = Number(

            evento.codigo.replace(

                "EVT-",

                ""

            )

        );

        if(numero > mayor){

            mayor = numero;

        }

    });

    mayor++;

    return `EVT-${String(mayor).padStart(3,"0")}`;

}

//=====================================================
// MOSTRAR EVENTOS
//=====================================================

function mostrarEventos(){

    const eventos = obtenerEventos();

    listaEventos.innerHTML = "";

    eventos.forEach(evento=>{

        listaEventos.innerHTML += `

        <div class="cardEvento">

            <img

                src="${evento.imagen}"

                alt="${evento.nombre}"

            >

            <div class="infoEvento">

                <h3>

                    ${evento.nombre}

                </h3>

                <p>

                    <strong>Código:</strong>

                    ${evento.codigo}

                </p>

                <p>

                    <strong>Artista:</strong>

                    ${evento.artista}

                </p>

                <p>

                    <strong>Categoría:</strong>

                    ${evento.categoria}

                </p>

                <p>

                    <strong>Ciudad:</strong>

                    ${evento.ciudad}

                </p>

                <p>

                    <strong>Fecha:</strong>

                    ${evento.fecha}

                </p>

                <p>

                    <strong>Hora:</strong>

                    ${evento.hora}

                </p>

                <p>

                    <strong>Precio:</strong>

                    $${evento.precio}

                </p>

                <p>

                    ${evento.vendido

                        ? "🔴 Vendido"

                        : "🟢 Disponible"}

                </p>

                <div class="accionesEvento">

                    <button

                        class="editarEvento"

                        data-id="${evento.id}"

                    >

                        Editar

                    </button>

                    <button

                        class="eliminarEvento"

                        data-id="${evento.id}"

                    >

                        Eliminar

                    </button>

                    <button

                        class="publicarEvento"

                        data-id="${evento.id}"

                    >

                        ${evento.publicado

                            ? "Ocultar"

                            : "Publicar"}

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
//=====================================================
// GUARDAR / ACTUALIZAR EVENTO
//=====================================================

btnGuardarEvento.addEventListener("click", () => {

    if (

        nombreEvento.value.trim() === "" ||
        artistaEvento.value.trim() === "" ||
        fechaEvento.value === "" ||
        horaEvento.value === "" ||
        ciudadEvento.value === "" ||
        categoriaEvento.value === "" ||
        precioEvento.value === "" ||
        imagenEvento.value.trim() === "" ||
        descripcionEvento.value.trim() === ""

    ) {

        alert("Complete todos los campos.");

        return;

    }

    if(Number(precioEvento.value) <= 0){

        alert("El precio debe ser mayor que cero.");

        return;

    }

    let eventos = obtenerEventos();

    const id = idEvento.value;

    const eventoAnterior = eventos.find(

        evento => evento.id == id

    );

    const evento = {

        id: id ? Number(id) : Date.now(),
    
        codigo,
    
        nombre: nombreEvento.value,
    
        artista: artistaEvento.value,
    
        fecha: fechaEvento.value,
    
        hora: horaEvento.value,
    
        ciudad: ciudadEvento.value,
    
        categoria: categoriaEvento.value,
    
        precio: Number(precioEvento.value),
    
        imagen: imagenEvento.value,
    
        descripcion: descripcionEvento.value,
    
        publicado: id
            ? eventos.find(e => e.id == id).publicado
            : false,
    
        vendido: id
            ? eventos.find(e => e.id == id).vendido
            : false
    
    };

    if(id===""){

        eventos.push(evento);

        alert("Evento creado correctamente.");

    }

    else{

        const indice = eventos.findIndex(

            evento => evento.id == id

        );

        eventos[indice] = evento;

        alert("Evento actualizado correctamente.");

    }

    guardarEventos(eventos);

    mostrarEventos();

    actualizarDashboard();

    limpiarFormulario();

});

//=====================================================
// ACCIONES DE LA LISTA
//=====================================================

listaEventos.addEventListener("click",(e)=>{

    const id = Number(

        e.target.dataset.id

    );

    let eventos = obtenerEventos();

    const evento = eventos.find(

        evento => evento.id === id

    );

    // EDITAR

    if(e.target.classList.contains("editarEvento")){

        idEvento.value = evento.id;

        nombreEvento.value = evento.nombre;

        artistaEvento.value = evento.artista;

        fechaEvento.value = evento.fecha;

        horaEvento.value = evento.hora;

        ciudadEvento.value = evento.ciudad;

        categoriaEvento.value = evento.categoria;

        precioEvento.value = evento.precio;

        imagenEvento.value = evento.imagen;

        descripcionEvento.value = evento.descripcion;

        btnGuardarEvento.textContent =

            "Actualizar Evento";

    }

    // ELIMINAR

    if(e.target.classList.contains("eliminarEvento")){

        if(!confirm(

            "¿Está seguro de eliminar este evento?"

        )) return;

        eventos = eventos.filter(

            evento => evento.id !== id

        );

        guardarEventos(eventos);

        mostrarEventos();

        actualizarDashboard();

        alert("Evento eliminado correctamente.");

    }

    // PUBLICAR

    if(e.target.classList.contains("publicarEvento")){

        evento.publicado = !evento.publicado;

        guardarEventos(eventos);

        mostrarEventos();

        actualizarDashboard();

    }

});

//=====================================================
// ACTUALIZAR DASHBOARD
//=====================================================

function actualizarDashboard(){

    const eventos = obtenerEventos();

    totalEventos.textContent = eventos.length;

    eventosPublicados.textContent =

        eventos.filter(

            evento => evento.publicado

        ).length;

    eventosVendidos.textContent =

        eventos.filter(

            evento => evento.vendido

        ).length;

}

//=====================================================
// BUSCADOR
//=====================================================

buscarEvento.addEventListener("input",()=>{

    const texto = buscarEvento.value.toLowerCase();

    document.querySelectorAll(".cardEvento")

    .forEach(tarjeta=>{

        const nombre = tarjeta

            .querySelector("h3")

            .textContent

            .toLowerCase();

        tarjeta.style.display =

            nombre.includes(texto)

            ? "flex"

            : "none";

    });

});

//=====================================================
// CANCELAR EDICIÓN
//=====================================================

btnCancelarEdicion.addEventListener("click",()=>{

    limpiarFormulario();

});

//=====================================================
// CARGAR CATEGORÍAS
//=====================================================

function cargarCategoriasSelect(){

    const categorias = JSON.parse(

        localStorage.getItem("categorias")

    ) || [];

    categoriaEvento.innerHTML = `

        <option value="">

            Seleccione una categoría

        </option>

    `;

    categorias.forEach(categoria=>{

        categoriaEvento.innerHTML += `

            <option value="${categoria.nombre}">

                ${categoria.nombre}

            </option>

        `;

    });

}

//=====================================================
// INICIALIZACIÓN
//=====================================================

window.addEventListener("DOMContentLoaded",()=>{

    cargarCiudades();

    cargarCategoriasSelect();

    mostrarEventos();

    actualizarDashboard();

});