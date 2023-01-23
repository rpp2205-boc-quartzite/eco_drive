/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 8080;
const app = express();
// eslint-disable-next-line object-curly-newline
app.use(bodyParser.json());
// app.use('/', express.static(path.join(__dirname, '../index.html')));
// app.use('/', express.static(path.join('public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
// eslint-disable-next-line eol-last
module.exports = server;