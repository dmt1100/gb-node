const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const getNews = require('./getNews');

//Connect
mongoose.connect('mongodb://localhost:27017/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userMongoose = require('./models/user');
const passport = require('./passport');

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

//Сессии и авторизация
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'gsdfhsdafgasdfhdsffdsa',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

app.use(passport.initialize);
app.use(passport.session);

//Secure
app.use('/news', passport.mustAuth);

app.get('/', (req, res) => {
    if (req.user && req.user._id) {
        res.render('news', {})        
    } else {
        res.redirect('/auth');
    }
});

app.get('/news', (req, res) => {
    if (req.user && req.user._id) {
        res.render('news', {})        
    } else {
        res.redirect('/auth');
    }
});

app.post('/news', async (req, res) => {
    const newsCount = req.body.news_count;

    try {
        const news = await getNews(newsCount);
        //console.log(news);
        res.render('news', {news: news});
    } catch (error) {
        res.send('Новости недоступны или произошла ошибка!');
        console.log(error);
    }
});

app.get('/registration', (req, res) => {
    res.render('register');
});

app.post('/registration', async (req, res) => {
    const {repassword, ...restBody} = req.body;
    if(restBody.password === repassword){
        const user = new userMongoose(restBody);
        await user.save();
        res.redirect('/auth');
    } else {
        res.redirect('/auth?err=err1');
    }
});

app.get('/auth', (req, res) => {
    const {error} = req.query;
    res.render('auth', {error});
});

//TODO
app.post('/auth', passport.autenticate);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
});

app.listen(4000, () => {
    console.log('Server works on http://localhost:4000/');
});