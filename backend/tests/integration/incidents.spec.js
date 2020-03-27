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

  it('should be able to create a new incident', async () => {
    const ong = await request(app)
    .post('/ongs')
    .send({
      name: "APAD2",
      email: "contato@apad.com",
      whatsapp : "5516991680923",
      city: "Uberlândia",
      uf: "MG"
    });

    const response = await request(app)
    .post('/incidents')
    .set('Authorization', ong.body.id)
    .send({
      title: "Caso teste",
      description: "descrição",
      value : "300"
    });

    expect(response.body).toHaveProperty('id');
  })

  it('should be able to list incidents', async () => {
    const response = await request(app)
    .get('/incidents');

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  })
})