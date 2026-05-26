//tiene que ser tipo una funcion en la que, si el user quiere ingresar como admin, le pida user y contraseña de admin (que deben estar predefinidas) en formato de formulario y SOLO si ingresa ambos correctamente puede acceder como administrador, que le permite crear, modificar o eliminar noticias. La función de login como admin debe aparecer en la página principal de la página web (puede ser un botón que diga ingresar como administrador). si se ingresa como administrador, debería poder aparecer un botón (ig q el de login) que diga 'volver' y lleve al home de la página Y MANTENGA LA SESION INICIADA. en la pagina de administrador tiene que haber una opcion de cerrar sesion (botón) que cierre sesion del admin. si se carga de nuevo la página tmb se cierra sesión del admin. 
credenciales login: API (https://dummyjson.com/docs/auth#auth-login)
cotización del dolar: API (https://bluelytics.com.ar/#!/api)
home tmb debe tener un botón que sea 'dark mode' y si se activa ponga toda la página en oscuro (eso es de css). desde js debo ver que este boton funcione Y QUE se mantenga el dark aunq se recargue la página. 
las noticias se cargan manualmente por los alumnos (que serian los admins) y deben tener titulo de la noticia, descripcion y imagen descriptiva/link a internet. deben haber 6 noticias como mínimo en el localStorage y las nuevas a crear se deben mantener en localStorage. 

//LOGIN:

// al cargar borro cualq sesion previa
sessionStorage.removeItem('token');
sessionStorage.removeItem('usuario');

async function loginAdmin(username, password) {
  try { //bloque trycatch, si algo s rompe dentro del try voy al catch 
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: 'POST', //pq le envio la data del user y pass
      headers: { 'Content-Type': 'application/json' }, //headers son metadatos q sirven para decirle al servidor q tipo de data le estoy enviando (aca es json)
      body: JSON.stringify({
        username: username,      // el usuario q le pase d parametro
        password: password,  // la contraseña que le pase d parametro
      })
    });

    const datos = await res.json(); //res es la rta cruda en http con await en la q guardo los datos en formato json legibles

    if (datos.token) { //la api d dummy m devuelve un obj con prop token q si existe la prop token es exitoso y:
      sessionStorage.setItem('token', datos.token);  //guardo el token
      sessionStorage.setItem('usuario', datos.username);  //y el user
      //en sessionStorage

      window.location.href = 'admin.html'; // lleva al panel de admin al user

    } else {
      alert('Usuario o contraseña incorrectos'); //la api no devolvio token entonces no es admin lol
    }

  } catch (error) {
    console.error('Error al hacer login:', error);
    alert('No se pudo conectar. Revisá tu conexión.');
  }
}

//el catch dentro del bloque try-catch es p cuando hay un error ultra random, es como en .py lo de try-except

//conecto el form con loginAdmin (function) Y hago q funque el 'submit' del form: 

document.getElementById('form-login').addEventListener('submit', (e) => {
  e.preventDefault(); //metodo sacado d internet, PREGUNTAR, pero se supone q evita q el form recargue la pág, q es algo q hace el html x default

  const username = document.getElementById('username').value; //tomo lo q pasó el user como username
  const password = document.getElementById('password').value; //y la contra escrita
  loginAdmin(username, password); 
});



