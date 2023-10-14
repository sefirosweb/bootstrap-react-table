import { Meta, StoryObj } from '@storybook/react';
import { LoadingButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons',
  component: LoadingButton,
};



export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Loading: Story = {
  args: {

  }
}
