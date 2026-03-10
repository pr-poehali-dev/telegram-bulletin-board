import { useState } from "react";
import Icon from "@/components/ui/icon";

type Category = {
  id: string;
  name: string;
  emoji: string;
};

type Listing = {
  id: string;
  title: string;
  description: string;
  price: string;
  city: string;
  contact: string;
  category: string;
  photo: string;
};

const CATEGORIES: Category[] = [
  { id: "electronics", name: "Электроника", emoji: "📱" },
  { id: "clothes", name: "Одежда", emoji: "👗" },
  { id: "furniture", name: "Мебель", emoji: "🛋️" },
  { id: "auto", name: "Авто", emoji: "🚗" },
  { id: "sport", name: "Спорт", emoji: "⚽" },
  { id: "other", name: "Другое", emoji: "📦" },
];

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "iPhone 13 Pro, 256 GB",
    description: "Отличное состояние, без царапин. Полный комплект: коробка, зарядка, чехол. Работает без нареканий.",
    price: "55 000 ₽",
    city: "Москва",
    contact: "@ivan_seller",
    category: "electronics",
    photo: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "MacBook Air M2",
    description: "2023 год, 8GB RAM, 256GB SSD. Использовался аккуратно, всегда в чехле. Батарея 97%.",
    price: "95 000 ₽",
    city: "Санкт-Петербург",
    contact: "@tech_seller",
    category: "electronics",
    photo: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Наушники Sony WH-1000XM5",
    description: "Беспроводные наушники с шумоподавлением. Использовались 3 месяца. В идеальном состоянии.",
    price: "18 000 ₽",
    city: "Казань",
    contact: "+7 903 123-45-67",
    category: "electronics",
    photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Куртка зимняя Moncler",
    description: "Размер M, цвет чёрный. Куплена в официальном магазине, носилась один сезон.",
    price: "25 000 ₽",
    city: "Москва",
    contact: "@fashion_items",
    category: "clothes",
    photo: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Кроссовки Nike Air Max 90",
    description: "Размер 42, состояние хорошее. Использовались редко. Оригинал, есть чек.",
    price: "6 500 ₽",
    city: "Новосибирск",
    contact: "@shoes_shop",
    category: "clothes",
    photo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Диван угловой серый",
    description: "Размер 280x180 см. Ткань рогожка, цвет светло-серый. Без дефектов, разбирается.",
    price: "30 000 ₽",
    city: "Екатеринбург",
    contact: "+7 912 456-78-90",
    category: "furniture",
    photo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    title: "Обеденный стол дубовый",
    description: "Массив дуба, 120x80 см. Ручная работа, отличное качество. 4 стула в комплекте.",
    price: "22 000 ₽",
    city: "Москва",
    contact: "@furniture_msk",
    category: "furniture",
    photo: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    title: "Toyota Camry 2020",
    description: "3.5 л., автомат, пробег 45 000 км. Один владелец, все ТО у дилера. Без ДТП.",
    price: "2 800 000 ₽",
    city: "Краснодар",
    contact: "@auto_krd",
    category: "auto",
    photo: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    title: "Велосипед горный Trek",
    description: "21 скорость, алюминиевая рама 18\". Колёса 26\". Использовался 2 сезона, в рабочем состоянии.",
    price: "12 000 ₽",
    city: "Уфа",
    contact: "+7 917 234-56-78",
    category: "sport",
    photo: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    title: "Коллекция книг по психологии",
    description: "15 книг известных авторов: Фрейд, Юнг, Адлер, Берн. Все в хорошем состоянии.",
    price: "3 500 ₽",
    city: "Ростов-на-Дону",
    contact: "@books_rostov",
    category: "other",
    photo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    title: "Картина маслом «Закат»",
    description: "Авторская работа, 60x80 см. Масло на холсте. Подписана художником, с сертификатом.",
    price: "8 000 ₽",
    city: "Самара",
    contact: "@art_samara",
    category: "other",
    photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
];

type Screen = "home" | "catalog" | "listing" | "add";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    contact: "",
    category: "",
    photo: "",
  });

  const cities = Array.from(new Set(listings.map((l) => l.city))).sort();

  const filteredListings = listings.filter((l) => {
    const matchCategory = l.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCity = filterCity === "" || l.city === filterCity;
    const priceNum = parseInt(l.price.replace(/\D/g, ""), 10);
    const matchPrice = filterPriceMax === "" || priceNum <= parseInt(filterPriceMax, 10);
    return matchCategory && matchSearch && matchCity && matchPrice;
  });

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery("");
    setFilterCity("");
    setFilterPriceMax("");
    setScreen("catalog");
  };

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setScreen("listing");
  };

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.city || !form.category) return;
    const newListing: Listing = {
      id: Date.now().toString(),
      ...form,
      photo:
        form.photo ||
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
    };
    setListings((prev) => [newListing, ...prev]);
    setForm({ title: "", description: "", price: "", city: "", contact: "", category: "", photo: "" });
    setSelectedCategory(newListing.category);
    setSearchQuery("");
    setFilterCity("");
    setFilterPriceMax("");
    setScreen("catalog");
  };

  const goBack = () => {
    if (screen === "listing") setScreen("catalog");
    else if (screen === "catalog") setScreen("home");
    else if (screen === "add") setScreen("home");
  };

  const catName = CATEGORIES.find((c) => c.id === selectedCategory)?.name;
  const catEmoji = CATEGORIES.find((c) => c.id === selectedCategory)?.emoji;

  return (
    <div className="min-h-screen bg-background font-sans max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          {screen !== "home" && (
            <button
              onClick={goBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors active:scale-90"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-semibold tracking-wide text-foreground uppercase truncate">
              {screen === "home" && "🏪 Барахолка"}
              {screen === "catalog" && `${catEmoji} ${catName}`}
              {screen === "listing" && "Объявление"}
              {screen === "add" && "Новое объявление"}
            </h1>
          </div>
          {screen === "home" && (
            <button
              onClick={() => setScreen("add")}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium transition-transform active:scale-95"
            >
              <Icon name="Plus" size={15} />
              Добавить
            </button>
          )}
        </div>
      </header>

      {/* Screen: Home */}
      {screen === "home" && (
        <div className="px-4 py-5 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">Выберите категорию</p>

          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="animate-fade-in opacity-0 card-hover bg-white border border-border rounded-2xl p-4 flex flex-col items-start gap-2 text-left shadow-sm hover:border-primary hover:shadow-md transition-all"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">{cat.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {listings.filter((l) => l.category === cat.id).length} объявл.
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-5 bg-primary/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Объявлений</p>
              <p className="font-display text-2xl font-bold text-primary">{listings.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Городов</p>
              <p className="font-display text-2xl font-bold text-primary">{cities.length}</p>
            </div>
            <button
              onClick={() => setScreen("add")}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Icon name="PlusCircle" size={16} />
              Подать
            </button>
          </div>
        </div>
      )}

      {/* Screen: Catalog */}
      {screen === "catalog" && (
        <div className="pb-6 animate-fade-in">
          <div className="px-4 pt-4 space-y-2.5">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  <Icon name="X" size={13} />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="flex-1 py-2.5 px-3 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="">Все города</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="До ₽"
                value={filterPriceMax}
                onChange={(e) => setFilterPriceMax(e.target.value)}
                className="w-28 py-2.5 px-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {(filterCity || filterPriceMax || searchQuery) && (
              <button
                onClick={() => { setFilterCity(""); setFilterPriceMax(""); setSearchQuery(""); }}
                className="text-xs text-primary flex items-center gap-1 py-0.5"
              >
                <Icon name="X" size={11} />
                Сбросить фильтры
              </button>
            )}
          </div>

          <div className="px-4 mt-3 mb-2">
            <p className="text-xs text-muted-foreground">
              {filteredListings.length === 0 ? "Ничего не найдено" : `${filteredListings.length} объявлений`}
            </p>
          </div>

          <div className="px-4 space-y-3">
            {filteredListings.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleListingClick(item)}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-fade-in opacity-0 card-hover w-full bg-white border border-border rounded-2xl overflow-hidden flex text-left shadow-sm hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-[108px] h-[100px] flex-shrink-0 bg-muted overflow-hidden">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
                <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Icon name="MapPin" size={10} />
                      {item.city}
                    </p>
                  </div>
                  <p className="font-display font-bold text-primary text-base">{item.price}</p>
                </div>
              </button>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <span className="text-5xl mb-3">🔍</span>
              <p className="font-semibold text-foreground">Ничего не нашли</p>
              <p className="text-sm text-muted-foreground mt-1">Попробуйте другие фильтры или поисковый запрос</p>
            </div>
          )}
        </div>
      )}

      {/* Screen: Listing Detail */}
      {screen === "listing" && selectedListing && (
        <div className="animate-fade-in">
          <div className="w-full h-56 bg-muted overflow-hidden">
            <img
              src={selectedListing.photo}
              alt={selectedListing.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
            />
          </div>
          <div className="px-4 py-5 space-y-4">
            <div>
              <p className="font-display font-bold text-primary text-2xl">{selectedListing.price}</p>
              <h2 className="font-semibold text-foreground text-lg leading-snug mt-1">{selectedListing.title}</h2>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="MapPin" size={13} />
                {selectedListing.city}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Tag" size={13} />
                {CATEGORIES.find((c) => c.id === selectedListing.category)?.name}
              </span>
            </div>

            <div className="bg-muted rounded-2xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Описание</p>
              <p className="text-sm text-foreground leading-relaxed">{selectedListing.description}</p>
            </div>

            <div className="bg-muted rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Контакт</p>
                <p className="text-sm font-medium text-foreground">{selectedListing.contact}</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border">
                <Icon name="User" size={18} className="text-muted-foreground" />
              </div>
            </div>

            {selectedListing.contact.startsWith("@") ? (
              <a
                href={`https://t.me/${selectedListing.contact.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform"
              >
                <Icon name="Send" size={18} />
                Написать в Telegram
              </a>
            ) : (
              <a
                href={`tel:${selectedListing.contact}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform"
              >
                <Icon name="Phone" size={18} />
                Позвонить продавцу
              </a>
            )}
          </div>
        </div>
      )}

      {/* Screen: Add Listing */}
      {screen === "add" && (
        <div className="px-4 py-5 animate-fade-in pb-10 space-y-4">
          <p className="text-sm text-muted-foreground">Заполните поля чтобы разместить объявление</p>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Название *</label>
            <input
              type="text"
              placeholder="Например: iPhone 13 Pro"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Описание</label>
            <textarea
              placeholder="Состояние, характеристики, комплектация..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Цена *</label>
              <input
                type="text"
                placeholder="5 000 ₽"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Город *</label>
              <input
                type="text"
                placeholder="Москва"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Категория *</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="">Выберите категорию</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Контакт</label>
            <input
              type="text"
              placeholder="@username или +7 999 123-45-67"
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Ссылка на фото</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1.5">Оставьте пустым — будет стандартное фото</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.title || !form.price || !form.city || !form.category}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Icon name="CheckCircle" size={20} />
            Разместить объявление
          </button>
        </div>
      )}

      {/* Bottom nav — only on home */}
      {screen === "home" && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border px-6 py-2 flex justify-around z-50">
          <button className="flex flex-col items-center gap-0.5 py-1 text-primary">
            <Icon name="LayoutGrid" size={20} />
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          <button
            onClick={() => setScreen("add")}
            className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground"
          >
            <Icon name="PlusCircle" size={20} />
            <span className="text-[10px] font-medium">Добавить</span>
          </button>
        </nav>
      )}
    </div>
  );
}
