document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");
    const ticketContainer = document.getElementById("ticket");
    const errorContainer = document.createElement("div");
    errorContainer.id = "error-message";
    checkoutForm.prepend(errorContainer);

    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        errorContainer.textContent = "";
        errorContainer.classList.remove("error");

        try {
            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const direccion = document.getElementById("direccion").value.trim();
            const metodoPago = document.getElementById("metodo-pago").value;

            if (!nombre || !telefono || !direccion) {
                throw new Error("Todos los campos son obligatorios");
            }

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            if (carrito.length === 0) {
                throw new Error("El carrito está vacío. Agrega productos antes de continuar.");
            }

            let subtotal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
            const envio = 3000;
            let descuentoRecargo = 0;

            if (metodoPago === "efectivo") {
                descuentoRecargo = -subtotal * 0.1; // Descuento del 10%
            } else if (metodoPago === "tarjeta") {
                descuentoRecargo = subtotal * 0.1; // Recargo del 10%
            }

            let total = subtotal + descuentoRecargo + envio;

            // Generar la lista de productos comprados
            let productosHTML = carrito.map(prod => 
                `<li>${prod.nombre} - ${prod.cantidad} x $${prod.precio.toFixed(2)} = $${(prod.precio * prod.cantidad).toFixed(2)}</li>`
            ).join("");

            // Mostrar el ticket detallado
            ticketContainer.innerHTML = `
                <div class="ticket-box">
                    <h2>¡Compra Exitosa!</h2>
                    <p>Gracias, <strong>${nombre}</strong>, por tu compra.</p>
                    <p><strong>Teléfono:</strong> ${telefono}</p>
                    <p><strong>Dirección de envío:</strong> ${direccion}</p>
                    <p><strong>Método de pago:</strong> ${metodoPago}</p>
                    <h3>Resumen de compra:</h3>
                    <ul>${productosHTML}</ul>
                    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                    <p><strong>${metodoPago === "efectivo" ? "Descuento" : "Recargo"}:</strong> $${descuentoRecargo.toFixed(2)}</p>
                    <p><strong>Costo de envío:</strong> $${envio.toFixed(2)}</p>
                    <p class="total"><strong>Total a pagar:</strong> $${total.toFixed(2)}</p>
                    <p class="thanks">¡Esperamos verte pronto!</p>
                </div>
            `;
            ticketContainer.classList.remove("hidden");
            localStorage.removeItem("carrito");
        } catch (error) {
            errorContainer.textContent = error.message;
            errorContainer.classList.add("error");
        } finally {
            checkoutForm.reset();
        }
    });
});
