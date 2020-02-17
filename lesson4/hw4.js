const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

//Для шаблонизатора
const consolidate = require('consolidate');
const path = require('path');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

//For JSON
app.use(express.json());
//For forms - POST
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    
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
            res.render('news', {news: data});
                      
        }
      
    });
});

app.listen(4000, () => {
    console.log('Server works on http://localhost:4000/');
});