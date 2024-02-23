import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Users - SignUp", () => {
  
  it("Should insert a new user", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "teste",
      email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");
  });

  it("Shouldn't be able to insert a user with duplicate email", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "testeduplicado",
      email: "testesignupduplicado@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");

    const response2 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "testeduplicado",
      email: "testesignupduplicado@gmail.com",
    });

    expect(response2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response2.body).toHaveProperty("errors.default");
  });

  it("Shouldn't be able to insert a user without email", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "teste",
      // email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });

  it("Shouldn't be able to insert a user without nome", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      // nome: "teste",
      email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

  it("Shouldn't be able to insert a user without senha", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      // senha: "123456",
      nome: "teste",
      email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.senha");
  });

  it("Shouldn't be able to insert a user with an invalid email", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "teste",
      email: "testesignup gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });

  it("Shouldn't be able to insert a user with a 0-5 char senha", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "12",
      nome: "teste",
      email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.senha");
  });

  it("Shouldn't be able to insert a user with a 0-2 char nome", async () => {
    const response1 = await testServer.post("/cadastrar").send({
      senha: "123456",
      nome: "te",
      email: "testesignup@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });
});