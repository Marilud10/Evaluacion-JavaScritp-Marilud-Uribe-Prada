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
    descripcionEvento.value = "";

    btnGuardarEvento.textContent = "Guardar Evento";

}

///=====================================================
// CARGAR CIUDADES DESDE LOCALSTORAGE
//=====================================================

function cargarCiudades() {

    const ciudades = JSON.parse(

        localStorage.getItem("ciudades")

    ) || [];

    ciudadEvento.innerHTML = `
        <option value="">
            Seleccione una ciudad
        </option>
    `;

    ciudades.forEach(ciudad => {

        ciudadEvento.innerHTML += `
            <option value="${ciudad.nombre}">
                ${ciudad.nombre}
            </option>
        `;

    });

}

//=====================================================
// GENERAR CÓDIGO
//=====================================================

function generarCodigoEvento(){

    const eventos = obtenerEventos();

    let mayor = 0;

    eventos.forEach(evento=>{

        if(!evento.codigo){
            return;
        }

        const numero = Number(
            evento.codigo.replace("EVT-","")
        );

        if(numero > mayor){
            mayor = numero;
        }

    });

    mayor++;

    return `EVT-${String(mayor).padStart(3,"0")}`;

}

//=====================================================
// CONVERTIR IMAGEN A BASE64
//=====================================================

function convertirImagenBase64(archivo){

    return new Promise((resolve,reject)=>{

        const lector = new FileReader();

        lector.readAsDataURL(archivo);

        lector.onload = ()=>resolve(lector.result);

        lector.onerror = error=>reject(error);

    });

}

//=====================================================
// GUARDAR / ACTUALIZAR EVENTO
//=====================================================

btnGuardarEvento.addEventListener("click", () => {

console.log("Nombre:", nombreEvento.value);
console.log("Artista:", artistaEvento.value);
console.log("Fecha:", fechaEvento.value);
console.log("Hora:", horaEvento.value);
console.log("Ciudad:", ciudadEvento.value);
console.log("Categoría:", categoriaEvento.value);
console.log("Precio:", precioEvento.value);
console.log("Descripción:", descripcionEvento.value);

if (

    nombreEvento.value.trim() === "" ||

    artistaEvento.value.trim() === "" ||

    fechaEvento.value === "" ||

    horaEvento.value === "" ||

    ciudadEvento.value === "" ||

    categoriaEvento.value === "" ||

    precioEvento.value === "" ||

    descripcionEvento.value.trim() === ""

){

    alert("Complete todos los campos.");

    return;

}

    let eventos = obtenerEventos();

    const id = idEvento.value;

    const codigo = id

        ? eventos.find(e => e.id == id).codigo

        : generarCodigoEvento();

    const eventoAnterior = eventos.find(

        e => e.id == id

    );

    const evento = {

        id: id ? Number(id) : Date.now(),

        codigo: codigo,

        nombre: nombreEvento.value,

        artista: artistaEvento.value,

        fecha: fechaEvento.value,

        hora: horaEvento.value,

        ciudad: ciudadEvento.value,

        categoria: categoriaEvento.value,

        precio: Number(precioEvento.value),

        imagen: eventoAnterior

            ? eventoAnterior.imagen

            : "img/sin-imagen.jpg",

        descripcion: descripcionEvento.value,

        publicado: eventoAnterior

            ? eventoAnterior.publicado

            : false,

        vendido: eventoAnterior

            ? eventoAnterior.vendido

            : false

    };

    if (id === "") {

        eventos.push(evento);

        alert("Evento creado correctamente.");

    }

    else {

        const indice = eventos.findIndex(

            e => e.id == id

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
// MOSTRAR EVENTOS
//=====================================================

function mostrarEventos() {

    const eventos = obtenerEventos();

    listaEventos.innerHTML = "";

    eventos.forEach(evento => {

        listaEventos.innerHTML += `

        <div class="cardEvento">

            <img
                src="${evento.imagen || 'img/sin-imagen.jpg'}"
                alt="${evento.nombre}"
            >

            <div class="infoEvento">

                <h3>${evento.nombre}</h3>

                <p><strong>Código:</strong> ${evento.codigo}</p>

                <p><strong>Artista:</strong> ${evento.artista}</p>

                <p><strong>Categoría:</strong> ${evento.categoria}</p>

                <p><strong>Ciudad:</strong> ${evento.ciudad}</p>

                <p><strong>Fecha:</strong> ${evento.fecha}</p>

                <p><strong>Hora:</strong> ${evento.hora}</p>

                <p><strong>Precio:</strong> $${evento.precio.toLocaleString()}</p>

                <p>
                    ${evento.vendido ? "🔴 Vendido" : "🟢 Disponible"}
                </p>

                <div class="accionesEvento">

                    <button
                        class="editarEvento"
                        data-id="${evento.id}">
                        Editar
                    </button>

                    <button
                        class="eliminarEvento"
                        data-id="${evento.id}">
                        Eliminar
                    </button>

                    <button
                        class="publicarEvento"
                        data-id="${evento.id}">
                        ${evento.publicado ? "Ocultar" : "Publicar"}
                    </button>

                    <button
                        class="imagenEvento"
                        data-id="${evento.id}">
                        📷 Imagen
                    </button>

                    <input
                        type="file"
                        class="inputImagen"
                        data-id="${evento.id}"
                        accept="image/*"
                        style="display:none;"
                    >

                </div>

            </div>

        </div>

        `;

    });

}

//=====================================================
// INICIALIZACIÓN
//=====================================================

window.addEventListener("DOMContentLoaded", () => {

    cargarCiudades();

    cargarCategoriasSelect();

    mostrarEventos();

    actualizarDashboard();

});

//=====================================================
// CAMBIAR IMAGEN DEL EVENTO
//=====================================================

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("imagenEvento")){

        return;

    }

    const id = e.target.dataset.id;

    const input = document.querySelector(

        `.inputImagen[data-id="${id}"]`

    );

    if(input){

        input.click();

    }

});

document.addEventListener("change",async(e)=>{

    if(!e.target.classList.contains("inputImagen")){

        return;

    }

    const archivo = e.target.files[0];

    if(!archivo){

        return;

    }

    const imagenBase64 = await convertirImagenBase64(archivo);

    const id = Number(e.target.dataset.id);

    const eventos = obtenerEventos();

    const evento = eventos.find(

        evento=>evento.id===id

    );

    if(!evento){

        return;

    }

    evento.imagen = imagenBase64;

    guardarEventos(eventos);

    mostrarEventos();

    alert("Imagen actualizada correctamente.");

});


//=====================================================
// historial de ventas
//=====================================================

const btnHistorialVentas = document.getElementById("btnHistorialVentas");

if(btnHistorialVentas){

    btnHistorialVentas.addEventListener("click",()=>{

        window.location.href = "historial-ventas.html";

    });

}