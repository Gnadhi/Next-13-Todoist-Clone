import IntegrationCard from "./IntegrationCard";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof IntegrationCard> = {
  title: "App/IntegrationCard",
  component: IntegrationCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntegrationCard>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
