const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getCharacterInfo = async (req, res) => {
  const characters = await prisma.character.findMany();
  res.json({ characters });
};
