const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTopScores = asyncHandler(async (req, res) => {
  const topScores = await prisma.leaderboard.findMany({
    orderBy: {
      score: "asc",
    },
    take: 10,
  });

  res.json({ topScores });
});

exports.insertTopScore = asyncHandler(async (req, res) => {
  const { score, user } = req.body;

  if (!score || !user) {
    return res.json({ message: "No user and/or score" });
  }

  const topScore = await prisma.leaderboard.create({
    data: {
      score: score,
      username: user,
    },
  });

  res.json({ message: "Top score inserted" });
});
