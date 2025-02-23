document.addEventListener("DOMContentLoaded", () => {
    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
            localStorage.setItem("productos", JSON.stringify(data));
        })
        .catch(error => console.error("Error al cargar productos:", error));
});
