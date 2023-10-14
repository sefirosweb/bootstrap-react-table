import { Meta, StoryObj } from '@storybook/react';
import { DeleteButton, EditButton, LoadingButton, RefreshButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons',
  component: DeleteButton,
};



export default meta;

type Story = StoryObj<typeof DeleteButton>;

export const Delete: Story = {
  args: {

  }
}
