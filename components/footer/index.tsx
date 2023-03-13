import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from "@/hoc/languageProvider";
import BrandingLogo from "@/public/Hydrafacial_Pos_Trademark.svg";

const Footer = () => {
  const { localString, language } = useContext(LanguageContext);

  return (
    <Container fluid className={styles.containerWrapper}>
      <Row className={styles.contentWrapper}>
        <div className={styles.poweredWrapper}>
          {localString?.["poweredBy"]}{" "}
          <Image
            src={BrandingLogo}
            alt="Picture of the author"
            width={150}
            height={100}
          />
        </div>
      </Row>
      <Row className={styles.contentWrapper}>
        <div className={styles.footerTextWrapper}>
          {localString?.["footerTitle"]}
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
        <div>{localString?.["contactUsAt"]} dpo@hydrafacial.com</div>
      </Row>
      <Row>
        <div className={styles.privacyWrapper}>
          <Link
            href={`/privacy-notice/${language}`}
            target="_blank"
            rel="noopener noreferrer"
            className="policyLink"
            style={{marginRight: "0.4rem", fontSize: "0.65rem"}}
          >
            {localString?.["privacyPolicyLink"]}
          </Link>
          <Link
            href={`files/cookies_policy.docx`}
            className="policyLink"
            style={{marginRight: "0.4rem", fontSize: "0.65rem"}}
          >
            {localString?.["cookiePolicy"]}
          </Link>
          <Link
            href={`files/data_processing_agreement.docx`}
            className="policyLink"
            style={{marginRight: "0.4rem", fontSize: "0.65rem"}}
          >
            {localString?.["dataProcessingAggr"]}
          </Link>
          <Link
            href={`files/standard_contratual_clauses.docx`}
            className="policyLink"
            style={{marginRight: "0.4rem", fontSize: "0.65rem"}}
          >
            {localString?.["standardContractualClauses"]}
          </Link>
          <Link
            href={`files/transparency_report.docx`}
            className="policyLink"
            style={{marginRight: "0.4rem", fontSize: "0.65rem"}}
          >
            {localString?.["transparencyReport"]}
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default Footer;
