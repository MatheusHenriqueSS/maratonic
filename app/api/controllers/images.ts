import imagesRepository, { ImageUpdateData } from "../repositories/images";
import { Controller, CRUD } from "./controller";
import { Image } from "@prisma/client";

export default class ImagesController extends Controller {
  public createCRUD(): CRUD {
    return new ImagesCRUD();
  }
}

class ImagesCRUD implements CRUD {
  public create = async (body: any): Promise<Image> => {
    return await imagesRepository.create(body.name, body.bytes);
  };

  public getAll = async (): Promise<Image[]> => {
    return await imagesRepository.list();
  };

  public updateById = async (
    image: ImageUpdateData,
    id: string
  ): Promise<Image> => {
    const imageUpdateData: ImageUpdateData = image;
    return await imagesRepository.updateById(id, imageUpdateData);
  };

  public deleteById = async (id: string): Promise<void> => {
    await imagesRepository.deleteById(id);
  };
}
