import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Users - SignIn", () => {
  beforeAll(async() => {
    await testServer.post("/cadastrar")
      .send({
        nome: "Teste",
        senha: "123456",
        email: "examplesignin@gmail.com",
      });
  });

  
  it("Should login a user", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "examplesignin@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.OK);
    expect(response1.body).toHaveProperty("accessToken");
  });

  it("Shouldn't be able to login with incorrect senha", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123123123",
      email: "examplesignin@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response1.body).toHaveProperty("errors.default");
  });

  it("Shouldn't be able to login with incorrect email", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "exampleeee@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response1.body).toHaveProperty("errors.default");
  });

  it("Shouldn't be able to pass an invalid email", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123456",
      email: "examplesignin @gmail . com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });

  it("Shouldn't be able to pass a 0-5 char senha", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123",
      email: "examplesignin@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.senha");
  });

  it("Shouldn't be able to login without senha", async () => {
    const response1 = await testServer.post("/entrar").send({
      // senha: "123456",
      email: "examplesignin@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.senha");
  });

  it("Shouldn't be able to login without email", async () => {
    const response1 = await testServer.post("/entrar").send({
      senha: "123456",
      // email: "examplesignin@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });
});