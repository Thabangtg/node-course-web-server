const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();

  let log = `Current Time: ${now}  Method: ${req.method} Url: ${req.url}`;

  fs.appendFile('server.log', log + '\n' , (err) => {
    if (err) {
      console.log('Unable to append to server.log file');
    }
  });

  console.log('Server log file created.');

  next();
});

app.use((req, res, next) => {

  res.render ('maintenance.hbs');

});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to your first visit on Node.js App'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad Request Sent.'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port:${port}`);
});
