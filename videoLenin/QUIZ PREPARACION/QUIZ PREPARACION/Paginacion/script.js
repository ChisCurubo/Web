document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.getElementById('product-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    let currentPage = 1;
    const productsPerPage = 5;
    let products = [];

    // Función para obtener los productos de la API
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3001/producto/obtenervitrina');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

   // Función para renderizar los productos
function renderProducts() {
    // Calcula el índice inicial de los productos a mostrar en la página actual.
    // `currentPage` es la página actual y `productsPerPage` es la cantidad de productos por página.
    const startIndex = (currentPage - 1) * productsPerPage;

    // Calcula el índice final de los productos a mostrar en la página actual.
    const endIndex = startIndex + productsPerPage;

    // Obtiene un subconjunto de productos desde `startIndex` hasta `endIndex` usando `slice`.
    // `products` es el array que contiene todos los productos.
    const productsToShow = products.slice(startIndex, endIndex);

    // Actualiza el contenido del contenedor de productos (`productGrid`).
    // `productGrid` es un elemento HTML donde se mostrarán los productos.
    productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <!-- Muestra la imagen del producto. Si la imagen no se carga, se usa una imagen de respaldo (placeholder). -->
            <img src="${product.imgProducto}" alt="${product.nombreProducto}" onerror="this.src='https://via.placeholder.com/200';">
            <!-- Muestra el nombre del producto. -->
            <p>${product.nombreProducto}</p>
            <!-- Muestra el precio del producto. -->
            <p class="price">${product.precioProducto}</p>
            <!-- Botón para añadir el producto al carrito. -->
            <button class="add-to-cart">Añadir al carrito</button>
            <!-- Ícono de corazón para marcar el producto como favorito. -->
            <span class="heart-icon">❤️</span>
        </div>
    `).join(''); // Convierte el array de strings en un solo string HTML.

    // Llama a la función `updatePagination` para actualizar la paginación.
    updatePagination();
}
    // Función para actualizar la paginación
    function updatePagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Eventos para los botones de paginación
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    // Inicializar la carga de productos
    fetchProducts();
});