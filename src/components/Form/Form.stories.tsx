import React from 'react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import RenderForm, { FormRenderProps } from './FormRender';
import { useForm } from 'react-hook-form';

export default {
  title: 'Components/Form',
  component: RenderForm,
} as Meta;

const FormComponent: React.FC<FormRenderProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
        text:'Hii'
    },
  });

  return <RenderForm {...props} errors={errors} register={register}  setValue={setValue} clearErrors={clearErrors} getValues={getValues} control={control} />;
};

const Template: StoryFn<FormRenderProps> = (args:any) => <FormComponent {...args} />;

export const RenderFormComponent = Template.bind({});
RenderFormComponent.args = {
  item: {
    name: 'text',
    inputType: 'multiselect',
    label: 'Text',
    required: true,
    errorMessage: 'Please enter text'
  }
};
