import styles from './pageHeader.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image'
import brandingLogo from "@/public/hydrafacial_trademark_logo.png"

const PageHeader = () => {
    return (<Container fluid className={styles.containerWrapper}>
        <Row className={styles.contentWrapper}>
            <Col>
                <Image
                  src={brandingLogo}
                  alt="Picture of the author"
                  width={200}
                  height={60}
                />
            </Col>
        </Row>
    </Container>)
}

export default PageHeader
