import imagesRepository, { ImageUpdateData } from "../repositories/images";
import { Controller, CRUD } from "./controller";
import { Image } from "@prisma/client"

class ImagesController extends Controller {
  public createCRUD(): CRUD {
    return new ImagesCRUD();
  }
}

class ImagesCRUD implements CRUD {
  public create = async (
    body: any
  ): Promise<Image> => {
      const { name, bytes } = body;
      return await imagesRepository.create(name, bytes);
  };

  public getAll = async (): Promise<Image[]> => {
      return await imagesRepository.list();
  };

  public updateById = async (
    image: ImageUpdateData, id: string
  ): Promise<Image> => {
      const imageUpdateData: ImageUpdateData = image;
      return await imagesRepository.updateById(id, imageUpdateData);
  };

  public deleteById = async (
    id: string
  ): Promise<void> => {
    await imagesRepository.deleteById(id);
  };
}

const imagesController = new ImagesController();

export default imagesController;
