import React, { useContext } from "react";
import styles from "./formButtonInput.module.scss";
import { IFormButtonInputProps } from "./formButtonInput.types";
import FormButtons from "../formButtons/formButtons";
import { LanguageContext } from '../../hoc/languageProvider';

const FormButtonInput = ({
  buttonList,
  buttonErr,
  handleButtonChange,
} : IFormButtonInputProps) => {

  const { localString, language } = useContext(LanguageContext)

  return (
    <div className={!buttonErr ? styles.userTypeLayout : styles.userTypeErr}>
      {buttonList?.map((button, index) => {
        return(
          <div key={index}>
            <FormButtons
              button={button}
              handleClick={() => handleButtonChange(button.name)}
              buttonName={localString[button.name] || ''}
            />
          </div>
        )
      })}
    </div>
  )
};

export default FormButtonInput;
