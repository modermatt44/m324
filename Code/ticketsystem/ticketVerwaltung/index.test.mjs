import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import app from './index.js'; // Adjust the path if necessary

describe('Ticket Management API', function() {
  this.timeout(10000); // Set timeout to 10 seconds

  let client;
  let db;
  let ticketsCollection;
  let mitarbeiterCollection;

  before(async function() {
    this.timeout(30000); // Set timeout to 30 seconds for the before hook
    client = new MongoClient('mongodb+srv://admin:TxCOKizlfdVuIwj8@cluster0.7yj62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      serverSelectionTimeoutMS: 30000 // Increase server selection timeout
    });
    await client.connect();
    db = client.db('ticketsystem');
    ticketsCollection = db.collection('tickets');
    mitarbeiterCollection = db.collection('mitarbeiter');
  });

  after(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await ticketsCollection.deleteMany({});
    await mitarbeiterCollection.deleteMany({});
  });

  describe('GET /tickets', () => {
    it('should retrieve all tickets', async () => {
      await ticketsCollection.insertMany([
        { title: 'Ticket 1', description: 'Description 1', status: 'open', priority: 'low', mitarbeiter: new ObjectId() },
        { title: 'Ticket 2', description: 'Description 2', status: 'in progress', priority: 'medium', mitarbeiter: new ObjectId() }
      ]);

      const res = await request(app).get('/tickets');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf(2);
    });
  });

  describe('POST /ticket', () => {
    it('should create a new ticket', async () => {
      const mitarbeiterId = new ObjectId();
      await mitarbeiterCollection.insertOne({ _id: mitarbeiterId, name: 'Mitarbeiter 1' });

      const res = await request(app)
        .post('/ticket')
        .send({
          title: 'New Ticket',
          description: 'New Description',
          status: 'open',
          priority: 'high',
          mitarbeiter: mitarbeiterId.toString()
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        title: 'New Ticket',
        description: 'New Description',
        status: 'open',
        priority: 'high',
        mitarbeiter: mitarbeiterId.toString()
      });
    });

    it('should return an error if required fields are missing', async () => {
      const res = await request(app).post('/ticket').send({});
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Missing fields: title, description, status, priority, and mitarbeiter are required.');
    });
  });

  describe('PATCH /ticket/:id', () => {
    it('should update the ticket status and set dates correctly', async () => {
      const mitarbeiterId = new ObjectId();
      await mitarbeiterCollection.insertOne({ _id: mitarbeiterId, name: 'Mitarbeiter 1' });

      const ticketId = new ObjectId();
      await ticketsCollection.insertOne({
        _id: ticketId,
        title: 'Ticket 1',
        description: 'Description 1',
        status: 'in progress',
        priority: 'low',
        mitarbeiter: mitarbeiterId
      });

      const res = await request(app)
        .patch(`/ticket/${ticketId.toString()}`)
        .send({ status: 'review' });

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('review');
      expect(res.body.setToReviewDate).to.exist;
    });

    it('should return an error if the status transition is invalid', async () => {
      const mitarbeiterId = new ObjectId();
      await mitarbeiterCollection.insertOne({ _id: mitarbeiterId, name: 'Mitarbeiter 1' });

      const ticketId = new ObjectId();
      await ticketsCollection.insertOne({
        _id: ticketId,
        title: 'Ticket 1',
        description: 'Description 1',
        status: 'open',
        priority: 'low',
        mitarbeiter: mitarbeiterId
      });

      const res = await request(app)
        .patch(`/ticket/${ticketId.toString()}`)
        .send({ status: 'done' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Cannot set status to done without being in review.');
    });
  });
});