import { Meta, StoryObj } from '@storybook/react';
import { RefreshButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons/Refresh',
  component: RefreshButton,
};



export default meta;

type Story = StoryObj<typeof RefreshButton>;

export const Active: Story = {
  args: {
    disabled: false
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
