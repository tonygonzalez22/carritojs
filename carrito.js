
const productosDisponibles = [
  { id: 1, nombre: "remera", precio: 20 },
  { id: 2, nombre: "Pantalón", precio: 30 },
  { id: 3, nombre: "Zapatillas", precio: 50 },
  { id: 4, nombre: "Gorra", precio: 10 }
];


let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];


const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const botonVerCarrito = document.getElementById("ver-carrito");


function mostrarProductos() {
  productosDisponibles.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });

 
  document.querySelectorAll(".agregar").forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}


function agregarAlCarrito(event) {
  const idProducto = parseInt(event.target.dataset.id);
  const producto = productosDisponibles.find(p => p.id === idProducto);
  
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    alert(`${producto.nombre} agregado al carrito!`);
  }
}


function mostrarCarrito() {
  contenedorCarrito.innerHTML = ""; 

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>Precio: $${producto.precio}</p>
      <button class="eliminar" data-index="${index}">Eliminar</button>
    `;
    contenedorCarrito.appendChild(div);
  });


  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar Carrito";
  botonVaciar.classList.add("vaciar");
  contenedorCarrito.appendChild(botonVaciar);

 
  document.querySelectorAll(".eliminar").forEach(boton => {
    boton.addEventListener("click", eliminarDelCarrito);
  });

  botonVaciar.addEventListener("click", vaciarCarrito);
}


function eliminarDelCarrito(event) {
  const index = parseInt(event.target.dataset.index);
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
  mostrarCarrito(); 
}


function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito"); 
  mostrarCarrito(); 
}


botonVerCarrito.addEventListener("click", mostrarCarrito);

mostrarProductos();