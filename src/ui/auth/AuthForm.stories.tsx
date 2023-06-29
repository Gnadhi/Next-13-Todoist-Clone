import { AuthForm } from "./AuthForm";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AuthForm> = {
  title: "Auth/AuthForm",
  component: AuthForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AuthForm>;

export const Primary: Story = {
  args: {},
};
