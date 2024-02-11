import { Request, Response } from "express";


interface IArtist {
  nome: string;
}

export const create = (req: Request<{}, {}, IArtist>, res: Response) => {
  const data = req.body;
  console.log(data);

  return res.send("created");
};