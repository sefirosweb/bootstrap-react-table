import { Meta, StoryObj } from '@storybook/react';
import { RefreshButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons',
  component: RefreshButton,
};



export default meta;

type Story = StoryObj<typeof RefreshButton>;

export const Refresh: Story = {
  args: {

  }
}
