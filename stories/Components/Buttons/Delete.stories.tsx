import { Meta, StoryObj } from '@storybook/react';
import { DeleteButton, EditButton, LoadingButton, RefreshButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons/Delete',
  component: DeleteButton,
};



export default meta;

type Story = StoryObj<typeof DeleteButton>;

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
