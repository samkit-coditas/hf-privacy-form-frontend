import React from "react";
import styles from "./formInputs.module.scss";
import { useForm } from 'react-hook-form';
import { IFormInputsProps } from "./formInputs.types";

const FormInputs = ({
  type,
  placeholder,
  fieldName,
  requiredText,
  onChange,
  maxLength,
  pattern,
}) => {

  const { register } = useForm();

  return (
    <>
      <input
        className={styles.inputField}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...register(`${fieldName}`, {
          required: `${requiredText}`,
          onChange: onChange,
          maxLength: maxLength,
          pattern: pattern,
        })}
      />
    </>
  )
};

export default FormInputs;
