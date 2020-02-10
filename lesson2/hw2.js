const readline = require('readline');

const resourse = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Введите 1 (орел), 2 (решка) или exit(e) (выход)')

resourse.on('line', (cmd) => {

    if(cmd === 'e' || cmd === 'exit'){
        resourse.close();
    } else {
        let rand = Math.floor(Math.random() * 2 + 1); //1 или 2
        if (cmd == rand) {
            console.log('ДА! Вы угадали!');
        } else {
            console.log('НЕТ! Вы не угадали!');
        }
        console.log('Ваш выбор: ', cmd);
        console.log('Выбор компьютера: ', rand);
    }
    
});