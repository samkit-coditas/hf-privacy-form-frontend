import react from "react";
import styles from "./formButtons.module.scss";
import { IFormButtonsProps } from "./formButtons.types";
import { Button } from "react-bootstrap";

const FormButtons = ({
  className,
  handleClick,
  button,
  buttonName,
}: IFormButtonsProps) => {
  return (
    <>
      <Button
        className={button?.active ? styles.userTypeBtn : styles.userInActiveBtn}
        onClick={handleClick}
        data-testid="button"
      >
        {buttonName}
      </Button>
    </>
  );
};

export default FormButtons;
