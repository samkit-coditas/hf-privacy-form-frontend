import DropZone from "./dropZone";
import styles from "./dragAndDrop.module.scss";

const DragAndDrop = ({ formData, setFormData }) => {
  return (
    <div className={styles.main} data-testid="mainContainer">
      <DropZone formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default DragAndDrop;
