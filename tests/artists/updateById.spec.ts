import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - updateById", () => {
  it("Should update one artist based on the id passed", async () => {
    const response1 = await testServer.post("/artist").send({
      nome: "Nirvana"
    });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);

    const response2 = await testServer.put(`/artist/${response1.body}`).send({
      nome: "Nirvana",
    });

    expect(response2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Shouldn't be able to pass an invalid parameter type", async () => {
    const id1 = "test";
    const id2 = 0;
    const id3 = 1.2;

    const response1 = await testServer.put(`/artist/${id1}`);
    const response2 = await testServer.put(`/artist/${id2}`);
    const response3 = await testServer.put(`/artist/${id3}`);

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.params.id");

    expect(response2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response2.body).toHaveProperty("errors.params.id");

    expect(response3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response3.body).toHaveProperty("errors.params.id");
  });

  it("Shouldn't be able to update a 0 char name", async () => {
    const id = 1;
    const response1 = await testServer.put(`/artist/${id}`).send({
      nome: ""
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

  it("Shouldn't be able to send a empty body object", async () => {
    const id = 1;
    const response1 = await testServer.put(`/artist/${id}`).send({
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

  it("Shouldn't be able to access an non existent record", async () => {
    const response1 = await testServer.put("/artist/99999").send({
      nome:"Nirvana"
    });
  
    expect(response1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response1.body).toHaveProperty("errors.default");
  });

});