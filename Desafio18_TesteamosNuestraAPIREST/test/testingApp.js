const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;

const generatePost = () => {
  return {
    title: faker.internet.userName(),
    thumbnail: faker.image.food(),
    price: faker.commerce.price(100, 100000),
  };
};

describe("test all endpoints", () => {
  describe("GET ALL", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe('POST ONE', () => {
    it('deberia incorporar un posteo', async () => {
      const post = generatePost();
      const res = await request.post('/api/products').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('_id', 'title', 'thumbnail', 'price');
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
  describe('PUT', () => {
    it('deberia modificar un posteo', async () => {
      const post = generatePost();
      const res = await request.put('/api/products/641253fa4d9d489b51047748').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('_id', 'title', 'thumbnail', 'price');
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
  describe('DELETE ONE', () => {
    it('deberia eliminar un posteo', async () => {
      const res = await request.delete('/api/products/641254ca4f00a1b0b4aaa36d');
      expect(res.status).to.eql(202);
    });
  });
});
