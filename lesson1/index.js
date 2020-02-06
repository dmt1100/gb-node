//Lesson1
//Node JS

console.log('Hello Node.js!');

//import-export - ES6+, require - CommonJS
const ansi = require('ansi');
//подключаем colors
const colors = require('colors');

//Создаем курсор
const cursor = ansi(process.stdout);

cursor
.white() //Color
.bg.green() //Background
.write('Hello world!')
.reset()
.bg.reset()
.write('\n');

//добавляем еще одну надпись
cursor
.red()
.bg.blue()
.write('Hello world!')
.reset()
.bg.reset()
.write('\n');

//используем библиотеку colors
console.log('\tHello world!'.rainbow);
console.log('\t\tHello world!'.underline.green);
colors.setTheme({
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });
console.log('\tHello world!'.debug);

//проверка по умолчанию
console.log('Hello Node.js');
