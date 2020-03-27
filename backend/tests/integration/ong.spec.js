const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD2",
      email: "contato@apad.com",
      whatsapp : "5516991680923",
      city: "Uberlândia",
      uf: "MG"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })

  it('should be able to list NGOs', async () => {
    const response = await request(app)
    .get('/ongs');

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  })
})