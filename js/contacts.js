document.addEventListener('DOMContentLoaded', function() {
    const contactsForm = document.getElementById('contacts-form');

    if (contactsForm) {
        contactsForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Собираем данные
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Простая валидация
            if (!formData.name || !formData.phone || !formData.message) {
                alert('❌ Пожалуйста, заполните все обязательные поля');
                return;
            }

            // Валидация телефона (простая)
            const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
            if (!phoneRegex.test(formData.phone)) {
                alert('❌ Пожалуйста, введите корректный номер телефона');
                return;
            }

            // Отправка через Formspree (бесплатно)
            // 1. Зарегистрируйся на formspree.io
            // 2. Создай форму и получи её ID
            // 3. Замени 'YOUR_FORM_ID' на настоящий ID

            try {
                // Вариант 1: Через Formspree (рекомендуется)
                // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(formData)
                // });

                // if (response.ok) {
                //     alert('✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                //     contactsForm.reset();
                // } else {
                //     alert('❌ Ошибка при отправке. Попробуйте позже или позвоните нам.');
                // }

                // Вариант 2: Простое уведомление (для теста)
                alert(`✅ Спасибо за сообщение, ${formData.name}!\nМы ответим вам в ближайшее время.`);
                contactsForm.reset();

            } catch (error) {
                console.error('Error:', error);
                alert('❌ Ошибка при отправке. Проверьте подключение к интернету.');
            }
        });
    }

    // Маска для телефона (простая)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = `+7 (${value}`;
                } else if (value.length <= 4) {
                    value = `+7 (${value.substring(0, 3)})`;
                } else if (value.length <= 7) {
                    value = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}`;
                } else {
                    value = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
                }
                e.target.value = value;
            }
        });
    }
});

// Функция для отображения карты (если нужна)
function initMap() {
    // Здесь можно добавить Яндекс.Карты или Google Maps
    console.log('Карта загружена');
}