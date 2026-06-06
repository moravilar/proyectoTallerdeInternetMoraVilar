// noticias default - se cargan solas la primera vez q alguien abre la pag
// si ya hay algo en localStorage no hace nada (para no pisar lo q el admin cargo)

const noticiasPrecargadas = [
    {
        id: 1,
        titulo: "Científicos descubren cómo viajar a Marte en 30 días",
        descripcion: "Un motor de plasma impulsado por tecnología magnética avanzada podría revolucionar los viajes espaciales.",
        imagen: "imagenes/hombre-marte.webp"
    },
    {
        id: 2,
        titulo: "Los secretos de la Gran Pirámide salen a la luz",
        descripcion: "Un equipo internacional descubrió que la pirámide tiene propiedades que dispersan las vibraciones sísmicas.",
        imagen: "imagenes/los-secretos-de-la-gran-piramide-2245256.jpg"
    },
    {
        id: 3,
        titulo: "El crucero más grande del mundo: 500 metros y 60.000 pasajeros",
        descripcion: "El estudio italiano Lazzarini presenta Pangeos, una ciudad flotante con forma de tortuga marina.",
        imagen: "imagenes/zarpa-el-crucero-mas-grande-del-mundo-tiene-forma-de-tortuga-marina-capacidad-para-60000-pasajeros-shoppings-con-piletas-y-500-metros-de-largo-YO4POXX3CJC6NGGYQKCIJ.jpg"
    },
    {
        id: 4,
        titulo: "Chevron vuelve a la carga con la inversión más grande en Argentina",
        descripcion: "La petrolera presentó una solicitud bajo el RIGI para desarrollar El Trapial en Neuquén.",
        imagen: "imagenes/la-petrolera-que-pionereo-el-no-convencional-SQDMUHE2LRH3XPDIBZ7VPOBBFI.jpg"
    },
    {
        id: 5,
        titulo: "Las probabilidades de Argentina de ganar el Mundial 2026",
        descripcion: "Matemáticos de la UBA elaboraron un modelo estadístico que ubica a Argentina como tercera favorita.",
        imagen: "imagenes/AA24BbAX.jpg"
    },
    {
        id: 6,
        titulo: "Bill Gates reveló qué reemplazará a los celulares",
        descripcion: "El cofundador de Microsoft predice que los tatuajes electrónicos sustituirán a los smartphones.",
        imagen: "imagenes/billgates.jpg"
    }
]

function inicializarNoticias() {
    if (!localStorage.getItem("noticias")) {
        // solo guarda si NO habia nada, sino pisaria las noticias q el admin agrego
        localStorage.setItem("noticias", JSON.stringify(noticiasPrecargadas))
    }
}

inicializarNoticias()