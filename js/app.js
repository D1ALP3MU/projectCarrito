// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    // Cuando agregas un curso cuando presionas "Agregar al Carrito"
    listaCursos.addEventListener("click", agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


// Funciones
function agregarCurso(evento) {
    evento.preventDefault()

    if ( evento.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = evento.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina un curso del carrito
function eliminarCurso(evento) {
    if ( evento.target.classList.contains("borrar-curso") ) {
        const cursoId =  evento.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Leer el contenido HTML al que le dimos click y extraer la información del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito e compras en el HTML3
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorrer el carrito y generar el HTML
    articulosCarrito.forEach( curso => {
        // Aplicando destructuring para optimizar el código
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;  

        // Agregar el HTML al carrito en el tbody.
        contenedorCarrito.appendChild(row);

    });

}


// Elimina los cursos del tbody
function limpiarHTML() {

    // Forma Lenta
    //contenedorCarrito.innerHTML = "";  


    // Forma rápida
    while( contenedorCarrito.firstChild ) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}