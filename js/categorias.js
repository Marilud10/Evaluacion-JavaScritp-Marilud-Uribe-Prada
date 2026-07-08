//========================================
// VARIABLES
//========================================

const btnGuardarCategoria =
document.getElementById(
"btnGuardarCategoria"
);

const btnCancelarCategoria =
document.getElementById(
"btnCancelarCategoria"
);

const listaCategorias =
document.getElementById(
"listaCategorias"
);

const nombreCategoria =
document.getElementById(
"nombreCategoria"
);

const descripcionCategoria =
document.getElementById(
"descripcionCategoria"
);

const idCategoria =
document.getElementById(
"idCategoria"
);

//========================================
// OBTENER CATEGORIAS
//========================================

function obtenerCategorias(){

    return JSON.parse(

        localStorage.getItem(

            "categorias"

        )

    ) || [];

}

//========================================
// GUARDAR CATEGORIAS
//========================================

function guardarCategorias(categorias){

    localStorage.setItem(

        "categorias",

        JSON.stringify(categorias)

    );

}

//========================================
// LIMPIAR FORMULARIO
//========================================

function limpiarFormularioCategoria(){

    idCategoria.value="";

    nombreCategoria.value="";

    descripcionCategoria.value="";

    btnGuardarCategoria.textContent=

    "Guardar Categoría";

}

//========================================
// MOSTRAR CATEGORÍAS
//========================================

function mostrarCategorias() {

    if (!listaCategorias) return;

    const categorias = obtenerCategorias();

    listaCategorias.innerHTML = "";

    categorias.forEach((categoria) => {

        listaCategorias.innerHTML += `

            <div class="cardCategoria">

                <div>

                    <h3>${categoria.nombre}</h3>

                    <p>${categoria.descripcion}</p>

                </div>

                <div class="accionesCategoria">

                    <button
                        class="editarCategoria"
                        data-id="${categoria.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="eliminarCategoria"
                        data-id="${categoria.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        `;

    });

}



//========================================
// CARGAR SELECT CATEGORÍAS
//========================================

function cargarCategoriasSelect() {

    const select =

        document.getElementById(

            "categoriaEvento"

        );

    if (!select) return;

    const categorias = obtenerCategorias();

    select.innerHTML =

        `<option value="">
            Seleccione una categoría
        </option>`;

    categorias.forEach((categoria) => {

        select.innerHTML += `

            <option value="${categoria.nombre}">

                ${categoria.nombre}

            </option>

        `;

    });

}



//========================================
// EDITAR CATEGORÍA
//========================================

listaCategorias.addEventListener("click", function(e){

    if(e.target.classList.contains("editarCategoria")){

        const id = Number(e.target.dataset.id);

        const categorias = obtenerCategorias();

        const categoria = categorias.find(cat => cat.id === id);

        idCategoria.value = categoria.id;

        nombreCategoria.value = categoria.nombre;

        descripcionCategoria.value = categoria.descripcion;

        btnGuardarCategoria.textContent = "Actualizar Categoría";

    }

});

//========================================
// GUARDAR / ACTUALIZAR CATEGORÍA
//========================================

btnGuardarCategoria.addEventListener("click", function(){

    if(

        nombreCategoria.value.trim() === "" ||

        descripcionCategoria.value.trim() === ""

    ){

        alert("Complete todos los campos.");

        return;

    }

    const categorias = obtenerCategorias();

    // Verificar si ya existe una categoría con ese nombre
    const existe = categorias.find(categoria =>

        categoria.nombre.toLowerCase() ===
        nombreCategoria.value.trim().toLowerCase() &&

        categoria.id != idCategoria.value

    );

    if(existe){

        alert("Ya existe una categoría con ese nombre.");

        return;

    }

    if(idCategoria.value === ""){

        categorias.push({

            id: Date.now(),

            nombre: nombreCategoria.value.trim(),

            descripcion: descripcionCategoria.value.trim()

        });

        alert("Categoría creada correctamente.");

    }else{

        const indice = categorias.findIndex(

            categoria => categoria.id == idCategoria.value

        );

        categorias[indice].nombre = nombreCategoria.value.trim();

        categorias[indice].descripcion = descripcionCategoria.value.trim();

        alert("Categoría actualizada correctamente.");

    }

    guardarCategorias(categorias);

    mostrarCategorias();

    cargarCategoriasSelect();

    limpiarFormularioCategoria();

});

listaCategorias.addEventListener("click", (e) => {

    if (!e.target.classList.contains("eliminarCategoria")) {

        return;

    }

    const confirmar = confirm("¿Desea eliminar esta categoría?");

    if (!confirmar) {

        return;

    }

    const id = Number(e.target.dataset.id);

    let categorias = obtenerCategorias();

    categorias = categorias.filter(

        categoria => categoria.id !== id

    );

    guardarCategorias(categorias);

    mostrarCategorias();

    cargarCategoriasSelect();

    limpiarFormularioCategoria();

});

//========================================
// CANCELAR EDICIÓN
//========================================

btnCancelarCategoria.addEventListener("click", function(){

    limpiarFormularioCategoria();

});

//========================================
// INICIALIZACIÓN
//========================================

mostrarCategorias();

cargarCategoriasSelect();