const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [
      { name: "Waldo", xPercent: 55.9, yPercent: 44.1 },
      { name: "Woof", xPercent: 11.5, yPercent: 52.4 },
      { name: "Wilma", xPercent: 75.0, yPercent: 53.6 },
      { name: "Whitebeard", xPercent: 66.6, yPercent: 31.9 },
      { name: "Odlaw", xPercent: 43.8, yPercent: 33.2 },
    ],
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
