import { useContext, useState } from 'react';

import { LanguageContext } from '../../hoc/languageProvider';
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./languageSelector.module.scss";

const LanguageSelector = () => {

  const { language, setLanguage } = useContext(LanguageContext)
  const { localString } = useContext(LanguageContext)

  const [defaultTranslateLang, setTranslateLang] = useState('English')

  const handleChange = (e: any) => {
    let lang = e.split(",")
    setTranslateLang(lang[0]);
    setLanguage(lang[1]);
  }

  return(
    <Container>
      <Row>
        <Col>
        <Dropdown className={styles.languageDropdown} onSelect={(e) => handleChange(e)}>
          <Dropdown.Toggle className={styles.dropDownToggleBtn} variant="default" >
            {defaultTranslateLang}
          </Dropdown.Toggle>

           <Dropdown.Menu>
            <Dropdown.Item eventKey={['English', 'en']} >English</Dropdown.Item>
            <Dropdown.Item eventKey={['Français', 'fr']} >Français</Dropdown.Item>
            <Dropdown.Item eventKey={['Deutsch','du']}>Deutsch</Dropdown.Item>
            <Dropdown.Item eventKey={['Español', 'es']}>Español</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Col>
      </Row>
    </Container>
  )
};

export default LanguageSelector;
