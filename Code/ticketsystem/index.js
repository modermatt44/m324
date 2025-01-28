const express = require('express');
const app = express();

const mitarbeiterErfassung = require('./mitarbeiterVerwaltung/mitarbeiterErfassung');
const mitarbeiterAuslesen = require('./mitarbeiterAuslesen/index');
const ticketErfassung = require('./ticketVerwaltung/index');

app.use(express.json());
app.use(mitarbeiterErfassung);
app.use(mitarbeiterAuslesen);
app.use(ticketErfassung);

app.get('/', (req, res) => {
    res.send('Success!');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});