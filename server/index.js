const express = require('express');
const bodyParser = require('body-parser');
const goodbye = require('./routes/goodbye.js');
const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use('/goodbye', goodbye);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});