//Lesson1
//Node JS

console.log('Hello Node.js!');

//import-export - ES6+, require - CommonJS
const ansi = require('ansi');

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