const request = require('supertest');
const app = require('./mitarbeiterErfassung');
const { MongoClient } = require('mongodb');

describe('POST /mitarbeiter', () => {
    let client;
    let db;

    beforeAll(async () => {
        client = new MongoClient("mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await client.connect();
        db = client.db('ticketsystem');
    });

    afterAll(async () => {
        await client.close();
    });

    afterEach(async () => {
        await db.collection('mitarbeiter').deleteMany({ vorname: 'John', nachname: 'Doe' });
    });

    /**
     * Test the happy path where all required fields are provided and valid
     */
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

    /**
     * Test the sad path where required fields are missing
     */
    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/mitarbeiter')
            .send({
                vorname: 'John'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Alle Felder müssen ausgefüllt werden');
    });

    /**
     * Test the sad path where beitrittsdatum is invalid
     */
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

    /**
     * Test the sad path where skilllevel is out of range
     */
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