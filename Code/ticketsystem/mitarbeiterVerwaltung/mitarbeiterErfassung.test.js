const request = require('supertest');
const express = require('express');
const router = require('./mitarbeiterErfassung');
const { MongoClient } = require('mongodb');

describe('POST /mitarbeiter', () => {
    let client;
    let db;
    let app;

    beforeAll(async () => {
        client = new MongoClient("mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await client.connect();
        db = client.db('ticketsystem');

        // Create an Express app and use the router
        app = express();
        app.use(express.json());
        app.use('/', router);
    });

    afterAll(async () => {
        await client.close();
    });

    afterEach(async () => {
        await db.collection('mitarbeiter').deleteMany({ vorname: 'John', nachname: 'Doe' });
    });

    it('should create a new mitarbeiter when all required fields are provided', async () => {
        const response = await request(app)
            .post('/mitarbeiter')
            .send({
                vorname: 'John',
                nachname: 'Doe',
                beitrittsdatum: '2023-01-01',
                skilllevel: 3
            });

        expect(response.status).toBe(201);
        expect(response.body.vorname).toBe('John');
        expect(response.body.nachname).toBe('Doe');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/mitarbeiter')
            .send({
                vorname: 'John'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Alle Felder müssen ausgefüllt werden');
    });

    it('should return 400 if beitrittsdatum is invalid', async () => {
        const response = await request(app)
            .post('/mitarbeiter')
            .send({
                vorname: 'John',
                nachname: 'Doe',
                beitrittsdatum: 'invalid-date',
                skilllevel: 3
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Beitrittsdatum muss ein gültiges Datum sein');
    });

    it('should return 400 if skilllevel is out of range', async () => {
        const response = await request(app)
            .post('/mitarbeiter')
            .send({
                vorname: 'John',
                nachname: 'Doe',
                beitrittsdatum: '2023-01-01',
                skilllevel: 6
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Skilllevel muss eine Zahl zwischen 1 und 5 sein');
    });
});