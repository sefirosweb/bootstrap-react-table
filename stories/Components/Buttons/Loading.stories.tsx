import { Meta, StoryObj } from '@storybook/react';
import { LoadingButton } from '../../../src';

const meta: Meta = {
  title: 'Components/Buttons/Loading',
  component: LoadingButton,
};



export default meta;

type Story = StoryObj<typeof LoadingButton>;

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
