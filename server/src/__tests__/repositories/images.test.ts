import prismaMock from "../../singleton";
import imagesRepositories, { ImageUpdateData } from "../../repositories/images";
import { randomBytes } from 'crypto'

test("should create new image ", async () => {
    const buf = randomBytes(32);
    const newImage = {
        id: "827419802",
        name: "testImage",
        bytes: buf,
        createdAt: new Date(),
    };

    prismaMock.image.create.mockResolvedValue(newImage);

    const image = await imagesRepositories.create("testImage", buf);
    expect(image.name).toBe("testImage");
    expect(image.bytes).toBe(buf);
});

test("should list images", async () => {
    const buf = randomBytes(32);
    const newImage = {
        id: "827419802",
        name: "testImage",
        bytes: buf,
        createdAt: new Date(),
    };

    prismaMock.image.findMany.mockResolvedValue([newImage]);

    const images = await imagesRepositories.list();
    expect(images.length).toBe(1);
    expect(images[0].name).toBe("testImage");
    expect(images[0].bytes).toBe(buf);
});

test("should delete an image", async () => {
    const buf = randomBytes(32);
    const newImage = {
        id: "827419802",
        name: "testImage",
        bytes: buf,
        createdAt: new Date(),
    };

    prismaMock.image.findMany.mockResolvedValue([newImage]);

    const imagesBefore = await imagesRepositories.list();
    const imageToDelete = imagesBefore[0];

    await imagesRepositories.deleteById(imageToDelete.id);

    prismaMock.image.findMany.mockResolvedValue([]);

    const imagesAfter = await imagesRepositories.list();
    expect(imagesAfter.length).toBe(0);
});

test("should update an image", async () => {
    const buf = randomBytes(32)
    const newImage = {
        id: "827419802",
        name: "testImage",
        bytes: buf,
        createdAt: new Date(),
    };

    prismaMock.image.findMany.mockResolvedValue([newImage]);

    const imagesBefore = await imagesRepositories.list();
    const imageToUpdate = imagesBefore[0];

    const updatedImageName = "UpdatedImage";
    const updatedBuf = randomBytes(32);
    const updateData: ImageUpdateData = { name: updatedImageName };

    const expectedUpdatedImage = {
        id: "827419802",
        name: "UpdatedImage",
        bytes: updatedBuf,
        createdAt: new Date(),
    };

    prismaMock.image.update.mockResolvedValue(expectedUpdatedImage);

    const updatedImage = await imagesRepositories.updateById(
        imageToUpdate.id,
        updateData
    );

    expect(updatedImage.name).toBe(updatedImageName);
});
