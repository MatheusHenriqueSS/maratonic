import { PrismaClient } from "@prisma/client";
import app from "./routes";

async function main() {
  const prisma = new PrismaClient();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  // Connect to the database
  await prisma.$connect();
}

main()
  .then(() => console.log("Server initialized sucessfully"))
  .catch((err) => console.log(err.message));
