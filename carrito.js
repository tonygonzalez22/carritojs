
const productosDisponibles = [
    { id: 1, nombre: "remeras", precio: 20 },
    { id: 2, nombre: "Pantalon", precio: 30 },
    { id: 3, nombre: "Zapatilla", precio: 50 },
    { id: 4, nombre: "Gorra", precio: 10 }
  ];
  
  let carrito = []; 
  

  function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach(producto => {
      mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    alert(mensaje);
  }
  
  function agregarProducto() {
    const idProducto = parseInt(prompt("Ingresa el ID del producto que desea agregar al carrito:"));
    const producto = productosDisponibles.find(p => p.id === idProducto);
    
    if (producto) {
      carrito.push(producto);
      alert(`Producto agregado: ${producto.nombre} - $${producto.precio}`);
    } else {
      alert("ID incorrecto. Intentelo de nuevo.");
    }
  }
  

  function calcularTotal() {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    return total;
  }
  

  function simuladorCarrito() {
    alert("Bienvenido al  carrito de compras!");
    let continuar = true;
    
    while (continuar) {
      mostrarProductos();
      agregarProducto();
      
      const opcion = prompt("¿Desea agregar otro producto? (si/no)").toLowerCase();
      if (opcion === "no") {
        continuar = false;
      }
    }
  

    console.log("Productos en tu carrito:");
    carrito.forEach((producto, index) => {
      console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
    console.log("Total a pagar: $" + calcularTotal());
    alert("Gracias por su compra! Revise la consola para ver los detalles del carrito.");
  }
  

  simuladorCarrito();
  