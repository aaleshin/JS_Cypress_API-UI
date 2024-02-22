// генератор случайных чисел
export function getRandomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}