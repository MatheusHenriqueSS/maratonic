import prismaMock from "../../singleton";
import problemsRepositories, { ProblemUpdateData } from "../../repositories/problems";

test("should create new problem ", async () => {
    const newProblem = {
        id: "567893214",
        link: "codeproblem.com/problem/1",
        categories: [],
        categoriesIDs: [],
    };

    prismaMock.problem.create.mockResolvedValue(newProblem);

    const problem = await problemsRepositories.create("codeproblem.com/problem/1");
    expect(problem.link).toBe("codeproblem.com/problem/1");
});

test("should list problems", async () => {
    const newProblem = {
        id: "567893214",
        link: "codeproblem.com/problem/1",
        categories: [],
        categoriesIDs: [],
    };

    prismaMock.problem.findMany.mockResolvedValue([newProblem]);

    const problems = await problemsRepositories.list();
    expect(problems.length).toBe(1);
    expect(problems[0].link).toBe("codeproblem.com/problem/1");
});

test("should delete a problem", async () => {
    const newProblem = {
        id: "567893214",
        link: "codeproblem.com/problem/1",
        categories: [],
        categoriesIDs: [],
    };

    prismaMock.problem.findMany.mockResolvedValue([newProblem]);

    const problemsBefore = await problemsRepositories.list();
    const problemToDelete = problemsBefore[0];

    await problemsRepositories.deleteById(problemToDelete.id);

    prismaMock.problem.findMany.mockResolvedValue([]);

    const problemsAfter = await problemsRepositories.list();
    expect(problemsAfter.length).toBe(0);
});

test("should update a problem", async () => {
    const newProblem = {
        id: "567893214",
        link: "codeproblem.com/problem/1",
        categories: [],
        categoriesIDs: [],
    };

    prismaMock.problem.findMany.mockResolvedValue([newProblem]);

    const problemsBefore = await problemsRepositories.list();
    const problemToUpdate = problemsBefore[0];

    const updatedProblemName = "UpdatedProblem";
    const updateData: ProblemUpdateData = { link: updatedProblemName };

    const expectedUpdatedProblem = {
        id: "567893214",
        link: "UpdatedProblem",
        categories: [],
        categoriesIDs: [],
    };

    prismaMock.problem.update.mockResolvedValue(expectedUpdatedProblem);

    const updatedProblem = await problemsRepositories.updateById(
        problemToUpdate.id,
        updateData
    );

    expect(updatedProblem.link).toBe(updatedProblemName);
});
