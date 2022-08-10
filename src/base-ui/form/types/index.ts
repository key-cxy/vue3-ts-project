type IFormType = "input" | "password" | "select" | "datepicker";
export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  placeholder?: string;
  options?: any[]; // 针对select
  otherOptions?: any; // 针对特殊属性
  rules?: any[];
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: string;
  itemLayout?: string;
}
