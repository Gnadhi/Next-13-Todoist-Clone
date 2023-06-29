import { prisma } from "@/utils/prisma";

export default async function seedIntegrations() {
  await prisma.integrationOption.createMany({
    data: [
      {
        name: "Slack",
        description: "team communication",
        url: "https://slack.com/",
        imgUrl: "/integrations/slack.png",
      },
      {
        name: "Github",
        description: "code security",
        url: "https://github.com/",
        imgUrl: "/integrations/github.png",
      },
      {
        name: "AWS",
        description: "cloud",
        url: "https://aws.amazon.com/",
        imgUrl: "/integrations/aws.png",
      },
      {
        name: "Microsoft Teams",
        description: "team communicationn",
        url: "https://github.com/",
        imgUrl: "/integrations/teams.png",
      },
      {
        name: "Azure",
        description: "cloud",
        url: "https://github.com/",
        imgUrl: "/integrations/azure.png",
      },
      {
        name: "Outlook",
        description: "team communication",
        url: "https://github.com/",
        imgUrl: "/integrations/outlook.png",
      },
    ],
  });
}
