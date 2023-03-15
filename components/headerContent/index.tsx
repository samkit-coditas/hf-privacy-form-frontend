import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./headerContent.module.scss";
import { LanguageContext } from "../../hoc/languageProvider";

const HeaderContent = () => {
  const { localString } = useContext(LanguageContext);

  return (
    <Container className={styles.containerWrapper}>
      <Row>
        <Col>
          <h6 style={{ paddingTop: "2rem" }} data-testid="contentTitle">
            {localString?.["contentTitle"]}
          </h6>
          <p
            className={styles.contentLayout}
            data-testid="contentDescriptionOne"
          >
            {localString?.["contentDescriptionOne"]}
          </p>
          <p
            className={styles.contentLayout}
            data-testid="contentDescriptionTwo"
          >
            {localString?.["contentDescriptionTwo"]}
          </p>
          <h6 data-testid="contentFooter">{localString?.["contentFooter"]}</h6>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderContent;
