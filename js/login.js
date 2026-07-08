//=====================================================
// VARIABLES
//=====================================================

const btnIngresar = document.getElementById("ingresar");

//=====================================================
// LOGIN
//=====================================================

btnIngresar.addEventListener("click", () => {

    const correo = document
        .getElementById("correo")
        .value
        .trim();

    const contrasena = document
        .getElementById("contrasena")
        .value
        .trim();

    if(

        correo === "admin@mail.com" &&

        contrasena === "123456"

    ){

        localStorage.setItem(

            "usuario",

            JSON.stringify({

                correo,

                administrador: true

            })

        );

        window.location.href = "../admin.html";

    }else{

        alert("Correo o contraseña incorrectos.");

    }

});

console.log("LOGIN CARGADO");