'use client'

import styles from './page.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import PrivacyForm from "components/privacyForm";
import HeaderContent from "components/headerContent";
import LanguageSelector from "components/languageSelector";

export default function Home() {
  return (
    <>
      <Container fluid className={styles.containerWrapper}>
        <Row className={styles.contentWrapper}>
          <Col>
            <h1 className={styles.headingWrapper}>OneTrust</h1>
          </Col>
        </Row>
      </Container>
      <LanguageSelector />
      <HeaderContent/>
      <PrivacyForm/>
    </>
  )
}
