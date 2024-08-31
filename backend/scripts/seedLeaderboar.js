const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const leaderboardEntries = Array.from({ length: 10 }, () => ({
    username: "ABC",
    score: 99999,
  }));

  // Seed the Leaderboard table with entries
  await prisma.leaderboard.createMany({
    data: leaderboardEntries,
  });

  console.log("Leaderboard table seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
