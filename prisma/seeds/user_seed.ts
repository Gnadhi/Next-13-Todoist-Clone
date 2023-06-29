import { prisma } from "@/utils/prisma";
import { faker } from "@faker-js/faker";
import { Role } from "@prisma/client";

type userSchema = {
  name?: string;
  email?: string;
  emailVerified?: Date | null;
  imgUrl?: string;
  role?: Role;
  companyId?: string;
};

export default async function seedUsers() {
  // Create company one which is reserved for me and Ashish
  // NOTE: for now all new users are just added to this company
  await prisma.company.create({
    data: {
      id: "1",
      domain: "RegTech",
      name: "Ashish and Karl INC.",
      users: {
        create: fakeUsers(
          [
            { name: "Ashish", email: "ashish.2017@hotmail.com" },
            { name: "Karl", email: "K" },
          ],
          10
        ),
      },
      frameworks: {
        create: [
          {
            name: "ISO 27001",
            description:
              "ISO 27001 is an international standard for an information security management system (ISMS). It is the most widely used ISMS standard in the world, with over 1 million certificates issued to organizations in 170 countries.",
            url: "https://www.iso.org/isoiec-27001-information-security.html",
            imgUrl: "/frameworks/iso_27001.png",
            policies: {
              create: [
                {
                  name: "Policy 1",
                  description: "Policy 1 description",
                  controls: {
                    create: [
                      {
                        name: "Control 1",
                        description: "Control 1 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 1 - Evidence 1",
                              description: "Evidence 1 description",
                            },

                            {
                              name: "Control 1 -Evidence 2",
                              description: "Evidence 2 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 2",
                  description: "Policy 2 description",
                  controls: {
                    create: [
                      {
                        name: "Control 2",
                        description: "Control 2 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 2 - Evidence 1",
                              description: "Evidence 2 description",
                            },
                            {
                              name: "Control 2 -Evidence 2",
                              description: "Evidence 2 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 3",
                  description: "Policy 3 description",
                  controls: {
                    create: [
                      {
                        name: "Control 3",
                        description: "Control 3 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 3 - Evidence 1",
                              description: "Evidence 3 description",
                            },
                            {
                              name: "Control 3 -Evidence 2",
                              description: "Evidence 3 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 4",
                  description: "Policy 4 description",
                  controls: {
                    create: [
                      {
                        name: "Control 4",
                        description: "Control 4 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 4 - Evidence 1",
                              description: "Evidence 4 description",
                            },
                            {
                              name: "Control 4 -Evidence 2",
                              description: "Evidence 4 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: "Cyber Essentials",
            description:
              "Cyber Essentials is a government-backed, industry-supported scheme to help organisations protect themselves against common online threats. It provides a straightforward framework to protect against, reduce the impact of, and manage the risk of a cyber attack.",
            imgUrl: "/frameworks/cyber_essentials.png",
            url: "https://www.cyberessentials.ncsc.gov.uk/",
            policies: {
              create: [
                {
                  name: "Policy 1",
                  description: "Policy 1 description",
                  controls: {
                    create: [
                      {
                        name: "Control 1",
                        description: "Control 1 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 1 - Evidence 1",
                              description: "Evidence 1 description",
                            },
                            {
                              name: "Control 1 -Evidence 2",
                              description: "Evidence 2 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 2",
                  description: "Policy 2 description",
                  controls: {
                    create: [
                      {
                        name: "Control 2",
                        description: "Control 2 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 2 - Evidence 1",
                              description: "Evidence 2 description",
                            },
                            {
                              name: "Control 2 -Evidence 2",
                              description: "Evidence 2 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 3",
                  description: "Policy 3 description",
                  controls: {
                    create: [
                      {
                        name: "Control 3",
                        description: "Control 3 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 3 - Evidence 1",
                              description: "Evidence 3 description",
                            },
                            {
                              name: "Control 3 -Evidence 2",
                              description: "Evidence 3 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  name: "Policy 4",
                  description: "Policy 4 description",
                  controls: {
                    create: [
                      {
                        name: "Control 4",
                        description: "Control 4 description",
                        evidences: {
                          create: [
                            {
                              name: "Control 4 - Evidence 1",
                              description: "Evidence 4 description",
                            },
                            {
                              name: "Control 4 -Evidence 2",
                              description: "Evidence 4 description",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      users: true,
      frameworks: true,
    },
  });
}

function fakeUsers(users: userSchema[], padding?: number): userSchema[] {
  const data: userSchema[] = [];
  const fakeImgUrl = faker.image.imageUrl;

  users.forEach((user) => {
    const { name, email, emailVerified, imgUrl, role, companyId } = user;
    data.push({
      name: name || faker.name.fullName(),
      email: email || faker.internet.email(),
      emailVerified,
      imgUrl: imgUrl || fakeImgUrl(undefined, undefined, undefined, true),
      role,
      companyId, // "1" is our company
    });
  });

  padding &&
    padding > users.length &&
    Array(padding - users.length)
      .fill(null)
      .forEach(() => {
        data.push({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          imgUrl: faker.image.imageUrl(undefined, undefined, undefined, true),
          role: Role.EMPLOYEE,
        });
      });

  // cleaning undefined values
  data.forEach((datum) => {
    Object.keys(datum).forEach((key) => {
      const key2 = key as keyof typeof datum;
      if (datum[key2] === undefined) delete datum[key2];
    });
  });

  return data;
}
