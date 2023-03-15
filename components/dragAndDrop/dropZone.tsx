import { useState, useContext, useRef } from "react";
import FilePreview from "./filePreview";
import styles from "./dropZone.module.scss";
import { LanguageContext } from "../../hoc/languageProvider";

const DropZone = ({ formData, setFormData }) => {
  const { localString } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const clickableDiv = useRef();

  const handleFileSelect = (e: any) => {
    e.preventDefault();
    let files = e.target.files[0];
    setFormData({
      ...formData,
      attachment: files,
    });
  };

  const handleFileUpload = (e: any) => {
    clickableDiv.current.click();
  };

  return (
    <>
      <div className={styles.dropzone} data-testid="dropZone">
        <input
          data-testid="fileSelect"
          id="fileSelect"
          type="file"
          ref={clickableDiv}
          className={styles.files}
          onChange={(e: any) => handleFileSelect(e)}
          accept="image/png, image/jpeg, image/jpg, image/gif, image/svg, application/pdf"
        />
        <label htmlFor="fileSelect" data-testid="attachment">
          {localString?.["attachments"]}
        </label>
        <div className={styles.uploadMessage} data-testid="uploadMessage">
          {/* <p className={styles.uploadText}>{localString?.["fileMsg"]}</p> */}
          <p className={styles.uploadText}>{localString?.["fileSupport"]}</p>
        </div>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={formData?.attachment} />
    </>
  );
};

export default DropZone;
