// Основной файл с общими функциями

// Обработка кнопок "Добавить" в каталоге
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с плюсом
    const addButtons = document.querySelectorAll('.product-add');

    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Находим родительскую карточку
            const card = this.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const price = card.querySelector('.product-price').textContent;

            // Показываем уведомление
            alert(`Товар "${title}" добавлен в корзину!\nСтоимость: ${price}`);

            // Здесь можно добавить анимацию или отправку данных
        });
    });

    // Обработка кнопки "Уже бегу!"
    const promoBtn = document.querySelector('.promo-btn');
    if (promoBtn) {
        promoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Плавный скролл к каталогу
            document.querySelector('.catalog').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Функция для отправки форм (пригодится позже)
async function sendForm(data, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: 'Ошибка отправки' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}