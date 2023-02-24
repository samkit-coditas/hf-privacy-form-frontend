import react from "react";
import styles from "./formButtons.module.scss";
import { IFormButtonsProps } from "./formButtons.type";
import { Button } from "react-bootstrap";

const FormButtons = ({
  key,
  className,
  handleClick,
  button,
  buttonName,
} : IFormButtonsProps ) => {
  return(
    <>
      <Button
        key={key}
        className={button.active ? styles.userTypeBtn : styles.userInActiveBtn}
        onClick={handleClick}
      >
        {buttonName}
      </Button>
    </>
  )
};

export default FormButtons;
