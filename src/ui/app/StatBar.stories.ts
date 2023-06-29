import { StatBar } from "./StatBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StatBar> = {
  title: "App/StatBar",
  component: StatBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatBar>;

export const Primary: Story = {
  args: {
    stats: [
      {
        val: 1,
        prevVal: 10,
        name: "Controls",
      },
      {
        val: 9,
        prevVal: 10,
        name: "Risks",
      },
      {
        val: 10,
        prevVal: 10,
        name: "Policies",
      },
    ],
  },
};
