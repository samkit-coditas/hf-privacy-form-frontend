import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./footerContent.module.scss";
import { LanguageContext } from '../../hoc/languageProvider';

const FooterContent = () => {
  const { localString } = useContext(LanguageContext)

  return(
    <Container className={styles.containerWrapper}>
      <Row>
        <Col>
          <h6>{localString["pleaseNote"]}</h6>
          <p className={styles.contentLayout}>
            {localString["noteDetailsOne"]}<br/><br/>
            {localString["noteDetailsTwo"]}<br/><br/>
            {localString["noteDetailsThree"]}
          </p>
        </Col>
      </Row>
    </Container>
  )
};

export default FooterContent;
