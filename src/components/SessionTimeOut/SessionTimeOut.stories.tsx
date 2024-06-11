import React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import SessionTimeOut, { SessionTimeOutProps } from './SessionTimeOut';

export default {
  title: 'Components/SessionTimeOut',
  component: SessionTimeOut,
} as Meta;

const Template: StoryFn<SessionTimeOutProps> = (args) => <SessionTimeOut {...args} />;

export const SessionTimeOutField = Template.bind({});
SessionTimeOutField.args = {
    sessionTime:"2024-06-06T10:14:07.2199813+05:30",
    onSessionExpire:()=>{
        alert('Session Expired')
    },
    handleSubmitSession:()=> {
        alert('Session Reviewed')
    },
};
