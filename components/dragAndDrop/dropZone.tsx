import { useState, useContext } from "react";
import FilePreview from "./filePreview";
import styles from "./dropZone.module.scss";
import { LanguageContext } from '../../hoc/languageProvider';

const DropZone = ({ formData, setFormData }) => {
  const { localString } = useContext(LanguageContext)
  const [data, setData] = useState([]);

  const handleFileSelect = (e: any) => {
    let files = e.target.files[0];
    setFormData({
      ...formData,
      attachment: files
    })
  }


  return (
    <>
      <div className={styles.dropzone}>
        <input id="fileSelect" type="file" className={styles.files} onChange={(e: any) => handleFileSelect(e)}/>
        <label htmlFor="fileSelect">{localString["attachments"]}</label>
        <p className={styles.uploadMessage}>
          {localString["fileMsg"]}
        </p>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={formData.attachment} />
    </>
  );
};

export default DropZone;
