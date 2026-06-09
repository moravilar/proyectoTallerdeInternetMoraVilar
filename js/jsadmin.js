const noticias = JSON.parse(localStorage.getItem("noticias")) || []
let contenedor = document.querySelector(".ubicacion-noticias")

const botoncrear = document.getElementById("createnoticia")
const botoneditar = document.getElementById("editnoticia")
const botoneliminar = document.getElementById("deletenoticia")

let modoactual = null

function crearnoticia() {
    if (modoactual === "crear") return
    if (modoactual !== null) {
        alert("Ya estás realizando una acción, guardá o recargá la página")
        return
    }
    modoactual = "crear"

    contenedor.innerHTML = `
    <article class="noticia form-noticia">
        <input id="titulo" placeholder="Título de la noticia">
        <input id="imagen" placeholder="Link de la imagen">
        <textarea id="desc" placeholder="Descripción de la noticia"></textarea>
        <button id="guardar">Guardar</button>
        <button id="cancelar">Cancelar</button>
    </article>`

    const boton= document.getElementById("guardar")
    const botoncancelar = document.getElementById("cancelar")
    botoncancelar.style.display = "block"

    botoncancelar.addEventListener("click", () => {location.reload()})

    boton.addEventListener("click", function() {
    const imagennoticia= document.getElementById("imagen").value
    const titulonoticia= document.getElementById("titulo").value
    const descnoticia= document.getElementById("desc").value

    if (!titulonoticia || !descnoticia || !imagennoticia) {
    alert("Por favor, completar todos los campos")
    return
    }
    //para tomar y poner el nuevo id de la noticia (sin que se superpongan)
    let maxId = 0;
    for (let i = 0; i < noticias.length; i++) {
        if (noticias[i].id > maxId) {
        maxId = noticias[i].id}}

    let nuevanoticia= {
        id: maxId + 1,
        titulo: titulonoticia,
        descripcion: descnoticia,
        imagen: imagennoticia
    }

        noticias.push(nuevanoticia);
        localStorage.setItem("noticias", JSON.stringify(noticias));
        location.reload()}
    )
}

function editarnoticia() {
    if (modoactual === "editar") return
    if (modoactual !== null) {
        alert("Ya estás realizando una acción, guardá o recargá la página")
        return
    }
    modoactual = "editar"

    const botoncancelar = document.getElementById("cancelar")
    botoncancelar.style.display = "block"

    botoncancelar.addEventListener("click", () => {location.reload()})

    contenedor.innerHTML = noticias.map(function(noticia) {
        return `
        <article class="noticia">
            <h3>${noticia.titulo}</h3>
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <p>${noticia.descripcion}</p>
            <button class="lapiz" id="${noticia.id}">Editar</button>
        </article>`
    }).join("")

    const botones=document.querySelectorAll(".lapiz")
    
    for (let i = 0; i < noticias.length; i ++)
        botones[i].addEventListener("click", function(){

            let iddelboton = botones[i].getAttribute("id")  
            let noticiaaeditar
            for (let a = 0; a < noticias.length; a++) {
                if (noticias[a].id == iddelboton) {
                noticiaaeditar = noticias[a]}}

            contenedor.innerHTML = `
            <article class="form-noticia">
                <input id="titulo" placeholder="${noticiaaeditar.titulo}">
                <input id="imagen" placeholder="${noticiaaeditar.imagen}">
                <textarea id="desc" placeholder="${noticiaaeditar.descripcion}"></textarea>
                <button id="guardar">Guardar</button>
            </article>`

            const boton= document.getElementById("guardar")

            boton.addEventListener("click", function() {
                let titulonoticia= document.getElementById("titulo").value
                let descnoticia= document.getElementById("desc").value
                let imagennoticia= document.getElementById("imagen").value

                if (!titulonoticia) {titulonoticia = noticiaaeditar.titulo}
                if (!descnoticia) {descnoticia = noticiaaeditar.descripcion}
                if (!imagennoticia) {imagennoticia = noticiaaeditar.imagen}
            
                noticiaaeditar.titulo = titulonoticia
                noticiaaeditar.descripcion = descnoticia
                noticiaaeditar.imagen = imagennoticia
                localStorage.setItem("noticias", JSON.stringify(noticias));
                location.reload()
})})}    

function eliminarnoticia(){
    if (modoactual === "eliminar") return
    if (modoactual !== null) {
        alert("Ya estás realizando una acción, guardá o recargá la página")
        return
    }
    modoactual = "eliminar"

    const botoncancelar = document.getElementById("cancelar")
    botoncancelar.style.display = "block"

    botoncancelar.addEventListener("click", () => {location.reload()})

    contenedor.innerHTML = noticias.map(function(noticia) {
        return `
        <article class="noticia">
            <h3>${noticia.titulo}</h3>
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <p>${noticia.descripcion}</p>
            <button class="tachito" id="${noticia.id}">Eliminar</button>
        </article>`
    }).join("")

    const botones=document.querySelectorAll(".tachito")
    for (let i = 0; i < noticias.length; i ++) {
        let iddelboton = botones[i].getAttribute("id") //guardo el id de cada boton

        botones[i].addEventListener("click", function(){ //para cada boton de cada noticia le agrega lo que hace cuando click
            if(confirm("Deseas eliminar esta noticia? Esta accion es irreversible.")) 
                //si te dice aceptar al confirm, busca la noticia que su id es la del boton, entonces guarda su indice
                // para despues hacer splice
                {function obtenerindice() {
                    let indice = 0
                    for (let a = 0; a < noticias.length; a++) {
                        if (noticias[a].id == iddelboton) {
                            indice = a
                            break}}
                    return indice}
                    noticias.splice(obtenerindice(), 1)
                    localStorage.setItem("noticias", JSON.stringify(noticias));};
            
            location.reload()
        })}
}

botoneditar.addEventListener("click", editarnoticia)
botoncrear.addEventListener("click", crearnoticia)
botoneliminar.addEventListener("click", eliminarnoticia)