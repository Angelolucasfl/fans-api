import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - getAll", () => {
  it("Should return all the artist", async () => {
    const response1 = await testServer.get("/artist").query({
      page: 1,
      limit: 10,
      filter: "test"
    });

    expect(response1.statusCode).toEqual(StatusCodes.OK);
    expect(response1.body).toEqual(expect.any(Object));
  });


  it("Shouldn't be able to pass an incorrect type for the filter", async () => {
    const response1 = await testServer.get("/artist").query({
      page: "test",
      limit: "test",
    });


    expect(response1.body).toHaveProperty("errors.query.page");
    expect(response1.body).toHaveProperty("errors.query.limit");
    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

});