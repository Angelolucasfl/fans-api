import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Followers - getAll", () => {
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
      .send({ nome: "Nirvana" });

    artistId = resArtist.body;
  });

  it("Should return all the followers", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      email: "exemplegetall@gmail.com",
      ArtistId: artistId, 
      nomeUsuario: "teste"
    });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);

    const response2 = await testServer.get("/follower").set({ Authorization: `Bearer ${accessToken}` }).send();

    expect(Number(response2.header["x-total-count"])).toBeGreaterThan(0);
    expect(response2.statusCode).toEqual(StatusCodes.OK);
    expect(response2.body).toBeDefined();
  });

  it("Shouldn't be able to pass an incorrect type for the query", async () => {
    const response1 = await testServer.get("/follower").set({ Authorization: `Bearer ${accessToken}` }).query({
      page: "test",
      limit: "test",
    });


    expect(response1.body).toHaveProperty("errors.query.page");
    expect(response1.body).toHaveProperty("errors.query.limit");
    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Shouldn't be able to pass 0 as a query parameter", async () => {
    const response1 = await testServer.get("/follower").set({ Authorization: `Bearer ${accessToken}` }).query({
      page: 0,
      limit: 0,
    });


    expect(response1.body).toHaveProperty("errors.query.page");
    expect(response1.body).toHaveProperty("errors.query.limit");
    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

});