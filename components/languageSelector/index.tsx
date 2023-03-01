import { useContext, useState, useEffect } from "react";

import { LanguageContext } from "../../hoc/languageProvider";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import styles from "./languageSelector.module.scss";
import { languagesMapping } from "../../constants/constants";
import { useRouter } from "next/navigation";

const LanguageSelector = ({ URLlang, refresh, setRefresh }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { localString } = useContext(LanguageContext);

  const [defaultTranslateLang, setTranslateLang] = useState("English");

  const router = useRouter();

  const handleChange = (e: any) => {
    let lang = e.split(",");
    // setTranslateLang(lang[0]);
    // setLanguage(lang[1]);
    // setRefresh(!refresh);
    router.push(`/${lang[1]}`);
  };

  console.log("URLlang", URLlang)
  console.log("defaultTranslateLang", defaultTranslateLang)

  // useEffect(() => {
  //   if (URLlang) {
  //     setTranslateLang(languagesMapping[URLlang]);
  //     setLanguage(URLlang);
  //   }
  // }, [URLlang, setLanguage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if(window.location.pathname !== "/"){
        setTranslateLang(languagesMapping[window.location.pathname.slice(1)])
        setLanguage(window.location.pathname.slice(1))
      }
    }
  })

  return (
    <Container>
      <Row>
        <Col>
          <Dropdown
            className={styles.languageDropdown}
            onSelect={(e) => handleChange(e)}
          >
            <Dropdown.Toggle
              className={styles.dropDownToggleBtn}
              variant="default"
            >
              {defaultTranslateLang}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={["English", "en"]}>
                English
              </Dropdown.Item>
              <Dropdown.Item eventKey={["Français", "fr"]}>
                Français
              </Dropdown.Item>
              <Dropdown.Item eventKey={["Deutsch", "de"]}>
                Deutsch
              </Dropdown.Item>
              <Dropdown.Item eventKey={["Español", "es"]}>
                Español
              </Dropdown.Item>
              <Dropdown.Item eventKey={["日本語", "ja"]}>日本語</Dropdown.Item>
              <Dropdown.Item eventKey={["Português", "pt"]}>
                Português
              </Dropdown.Item>
              <Dropdown.Item eventKey={["中國人", "zh"]}>中國人</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default LanguageSelector;
