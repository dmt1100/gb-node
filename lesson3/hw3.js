const http = require('http');
const request = require('request');
const cheerio = require('cheerio');

function onRequest(req, res) {
    
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf8'
    });
    
    request('https://ria.ru/economy/', (err, response, body) => {
        if(!err && response.statusCode === 200){
            let data = [];

            const $ = cheerio.load(body);
        
            $('.list-item__content').each((i, elem) => {
                data.push({
                    title : $(elem).text(),
                    link : $(elem).find('a').attr('href')
                });
            });
            console.log(data);
        
            res.write(JSON.stringify(data));
            res.end();
        }
    });
}

http.createServer(onRequest).listen(4000);
console.log('Сервер запущен: http://localhost:4000/');