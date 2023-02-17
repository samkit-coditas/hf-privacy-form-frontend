'use client'

import styles from './page.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import PrivacyForm from "components/privacyForm";
import HeaderContent from "components/headerContent";
import LanguageSelector from "components/languageSelector";
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Container fluid className={styles.containerWrapper}>
        <Row className={styles.contentWrapper}>
          <Col>
            <Image
              src="hydrafacial_logo.svg"
              alt="Picture of the author"
              width={250}
              height={125}
            />
          </Col>
        </Row>
      </Container>
      <LanguageSelector />
      <HeaderContent/>
      <PrivacyForm/>
    </>
  )
}
