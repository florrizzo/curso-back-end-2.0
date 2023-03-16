const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
const persistance = "memory";
/* const persistance = "mongo"; */

let id;
if (persistance == "memory") {
  id = "2";
} else if (persistance == "mongo") {
  id = "641263d2504e06b52815de59";
/*   id = "641265d7999a55026443f2c1";
  id = "641289350b55ace4912177ad";
  id = "641290b832687b24a1304d19";
  id = "641299d017c5bdba68a67dd4"; */
}

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
  describe("GET ONE BY ID", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products/id/" + id);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe("GET ONE BY ID FAIL", () => {
    it("deberia responder con status 200 y ser un string con el mensaje: No se encontró ningún producto", async () => {
      const res = await request.get("/api/products/id/111");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("No se encontró ningún producto");
    });
  });
  describe("GET ONE BY NAME", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products/name/brownie");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe("GET ONE BY NAME FAIL", () => {
    it("deberia responder con status 200 y ser un string con el mensaje: No se encontró ningún producto", async () => {
      const res = await request.get("/api/products/name/test");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("No se encontró ningún producto");
    });
  });
  describe("POST ONE", () => {
    it("deberia responder con status 201 e incorporar un producto", async () => {
      const post = generatePost();
      const res = await request.post("/api/products").send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("_id", "title", "thumbnail", "price");
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
  describe("POST ONE FAIL", () => {
    it("deberia ser un string con el mensaje: No se pudo postear el producto", async () => {
      const res = await request.post("/api/products").send({});
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("No se pudo postear el producto");
    });
  });
  describe("PUT", () => {
    it("deberia responder con status 201 y modificar un producto", async () => {
      const post = generatePost();
      const res = await request
        .put("/api/products/" + id)
        .send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("_id", "title", "thumbnail", "price");
      expect(post.title).to.eql(res.body.title);
    });
  });
  describe("PUT FAIL ID", () => {
    it("deberia ser un string con el mensaje: No se encontró ningún producto", async () => {
      const post = generatePost();
      const res = await request
        .put("/api/products/1111")
        .send(post);
        expect(res.body).to.be.a("string");
        expect(res.body).to.eql("No se encontró ningún producto");
    });
  });
  describe("PUT FAIL POST", () => {
    it("deberia ser un string con el mensaje: No se pudo postear el producto", async () => {
      const post = generatePost();
      const res = await request
        .put("/api/products/" + id)
        .send({});
        expect(res.body).to.be.a("string");
        expect(res.body).to.eql("No se pudo postear el producto");
    });
  });
  describe("DELETE ONE", () => {
    it("deberia responder con status 202, eliminar un producto, y responder con el mensaje: Se eliminó con exito", async () => {
      const res = await request.delete(
        "/api/products/" + id
      );
      expect(res.status).to.eql(202);
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("Se eliminó con exito");
    });
  });
  describe("DELETE ONE FAIL", () => {
    it("deberia responder con el mensaje: No se encontró ningún producto", async () => {
      const res = await request.delete(
        "/api/products/11111"
      );
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("No se encontró ningún producto");
    });
  });
});
