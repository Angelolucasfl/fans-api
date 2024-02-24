import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Follower - getById", () => {
  let accessToken = "";

  beforeAll(async() => {
    const email = "createfollower@gmail.com";
    await testServer.post("/cadastrar").send({
      nome: "teste",
      email,
      senha: "123456"
    });
    const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });
    accessToken = signInRes.body.accessToken;
  });

  let artistId: number | undefined = undefined;
  beforeAll(async() => {
    const resArtist = await testServer.post("/artist").set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "teste" });

    artistId = resArtist.body;
  });


  it("Should fetch one follower based on the id passed", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` })
      .send({
        ArtistId: artistId,
        email: "examplegetbyid@gmail.com",
        nomeUsuario: "teste",
      });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    

    const response2 = await testServer.get(`/follower/${response1.body}`).set({ Authorization: `Bearer ${accessToken}` }).send();
    
    expect(response2.statusCode).toEqual(StatusCodes.OK);
    expect(response2.body).toHaveProperty("nomeUsuario");
  });


  it("Shouldn't be able to pass an invalid parameter type", async () => {
    const id1 = "test";
    const id2 = 0;
    const id3 = 1.2;

    const response1 = await testServer.delete(`/follower/${id1}`).send().set({ Authorization: `Bearer ${accessToken}` });
    const response2 = await testServer.delete(`/follower/${id2}`).send().set({ Authorization: `Bearer ${accessToken}` });
    const response3 = await testServer.delete(`/follower/${id3}`).send().set({ Authorization: `Bearer ${accessToken}` });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.params.id");

    expect(response2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response2.body).toHaveProperty("errors.params.id");

    expect(response3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response3.body).toHaveProperty("errors.params.id");
  });

  it("Shouldn't be able to delete a non existent record", async () => {
    const response1 = await testServer.delete("/follower/99999").set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(response1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response1.body).toHaveProperty("errors.default");
  });
});