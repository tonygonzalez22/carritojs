const productosContainer = document.getElementById("productos");
const carritoContainer = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

let carrito = obtenerDeStorage("carrito");

const mostrarProductos = (productos) => {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(div);
    });
};

const actualizarCarrito = () => {
    carritoContainer.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <span>${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}</span>
            <button onclick="eliminarDelCarrito(${producto.id})">X</button>
        `;
        carritoContainer.appendChild(item);
    });

    totalCarrito.textContent = `Total: $${total}`;
    guardarEnStorage("carrito", carrito);
};

const agregarAlCarrito = (id) => {
    let productos = obtenerDeStorage("productos");
    let producto = productos.find(prod => prod.id === id);
    let itemEnCarrito = carrito.find(prod => prod.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    actualizarCarrito();
};

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(prod => prod.id !== id);
    actualizarCarrito();
};

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

actualizarCarrito();
