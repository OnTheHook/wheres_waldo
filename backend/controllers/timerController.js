exports.elapsedTime = async (req, res) => {
  const userId = req.cookies.userId;

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
  } else {
    res.status(404).json({ message: "Timer not found for user" });
  }
};
