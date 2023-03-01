"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import PrivacyForm from "components/privacyForm";
import HeaderContent from "components/headerContent";
import LanguageSelector from "components/languageSelector";
import Footer from "components/footer";
import Image from "next/image";
import BrandingLogo from "@/public/Hydrafacial_Pos_Trademark.svg";

const Home = ({ lang }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <SSRProvider>
      <Container fluid className={styles.containerWrapper}>
        <Row className={styles.contentWrapper}>
          <Col>
            <Image
              src={BrandingLogo}
              alt="Picture of the author"
              width={220}
              height={140}
            />
          </Col>
        </Row>
      </Container>
      <LanguageSelector
        URLlang={lang}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <HeaderContent />
      <PrivacyForm />
      <Footer />
    </SSRProvider>
  );
};

export default Home;
