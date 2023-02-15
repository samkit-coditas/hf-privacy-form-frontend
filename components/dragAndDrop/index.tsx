import DropZone from "./dropZone";
import styles from "./dragAndDrop.module.scss";

const DragAndDrop = () => {
  return (
    <div className={styles.main}>
        <DropZone/>
    </div>
  )
};

export default DragAndDrop;
