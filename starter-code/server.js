'use strict';
// require your dependencies!
const express = require('express');
const fs = require('fs');

const bodyParser = express.urlencoded({extended: true}); /* eslint-disable-line */ // TODO: remove me when PORT is used
const PORT = process.env.PORT || 3000; /* eslint-disable-line */ // TODO: remove me when PORT is used

const app = express();

// TODONE: use express.static to server the public path!
app.use(express.static('public'));

// TODONE: server new.html under the alias GET /new
// (HINT: use response.sendFile)
app.get('/new', (request, response) => {
  response.sendFile('/new.html');
});

// TODONE: add a app.get for `/api/articles` that returns the
// `data/hackerIpsum.json`
app.get('/api/articles', (request, response) => {
  response.sendFile(`${__dirname}/data/hackerIpsum.json`);
});

// TODONE: server your articles data on GET /api/articles
app.post('/api/articles', bodyParser, (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  const file = 'data/hackerIpsum.json';
  const raw = fs.readFileSync(file);
  const articles = JSON.parse(raw);
  articles.push(request.body);
  fs.writeFileSync(file, JSON.stringify(articles, true, 2));
  // for now just return the body...
  response.send(request.body);

  // STRETCH GOAL: read, change, and write the data file
});

app.listen(3000, () => {
  console.log('working');
});