// auth - login y logout del admin
// esto va conectado con el form de login.html
// la api es de dummyjson, devuelve un token si el user y pass son correctos

async function logindeladmin(username, password) {
    try {
        const rta = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // le digo al server q le mando json
            body: JSON.stringify({ username, password }) // convierto el obj a string pq así lo pide la api
        })

        const datos = await rta.json()

        if (datos.accessToken) {
            // si existe el token es pq las credenciales fueron correctas
            sessionStorage.setItem("token", datos.accessToken) // guardo el token en sessionStorage para usarlo en otras paginas
            sessionStorage.setItem("usuario", datos.username)
            window.location.href = "admin.html" // mando al admin a su panel
            
        } else {
            alert("usuario o contraseña incorrectos")
        }

    } catch (error) {
        // esto pasa si directamente no llega a conectarse con la api
        alert("error de conexión, fijate si tenés internet")
    }
}

function log_out() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("usuario")
    window.location.href = "index.html" // lo mando al home
}

// conecto el form (si existe en la pagina)
const login_del_form = document.getElementById("form-login")
if (login_del_form) {
    login_del_form.addEventListener("submit", function(eRR) { // eRR = evento, lo llame asi pq me confundo con 'e' a veces
        eRR.preventDefault()
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        logindeladmin(username, password)
    })
}

// boton de cerrar sesion en admin.html
const boton_log_out = document.getElementById("boton-logout")
if (boton_log_out) {
    boton_log_out.addEventListener("click", log_out)
}
// mostrar/ocultar contraseña en login
const btnVerPass = document.getElementById("mostrarcontraseña")
if (btnVerPass) {
    btnVerPass.addEventListener("click", function() {
        const inputPass = document.getElementById("password")
        if (inputPass.type === "password") {
            inputPass.type = "text"
            btnVerPass.textContent = "Ocultar contraseña"
        } else {
            inputPass.type = "password"
            btnVerPass.textContent = "Mostrar Contraseña"
        }
    })
}
// index.html: mostrar el botón correcto según si hay sesión activa
const linkIniciar = document.getElementById("link-iniciar")
const botonmodificar = document.getElementById("modificar")
if (linkIniciar) {
    if (sessionStorage.getItem("token")) {
        linkIniciar.style.display = "none"
        botonmodificar.style.display = "inline-block"
        if (boton_log_out) boton_log_out.style.display = "inline-block"
    }
}