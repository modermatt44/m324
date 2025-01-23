import request from 'supertest';
import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import app from './index.js'; // Adjust the path as

describe('Ticket System API', function() {
  let client;
  let db;

  before(async function() {
    this.timeout(10000);
    client = new MongoClient('mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('ticketsystem');
  });

  after(async function() {
    await client.close();
  });

  describe('GET /tickets', function() {
    it('should return all tickets', async function() {
      const res = await request(app).get('/tickets');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /ticket', function() {
    it('should create a new ticket', async function() {
      const newTicket = {
        title: 'Test Ticket',
        description: 'Test Description',
        status: 'open',
        priority: 'high',
        mitarbeiter: '679241c07eea107e4b369897' // Example ObjectId
      };
      const res = await request(app).post('/ticket').send(newTicket);
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal(newTicket.title);
    });

    // it('should handle missing fields', async function() {
    //   const newTicket = {
    //     title: 'Test Ticket',
    //     description: 'Test Description',
    //     status: 'open'
    //   };
    //   const res = await request(app).post('/ticket').send(newTicket);
    //   expect(res.status).to.equal(400);
    //   expect(res.body.error).to.equal('Missing fields: title, description, status, priority, and mitarbeiter are required.');
    // });
  });

  describe('PATCH /ticket/:id', function() {
    it('should update a ticket', async function() {
      const updateData = { status: 'in progress' };
      const res = await request(app).patch('/ticket/679236e32f385eb8b15effb3').send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(updateData.status);
    });

    it('should handle invalid status', async function() {
      const updateData = { status: 'invalid status' };
      const res = await request(app).patch('/ticket/679236e32f385eb8b15effb3').send(updateData);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid status. Allowed statuses are: open, in progress, review, done.');
    });
  });

  describe('GET /', function() {
    it('should return Hello World', async function() {
      const res = await request(app).get('/');
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Hello World!');
    });
  });
});