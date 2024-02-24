import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Follower - Create", () => {
  let accessToken = "";

  beforeAll(async() => {
    const email = "createfollower@gmail.com";
    await testServer.post("/cadastrar").set({ Authorization: `Bearer ${accessToken}` }).send({
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

  it("Should insert a new follower in the application", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` })
      .send({
        ArtistId: artistId,
        email: "exampleupdate@gmail.com",
        nomeUsuario: "teste",
      });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");
  });

  it("Shouldn't insert a new follower without the access token", async () => {
    const response1 = await testServer.post("/follower")
      .send({
        ArtistId: artistId,
        email: "exampleupdate@gmail.com",
        nomeUsuario: "teste",
      });
    expect(response1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response1.body).toHaveProperty("errors.default");
  });

  it("Shouldn't be able to create an account with a duplicate email", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` })
      .send({
        ArtistId: artistId,
        email: "exampleduplicado@gmail.com",
        nomeUsuario: "teste",
      });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");

    const response2 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` })
      .send({
        ArtistId: artistId,
        email: "exampleduplicado@gmail.com",
        nomeUsuario: "teste duplicado",
      });
    expect(response2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response2.body).toHaveProperty("errors.default");
  });

  it("Shouldn't be able to insert a 0-2 char nomeUsuario", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      ArtistId: artistId,
      email: "example@gmail.com",
      nomeUsuario: "ju"
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nomeUsuario");
  });

  it("Shouldn't be able to send a body with no nomeUsuario", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      ArtistId: artistId,
      email: "example@gmail.com",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nomeUsuario");
  });

  it("Shouldn't be able to send a body with no email", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      ArtistId: artistId,
      nomeUsuario: "teste",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });

  it("Shouldn't be able to send a body with an invalid email", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      ArtistId: artistId,
      email: "examp le@ gmail.co",
      nomeUsuario: "teste",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
  });

  it("Shouldn't be able to send a body with no artistId", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      email: "example@gmail.com",
      nomeUsuario: "teste",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.ArtistId");
  });

  it("Shouldn't be able to send a body with an invalid artistId", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
      artistId: "teste",
      email: "example@gmail.com",
      nomeUsuario: "teste",
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.ArtistId");
  });

  it("Shouldn't be able to send a body with no property", async () => {
    const response1 = await testServer.post("/follower").set({ Authorization: `Bearer ${accessToken}` }).send({
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.email");
    expect(response1.body).toHaveProperty("errors.body.nomeUsuario");
    expect(response1.body).toHaveProperty("errors.body.ArtistId");
  });

});