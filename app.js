const amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido (no espacios en blanco).");
        return;
    }
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        //-Boton para eliminar los nombres de los participantes-//
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        btnEliminar.style.marginLeft = "10px";
        
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos participantes.");
        return;
    }

    let asignados = [...amigos];
    let resultado = [];
    
    amigos.forEach(amigo => {
        let posibles = asignados.filter(a => a !== amigo);
        
        if (posibles.length === 0) {
            return sortearAmigo();
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultado.push(`${amigo} → ${elegido}`);
        asignados = asignados.filter(a => a !== elegido);
    });

    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const lista = document.getElementById("resultado");
    lista.innerHTML = "";
    
    resultado.forEach(par => {
        const li = document.createElement("li");
        li.textContent = par;
        lista.appendChild(li);
    });
}
