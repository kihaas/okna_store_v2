// База данных товаров (в реальности может загружаться с сервера)
const products = [
    {
        id: 1,
        title: "Окно ПВХ белое",
        type: "plastic",
        color: "white",
        price: 15900,
        image: "images/window-6.jpg",
        description: "Двухкамерный стеклопакет, 70 мм профиль"
    },
    {
        id: 2,
        title: "Окно ПВХ коричневое",
        type: "plastic",
        color: "brown",
        price: 17500,
        image: "images/window-7.jpg",
        description: "Ламинация под дерево, энергосберегающее"
    },
    {
        id: 3,
        title: "Окно деревянное",
        type: "wood",
        color: "brown",
        price: 28900,
        image: "images/window-3.jpg",
        description: "Клееный брус, тройной стеклопакет"
    },
    {
        id: 4,
        title: "Окно алюминиевое",
        type: "aluminum",
        color: "black",
        price: 34500,
        image: "images/window-8.jpg",
        description: "Теплый алюминий, терморазрыв"
    },
    {
        id: 5,
        title: "Окно ПВХ черное",
        type: "plastic",
        color: "black",
        price: 21900,
        image: "images/window-4.png",
        description: "Современный дизайн, 6 камер"
    },
    {
        id: 6,
        title: "Окно деревянное белое",
        type: "wood",
        color: "white",
        price: 31200,
        image: "images/window-5.png",
        description: "Эко-дерево, покраска RAL"
    }
];

// Состояние фильтров
let filters = {
    types: ['plastic', 'wood', 'aluminum'],
    colors: ['white', 'brown', 'black'],
    price: {
        min: 0,
        max: 50000
    }
};

// Функция отображения товаров
function renderProducts() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    // Фильтруем товары
    const filtered = products.filter(product => {
        // Фильтр по типу
        if (!filters.types.includes(product.type)) return false;

        // Фильтр по цвету
        if (!filters.colors.includes(product.color)) return false;

        // Фильтр по цене
        if (product.price < filters.price.min || product.price > filters.price.max) return false;

        return true;
    });

    // Очищаем сетку
    grid.innerHTML = '';

    // Если товаров нет
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-products">По вашему запросу ничего не найдено</div>';
        return;
    }

    // Отображаем товары
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-desc">${product.description}</p>
            <p class="product-price">${product.price.toLocaleString()} ₽</p>
            <button class="product-add" onclick="addToCart(${product.id})">+</button>
        `;
        grid.appendChild(card);
    });
}

// Обработчики фильтров
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();

    // Фильтр по типу
    const typeCheckboxes = document.querySelectorAll('input[name="type"]');
    typeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filters.types = Array.from(document.querySelectorAll('input[name="type"]:checked'))
                .map(cb => cb.value);
            renderProducts();
        });
    });

    // Фильтр по цвету
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filters.colors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
                .map(cb => cb.value);
            renderProducts();
        });
    });

    // Фильтр по цене
    const minSlider = document.getElementById('price-min');
    const maxSlider = document.getElementById('price-max');
    const minSpan = document.getElementById('min-price');
    const maxSpan = document.getElementById('max-price');

    if (minSlider && maxSlider) {
        function updatePriceFilter() {
            let min = parseInt(minSlider.value);
            let max = parseInt(maxSlider.value);

            if (min > max) {
                [min, max] = [max, min];
            }

            filters.price.min = min;
            filters.price.max = max;

            minSpan.textContent = min;
            maxSpan.textContent = max;

            renderProducts();
        }

        minSlider.addEventListener('input', updatePriceFilter);
        maxSlider.addEventListener('input', updatePriceFilter);
    }
});

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`✅ Товар "${product.title}" добавлен в корзину!\nСтоимость: ${product.price.toLocaleString()} ₽`);

        // Здесь можно добавить анимацию или сохранение в localStorage
        // localStorage.setItem('cart', JSON.stringify([...]));
    }
}