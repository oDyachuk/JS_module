//task2
function processProducts(products) {
  // Захист від некоректних даних
  if (!Array.isArray(products)) {
    throw new TypeError('Очікується масив товарів');
  }
 
  // Товари в наявності
  const inStockItems = products.filter(p => p.inStock === true);
 
  // Масив назв доступних товарів
  const available = inStockItems.map(p => p.name);
 
  // Сума цін наявних товарів через reduce
  const totalPrice = inStockItems.reduce((sum, p) => sum + p.price, 0);
 
  // Найдешевший серед наявних (крайній випадок — порожній список)
  let cheapest = null;
  if (inStockItems.length > 0) {
    const cheapestItem = inStockItems.reduce(
      (min, p) => (p.price < min.price ? p : min),
      inStockItems[0]
    );
    cheapest = cheapestItem.name;
  }
 
  // Прайс-лист для всіх товарів
  const priceList = products.map(p => `${p.name} — ${p.price} грн`);
 
  return { available, totalPrice, cheapest, priceList };
}
 
// Приклад
const products = [
  { name: 'Чай',   price: 50,  inStock: true  },
  { name: 'Кава',  price: 120, inStock: false },
  { name: 'Цукор', price: 30,  inStock: true  }
];
 
console.log(processProducts(products));

