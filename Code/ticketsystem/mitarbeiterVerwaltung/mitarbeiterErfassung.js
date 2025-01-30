const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const router = express.Router();
router.use(express.json());

// MongoDB connection URI
const uri = "mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}

// Connect to MongoDB
connectToMongoDB().catch(console.dir);

// Define the POST /mitarbeiter route
router.post('/mitarbeiter', async (req, res) => {
    const { vorname, nachname, beitrittsdatum, skilllevel } = req.body;

    // Check if all required fields are provided
    if (!vorname || !nachname || !beitrittsdatum || skilllevel === undefined) {
        return res.status(400).send({ error: 'Alle Felder müssen ausgefüllt werden' });
    }

    // Check if the beitrittsdatum is a valid date
    if (isNaN(Date.parse(beitrittsdatum))) {
        return res.status(400).send({ error: 'Beitrittsdatum muss ein gültiges Datum sein' });
    }

    // Check if the skilllevel is a number between 1 and 5
    if (skilllevel < 1 || skilllevel > 5) {
        return res.status(400).send({ error: 'Skilllevel muss eine Zahl zwischen 1 und 5 sein' });
    }

    // Create a new mitarbeiter object
    const mitarbeiter = {
        vorname,
        nachname,
        beitrittsdatum,
        skilllevel
    };

    try {
        // Insert the new mitarbeiter into the database
        const database = client.db('ticketsystem');
        const collection = database.collection('mitarbeiter');
        await collection.insertOne(mitarbeiter);
        res.status(201).send(mitarbeiter);
    } catch (error) {
        // Handle any errors that occur during the insert operation
        res.status(500).send({ error: 'Fehler beim Speichern des Mitarbeiters' });
    }
});

module.exports = router;