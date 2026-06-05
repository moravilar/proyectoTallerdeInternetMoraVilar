// cotizaciones - llama a la api de bluelytics
// tardé como 2 horas en entender por qué no andaba y era que me faltaba el await lol

async function mostrar_cotizacion() {
    const seccion = document.getElementById("cotizaciones")
    if (!seccion) return // si no existe la seccion no hace nada, sino tira error

    try {
        const rta = await fetch("https://api.bluelytics.com.ar/v2/latest")
        const datos = await rta.json() // el json() tmb es async1!1!1!

        seccion.innerHTML = `
            <article>
                <h3>Dólar Oficial</h3>
                <p>Compra: $${datos.oficial.value_buy}</p>
                <p>Venta: $${datos.oficial.value_sell}</p>
            </article>
            <article>
                <h3>Blue</h3>
                <p>Compra: $${datos.blue.value_buy}</p>
                <p>Venta: $${datos.blue.value_sell}</p>
            </article>
            <article>
                <h3>Euro Oficial</h3>
                <p>Compra: $${datos.oficial_euro.value_buy}</p>
                <p>Venta: $${datos.oficial_euro.value_sell}</p>
            </article>
            <article>
                <h3>Euro Blue</h3>
                <p>Compra: $${datos.blue_euro.value_buy}</p>
                <p>Venta: $${datos.blue_euro.value_sell}</p>
            </article>`

    } catch (error) {
        // si no anda la api muestro esto en vez de q quede en blanco
        seccion.innerHTML = "<p>No se pudo cargar la cotización en este momento.</p>"
    }
}

// cotizacion historica, esto va en index.html con el formulario de fecha
const formulario = document.getElementById("formulario")
if (formulario) {
    formulario.addEventListener("submit", async function(e) {
        e.preventDefault() // sin esto recargaba la página cada vez que mandaba el form
        const fecha = document.getElementById("fecha").value
        const resultado = document.getElementById("resultadocothist")

        if (!fecha) {
            alert("Elegí una fecha")
            return
        }

        try {
            const rta = await fetch(`https://api.bluelytics.com.ar/v2/historical?day=${fecha}`)
            const datos = await rta.json()
            resultado.innerHTML = `
                <h3>Cotización del ${fecha}</h3>
                <p>Oficial — Compra: $${datos.oficial.value_buy} | Venta: $${datos.oficial.value_sell}</p>
                <p>Blue — Compra: $${datos.blue.value_buy} | Venta: $${datos.blue.value_sell}</p>`
        } catch (error) {
            resultado.innerHTML = "<p>No se encontró cotización para esa fecha.</p>"
        }
    })
}

mostrar_cotizacion()