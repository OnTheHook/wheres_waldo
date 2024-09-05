const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.elapsedTime = asyncHandler(async (req, res) => {
  const userId = req.cookies.userId;

  try {
    const timer = await prisma.timer.findUnique({
      where: { userId: userId },
    });

    if (timer) {
      const currentTime = Date.now();
      const elapsedTime =
        timer.elapsedTime +
        Math.floor((currentTime - timer.startTime.getTime()) / 1000);

      res.json({
        message: "Elapsed time retrieved",
        startTime: timer.startTime,
        elapsedTime: elapsedTime,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "Timer not found for user", error });
  }
});
