import prismaMock from "../../singleton";
import categoriesRepositories, { CategoryUpdateData } from "../../repositories/categories";

test("should create new category ", async () => {
    const newCategory = {
        id: "212313212",
        name: "graph",
        postsIDs: [],
        problemsIDs: [],
    };

    prismaMock.category.create.mockResolvedValue(newCategory);

    const category = await categoriesRepositories.create("graph");
    expect(category.name).toBe("graph");
});

test("should list categories", async () => {
    const newCategory = {
        id: "212313212",
        name: "graph",
        postsIDs: [],
        problemsIDs: [],
    };

    prismaMock.category.findMany.mockResolvedValue([newCategory]);

    const categories = await categoriesRepositories.list();
    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe("graph");
});

test("should delete a category", async () => {
    const newCategory = {
        id: "212313212",
        name: "graph",
        postsIDs: [],
        problemsIDs: [],
    };

    prismaMock.category.findMany.mockResolvedValue([newCategory]);

    const categoriesBefore = await categoriesRepositories.list();
    const categoryToDelete = categoriesBefore[0];

    await categoriesRepositories.deleteById(categoryToDelete.id);

    prismaMock.category.findMany.mockResolvedValue([]);

    const categoriesAfter = await categoriesRepositories.list();
    expect(categoriesAfter.length).toBe(0);
});

test("should update a category", async () => {
    const newCategory = {
        id: "212313212",
        name: "graph",
        postsIDs: [],
        problemsIDs: [],
    };

    prismaMock.category.findMany.mockResolvedValue([newCategory]);

    const categoriesBefore = await categoriesRepositories.list();
    const categoryToUpdate = categoriesBefore[0];

    const updatedCategoryName = "UpdatedCategory";
    const updateData: CategoryUpdateData = { name: updatedCategoryName };

    const expectedUpdatedCategory = {
        id: "212313212",
        name: "UpdatedCategory",
        postsIDs: [],
        problemsIDs: [],
    };

    prismaMock.category.update.mockResolvedValue(expectedUpdatedCategory);

    const updatedCategory = await categoriesRepositories.updateById(
        categoryToUpdate.id,
        updateData
    );

    expect(updatedCategory.name).toBe(updatedCategoryName);
});
