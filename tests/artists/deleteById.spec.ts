import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - deleteById", () => {
  let accessToken = "";

  beforeAll(async() => {
    const email = "deleteartist@gmail.com";
    await testServer.post("/cadastrar").send({
      nome: "teste",
      email,
      senha: "123456"
    });
    const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });
    accessToken = signInRes.body.accessToken;
  });

  it("Should delete one artist based on the id passed", async () => {
    const response1 = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: "Nirvana"
    });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);

    const response2 = await testServer.delete(`/artist/${response1.body}`).set({ Authorization: `Bearer ${accessToken}` }).send();
    expect(response2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Shouldn't be able to delete without access token", async () => {
    const response1 = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` }).send({
      nome: "Nirvana"
    });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);

    const response2 = await testServer.delete(`/artist/${response1.body}`).send();
    expect(response2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Shouldn't be able to pass an invalid parameter type", async () => {
    const id1 = "test";
    const id2 = 0;
    const id3 = 1.2;

    const response1 = await testServer.delete(`/artist/${id1}`).send().set({ Authorization: `Bearer ${accessToken}` });
    const response2 = await testServer.delete(`/artist/${id2}`).send().set({ Authorization: `Bearer ${accessToken}` });
    const response3 = await testServer.delete(`/artist/${id3}`).send().set({ Authorization: `Bearer ${accessToken}` });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.params.id");

    expect(response2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response2.body).toHaveProperty("errors.params.id");

    expect(response3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response3.body).toHaveProperty("errors.params.id");
  });

  it("Shouldn't be able to delete a non existent record", async () => {
    const response1 = await testServer.delete("/artist/99999").send().set({ Authorization: `Bearer ${accessToken}` });

    expect(response1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response1.body).toHaveProperty("errors.default");
  });
});