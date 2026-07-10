//=====================================================
// VARIABLES
//=====================================================

const listaCiudades =
document.getElementById("listaCiudades");

const modalCiudad =
document.getElementById("modalCiudad");

const btnNuevaCiudad =
document.getElementById("btnNuevaCiudad");

const cerrarModal =
document.getElementById("cerrarModal");

const formCiudad =
document.getElementById("formCiudad");

const idCiudad =
document.getElementById("idCiudad");

const codigoCiudad =
document.getElementById("codigoCiudad");

const nombreCiudad =
document.getElementById("nombreCiudad");

//=====================================================
// OBTENER CIUDADES
//=====================================================

function obtenerCiudades(){

    return JSON.parse(

        localStorage.getItem("ciudades")

    ) || [];

}

//=====================================================
// GUARDAR CIUDADES
//=====================================================

function guardarCiudades(ciudades){

    localStorage.setItem(

        "ciudades",

        JSON.stringify(ciudades)

    );

}

//=====================================================
// CARGAR CIUDADES DESDE JSON
//=====================================================

async function cargarCiudadesIniciales(){

    if(obtenerCiudades().length > 0){

        return;

    }

    try{

        const respuesta = await fetch(

            "../Data/ciudades.json"

        );

        const ciudades = await respuesta.json();

        guardarCiudades(ciudades);

    }

    catch(error){

        console.error(

            "Error cargando ciudades:",

            error

        );

    }

}

//=====================================================
// LIMPIAR FORMULARIO
//=====================================================

function limpiarFormulario(){

    idCiudad.value = "";

    codigoCiudad.value = "";

    nombreCiudad.value = "";

}

//=====================================================
// ABRIR MODAL
//=====================================================

btnNuevaCiudad.addEventListener("click",()=>{

    limpiarFormulario();

    modalCiudad.classList.remove("oculto");

});

//=====================================================
// CERRAR MODAL
//=====================================================

cerrarModal.addEventListener("click",()=>{

    modalCiudad.classList.add("oculto");

});

//=====================================================
// GUARDAR CIUDAD
//=====================================================

formCiudad.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(

        codigoCiudad.value.trim()==="" ||

        nombreCiudad.value.trim()===""

    ){

        alert("Complete todos los campos.");

        return;

    }

    let ciudades = obtenerCiudades();

    const id = idCiudad.value;

    const ciudad={

        id: id ? Number(id) : Date.now(),

        codigo: codigoCiudad.value,

        nombre: nombreCiudad.value

    };

    if(id===""){

        ciudades.push(ciudad);

        alert("Ciudad agregada correctamente.");

    }

    else{

        const indice = ciudades.findIndex(

            c=>c.id==id

        );

        ciudades[indice]=ciudad;

        alert("Ciudad actualizada.");

    }

    guardarCiudades(ciudades);

    pintarCiudades();

    limpiarFormulario();

    modalCiudad.classList.add("oculto");

});

//=====================================================
// PINTAR CIUDADES
//=====================================================

function pintarCiudades(){

    const ciudades = obtenerCiudades();

    listaCiudades.innerHTML="";

    ciudades.forEach(ciudad=>{

        listaCiudades.innerHTML += `

        <div class="cardCiudad">

            <h3>

                ${ciudad.nombre}

            </h3>

            <p>

                Código:

                ${ciudad.codigo}

            </p>

            <div class="botonesCiudad">

                <button

                    class="btnEditar"

                    data-id="${ciudad.id}">

                    Editar

                </button>

                <button

                    class="btnEliminar"

                    data-id="${ciudad.id}">

                    Eliminar

                </button>

            </div>

        </div>

        `;

    });

}

//=====================================================
// EDITAR Y ELIMINAR
//=====================================================

listaCiudades.addEventListener("click",(e)=>{

    const id = Number(

        e.target.dataset.id

    );

    let ciudades = obtenerCiudades();

    const ciudad = ciudades.find(

        c=>c.id===id

    );

    // EDITAR

    if(e.target.classList.contains("btnEditar")){

        idCiudad.value = ciudad.id;

        codigoCiudad.value = ciudad.codigo;

        nombreCiudad.value = ciudad.nombre;

        modalCiudad.classList.remove("oculto");

    }

    // ELIMINAR

    if(e.target.classList.contains("btnEliminar")){

        const eventos = JSON.parse(
    
            localStorage.getItem("eventos")
    
        ) || [];
    
        const ciudadEnUso = eventos.some(
    
            evento => evento.ciudad === ciudad.nombre
    
        );
    
        if(ciudadEnUso){
    
            alert(
    
                "No puede eliminar esta ciudad porque está siendo utilizada por uno o más eventos."
    
            );
    
            return;
    
        }
    
        if(
    
            !confirm(
    
                "¿Está seguro de eliminar esta ciudad?"
    
            )
    
        ){
    
            return;
    
        }
    
        ciudades = ciudades.filter(

            c => c.id !== id

        );

        guardarCiudades(ciudades);

        pintarCiudades();

    }

});

//=====================================================
// INICIALIZACIÓN
//=====================================================

window.addEventListener(

    "DOMContentLoaded",

    async()=>{

        await cargarCiudadesIniciales();

        pintarCiudades();

    }

);