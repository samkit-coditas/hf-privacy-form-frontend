import { useContext, useState, useEffect, Fragment } from "react";

import { LanguageContext } from "../../hoc/languageProvider";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import styles from "./languageSelector.module.scss";
import { languagesMapping } from "../../constants/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ROUTES from "../../constants/routes";

const LanguageSelector = ({ privacyPage, styleProps }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { localString } = useContext(LanguageContext);
  const [defaultTranslateLang, setTranslateLang] = useState("English");
  const router = useRouter();
  const [pathName, setPathName] = useState(window.location.pathname);
  // console.log("---", window.location.pathname)
  const [, currentRoute] = pathName?.split("/");
  const isCurrentMatchingRoute = `/${currentRoute}` === ROUTES.PRIVACY_NOTICE;

  useEffect(() => {
    setPathName(window.location.pathname);
  }, [window.location.pathname]);

  const handleChange = (e: any) => {
    let lang = e.split(",");
    if (privacyPage) {
      router.push(`${ROUTES.PRIVACY_NOTICE}/${lang[1]}`);
    } else {
      router.push(`/${lang[1]}`);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        if (privacyPage) {
          setTranslateLang(
            languagesMapping[window.location.pathname.split("/")[2]]
          );
          setLanguage(window.location.pathname.split("/")[2]);
        } else {
          setTranslateLang(languagesMapping[window.location.pathname.slice(1)]);
          setLanguage(window.location.pathname.slice(1));
        }
      }
    }
  });

  return (
    <Container className={styleProps?.containerWrapper}>
      <Row>
        <Col className={styles.linkToPrivacyNoticeWrapper} lg={6}>
          <Link
            href={`${
              isCurrentMatchingRoute ? "" : ROUTES.PRIVACY_NOTICE
            }/${language}`}
            rel="noopener noreferrer"
            className="policyLink"
            data-testid="policyLink"
          >
            {isCurrentMatchingRoute
              ? localString?.["viewPrivacyRequestForm"]
              : localString?.["viewPrivacyNotice"]}
          </Link>
        </Col>
        <Col className={styles.languageWrapper} lg={6}>
          <Fragment>
            <span data-testid="language" className={styles.title}>
              {localString?.["language"]} :{" "}
            </span>
            <Dropdown
              className={styles.languageDropdown}
              onSelect={(e) => handleChange(e)}
              data-testid="dropdown"
            >
              <Dropdown.Toggle
                className={styles.dropDownToggleBtn}
                variant="default"
                data-testid="defaultLang"
              >
                {defaultTranslateLang}
              </Dropdown.Toggle>

              <Dropdown.Menu data-testid="dropdownContainer">
                <Dropdown.Item
                  eventKey={["English", "en"]}
                  data-testid="english"
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={["Français", "fr"]}
                  data-testid="french"
                >
                  Français
                </Dropdown.Item>
                <Dropdown.Item eventKey={["Deutsch", "de"]} data-testid="dutch">
                  Deutsch
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={["Español", "es"]}
                  data-testid="spanish"
                >
                  Español
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={["日本語", "ja"]}
                  data-testid="japanese"
                >
                  日本語
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={["Português", "pt"]}
                  data-testid="portuguese"
                >
                  Português
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={["中國人", "zh"]}
                  data-testid="chinese"
                >
                  中國人
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Fragment>
        </Col>
      </Row>
    </Container>
  );
};

export default LanguageSelector;
