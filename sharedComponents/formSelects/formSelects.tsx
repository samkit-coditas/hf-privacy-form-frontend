import React, { useId } from "react";
import styles from "./formSelects.module.scss";
import { useForm } from "react-hook-form";

const FormSelect = ({
  options,
  fieldName,
  required,
  onChange,
  registerProps,
}) => {
  const { register } = useForm();
  const formControl = registerProps || register;
  return (
    <>
      <select
        options={options}
        style={{border: "0.05rem solid rgba(0, 0, 0, 1)"}}
        className={styles.selectWrapper}
        {...formControl(`${fieldName}`, {
          required: required,
          onChange: onChange,
        })}
        id={useId()}
      >
        <option disabled selected value="">
          {" "}
        </option>
        {options?.map((option: any) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FormSelect;
