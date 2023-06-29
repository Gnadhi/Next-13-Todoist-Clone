import { Stat } from "./Stat";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Stat> = {
  title: "App/Stat",
  component: Stat,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Stat>;

export const Primary: Story = {
  args: {
    val: 1,
    prevVal: 10,
    name: "Controls",
  },
};
