CREATE TABLE t_p41432282_telegram_bulletin_bo.listings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT NOT NULL,
  city TEXT NOT NULL,
  contact TEXT DEFAULT '',
  category TEXT NOT NULL,
  photo TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO t_p41432282_telegram_bulletin_bo.listings (title, description, price, city, contact, category, photo) VALUES
('iPhone 13 Pro, 256 GB', 'Отличное состояние, без царапин. Полный комплект: коробка, зарядка, чехол. Работает без нареканий.', '55 000 ₽', 'Москва', '@ivan_seller', 'electronics', 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop'),
('MacBook Air M2', '2023 год, 8GB RAM, 256GB SSD. Использовался аккуратно, всегда в чехле. Батарея 97%.', '95 000 ₽', 'Санкт-Петербург', '@tech_seller', 'electronics', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop'),
('Наушники Sony WH-1000XM5', 'Беспроводные наушники с шумоподавлением. Использовались 3 месяца. В идеальном состоянии.', '18 000 ₽', 'Казань', '+7 903 123-45-67', 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'),
('Куртка зимняя Moncler', 'Размер M, цвет чёрный. Куплена в официальном магазине, носилась один сезон.', '25 000 ₽', 'Москва', '@fashion_items', 'clothes', 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=300&fit=crop'),
('Кроссовки Nike Air Max 90', 'Размер 42, состояние хорошее. Использовались редко. Оригинал, есть чек.', '6 500 ₽', 'Новосибирск', '@shoes_shop', 'clothes', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'),
('Диван угловой серый', 'Размер 280x180 см. Ткань рогожка, цвет светло-серый. Без дефектов, разбирается.', '30 000 ₽', 'Екатеринбург', '+7 912 456-78-90', 'furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'),
('Обеденный стол дубовый', 'Массив дуба, 120x80 см. Ручная работа, отличное качество. 4 стула в комплекте.', '22 000 ₽', 'Москва', '@furniture_msk', 'furniture', 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&h=300&fit=crop'),
('Toyota Camry 2020', '3.5 л., автомат, пробег 45 000 км. Один владелец, все ТО у дилера. Без ДТП.', '2 800 000 ₽', 'Краснодар', '@auto_krd', 'auto', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'),
('Велосипед горный Trek', '21 скорость, алюминиевая рама 18". Колёса 26". Использовался 2 сезона, в рабочем состоянии.', '12 000 ₽', 'Уфа', '+7 917 234-56-78', 'sport', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop'),
('Коллекция книг по психологии', '15 книг известных авторов: Фрейд, Юнг, Адлер, Берн. Все в хорошем состоянии.', '3 500 ₽', 'Ростов-на-Дону', '@books_rostov', 'other', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'),
('Картина маслом «Закат»', 'Авторская работа, 60x80 см. Масло на холсте. Подписана художником, с сертификатом.', '8 000 ₽', 'Самара', '@art_samara', 'other', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop');
