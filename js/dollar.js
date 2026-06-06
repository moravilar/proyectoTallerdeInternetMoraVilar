// cotizaciones - llama a la api de bluelytics
// tardé como 2 horas en entender por qué no andaba y era que me faltaba el await lol

async function mostrar_cotizacion() {
    const seccion = document.getElementById("cotizaciones")
    if (!seccion) return // si no existe la seccion no hace nada, sino tira error

    try {
        const rta = await fetch("https://api.bluelytics.com.ar/v2/latest")
        const datos = await rta.json() // el json() tmb es async1!1!1!

        seccion.innerHTML = `
            <article class="cot-oficial">
                <h3>Dólar Oficial</h3>
                <p>Compra: $${datos.oficial.value_buy}</p>
                <p>Venta: $${datos.oficial.value_sell}</p>
            </article>
            <article class="cot-blue">
                <h3>Blue</h3>
                <p>Compra: $${datos.blue.value_buy}</p>
                <p>Venta: $${datos.blue.value_sell}</p>
            </article>
            <article class="cot-euro-oficial">
                <h3>Euro Oficial</h3>
                <p>Compra: $${datos.oficial_euro.value_buy}</p>
                <p>Venta: $${datos.oficial_euro.value_sell}</p>
            </article>
            <article class="cot-euro-blue">
                <h3>Euro Blue</h3>
                <p>Compra: $${datos.blue_euro.value_buy}</p>
                <p>Venta: $${datos.blue_euro.value_sell}</p>
            </article>`

    } catch (error) {
        // si no anda la api muestro esto en vez de q quede en blanco
        seccion.innerHTML = "<p>No se pudo cargar la cotización en este momento.</p>"
    }
}

// cotizacion historica, esto va en index.html con el formulario de fecha. Cada vez que un usuario quiera ver la cotizacion de una fecha determinada, el js mostrara la cotizacion de ese dia, o un mensaje de error si no se encuentra esa fecha en la api. La api de bluelytics tiene datos desde 2020, asi que no se pueden buscar fechas anteriores a eso.
// solo sera capaz de mostrar las cotizaciones del dolar oficial y blue, no del euro.//
const formulario = document.getElementById("formulario")
if (formulario) {
    formulario.addEventListener("submit", async function(e) {
        e.preventDefault()
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
                <div class="resultado-historico">
                    <article class="hist-oficial">
                        <h3>Dólar Oficial</h3>
                        <p>Compra: $${datos.oficial.value_buy}</p>
                        <p>Venta: $${datos.oficial.value_sell}</p>
                    </article>
                    <article class="hist-blue">
                        <h3>Blue</h3>
                        <p>Compra: $${datos.blue.value_buy}</p>
                        <p>Venta: $${datos.blue.value_sell}</p>
                    </article>
                </div>`
        } catch (error) {
            resultado.innerHTML = "<p>No se encontró cotización para esa fecha.</p>"
        }
    })
}
mostrar_cotizacion()