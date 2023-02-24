export interface IFormInputsProps {
  type: string;
  placeholder: string;
  fieldName: string;
  requiredText: string;
  onChange: () => void;
  maxLength: number;
  pattern: any;
};
