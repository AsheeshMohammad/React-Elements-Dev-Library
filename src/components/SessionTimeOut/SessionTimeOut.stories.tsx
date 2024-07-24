import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import SessionTimeOut, { SessionTimeOutProps } from './SessionTimeOut';

export default {
  title: 'Components/SessionTimeOut',
  component: SessionTimeOut,
} as Meta;

const SessionTimeField=(args:any)=>{
    const [sessionTime,setSessionTime]=useState('2024-07-16T15:39:10.0433335+05:30');
    // console.log(sessionTime,'sessionTime');
    
    return <SessionTimeOut {...args} sessionTime={sessionTime} handleSubmitSession={()=>{
        setSessionTime('2024-07-16T15:42:10.0433335+05:30')
    }}/>
}
const Template: StoryFn<SessionTimeOutProps> = (args) => <SessionTimeField {...args} />;

export const SessionTimeOutField = Template.bind({});
SessionTimeOutField.args = {
    onSessionExpire:()=>{
        alert('Session Expired')
    },
    handleSessionCancel() {
        alert('closed')
    },
    buttonStyleProps:{
        background:'red'
    }
};
