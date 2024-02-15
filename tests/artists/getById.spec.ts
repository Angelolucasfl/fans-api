import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"; 

describe("Artist - getById", () => {
  it("Should return one artist based on the id passed", async () => {
    const id = 1;
    const response1 = await testServer.get(`/artist/${id}`);

    expect(response1.statusCode).toEqual(StatusCodes.OK);
    expect(response1.body).toEqual(expect.any(Object));
  });

  it("Shouldn't be able to pass an invalid parameter type", async () => {
    const id1 = "test";
    const id2 = 0;
    const id3 = 1.2;

    const response1 = await testServer.get(`/artist/${id1}`);
    const response2 = await testServer.get(`/artist/${id2}`);
    const response3 = await testServer.get(`/artist/${id3}`);

    expect(response1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response1.body).toHaveProperty("errors.params.id");

    expect(response2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response2.body).toHaveProperty("errors.params.id");

    expect(response3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response3.body).toHaveProperty("errors.params.id");
  });

});