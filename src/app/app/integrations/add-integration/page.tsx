import Heading from "@/ui/app/Heading";
import SelectIntegrationGrid from "@/ui/app/SelectIntegrationGrid";
import { prisma } from "@/utils/prisma";

export default async function IntegrationPage() {
  const integrationOptions = await prisma.integrationOption.findMany();

  return (
    <>
      <Heading title="" showNavBack />
      <div className="pt-4">
        <SelectIntegrationGrid integrationOptions={integrationOptions} />
      </div>
    </>
  );
}
