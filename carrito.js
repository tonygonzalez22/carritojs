const productosDisponibles = [
  { id: 1, nombre: "camiseta de boca", precio: 20000, imagen: "imagenes/remera de boca.png"},
  { id: 2, nombre: "Pantalon de boca", precio: 30000, imagen: "imagenes/pantalon.jpg" },
  { id: 3, nombre: "Zapatillas boca", precio: 50000, imagen: "imagenes/zapatilla.jpg" }
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  
  productosDisponibles.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productosDisponibles.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito.`);
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "";

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function finalizarCompra() {
  try {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const metodoPago = document.getElementById("metodo-pago").value;
    
    if (!nombre || !telefono || !direccion) {
      throw new Error("Por favor, completa todos los campos de información personal.");
    }
    
    if (carrito.length === 0) {
      throw new Error("El carrito está vacío. Agregue productos antes de finalizar la compra.");
    }
    
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const costoEnvio = 3000;
    let descuentoRecargo = 0;
    
    if (metodoPago === "efectivo") {
      descuentoRecargo = total * 0.1; // Descuento del 10%
      total -= descuentoRecargo;
    } else if (metodoPago === "tarjeta") {
      descuentoRecargo = total * 0.1; // Recargo del 10%
      total += descuentoRecargo;
    }
    
    total += costoEnvio;
    
    document.getElementById("mensaje-usuario").innerHTML = `
      <h2>¡Gracias por su compra xeneize, ${nombre}!</h2>
      <p>Total de productos: $${(total - costoEnvio).toFixed(2)}</p>
      <p>${metodoPago === "efectivo" ? "Descuento 10% aplicado" : "Recargo 10% aplicado"}: $${descuentoRecargo.toFixed(2)}</p>
      <p>Costo de envío: $${costoEnvio}</p>
      <p>Total a pagar: $${total.toFixed(2)}</p>
      <p>Tu pedido será enviado a: ${direccion}</p>
      <p>Nos contactaremos contigo al: ${telefono}</p>
    `;
    localStorage.removeItem("carrito");
  } catch (error) {
    alert(error.message);
  } finally {
    console.log("Proceso de compra finalizado");
  }
}

document.getElementById("ver-carrito").addEventListener("click", mostrarCarrito);
document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);

mostrarProductos();