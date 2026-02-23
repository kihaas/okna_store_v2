// Цены на комплектующие
const PRICES = {
    base: {
        plastic: 8000,
        wood: 15000,
        aluminum: 12000
    },
    perSquareMeter: {
        plastic: 4500,
        wood: 8500,
        aluminum: 7000
    },
    sashes: {
        1: 0,
        2: 2500,
        3: 5000
    },
    glass: {
        1: 0,
        2: 3000,
        3: 5500
    },
    options: {
        mosquito: 1500,
        windowsill: 2000,
        installation: 5000
    }
};

// Функция расчета стоимости
function calculatePrice() {
    // Получаем значения из формы
    const type = document.getElementById('window-type')?.value || 'plastic';
    const width = parseInt(document.getElementById('width')?.value) || 1200;
    const height = parseInt(document.getElementById('height')?.value) || 1400;
    const sashes = parseInt(document.getElementById('sashes')?.value) || 2;
    const glass = parseInt(document.getElementById('glass-type')?.value) || 2;

    // Площадь в м²
    const area = (width * height) / 1000000;

    // Базовая стоимость
    let price = PRICES.base[type] + (area * PRICES.perSquareMeter[type]);

    // Добавляем за створки
    price += PRICES.sashes[sashes] || 0;

    // Добавляем за стеклопакет
    price += PRICES.glass[glass] || 0;

    // Добавляем опции
    if (document.getElementById('mosquito-net')?.checked) {
        price += PRICES.options.mosquito;
    }
    if (document.getElementById('windowsill')?.checked) {
        price += PRICES.options.windowsill;
    }
    if (document.getElementById('installation')?.checked) {
        price += PRICES.options.installation;
    }

    // Округляем до 100 рублей
    price = Math.round(price / 100) * 100;

    return price;
}

// Обновление отображения цены
function updatePrice() {
    const priceElement = document.getElementById('total-price');
    if (priceElement) {
        const price = calculatePrice();
        priceElement.textContent = price.toLocaleString() + ' ₽';
    }
}

// Показ формы заказа
function showOrderForm() {
    const form = document.getElementById('order-form');
    if (form) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Вешаем обработчики на все изменяемые элементы
    const inputs = [
        'window-type', 'width', 'height', 'sashes', 'glass-type',
        'mosquito-net', 'windowsill', 'installation'
    ];

    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updatePrice);
            element.addEventListener('input', updatePrice);
        }
    });

    // Кнопка заказа
    const orderBtn = document.getElementById('order-calc');
    if (orderBtn) {
        orderBtn.addEventListener('click', showOrderForm);
    }

    // Форма контактов
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Собираем данные
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                calculation: {
                    price: calculatePrice(),
                    type: document.getElementById('window-type').value,
                    size: `${document.getElementById('width').value}×${document.getElementById('height').value}`
                }
            };

            // Здесь можно отправить данные на сервер
            // Для примера просто покажем уведомление
            alert(`✅ Спасибо за заявку, ${formData.name}!\nМы свяжемся с вами в ближайшее время.`);

            // Скрываем форму
            document.getElementById('order-form').style.display = 'none';

            // Очищаем форму
            contactForm.reset();
        });
    }

    // Первоначальный расчет
    updatePrice();
});