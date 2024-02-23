import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - Create", () => {
  let accessToken = "";

  beforeAll(async() => {
    const email = "createartist@gmail.com";
    await testServer.post("/cadastrar").send({
      nome: "teste",
      email,
      senha: "123456"
    });
    const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });
    accessToken = signInRes.body.accessToken;
  });

  
  it("Should insert a new artist in the application", async () => {
    const response1 = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: "Nirvana"
    });

    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");
  });

  it("Shouldn't be able to insert a record without access token", async () => {
    const response1 = await testServer.post("/artist").send({
      nome: "Nirvana"
    });

    expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response1.body).toHaveProperty("errors.default");
  });


  it("Shouldn't be able to insert a 0 char name", async () => {
    const response1 = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: ""
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

  it("Shouldn't be able to send a empty body object", async () => {
    const response1 = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` }).send({
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

});