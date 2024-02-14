import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - Create", () => {
  it("Should insert a new artist in the application", async () => {
    const response1 = await testServer.post("/artist").send({
      nome: "Nirvana"
    });

    expect(response1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response1.body).toEqual("number");
  });


  it("Shouldn't be able to insert a 0 char name", async () => {
    const response1 = await testServer.post("/artist").send({
      nome: ""
    });

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.body.nome");
  });

});