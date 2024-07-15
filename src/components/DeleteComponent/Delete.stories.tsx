import { Meta, StoryFn } from "@storybook/react/*";
import DeleteField, { DeleteFieldProps } from "./DeleteField";


export default {
  title: "Components/DeleteField",
  component: DeleteField,
} as Meta;

const Template: StoryFn<DeleteFieldProps> = (args: any) => (
  <DeleteField {...args} />
);

export const DeleteFieldComponent = Template.bind({});
DeleteFieldComponent.args = {
  onClickFn() {
      alert('Record is Deleted')
  },
  text:'Are you sure you want to delete this record?'
};
