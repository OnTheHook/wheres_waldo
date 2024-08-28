const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.startGame = async (req, res) => {
  let userId = req.cookies.userId;

  if (!userId) {
    userId = uuidv4(); // Generate a new UUID
    res.cookie("userId", userId, { maxAge: 60 * 60 * 1000, httpOnly: true }); // Expires in 1 hour
  }

  // Check if the user already has a timer record
  let timer = await prisma.timer.findUnique({
    where: { userId: userId },
  });

  if (!timer) {
    // Create a new timer record for the user
    timer = await prisma.timer.create({
      data: {
        userId: userId,
        startTime: new Date(),
        elapsedTime: 0,
      },
    });
  }

  res.json({
    message: "Game started",
    userId: userId,
    startTime: timer.startTime,
  });
};

exports.completeGame = async (req, res) => {
  const userId = req.cookies.userId;
  const currentTime = Date.now();
  const timer = await prisma.timer.findUnique({
    where: { userId: userId },
  });

  if (timer) {
    res.clearCookie("userId");
    res.json({
      message: "Game completed. User ID recycled.",
      clearTime: timer.startTime - currentTime,
    });
  } else {
    res.status(404).json({ message: "Timer not found for user" });
  }
};
