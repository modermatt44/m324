const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const router = express.Router();
router.use(express.json());

// Connection config to the MongoDB Atlas cluster
const uri = "mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    router.get('/tickets', async (req, res) => {
      try {
        const database = client.db('ticketsystem');
        const collection = database.collection('tickets');
        const tickets = await collection.find({}).toArray();
        res.send(tickets);
      } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve tickets' });
      }
    });

    router.post('/ticket', async (req, res) => {
      try {
        const { title, description, status, priority, mitarbeiter } = req.body;
        const allowedStatuses = ['open', 'in progress', 'review', 'done'];
        if (!title || !description || !status || !priority || !mitarbeiter) {
          return res.status(400).send({ error: 'Missing fields: title, description, status, priority, and mitarbeiter are required.' });
        }
        if (!allowedStatuses.includes(status)) {
          return res.status(400).send({ error: 'Invalid status. Allowed statuses are: open, in progress, review, done.' });
        }
        const database = client.db('ticketsystem');
        const mitarbeiterCollection = database.collection('mitarbeiter');
        const mitarbeiterExists = await mitarbeiterCollection.findOne({ _id: new ObjectId(mitarbeiter) });
        if (!mitarbeiterExists) {
          return res.status(400).send({ error: 'Invalid mitarbeiter. Please provide a valid mitarbeiter ID.' });
        }
        const collection = database.collection('tickets');
        const newTicket = {
          title,
          description,
          status,
          priority,
          mitarbeiter
        };
        const result = await collection.insertOne(newTicket);
        newTicket.id = result.insertedId;
        res.send(newTicket);
      } catch (error) {
        res.status(500).send({ error: 'Failed to create ticket. Please try again later.' });
      }
    });

    router.patch('/ticket/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { status, mitarbeiter } = req.body;
        const allowedStatuses = ['open', 'in progress', 'review', 'done'];
        const database = client.db('ticketsystem');
        const collection = database.collection('tickets');
        const ticket = await collection.findOne({ _id: new ObjectId(id) });
        if (!ticket) {
          return res.status(404).send({ error: 'Ticket not found. Please provide a valid ticket ID.' });
        }
        if (status && !allowedStatuses.includes(status)) {
          return res.status(400).send({ error: 'Invalid status. Allowed statuses are: open, in progress, review, done.' });
        }
        if (mitarbeiter) {
          const mitarbeiterCollection = database.collection('mitarbeiter');
          const mitarbeiterExists = await mitarbeiterCollection.findOne({ _id: new ObjectId(mitarbeiter) });
          if (!mitarbeiterExists) {
            return res.status(400).send({ error: 'Invalid mitarbeiter. Please provide a valid mitarbeiter ID.' });
          }
          ticket.mitarbeiter = mitarbeiter;
        }
        if (status && status !== ticket.status) {
          if (status === 'review' && ticket.status !== 'in progress') {
            return res.status(400).send({ error: 'Cannot set status to review without being in progress.' });
          }
          if (status === 'done' && ticket.status !== 'review') {
            return res.status(400).send({ error: 'Cannot set status to done without being in review.' });
          }
          ticket.status = status;
          if (status === 'review') {
            ticket.setToReviewDate = new Date();
          } else if (status === 'done') {
            ticket.doneDate = new Date();
          }
        }
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: ticket });
        res.send(ticket);
      } catch (error) {
        res.status(500).send({ error: 'Failed to update ticket. Please try again later.' });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

module.exports = router;