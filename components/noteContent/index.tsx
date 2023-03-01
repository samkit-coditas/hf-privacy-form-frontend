import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./noteContent.module.scss";
import { LanguageContext } from "../../hoc/languageProvider";
import Link from "next/link";

const NoteContent = () => {
  const { language, localString } = useContext(LanguageContext);

  return (
    <Container className={styles.containerWrapper}>
      <Row>
        <Col>
          <h6>{localString?.["pleaseNote"]}</h6>
          <p className={styles.contentLayout}>
            {localString?.["noteDetailsOne"]}
            <br />
            <br />
            {localString?.["noteDetailsTwo"]}
            <br />
            <br />
            {localString?.["noteDetailsThree"]}{" "}
            <Link
              href={`/privacy-notice/${language}`}
              target="_blank"
              rel="noopener noreferrer"
              className="policyLink"
            >
              {localString?.["privacyPolicyLink"]}
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NoteContent;
