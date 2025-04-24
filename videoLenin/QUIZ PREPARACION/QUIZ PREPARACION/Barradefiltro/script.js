// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM
    const equiposGrid = document.getElementById('equiposGrid'); // Contenedor de la vitrina de equipos
    const filterNombre = document.getElementById('filterNombre'); // Campo de filtro por nombre
    const filterPais = document.getElementById('filterPais'); // Campo de filtro por país
    const filterAnio = document.getElementById('filterAnio'); // Campo de filtro por año
    const filterPrecioMin = document.getElementById('filterPrecioMin'); // Campo de filtro por precio mínimo
    const filterPrecioMax = document.getElementById('filterPrecioMax'); // Campo de filtro por precio máximo

    let equipos = []; // Array para almacenar los datos de los equipos

    // Función para cargar los equipos desde el JSON
    async function cargarEquipos() {
        // Hacer una solicitud fetch al archivo JSON
        const response = await fetch('equipos.json');
        // Convertir la respuesta a un objeto JSON
        equipos = await response.json();
        // Mostrar los equipos en la vitrina
        mostrarEquipos(equipos);
    }

    // Función para mostrar los equipos en la vitrina
    function mostrarEquipos(equipos) {
        // Limpiar el contenido actual de la vitrina
        equiposGrid.innerHTML = '';
        // Recorrer cada equipo en el array
        equipos.forEach(equipo => {
            // Crear un div para la tarjeta del equipo
            const equipoCard = document.createElement('div');
            // Asignar la clase 'equipo-card' al div
            equipoCard.className = 'equipo-card';
            // Insertar el contenido HTML de la tarjeta
            equipoCard.innerHTML = `
                <h2>${equipo.nombre}</h2>
                <p><strong>País:</strong> ${equipo.pais}</p>
                <p><strong>Año de Fundación:</strong> ${equipo.añoFundacion}</p>
                <p><strong>Precio:</strong> $${equipo.precio}</p>
                <p><strong>Presidente:</strong> ${equipo.presidente}</p>
            `;
            // Agregar la tarjeta al contenedor de la vitrina
            equiposGrid.appendChild(equipoCard);
        });
    }

    // Función para filtrar los equipos
    function filtrarEquipos() {
        // Obtener los valores de los filtros
        const nombre = filterNombre.value.toLowerCase(); // Convertir a minúsculas para búsqueda insensible a mayúsculas
        const pais = filterPais.value.toLowerCase(); // Convertir a minúsculas para búsqueda insensible a mayúsculas
        const anio = filterAnio.value; // Obtener el valor del filtro de año
        const precioMin = filterPrecioMin.value ? parseFloat(filterPrecioMin.value) : null; // Convertir a número o usar null si está vacío
        const precioMax = filterPrecioMax.value ? parseFloat(filterPrecioMax.value) : null; // Convertir a número o usar null si está vacío

        // Filtrar los equipos según los criterios
        const equiposFiltrados = equipos.filter(equipo => {
            // Verificar si el nombre coincide
            const cumpleNombre = nombre === '' || equipo.nombre.toLowerCase().includes(nombre);
            // Verificar si el país coincide
            const cumplePais = pais === '' || equipo.pais.toLowerCase().includes(pais);
            // Verificar si el año coincide
            const cumpleAnio = anio === '' || equipo.añoFundacion.toString().includes(anio);
            // Verificar si el precio es mayor o igual al mínimo
            const cumplePrecioMin = precioMin === null || equipo.precio >= precioMin;
            // Verificar si el precio es menor o igual al máximo
            const cumplePrecioMax = precioMax === null || equipo.precio <= precioMax;

            // Retornar true si el equipo cumple con todos los filtros
            return cumpleNombre && cumplePais && cumpleAnio && cumplePrecioMin && cumplePrecioMax;
        });

             // Mostrar los equipos filtrados en la vitrina
                mostrarEquipos(equiposFiltrados);
            }
        
            // Event listeners para los filtros
            filterNombre.addEventListener('input', filtrarEquipos); // Filtrar al escribir en el campo de nombre
            filterPais.addEventListener('input', filtrarEquipos); // Filtrar al escribir en el campo de país
            filterAnio.addEventListener('input', filtrarEquipos); // Filtrar al escribir en el campo de año
            filterPrecioMin.addEventListener('input', filtrarEquipos); // Filtrar al escribir en el campo de precio mínimo
            filterPrecioMax.addEventListener('input', filtrarEquipos); // Filtrar al escribir en el campo de precio máximo
        
            // Cargar los equipos al iniciar la página
            cargarEquipos();
        });