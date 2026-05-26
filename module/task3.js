//task3
function createApiClient(baseUrl) {
  // Приватні змінні (захищені замиканням)
  let requestCount = 0;
 
  return {
    /**
     * Виконує GET-запит і повертає розпарсений JSON.
     * У разі помилки повертає { error: 'Запит не вдався' }.
     */
    async get(path) {
      requestCount += 1; // лічильник інкрементується на КОЖНОМУ виклику
 
      try {
        const response = await fetch(baseUrl + path);
 
        if (!response.ok) {
          // HTTP-помилка (404, 500 тощо)
          return { error: 'Запит не вдався' };
        }
 
        const data = await response.json();
        return data;
      } catch (err) {
        // Помилка мережі / парсингу JSON
        return { error: 'Запит не вдався' };
      }
    },
 
    /** Повертає поточне значення лічильника. */
    getRequestCount() {
      return requestCount;
    }
  };
}
 
// Приклад використання
(async () => {
  const api = createApiClient('https://jsonplaceholder.typicode.com');
 
  const user  = await api.get('/users/1');
  const posts = await api.get('/posts');
 
  console.log('Користувач:', user);
  console.log('Кількість постів:', posts.length);
  console.log('Зроблено запитів:', api.getRequestCount()); // 2
})();
