// darkmode me costó un koñazo
// basicamente: si habia darkmode guardado lo aplica al cargar, y el boton lo togglea

function aplicarDarkmode() {
    const modo = localStorage.getItem("darkmode")
    if (modo === "true") {
        document.body.classList.add("dark")
        const btn = document.getElementById("btn-darkmode")
        if (btn) btn.textContent = "Modo claro" // cambio el texto del boton tmb
    }
}

const btnDark = document.getElementById("btn-darkmode")
if (btnDark) { // el if es pq en algunas paginas no esta el boton y tiraba error!! xd
    btnDark.addEventListener("click", function() {
        document.body.classList.toggle("dark")
        const esDark = document.body.classList.contains("dark")
        localStorage.setItem("darkmode", esDark)
        // o sea siempre va a decir "Modo oscuro" aunque ya estes en dark lol
    })
}

aplicarDarkmode() // esto va al final para q se ejecute cuando carga la pag