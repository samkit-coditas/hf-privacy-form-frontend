import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from "@/hoc/languageProvider";

const Footer = () => {
  const { localString } = useContext(LanguageContext);

  return (
    <Container fluid className={styles.containerWrapper}>
      <Row className={styles.contentWrapper}>
        <div className={styles.poweredWrapper}>
          {localString["poweredBy"]}
          <Image
            src="/hydrafacial_pos_tm.png"
            alt="Picture of the author"
            width={150}
            height={100}
          />
        </div>
      </Row>
      <Row className={styles.contentWrapper}>
        <div className={styles.footerTextWrapper}>
          {localString["footerTitle"]}
        </div>
      </Row>
      <Row className={styles.contentWrapper}>
        <div className={styles.footerAddress}>
          <span className={styles.addressTitle}>Hydrafacial LLC</span> - 2165 E.
          Spring Street, Long Beach, CA 90806 <br />
          <span className={styles.addressTitle}>Hydrafacial UK Limited</span> -
          3rd Floor 1 Ashley Road, Altrincham, Cheshire, UK WA14 2DT
          <br />
          <span className={styles.addressTitle}>
            Hydrafacial Germany GmbH
          </span>{" "}
          - Stichlingstrasse 1 , 60327 Frankfurt
          <br />
          <span className={styles.addressTitle}>Hydrafacial France SAS</span> -
          5 rue Tilsit, 75008 Paris
          <br />
          <span className={styles.addressTitle}>
            The Hydrafacial Company Iberia SL
          </span>{" "}
          - Claudio Coello 75, 1º A, 28001 Madrid
        </div>
      </Row>
      <Row className={styles.contactWrapper}>
        <div>Contact us at dpo@hydrafacial.com</div>
      </Row>
      <Row>
        <div className={styles.privacyWrapper}>
          <Link href="/privacy-notice" target="_blank" rel="noopener noreferrer">
              Privacy Notice
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default Footer;
