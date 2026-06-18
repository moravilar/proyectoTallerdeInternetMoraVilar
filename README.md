# proyectoTallerdeInternet

Portal de noticias con cotización del dólar en tiempo real, autenticación de administrador y gestión completa de contenido vía `localStorage`.

Trabajo Práctico de Taller de Internet I — Universidad Austral, LCD 2026 (1° Cuatrimestre). Desarrollado por Castro, María del Pilar, Cuenca, Eugenia María y Vilar, Mora Lucía. Ultimas implementaciones por Vilar, Mora Lucía.

Las cotizaciones se obtienen de la [API pública de Bluelytics](https://bluelytics.com.ar/#!/api) y la autenticación se realiza a través de [DummyJSON](https://dummyjson.com/docs/auth#auth-login).

---

# Flujo del proyecto

El portal tiene dos modos de uso:

1. **Visitante:** accede al home (`index.html`), ve las noticias precargadas, consulta cotizaciones actuales e históricas del dólar, y puede buscar noticias por título. No requiere autenticación.
2. **Administrador:** inicia sesión en `login.html` con credenciales validadas por API. Una vez autenticado, accede al panel (`admin.html`) donde puede crear, editar y eliminar noticias. La sesión persiste mientras el navegador esté abierto y se cierra automáticamente al cerrarlo.

---

# Requisitos

* Cualquier navegador web moderno (Chrome, Edge, Firefox, Opera)
* Conexión a internet para obtener cotizaciones y autenticar vía API
* No se requiere instalación ni servidor — el proyecto corre directamente en el navegador

---

# Cómo ejecutar el proyecto

## Abrir localmente

```
# 1. Cloná o descargá el repositorio completo
git clone https://github.com/pilxxx/proyectoTallerdeInternet.git

# 2. Mantené la estructura de directorios intacta:
#    css/, js/, imagenes/

# 3. Abrí index.html con doble clic o arrastrándolo al navegador
```

## Ver en producción

El portal está publicado en GitHub Pages:

```
https://pilxxx.github.io/proyectoTallerdeInternet/
```

## Actualizar la versión publicada tras hacer cambios

```bash
# Hacé tus cambios localmente
git add .
git commit -m "descripcion del cambio"
git push origin main
# GitHub Pages se actualiza automáticamente en unos minutos
```

---

# Credenciales de administrador

La autenticación usa la API externa [DummyJSON](https://dummyjson.com/docs/auth#auth-login), que valida las credenciales y devuelve un token de sesión.

```
Usuario:    emilys
Contraseña: emilyspass
```

Una vez autenticado, podés crear, editar y eliminar noticias desde el panel de administración. La sesión se mantiene activa mientras el navegador esté abierto; al cerrarlo, se cierra la sesión automáticamente.

Si no hay conexión a internet, el login no podrá validarse (ya que depende de la API). Las noticias ya guardadas en `localStorage` seguirán siendo visibles sin conexión.

---

# Uso

## Como visitante

Abrí `index.html`. La página muestra:

- **Cotizaciones actuales:** dólar oficial, blue, euro oficial y euro blue, obtenidas en tiempo real de Bluelytics.
- **Cotización histórica:** ingresá una fecha en el formulario para ver el valor del dólar oficial y blue en ese día (disponible desde 2020).
- **Noticias:** se cargan automáticamente del `localStorage`. En la primera visita se precarga un conjunto de 6 noticias por defecto.
- **Buscador:** filtrá noticias por título en tiempo real mientras escribís.
- **Dark mode:** activá el modo oscuro con el botón en el header; la preferencia se guarda y persiste entre visitas.

## Como administrador

```
1. Hacé click en "Iniciar sesión" en el header
2. Ingresá las credenciales (usuario: emilys / contraseña: emilyspass)
3. Serás redirigido automáticamente al panel de administración
```

Desde el panel podés:

```
Crear noticia   → completá título, URL de imagen y descripción
Editar noticia  → seleccioná la noticia, modificá solo los campos que quieras
                  (los campos vacíos conservan el valor original)
Eliminar noticia → seleccioná la noticia y confirmá la eliminación
```

Para volver al home sin cerrar sesión, usá el botón "Home" en el header o el link "Modificar noticias" en el nav (visible solo cuando estás logueado).

---

# Estructura del proyecto

```
proyectoTallerdeInternet/
│
├── index.html          # Página principal (vista pública)
├── login.html          # Formulario de autenticación
├── admin.html          # Panel de administración (requiere sesión)
│
├── css/
│   ├── styleindex.css  # Estilos de la página principal
│   ├── stylelogin.css  # Estilos de la página de login
│   └── styleadmin.css  # Estilos del panel de administración
│
├── js/
│   ├── initialNews.js  # Precarga 6 noticias en localStorage (solo la primera vez)
│   ├── darkmode.js     # Toggle dark mode (localStorage) + menú hamburguesa
│   ├── dollar.js       # Cotizaciones actuales e históricas vía API Bluelytics
│   ├── news.js         # Renderiza noticias del localStorage + buscador por título
│   ├── auth.js         # Login/logout vía DummyJSON + visibilidad de botones
│   ├── jsadmin.js      # CRUD completo de noticias para el panel de administración
│   └── jslogin.js      # Archivo en desuso (borrador inicial, no cargado en ninguna página)
│
├── imagenes/           # Imágenes de las 6 noticias precargadas
│
└── noticias.md         # Fuentes y datos de las noticias precargadas
```

---

# Funcionalidades implementadas

* Las noticias se almacenan y persisten en `localStorage`. En la primera visita se cargan 6 noticias por defecto sin pisar contenido cargado posteriormente por el administrador.
* La autenticación usa `sessionStorage` para el token: se mantiene activa mientras el navegador esté abierto y se borra automáticamente al cerrarlo, sin necesidad de logout manual.
* El link "Modificar noticias" en el nav es invisible para visitantes y se muestra solo cuando hay una sesión de administrador activa.
* Al editar una noticia, los campos vacíos conservan el valor original en lugar de requerir completarlos todos obligatoriamente.
* El modo oscuro persiste entre sesiones usando `localStorage` y se aplica inmediatamente al cargar la página, sin parpadeo.
* El panel de administración tiene un guard de autenticación en el `<head>` que redirige a login antes de renderizar cualquier contenido, evitando que el panel parpadee antes de redirigir.
* El buscador filtra noticias en tiempo real (evento `input`) y es insensible a mayúsculas/minúsculas.
* La cotización histórica cubre dólar oficial y blue desde 2020 (límite de la API de Bluelytics).
* Tanto las cotizaciones como el login manejan errores de conexión mostrando mensajes al usuario en lugar de dejar la interfaz rota o en blanco.
* El diseño es responsive: en mobile el nav se oculta y se accede mediante el botón hamburguesa.
