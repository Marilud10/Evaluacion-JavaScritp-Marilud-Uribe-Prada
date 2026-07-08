//=====================================================
// NAVBAR
//=====================================================

const navbar = document.getElementById("navbar");

if (navbar) {

    navbar.innerHTML = `

        <nav class="navbar">

            <div class="logo">
                <h2>Eventix</h2>
            </div>

            <ul class="menu">

                <li>
                    <a href="#proximos">
                        Conciertos
                    </a>
                </li>

                <li>
                    <a href="#">
                        Artistas
                    </a>
                </li>

                <li>
                    <a href="Login/login.html">
                        Iniciar Sesión
                    </a>
                </li>

            </ul>

            <div class="acciones">

                <button id="abrirCarrito" class="btnCarrito">

                    🛒

                    <span id="contadorCarrito">
                        0
                    </span>

                </button>

            </div>

        </nav>

    `;

}

//=====================================================
// PROMOCIONES
//=====================================================

const promociones = document.getElementById("promociones");

if (promociones) {

    promociones.innerHTML = `

        <div class="promo morado">

            <h3>Oferta</h3>

            <p>
                15% OFF en entradas VIP.
            </p>

        </div>

        <div class="promo azul">

            <h3>Nuevo</h3>

            <p>
                Paga hasta en 12 cuotas.
            </p>

        </div>

        <div class="promo naranja">

            <h3>VIP</h3>

            <p>
                Acceso prioritario a conciertos.
            </p>

        </div>

    `;

    promociones.classList.add("promociones");

}

//=====================================================
// HERO
//=====================================================

const hero = document.getElementById("hero");

if (hero) {

    hero.innerHTML = `

        <div class="hero-imagen">

            <img
                src="img/Img-Conciertos/BTS.png"
            >

            <div class="hero-info">

                <span>
                    K-POP
                </span>

                <h1>
                    BTS
                </h1>

                <p>
                    Estadio El Campin
                </p>

                <button>
                    Comprar - $850.000
                </button>

            </div>

        </div>

        <div class="eventos-laterales">

            <div class="mini-card">

                <img
                    src="img/Img-Conciertos/feid.jpeg"
                >

                <div>

                    <h4>
                        FEID
                    </h4>

                    <p>
                        Colombia
                    </p>

                    <strong>
                        $78.000
                    </strong>

                </div>

            </div>

            <div class="mini-card">

                <img
                    src="img/Img-Conciertos/taylor.jpeg"
                >

                <div>

                    <h4>
                        Taylor Swift "Eras Tour"
                    </h4>

                    <p>
                        Bogota
                    </p>

                    <strong>
                        $450.000
                    </strong>

                </div>

            </div>

            <div class="mini-card">

                <img
                    src="img/Img-Conciertos/chinoynacho.jpg"
                >

                <div>

                    <h4>
                        Chino y Nacho
                    </h4>

                    <p>
                        Medellin
                    </p>

                    <strong>
                        $950.000
                    </strong>

                </div>

            </div>

        </div>

    `;

    hero.classList.add("hero");

}

//=====================================================
// FOOTER
//=====================================================

const footer = document.getElementById("footer");

if (footer) {

    footer.innerHTML = `

        <div class="footer-logo">

            <h2>
                Eventix
            </h2>

            <p>
                La mejor experiencia para
                encontrar conciertos.
            </p>

        </div>

        <div>

            <h3>
                Explorar
            </h3>

            <a href="#">
                Conciertos
            </a>

            <a href="#">
                Artistas
            </a>

            <a href="#">
                Festivales
            </a>

        </div>

        <div>

            <h3>
                Soporte
            </h3>

            <a href="#">
                Ayuda
            </a>

            <a href="#">
                Contacto
            </a>

            <a href="#">
                Políticas
            </a>

        </div>

    `;

}