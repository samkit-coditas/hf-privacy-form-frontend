import { useState, useContext } from "react";
import FilePreview from "./filePreview";
import styles from "./dropZone.module.scss";
import { LanguageContext } from '../../hoc/languageProvider';

const DropZone = () => {
  const { localString } = useContext(LanguageContext)

  const [data, setData] = useState([]);
  const handleFileSelect = (e) => {
    return
  };

  return (
    <>
      <div className={styles.dropzone}>
        <input id="fileSelect" type="file" multiple className={styles.files} onChange={(e) => handleFileSelect(e)} />
        <label htmlFor="fileSelect">{localString["attachments"]}</label>
        <p className={styles.uploadMessage}>
          {localString["fileMsg"]}
        </p>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
    </>
  );
};

export default DropZone;
