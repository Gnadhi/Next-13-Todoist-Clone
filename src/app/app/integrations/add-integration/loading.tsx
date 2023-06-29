import Heading from "@/ui/app/Heading";
import { prisma } from "@/utils/prisma";

export default async function IntegrationPage() {
  const integrationOptions = await prisma.integrationOption.findMany();

  return (
    <>
      <Heading title="" showNavBack />
      <div className="pt-4">Loading ...</div>
    </>
  );
}
