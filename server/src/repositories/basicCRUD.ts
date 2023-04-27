import { PrismaClient } from "@prisma/client";

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Function that inserts data into a table
const insertData = async (tableName: string, data: object) => {
  try {
    const newData = await prisma[tableName].create({ data });
    console.log(`Data inserted into ${tableName}: ${JSON.stringify(newData)}`);
  } catch (error) {
    console.error(error);
  }
};

// Function that retrieves data from a table
const retrieveData = async (tableName: string, filter: object) => {
  try {
    const data = await prisma[tableName].findMany({ where: filter });
    console.log(
      `Data retrieved from ${tableName} using filter ${JSON.stringify(filter)}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function that updates data in a table
const updateData = async (tableName: string, id: number, newData: object) => {
  try {
    const updatedData = await prisma[tableName].update({
      where: { id },
      data: newData,
    });
    console.log(
      `Data with id ${id} updated in ${tableName}: ${JSON.stringify(
        updatedData
      )}`
    );
  } catch (error) {
    console.error(error);
  }
};

// Function that deletes data from a table
const deleteData = async (tableName: string, id: number) => {
  try {
    await prisma[tableName].delete({ where: { id } });
    console.log(`Data with id ${id} deleted from ${tableName}`);
  } catch (error) {
    console.error(error);
  }
};

export { insertData, retrieveData, updateData, deleteData };
