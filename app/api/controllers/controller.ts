import { NextApiRequest, NextApiResponse } from "next";

interface IdQuery {
  id: string;
}

export abstract class Controller {
  public abstract createCRUD(): CRUD;

  public async requestHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const crud = this.createCRUD();

    if (req.method === "POST" && crud.create) {
      try {
        const objectCreated = await crud.create(req.body);
        res.status(201).json(objectCreated);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }

    if (req.method === "GET" && crud.getAll) {
      try {
        const results = await crud.getAll();
        res.status(200).json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }

    if (req.method === "PUT" && crud.updateById) {
      try {
        const { id } = req.query as unknown as IdQuery;
        const post = crud.updateById(req.body, id);
        res.status(200).json(post);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }

    if (req.method === "DELETE" && crud.deleteById) {
      try {
        const { id } = req.query as unknown as IdQuery;
        await crud.deleteById(id);
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }

    res.status(405).end(); // Method Not Allowed
  }
}

export interface CRUD {
  create?(body: any): Promise<any>;
  getAll?(): Promise<any>;
  updateById?(object: any, id: string): Promise<any>;
  deleteById?(id: string): Promise<void>;
}
