const guardarEnStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

function obtenerDeStorage(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
}

