import React from "react";
import styles from "./formLabels.module.scss";
import { LanguageContext } from '../../hoc/languageProvider';
import { IFormLabelsProps } from "./formLabels.types";

const FormLabels = ({
  labelName,
  required,
} : IFormLabelsProps) => {

  return (
    <label
      className={styles.labelWrapper}
    >
      {labelName}{required ? (
        <span className={styles.requiredField}>*</span>
      ) : null}
    </label>
  )
};

export default FormLabels;
