const express = require('express');

const app = express();
const server = app.listen( process.env.PORT || 3000, () => {
  console.log('listening for requests ');
});

app.use(express.static('public'));
