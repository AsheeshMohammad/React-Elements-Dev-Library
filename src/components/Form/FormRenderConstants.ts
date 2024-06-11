export interface FormsSection {
  name: string;
  label: string;
  value?: string;
  inputType: string;
  minDate?: any;
  options?: any;
  customStyles?: {};
  mandatory?: boolean;
  disable?: boolean;
  settingsField?: FormsSection[];
  setArrayUpdate?: any;
  arrayUpdate?: any;
  placeholderText?: string;
}
