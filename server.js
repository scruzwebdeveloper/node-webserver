const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) =>{
    const now = new Date().toString();
    const log = `logging: ${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {});
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello World</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World',
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Abouts Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404',
    });
});


app.listen(port, () => {
    console.log(`Server is Up on port ${port}`);
});
