const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const page = await prisma.page.findUnique({
    where: { id: "cmr6cdfcd0001tx48o80v22j1" },
  })
  console.log(page)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
