import { Meta, StoryObj } from '@storybook/react';
import { EditButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons',
  component: EditButton,
};



export default meta;

type Story = StoryObj<typeof EditButton>;

export const Edit: Story = {
  args: {

  }
}
