var request = require('request');
var cheerio = require('cheerio');

function getNews (count) {
	return new Promise ((resolve, reject) => {
		request('https://ria.ru/economy/', function (error, response, html) {
			
			let data = [];
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);

				$('.list-item__content').each(function(i, elem) {
                    if (i < count) {
                        data.push({
                            title : $(elem).text(),
                            link : $(elem).find('a').attr('href')
                        })
                    }                    
                });
                
				resolve(data);	
			} else {
				reject(error)
			}
		});
	})
}

module.exports = getNews;