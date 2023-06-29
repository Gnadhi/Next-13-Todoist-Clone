import seedFrameworks from "./seeds/framework_seed";
import seedIntegrations from "./seeds/integration_seed";
import seedUsers from "./seeds/user_seed";
import { prisma } from "@/utils/prisma";

async function main() {
  await seedUsers();
  await seedIntegrations();
  await seedFrameworks();
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

// ================================== Utilities ===================================
