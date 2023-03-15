import styles from "./pageHeader.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import BrandingLogo from "@/public/Hydrafacial_Pos_Trademark.svg";

const PageHeader = () => {
  return (
    <Container fluid className={styles.containerWrapper}>
      <Row className={styles.contentWrapper}>
        <Col>
          <Image
            src={BrandingLogo}
            alt="Picture of the author"
            width={200}
            height={60}
            data-testid="brandingLogo"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PageHeader;
