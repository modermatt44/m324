const express = require('express');

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

let tickets = [];
let currentId = 1;

function validateTicket(ticket) {
  if (!ticket.title || !ticket.description || !ticket.status) {
    return false;
  }
  return true;
}

app.post('/tickets', (req, res) => {
  const ticket = req.body;
  if (!validateTicket(ticket)) {
    return res.status(400).json({ error: 'Invalid ticket data' });
  }
  ticket.id = currentId++;
  tickets.push(ticket);
  res.json(ticket);
});