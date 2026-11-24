// MEDINOVA - Catálogo, buscador, filtro y carrito de compras

// Arreglo de objetos: cada producto tiene id, nombre, precio, categoría y fotografía.
const productos = [
    { id: 1, nombre: "Ibuprofeno 400 mg", precio: 3.50, categoria: "Medicamentos", foto: "catalogo/ibuprobeno.png" },
    { id: 2, nombre: "Omeprazol", precio: 4.00, categoria: "Medicamentos", foto: "catalogo/omeprasol.png" },
    { id: 3, nombre: "Peptocid", precio: 6.50, categoria: "Medicamentos", foto: "catalogo/producto1.jpg" },
    { id: 4, nombre: "Aloratt", precio: 5.00, categoria: "Medicamentos", foto: "catalogo/producto2.jpg" },
    { id: 5, nombre: "Paracetamol", precio: 2.50, categoria: "Medicamentos", foto: "catalogo/producto3.jpg" },
    { id: 6, nombre: "Loción corporal", precio: 7.00, categoria: "Cuidado personal", foto: "catalogo/locion-1.jpg" },
    { id: 7, nombre: "Vitamina C", precio: 4.50, categoria: "Bienestar", foto: "catalogo/vitamina-c-1.jpg" },
    { id: 8, nombre: "Jarabe para la tos", precio: 5.50, categoria: "Medicamentos", foto: "catalogo/tos.png" }
];

const listaProductos = document.getElementById("listaProductos");
const campoBuscar = document.getElementById("campoBuscar");
const selCategoria = document.getElementById("selCategoria");
const botonFiltrar = document.getElementById("btnFiltrar");
const textoCarrito = document.getElementById("textoCarrito");
const botonVaciar = document.getElementById("btnVaciar");

let carrito = [];

function mostrarProductos(lista) {
    if (listaProductos === null) return;

    let html = "";
    for (let i = 0; i < lista.length; i++) {
        const p = lista[i];
        html += "<li>" +
            "<img src='" + p.foto + "' alt='" + p.nombre + "' class='foto-producto'>" +
            "<h3>" + p.nombre + "</h3>" +
            "<p class='precio'>$" + p.precio.toFixed(2) + "</p>" +
            "<p>" + p.categoria + "</p>" +
            "<button type='button' onclick='agregarAlCarrito(" + p.id + ")'>Agregar al carrito</button>" +
            "</li>";
    }

    if (lista.length === 0) {
        html = "<li>No se encontraron productos.</li>";
    }
    listaProductos.innerHTML = html;
}

function filtrarProductos() {
    if (campoBuscar === null || selCategoria === null) return;

    const texto = campoBuscar.value.trim().toLowerCase();
    const categoria = selCategoria.value;
    const resultado = [];

    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "todas" || p.categoria === categoria;

        if (coincideNombre && coincideCategoria) {
            resultado.push(p);
        }
    }
    mostrarProductos(resultado);
}

function agregarAlCarrito(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            carrito.push(productos[i]);
            break;
        }
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    if (textoCarrito === null) return;

    if (carrito.length === 0) {
        textoCarrito.textContent = "El carrito está vacío.";
        return;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }

    textoCarrito.textContent = "Productos: " + carrito.length +
        " | Total: $" + total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

// Función propia con parámetros y return.
function aplicarDescuento(precio, porcentaje) {
    return precio - precio * porcentaje / 100;
}

// Eventos de la tienda: solo se activan si los elementos existen en esta página.
if (listaProductos !== null) {
    mostrarProductos(productos);
}
if (botonFiltrar !== null) {
    botonFiltrar.addEventListener("click", filtrarProductos);
}
if (campoBuscar !== null) {
    campoBuscar.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") filtrarProductos();
    });
}
if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}


// Interacciones anteriores del proyecto: se mantienen sin causar errores
// cuando estos elementos no existen en la página actual.
const campoNombre = document.getElementById("campoNombre");
const botonSaludo = document.getElementById("btnSaludo");
const resultadoSaludo = document.getElementById("resultadoSaludo");
if (campoNombre && botonSaludo && resultadoSaludo) {
    botonSaludo.addEventListener("click", function() {
        resultadoSaludo.textContent = "¡Hola, " + campoNombre.value + "! Bienvenido a mi proyecto.";
    });
}

const botonMensaje = document.getElementById("btnMensaje");
const mensaje = document.getElementById("mensaje");
if (botonMensaje && mensaje) {
    botonMensaje.addEventListener("click", function() {
        mensaje.textContent = "¡Excelente! JavaScript está funcionando.";
    });
}

const campoEdad = document.getElementById("campoEdad");
const botonEdad = document.getElementById("btnEdad");
const resultadoEdad = document.getElementById("resultadoEdad");
if (campoEdad && botonEdad && resultadoEdad) {
    botonEdad.addEventListener("click", function() {
        const edad = Number(campoEdad.value);
        resultadoEdad.textContent = edad >= 18
            ? "Acceso permitido. ¡Bienvenido!"
            : "Acceso no permitido: debes tener 18 años o más.";
    });
}

const campoNombreR = document.getElementById("campoNombreR");
const campoEdadR = document.getElementById("campoEdadR");
const botonRegistro = document.getElementById("btnRegistro");
const resultadoRegistro = document.getElementById("resultadoRegistro");
if (campoNombreR && campoEdadR && botonRegistro && resultadoRegistro) {
    botonRegistro.addEventListener("click", function() {
        const nombre = campoNombreR.value.trim();
        const edadTexto = campoEdadR.value.trim();
        const edad = Number(edadTexto);
        if (nombre === "") {
            resultadoRegistro.textContent = "Escribe tu nombre.";
        } else if (edadTexto === "" || !Number.isFinite(edad) || edad < 0) {
            resultadoRegistro.textContent = "Escribe una edad válida con números.";
        } else if (edad >= 18) {
            resultadoRegistro.textContent = "Registro aprobado: " + nombre;
        } else {
            resultadoRegistro.textContent = "Eres menor de edad: acceso limitado.";
        }
    });
}

const botonContar = document.getElementById("btnContar");
const textoContador = document.getElementById("textoContador");
let contador = 0;
if (botonContar && textoContador) {
    botonContar.addEventListener("click", function() {
        contador++;
        textoContador.textContent = "Clics: " + contador;
    });
}

const campoTabla = document.getElementById("campoTabla");
const botonTabla = document.getElementById("btnTabla");
const resultadoTabla = document.getElementById("resultadoTabla");
if (campoTabla && botonTabla && resultadoTabla) {
    botonTabla.addEventListener("click", function() {
        const texto = campoTabla.value.trim();
        const numero = Number(texto);
        if (texto === "" || !Number.isFinite(numero)) {
            resultadoTabla.textContent = "Escribe un número válido.";
            return;
        }
        let tabla = "";
        for (let i = 1; i <= 10; i++) {
            tabla += numero + " x " + i + " = " + (numero * i) + "<br>";
        }
        resultadoTabla.innerHTML = tabla;
    });
}


// ===== CUENTAS DE MEDINOVA (simulación académica en el navegador) =====
const campoUsuarioCuenta = document.getElementById("cuUsuario");
const campoClaveCuenta = document.getElementById("cuClave");
const textoMensajeCuenta = document.getElementById("mensajeCuenta");
const textoEstadoSesion = document.getElementById("estadoSesion");
const listaPedidosCuenta = document.getElementById("listaPedidos");
const botonCrearCuenta = document.getElementById("btnRegistro");
const botonIniciarSesion = document.getElementById("btnEntrar");
const botonCerrarSesion = document.getElementById("btnSalir");

let usuariosMediNova = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioMediNovaActivo = localStorage.getItem("usuarioActivo");

function avisarCuenta(texto, color) {
    if (textoMensajeCuenta) {
        textoMensajeCuenta.textContent = texto;
        textoMensajeCuenta.style.color = color;
    }
}

function buscarUsuarioCuenta(nombre) {
    for (let i = 0; i < usuariosMediNova.length; i++) {
        if (usuariosMediNova[i].usuario === nombre) return usuariosMediNova[i];
    }
    return null;
}

function registrarCuentaMediNova() {
    const nombre = campoUsuarioCuenta.value.trim();
    const clave = campoClaveCuenta.value;

    if (nombre === "" || clave.length < 6) {
        avisarCuenta("Escribe un usuario y una contraseña de al menos 6 caracteres.", "red");
        return;
    }
    if (buscarUsuarioCuenta(nombre) !== null) {
        avisarCuenta("Ese usuario ya existe.", "red");
        return;
    }

    usuariosMediNova.push({ usuario: nombre, clave: clave });
    localStorage.setItem("usuarios", JSON.stringify(usuariosMediNova));
    avisarCuenta("Cuenta creada. Ahora inicia sesión.", "green");
    campoClaveCuenta.value = "";
}

function iniciarSesionMediNova() {
    const usuario = buscarUsuarioCuenta(campoUsuarioCuenta.value.trim());
    if (usuario === null || usuario.clave !== campoClaveCuenta.value) {
        avisarCuenta("Usuario o contraseña incorrectos.", "red");
        return;
    }

    usuarioMediNovaActivo = usuario.usuario;
    localStorage.setItem("usuarioActivo", usuarioMediNovaActivo);
    avisarCuenta("Bienvenido, " + usuarioMediNovaActivo + ".", "green");
    actualizarSesionMediNova();
    campoClaveCuenta.value = "";
}

function cerrarSesionMediNova() {
    usuarioMediNovaActivo = null;
    localStorage.removeItem("usuarioActivo");
    avisarCuenta("Sesión cerrada.", "green");
    actualizarSesionMediNova();
}

function mostrarPedidosMediNova() {
    if (!listaPedidosCuenta) return;

    listaPedidosCuenta.innerHTML = "";
    if (usuarioMediNovaActivo === null) {
        const li = document.createElement("li");
        li.textContent = "Inicia sesión para consultar tus pedidos.";
        listaPedidosCuenta.appendChild(li);
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosUsuario = pedidos.filter(p => p.usuario === usuarioMediNovaActivo);

    if (pedidosUsuario.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Aún no tienes pedidos.";
        listaPedidosCuenta.appendChild(li);
        return;
    }

    pedidosUsuario.forEach(pedido => {
        const li = document.createElement("li");
        li.textContent = pedido.fecha + " - " + pedido.cantidad +
            " producto(s) - $" + Number(pedido.total).toFixed(2);
        listaPedidosCuenta.appendChild(li);
    });
}

function actualizarSesionMediNova() {
    if (textoEstadoSesion) {
        textoEstadoSesion.textContent = usuarioMediNovaActivo === null
            ? "Sin sesión."
            : "Sesión activa: " + usuarioMediNovaActivo;
    }
    mostrarPedidosMediNova();
}

if (botonCrearCuenta) botonCrearCuenta.addEventListener("click", registrarCuentaMediNova);
if (botonIniciarSesion) botonIniciarSesion.addEventListener("click", iniciarSesionMediNova);
if (botonCerrarSesion) botonCerrarSesion.addEventListener("click", cerrarSesionMediNova);

actualizarSesionMediNova();

// ===== COMPRAS DE MEDINOVA (requieren iniciar sesión) =====
const botonComprarMediNova = document.getElementById("btnComprar");
const mensajeCompraMediNova = document.getElementById("mensajeCompra");

function calcularTotalCarritoMediNova() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }
    return total;
}

function finalizarCompraMediNova() {
    if (!mensajeCompraMediNova) return;

    if (usuarioMediNovaActivo === null) {
        mensajeCompraMediNova.textContent = "Inicia sesión para comprar.";
        mensajeCompraMediNova.style.color = "red";
        return;
    }
    if (carrito.length === 0) {
        mensajeCompraMediNova.textContent = "Tu carrito está vacío.";
        mensajeCompraMediNova.style.color = "red";
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = {
        usuario: usuarioMediNovaActivo,
        cantidad: carrito.length,
        total: calcularTotalCarritoMediNova(),
        fecha: new Date().toLocaleDateString("es-EC")
    };

    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    mensajeCompraMediNova.textContent = "Gracias, " + usuarioMediNovaActivo +
        ". Pedido registrado por $" + pedido.total.toFixed(2) + ".";
    mensajeCompraMediNova.style.color = "green";
    vaciarCarrito();
    mostrarPedidosMediNova();
}

if (botonComprarMediNova) {
    botonComprarMediNova.addEventListener("click", finalizarCompraMediNova);
}
