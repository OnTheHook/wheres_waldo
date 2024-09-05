const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getCharacterInfo = asyncHandler(async (req, res) => {
  const characters = await prisma.character.findMany();
  res.json({ characters });
});
