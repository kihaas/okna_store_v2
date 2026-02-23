// Хранилище данных (в реальности здесь будет API)
let orders = [
    {
        id: 1,
        date: '2024-01-15',
        name: 'Иван Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@mail.ru',
        service: 'замер',
        status: 'new'
    },
    {
        id: 2,
        date: '2024-01-15',
        name: 'Елена Сидорова',
        phone: '+7 (999) 765-43-21',
        email: 'elena@mail.ru',
        service: 'установка',
        status: 'in-progress'
    },
    {
        id: 3,
        date: '2024-01-14',
        name: 'Алексей Иванов',
        phone: '+7 (999) 555-66-77',
        email: 'alex@mail.ru',
        service: 'доставка',
        status: 'completed'
    }
];

let products = [
    {
        id: 1,
        title: 'Окно ПВХ белое',
        type: 'plastic',
        color: 'white',
        price: 15900,
        desc: 'Двухкамерный стеклопакет',
        image: 'images/window-1.jpg'
    },
    {
        id: 2,
        title: 'Окно ПВХ коричневое',
        type: 'plastic',
        color: 'brown',
        price: 17500,
        desc: 'Ламинация под дерево',
        image: 'images/window-2.jpg'
    },
    {
        id: 3,
        title: 'Окно деревянное',
        type: 'wood',
        color: 'brown',
        price: 28900,
        desc: 'Клееный брус',
        image: 'images/window-3.jpg'
    }
];

// Проверка авторизации
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Выход из админки
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Переключение секций
function showSection(section) {
    // Скрываем все секции
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');

    // Показываем нужную
    document.getElementById(`${section}-section`).style.display = 'block';

    // Обновляем заголовок
    const titles = {
        'dashboard': 'Дашборд',
        'orders': 'Управление заявками',
        'windows': 'Управление товарами',
        'stats': 'Статистика',
        'settings': 'Настройки сайта'
    };
    document.getElementById('current-section').textContent = titles[section];

    // Обновляем активный пункт меню
    document.querySelectorAll('.admin-nav-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    // Загружаем данные для секции
    if (section === 'dashboard') loadDashboard();
    if (section === 'orders') loadOrders();
    if (section === 'windows') loadProducts();
    if (section === 'stats') loadStats();
}

// Загрузка дашборда
function loadDashboard() {
    // Обновляем статистику
    document.getElementById('today-orders').textContent =
        orders.filter(o => o.date === '2024-01-15').length;
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('total-products').textContent = products.length;

    // Загружаем последние заявки
    const tbody = document.querySelector('#recent-orders-table tbody');
    tbody.innerHTML = '';

    orders.slice(0, 5).forEach(order => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${order.date}</td>
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${order.service}</td>
            <td><span class="status-badge">${getStatusText(order.status)}</span></td>
        `;
    });
}

// Загрузка всех заявок
function loadOrders() {
    const tbody = document.querySelector('#all-orders-table tbody');
    tbody.innerHTML = '';

    orders.forEach(order => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${order.email || '-'}</td>
            <td>${order.service}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="new" ${order.status === 'new' ? 'selected' : ''}>Новая</option>
                    <option value="in-progress" ${order.status === 'in-progress' ? 'selected' : ''}>В работе</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Завершена</option>
                </select>
            </td>
            <td>
                <button class="action-btn edit-btn" onclick="editOrder(${order.id})">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteOrder(${order.id})">🗑️</button>
            </td>
        `;
    });
}

// Загрузка товаров
function loadProducts() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="../${product.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
            <td>${product.title}</td>
            <td>${getTypeText(product.type)}</td>
            <td>${getColorText(product.color)}</td>
            <td>${product.price.toLocaleString()} ₽</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">🗑️</button>
            </td>
        `;
    });
}

// Загрузка статистики
function loadStats() {
    // Данные для графика
    const ctx = document.getElementById('stats-chart').getContext('2d');

    // Группируем заявки по дням
    const dates = [...new Set(orders.map(o => o.date))].sort();
    const counts = dates.map(date =>
        orders.filter(o => o.date === date).length
    );

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Количество заявок',
                data: counts,
                borderColor: '#46B2FF',
                backgroundColor: 'rgba(70, 178, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Вспомогательные функции
function getStatusText(status) {
    const statuses = {
        'new': 'Новая',
        'in-progress': 'В работе',
        'completed': 'Завершена'
    };
    return statuses[status] || status;
}

function getTypeText(type) {
    const types = {
        'plastic': 'Пластиковое',
        'wood': 'Деревянное',
        'aluminum': 'Алюминиевое'
    };
    return types[type] || type;
}

function getColorText(color) {
    const colors = {
        'white': 'Белый',
        'brown': 'Коричневый',
        'black': 'Чёрный'
    };
    return colors[color] || color;
}

// CRUD операции для товаров
function openAddProductModal() {
    document.getElementById('modal-title').textContent = 'Добавить товар';
    document.getElementById('product-id').value = '';
    document.getElementById('product-title').value = '';
    document.getElementById('product-type').value = 'plastic';
    document.getElementById('product-color').value = 'white';
    document.getElementById('product-price').value = '';
    document.getElementById('product-desc').value = '';
    document.getElementById('product-image').value = 'images/window-1.jpg';
    document.getElementById('product-modal').classList.add('active');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('modal-title').textContent = 'Редактировать товар';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-type').value = product.type;
        document.getElementById('product-color').value = product.color;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-desc').value = product.desc || '';
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-modal').classList.add('active');
    }
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function saveProduct(event) {
    event.preventDefault();

    const product = {
        id: document.getElementById('product-id').value || Date.now(),
        title: document.getElementById('product-title').value,
        type: document.getElementById('product-type').value,
        color: document.getElementById('product-color').value,
        price: parseInt(document.getElementById('product-price').value),
        desc: document.getElementById('product-desc').value,
        image: document.getElementById('product-image').value
    };

    if (document.getElementById('product-id').value) {
        // Обновляем существующий
        const index = products.findIndex(p => p.id == product.id);
        if (index !== -1) products[index] = product;
    } else {
        // Добавляем новый
        products.push(product);
    }

    closeProductModal();
    loadProducts();
    alert('✅ Товар сохранен!');
}

function deleteProduct(id) {
    if (confirm('Вы уверены, что хотите удалить товар?')) {
        products = products.filter(p => p.id !== id);
        loadProducts();
    }
}

// CRUD для заявок
function updateOrderStatus(id, status) {
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        loadOrders();
    }
}

function deleteOrder(id) {
    if (confirm('Вы уверены, что хотите удалить заявку?')) {
        orders = orders.filter(o => o.id !== id);
        loadOrders();
        loadDashboard();
    }
}

// Сохранение настроек
function saveSettings(event) {
    event.preventDefault();
    alert('✅ Настройки сохранены!');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboard();
});