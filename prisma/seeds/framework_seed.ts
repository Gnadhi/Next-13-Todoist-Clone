import { prisma } from "@/utils/prisma";

/*  ========== FRAMEWORK ========
    name                   String
    description            String
    url                    String
    companies           Company[]
    controls            Control[]
    policies             Policy[] 
    ========== CONTROL ==========
    name        String
    description String
    evidences   Evidence[]
    policies    Policy[]
    frameworkId String?    @map("framework_id")
    Framework   Framework? @relation(fields: [frameworkId], references: [id])
*/
export default async function seedFramworks() {
  await prisma.framework.createMany({
    data: [
      {
        name: "SOC 2",
        description:
          "SOC 2 is a technical audit, but goes beyond that: SOC 2 requires companies to establish and follow strict information security policies and procedures, encompassing the security, availability, processing, integrity, and confidentiality of customer data.",
        url: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html",
        imgUrl: "/frameworks/soc2.png",
      },
      {
        name: "GDPR",
        description:
          "The General Data Protection Regulation (EU) 2016/679 (GDPR) is a regulation in EU law on data protection and privacy in the European Union (EU) and the European Economic Area (EEA).",
        url: "https://gdpr.eu/",
        imgUrl: "/frameworks/gdpr.png",
      },
    ],
    skipDuplicates: true,
  });
}
