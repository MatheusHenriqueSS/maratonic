const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      email: "bielzinho@do85.com",
      name: "bielzinho rei delas",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
