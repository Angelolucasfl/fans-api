import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - getAll", () => {
  it("Should return all the artist", async () => {
    const response1 = await testServer.post("/artist").send({
      nome: "Nirvana"
    });
    expect(response1.statusCode).toEqual(StatusCodes.CREATED);

    const response2 = await testServer.get("/artist").send();

    expect(Number(response2.header["x-total-count"])).toBeGreaterThan(0);
    expect(response2.statusCode).toEqual(StatusCodes.OK);
    expect(response2.body).toBeDefined();
  });


  it("Shouldn't be able to pass an incorrect type for the query", async () => {
    const response1 = await testServer.get("/artist").query({
      page: "test",
      limit: "test",
    });


    expect(response1.body).toHaveProperty("errors.query.page");
    expect(response1.body).toHaveProperty("errors.query.limit");
    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("Shouldn't be able to pass 0 as a query parameter", async () => {
    const response1 = await testServer.get("/artist").query({
      page: 0,
      limit: 0,
    });


    expect(response1.body).toHaveProperty("errors.query.page");
    expect(response1.body).toHaveProperty("errors.query.limit");
    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

});