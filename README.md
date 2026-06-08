# proyectoTallerdeInternet
Trabajo Práctico de Taller de Internet - Austral - LCD 2026 (1er Cuatrimestre) - Vilar, Cuenca, y Castro

Cómo ejecutar el proyecto
Abrir en el navegador
Para visualizar e interactuar con el portal de noticias localmente:
Descargá o cloná la carpeta completa del proyecto.
Asegurate de mantener la estructura de directorios intacta (css/, js/ y assets/).
Hacé doble clic sobre el archivo index.html para abrir el portal en cualquier navegador web moderno (Chrome, Edge, Opera).
Ya podes realizar modificaciones locales al repositorio! :).

Credenciales Admin
Utilizamos la API externa DummyJSON para la autenticación, lo que habilita a poder modificar las noticias desde el perfil de administrador. Esto es posible de realizar utilizando las credenciales:
Usuario: emilys
Contraseña: emilyspass
Una vez utilizadas, se podrán hacer cambios sobre las noticias ya existentes, o agregar nuevas. 

Estructura del proyecto
El repositorio consta de 14 archivos de código, 6 imágenes, y 3 carpetas. Detallamos el funcionamiento de cada archivo a continuación:

1.index.html
Este archivo es el main, la página de inicio al entrar a la url. Está definido como HTML5, vinculado con la hoja de estilos styles.css. Su body consta de 3 partes:
Header.
Main - Cotizaciones: esta parte establece el código base para ver la última cotización histórica de distintas monedas del euro, y dólar, y luego podemos seleccionar la cotización histórica de estas mismas en algún día en especial, que luego desde js establece la interacción.
Main - Noticias: luego, podemos ver que en esta parte no hay especialmente nada, únicamente un <div> con una clase, para que luego el js pueda mostrarlas (luego lo explicaremos)

2.login.html
Este archivo es el utilizado para iniciar sesión, es decir, realizar la autenticación, a través de las credenciales que especificamos anteriormente. También consta de 2 partes:
Header.
Main: aquí es donde vemos el formulario (estructurado con los labels), con los inputs, y botón, donde piden la información que luego desde js se maneja para la autenticación.

3.admin.html
Este archivo es el portal el cual nos permite crear, eliminar y editar noticias. En su código no vemos mucho más que lo principal que vimos antes (el header), y los botones para modificar las noticias que luego desde js se especifica su interacción en la página, a su vez como muestra el contenido de la noticia.

Vemos que estos tres archivos tienen en su principio y en su final el mismo contenido. Dentro del header, definimos la parte de arriba de la página, que contiene el título, y los botones para dark mode (que pinta la página de un estilo oscuro), e iniciar sesión (que te lleva a la página login.html. Así como en el nav encontramos una lista, que funciona para ir navegando entre las distintas páginas y partes del proyecto.
Por debajo de todo el código, en las 3 paginas podemos ver como vinculamos cada pagina con todos los archivos js, para que puedan aplicar su relación.

4. auth.js:
En este archivo, manejamos la autenticación y gestión de sesión (login/logout) usando la API DummyJSON. También nos encargamos del manejo de contraseñas y visibilidad de las mismas, usando distintas funciones.
Función ‘logindeladmin’: se llama a la API y se verifica que, de existir el token (de ser correctas las credenciales de usuario y contraseña), se guarde el mismo en sessionStorage para poder usarlo luego, y se envía al usuario ‘admin’ a su respectivo panel. De ser erróneas las credenciales (ya sea el usuario, la contraseña, o ambas), se muestra un mensaje de error.  Todo lo previamente mencionado está englobado dentro del método ‘try-catch’, específicamente en la parte del ‘try’. El método verifica que funcione el llamado a la API, y, de no poder conectarse a la misma, se muestra un error de conexión. 
Función ‘log_out’: envía al usuario al comienzo de la página, eliminando el token y el usuario del sessionStorage. De querer iniciar sesión nuevamente, se deberá re-ingresar al login. 
Botón de cerrar sesión: de encontrarse el id ‘boton-logout’ en cualquiera sea el archivo html en el que se encuentre ( en este caso, en admin.html), llama a la función log_out y cierra la sesión. 
Variable btnVerPass: busca el elemento de id ‘mostrarcontraseña’ en cualquier documento .html en el que se encuentre (en este caso, en login.html), y verifica que, de estar dicho elemento, se tome a la contraseña del documento y, de verificarse, la muestra (y el texto de ‘Mostrar contraseña’ pasa a ‘Ocultar contraseña’). Caso contrario, la contraseña permanece oculta y la opción de ‘Mostrar contraseña’ se mantiene. 
Muestreo del botón de ‘cerrar sesión’/’iniciar sesión’: de estar la sesión iniciada, se muestra ‘cerrar sesión’ en el botón superior derecho, caso contrario se muestra ‘iniciar sesión’.

5. jsadmin.js
Este archivo es el que define las funciones que afectan directamente al admin.html. Una vez autenticado, el usuario podrá interactuar con los distintos botones, que están asociados a las siguientes funciones:
Función crear noticia: es llamada por el botón crear, la cual cambia lo que vemos en la página, para pedir mediante inputs los datos para la nueva noticia. Luego, la crea en el local storage.
Función editar noticia: es llamada por el botón editar, la cual cambia lo que vemos en la página. Muestra un “preview” de cada noticia con un nuevo botón de “editar” para seleccionar la noticia que queremos cambiar. Al igual que en crear noticia, pide mediante inputs los datos para luego cambiar el contenido en localstorage con la clave “noticias”.
Función eliminar noticia: es llamada por el botón eliminar, la cual cambia lo que vemos en la página nuevamente. También muestra un “preview”, de cada noticia, con un nuevo botón de “eliminar” para seleccionar la noticia que queremos eliminar. Al tocar alguno de esos botones, pide una confirmación, y si acepta el usuario, toma esa noticia del contenido de “noticias” en el localstorage.
Las tres funciones implementan los botones cancelar, que te recarga la página, y el botón de guardar en que completa las funciones (en cada caso), y recarga la página implementando los cambios hechos.
6. initialnews.js
En este archivo nos encargamos de cargar las noticias por defecto la primera vez que entramos a la página. Lo que realiza es definir una variable (que tiene por contenido todas las noticias iniciales) y luego una funcion con la lógica para insertarlas, en formato json, en el localStorage solo si este todavía no tiene nada guardado.

7. darkmode.js
En este archivo manejamos dos formas visuales e interactivos: el modo oscuro (dark mode) y el menú hamburguesa para pantallas pequeñas. Ambas funcionalidades persisten o cambian según el estado guardado o las acciones del usuario.

8. dollar.js
En este archivo manejamos todo lo relacionado a la cotización del dólar: tanto la cotización actual (que se muestra automáticamente al cargar la página) como la consulta histórica por fecha, usando la API pública de Bluelytics.
Función mostrar_cotizacion: busca la sección con id cotizaciones en el documento. De no encontrarla (por ejemplo, si el script se ejecutara en una página que no la tiene), sale sin hacer nada. De encontrarla, hace una llamada a la API de Bluelytics usando fetch y await (ya que es una operación asíncrona) y, al recibir la respuesta, la convierte a JSON. Con los datos obtenidos, construye dinámicamente el HTML de las cuatro tarjetas de cotización (dólar oficial, blue, euro oficial y euro blue) y los inserta en la sección. Todo esto está dentro de un try-catch: de no poder conectarse a la API, muestra un mensaje de error en lugar de dejar la sección vacía.
Formulario de cotización histórica: busca el formulario con id formulario en el documento. De encontrarlo, le agrega un listener al evento submit. Al enviarse el formulario, se previene el comportamiento por defecto del HTML (que recargaría la página), se toma el valor de fecha ingresado por el usuario, y se hace una llamada a la API de Bluelytics con esa fecha como parámetro en la URL. De encontrarse datos para esa fecha, se construye y muestra un HTML con las cotizaciones del dólar oficial y blue para ese día. De no encontrarse datos (fecha fuera de rango, fecha futura, etc.), se muestra un mensaje de error en el lugar del resultado.

9. news.js
En este archivo manejamos que se muestren las noticias guardadas en el localStorage, tanto en el index como en el panel de administración. También contiene la lógica del buscador por título.
Función mostrarnews: busca el contenedor con clase ubicacion-noticias en el documento. De no encontrarlo, sale sin hacer nada. De encontrarlo, lee las noticias del localStorage, las convierte de JSON a un array de objetos (con JSON.parse), y, si el array tiene noticias, genera el HTML de cada tarjeta usando .map() (que devuelve un array de strings HTML) y .join("") (que los une en un solo string), asignando el resultado al innerHTML del contenedor. De estar el array vacío, muestra un mensaje que indica que no hay noticias cargadas.
Variable buscador y su event listener: busca el input con id “buscadorxtitulo”. De encontrarlo, le agrega un listener al evento input, que se dispara cada vez que el usuario escribe o borra una letra. Al dispararse, toma el texto ingresado (convertido a minúsculas para que la búsqueda no sea sensible a mayúsculas), lee todas las noticias del localStorage, y filtra aquellas cuyo título incluye el texto buscado (usando .filter() e .includes()). Finalmente, renderiza solo las noticias filtradas en el contenedor, actualizando la vista en tiempo real.

