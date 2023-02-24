import React from "react";
import styles from "./formSelects.module.scss";
import { useForm } from 'react-hook-form';

const FormSelect = ({
  options,
  fieldName,
  required,
  onChange,
}) => {

  const { register } = useForm();

  return (
    <>
      <select
        options={options}
        className={styles.selectWrapper}
        {...register(`${fieldName}`, { required: required, onChange: onChange })}
      >
        {options?.map((option) => (
          <>
            <option key={option.id} value={option.value}>{option.name}</option>
          </>
        ))}
      </select>
    </>
  )
};

export default FormSelect;
