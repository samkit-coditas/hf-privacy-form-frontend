import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./headerContent.module.scss";
import { LanguageContext } from '../../hoc/languageProvider';

const HeaderContent = () => {
  const { localString } = useContext(LanguageContext)

  return(
    <Container className={styles.containerWrapper}>
      <Row>
        <Col>
          <h6 style={{paddingTop: '1rem'}}>{localString["contentTitle"]}</h6>
          <p className={styles.contentLayout}>
            {localString["contentDescription"]}
          </p>
          <h6>{localString["contentFooter"]}</h6>
        </Col>
      </Row>
    </Container>
  )
};

export default HeaderContent;
