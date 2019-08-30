const request = require('supertest');
const Shipment = require('../models/shipments');
const app = require('../app');
const mongoose = require('mongoose');

let shipmentOne, shipmentTwo, shipmentThree;
const shipmentOneId = new mongoose.Types.ObjectId();
const shipmentTwoId = new mongoose.Types.ObjectId();
const shipmentThreeId = new mongoose.Types.ObjectId();
shipmentOne = {
  _id: shipmentOneId,
  title: 'My Shipment',
  content: 'Remain for test',
  status: 'Not Shipped Yet',
  assignedTo: ['Muhammad Jasim']
};

shipmentTwo = {
  _id: shipmentTwoId,
  title: 'My 2nd Shipment',
  content: 'Remain for test',
  status: 'Not Shipped Yet',
  assignedTo: []
};

shipmentThree = {
  _id: shipmentThreeId,
  title: 'My 2nd Shipment',
  content: 'Remain for test',
  status: 'Not Shipped Yet',
  assignedTo: []
};

beforeEach(async () => {
  jest.setTimeout(30000);
  await Shipment.deleteMany();
  await new Shipment(shipmentOne).save();
  await new Shipment(shipmentTwo).save();
  await new Shipment(shipmentThree).save();
});

test('Should create shipment', async () => {
  await request(app).post('/api/shipments/')
    .send({
      title: 'Shipment One',
      content: 'Hello ship it!',
      status: 'Not Shipped Yet'
    }).expect(201);
});

test('should get the shipments', async () => {
  jest.setTimeout(30000);
  await request(app).get('/api/shipments/')
    .send().expect(200);
});

test('should get worker shipments', async () => {
  jest.setTimeout(30000);
  await request(app).put('/api/shipments/', shipmentOne.assignedTo[0])
    .send().expect(200);
});

/*test('should assign shipment to worker', async () => {
  jest.setTimeout(30000);
  const shipment = {id: shipmentTwoId , assignedTo: 'Muhammad Jasim'};
  await request(app).put('/api/shipments/' + shipmentTwoId, shipment)
    .send().expect(200);
});*/

test('should find assigned workers on shipments', async () => {
  jest.setTimeout(30000);
  await request(app).get('/api/shipments/' + shipmentOneId)
    .send().expect(200);
});

test('should update the status of shipment', async () => {
  jest.setTimeout(60000);
  await request(app).get('/api/shipments/update/' +shipmentOneId)
    .send().expect(200);
});

test('should delete shipment', async () => {
  jest.setTimeout(30000);
  await request(app)
    .delete('/api/shipments/' +shipmentThreeId)
    .expect(200);
});

test('should not delete shipment which is not created', async () => {
  jest.setTimeout(30000);
  await request(app)
    .delete('/api/shipments/' +'1234')
    .expect(401);
});




