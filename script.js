document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productList = document.getElementById('product-list');

    // Base de datos de productos
    const products = [
        { category: "Cereales y derivados", name: "Arroz", stores: [] },
        { category: "Cereales y derivados", name: "Pan (marraqueta)", stores: [] },
        { category: "Cereales y derivados", name: "Fideos (pasta)", stores: [] },
        { category: "Legumbres", name: "Porotos (frijoles)", stores: [] },
        { category: "Legumbres", name: "Lentejas", stores: [] },
        { category: "Legumbres", name: "Garbanzos", stores: [] },
        { category: "Proteínas", name: "Carne de vacuno", stores: [] },
        { category: "Proteínas", name: "Pollo", stores: [] },
        { category: "Proteínas", name: "Pescado (merluza, jurel)", stores: [] },
        { category: "Proteínas", name: "Huevos", stores: [] },
        { category: "Lácteos", name: "Leche", stores: [] },
        { category: "Lácteos", name: "Queso", stores: [] },
        { category: "Lácteos", name: "Yogur", stores: [] },
        { category: "Lácteos", name: "Crema tradicional", stores: [] },
        { category: "Lácteos", name: "Crema de coco", stores: [] },
        { category: "Frutas y verduras", name: "Tomates", stores: [] },
        { category: "Frutas y verduras", name: "Papas", stores: [] },
        { category: "Frutas y verduras", name: "Limones", stores: [] },
        { category: "Frutas y verduras", name: "Paltas", stores: [] },
        { category: "Frutas y verduras", name: "Cebollas", stores: [] },
        { category: "Frutas y verduras", name: "Zanahorias", stores: [] },
        { category: "Frutas y verduras", name: "Manzanas", stores: [] },
        { category: "Frutas y verduras", name: "Plátanos", stores: [] },
        { category: "Grasas y aceites", name: "Aceite vegetal", stores: [] },
        { category: "Grasas y aceites", name: "Mantequilla", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Azúcar", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Endulzante", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Miel", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Curry", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Pimienta", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Comino", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Orégano", stores: [] },
        { category: "Azúcares, endulzantes y aliños", name: "Sal", stores: [] },
        { category: "Bebidas", name: "Jugo", stores: [] },
        { category: "Bebidas", name: "Bebida", stores: [] },
        { category: "Bebidas", name: "Agua Mineral", stores: [] },
        { category: "Higiene personal", name: "Jabón", stores: [] },
        { category: "Higiene personal", name: "Champú", stores: [] },
        { category: "Higiene personal", name: "Pasta dental", stores: [] },
        { category: "Higiene personal", name: "Papel higiénico", stores: [] },
        { category: "Higiene personal", name: "Toallas higiénicas", stores: [] },
        { category: "Higiene personal", name: "Detergente", stores: [] },
        { category: "Higiene personal", name: "Cloro", stores: [] },
        { category: "Higiene personal", name: "Desinfectantes", stores: [] },
        { category: "Productos de uso común", name: "Fósforos o encendedores", stores: [] },
        { category: "Productos de uso común", name: "Velas", stores: [] }
    ];

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        displayProducts(filteredProducts);
    });

    function displayProducts(productsToShow) {
        productList.innerHTML = '';
        
        if (productsToShow.length === 0) {
            productList.innerHTML = '<li class="product-item">No se encontraron productos.</li>';
            return;
        }

        productsToShow.forEach(product => {
            const li = document.createElement('li');
            li.classList.add('product-item');
            
            let storesHtml = '';
            if (product.stores.length > 0) {
                product.stores.sort((a, b) => a.price - b.price);
                storesHtml = product.stores.map(store => `
                    <div class="store-item">
                        <strong>${store.name}</strong> - $${store.price.toFixed(2)} - ${store.brand}
                    </div>
                `).join('');
            } else {
                storesHtml = '<p>No hay información de tiendas para este producto.</p>';
            }

            li.innerHTML = `
                <strong>${product.name}</strong> (${product.category})
                <br>
                ${storesHtml}
                <div class="input-group">
                    <input type="text" placeholder="Nombre de la tienda" id="store-${product.name}">
                    <input type="number" placeholder="Precio" id="price-${product.name}">
                    <input type="text" placeholder="Marca/Calidad" id="brand-${product.name}">
                    <button onclick="addStore('${product.name}')">Agregar tienda</button>
                </div>
            `;
            productList.appendChild(li);
        });
    }

    window.addStore = function(productName) {
        const storeName = document.getElementById(`store-${productName}`).value;
        const price = parseFloat(document.getElementById(`price-${productName}`).value);
        const brand = document.getElementById(`brand-${productName}`).value;

        if (!storeName || isNaN(price) || !brand) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        const product = products.find(p => p.name === productName);
        if (product) {
            product.stores.push({ name: storeName, price: price, brand: brand });
            alert(`Información agregada para ${productName} en ${storeName}`);
            displayProducts(products);
        }
    }

    // Mostrar todos los productos al cargar la página
    displayProducts(products);
});