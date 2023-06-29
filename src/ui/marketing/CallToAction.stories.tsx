import CallToAction from "./CallToAction";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof CallToAction> = {
  title: "Marketing/CallToAction",
  component: CallToAction,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CallToAction>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
