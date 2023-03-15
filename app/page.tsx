"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { Container, Row, Col, SSRProvider } from "react-bootstrap";
import PrivacyForm from "components/privacyForm";
import HeaderContent from "components/headerContent";
import LanguageSelector from "components/languageSelector";
import Footer from "components/footer";
import Image from "next/image";
import dynamic from "next/dynamic";
import BrandingLogo from "@/public/Hydrafacial_Pos_Trademark.svg";

const Home = ({ lang }: any) => {
  const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

  return (
    <SSRProvider>
      <Container fluid className={styles.containerWrapper}>
        <Row className={styles.contentWrapper}>
          <Col>
            <Image
              data-testid="brandLogo"
              src={BrandingLogo}
              alt="Picture of the author"
              width={220}
              height={140}
            />
          </Col>
        </Row>
      </Container>
      <LanguageSelector URLlang={lang} privacyPage={false} />
      <HeaderContent />
      <PrivacyForm ReCAPTCHA={ReCAPTCHA} />
      <Footer />
    </SSRProvider>
  );
};

export default Home;
