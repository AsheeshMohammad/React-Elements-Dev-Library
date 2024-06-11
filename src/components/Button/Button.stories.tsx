import React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  onClick: () => alert('Button clicked!'),
};
