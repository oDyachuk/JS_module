//task1
function summarizeNumbers(numbers) {
  // Захист від некоректного вхідного значення
  if (!Array.isArray(numbers)) {
    throw new TypeError('Очікується масив чисел');
  }
 
  const result = {
    count: numbers.length,
    sum: 0,
    evenCount: 0,
    max: undefined,
    category: 'empty'
  };
 
  // Крайній випадок: порожній масив
  if (numbers.length === 0) {
    return result;
  }
 
  // Початкове значення max — перший елемент
  result.max = numbers[0];
 
  // Основний цикл
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
 
    result.sum += n;
 
    if (n % 2 === 0) {
      result.evenCount += 1;
    }
 
    if (n > result.max) {
      result.max = n;
    }
  }
 
  // Визначення категорії за сумою
  result.category = result.sum > 0 ? 'positive' : 'non-positive';
 
  return result;
}
 
// Приклади виклику
console.log(summarizeNumbers([4, 7, 2, 9]));
// { count: 4, sum: 22, evenCount: 2, max: 9, category: 'positive' }
 
console.log(summarizeNumbers([]));
// { count: 0, sum: 0, evenCount: 0, max: undefined, category: 'empty' }
 
console.log(summarizeNumbers([-5, -3, -2]));
// { count: 3, sum: -10, evenCount: 1, max: -2, category: 'non-positive' }