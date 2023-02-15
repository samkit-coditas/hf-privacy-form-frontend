import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Container, Row, Col, Dropdown, DropdownButton, Button, ButtonGroup } from "react-bootstrap";
import styles from "./privacyForm.module.scss";
import { useForm, Resolver } from 'react-hook-form';
import countryList from 'react-select-country-list';
import FooterContent from "../footerContent";
import ReCAPTCHA from "react-google-recaptcha";
import DragAndDrop from "../dragAndDrop";
import { LanguageContext } from '../../hoc/languageProvider';
import { getUserDetails, createNewUser } from "../../services/user.service";

const PrivacyForm = () => {

  const { localString } = useContext(LanguageContext)

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ formData, setFormData ] = useState({
    entityName: "OneTrust",
    userType: "",
    cloudType: "",
    country: "Afghanistan",
    requestType: "",
    firstName: "",
    lastName: "",
    email: "",
    jobtitle: "",
    employmentStartDate: "",
    employmentEndDate: "",
    appliedFor: "",
    requestDetails: "",
    termsAggred: "true",
    locale: "en",
    attachment: {},
  })
  const [ countryLists, setCountryLists] = useState([]);
  const [captchaToken, setCaptchaToken] = useState("");
  const [ userTypes, setUserTypes] = useState([]);
  const [userTypeErr, setUserTypeErr] = useState(false);
  const [ requestTypes, setRequestTypes] = useState([]);
  const [requestTypeErr, setRequestTypeErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [failureMsg, setFailureMsg] = useState(false);
  const [showCloud, setCloud] = useState(false);
  const [empDetails, setEmpDetails] = useState(false)
  const [activeBtn, setActiveBtn] = useState(false)
  const options = useMemo(() => setCountryLists(countryList().getData()), [])

  const captchaRef = useRef<ReCAPTCHA>(null);

  const userBtns = [
    {
      id: 1,
      name: localString["platformUser"],
      active: false
    },
    {
      id: 2,
      name: localString["employee"],
      active: false
    },
    {
      id: 3,
      name: localString["jobApplicant"],
      active: false
    },
    {
      id: 4,
      name: localString["marketingRecipient"],
      active: false
    },
    {
      id: 5,
      name: localString["authorizedAgent"],
      active: false
    },
  ];

  const requestBtns = [
    {
      id: 1,
      name: localString["accessRequest"],
      active: false,
    },
    {
      id: 2,
      name: localString["infoRequest"],
      active: false
    },
    {
      id: 3,
      name: localString["updateRequest"],
      active: false
    },
    {
      id: 4,
      name: localString["deletionRequest"],
      active: false
    },
    {
      id: 5,
      name: localString["fileComplaint"],
      active: false
    },
    {
      id: 6,
      name: localString["marketingRecipient"],
      active: false
    },
    {
      id: 7,
      name: localString["sharingData"],
      active: false
    },
  ];

  const onCaptchaChange = () => {
    const token = captchaRef.current?.getValue();
    if (token) setCaptchaToken(token as string);
  };

  const handleUserType = (userType) => {
    setUserTypeErr(false)
    userBtns.forEach((element, index) => {
      if(element.name === userType) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    if(userType === "Platform User"){
      setCloud(true)
      setEmpDetails(false)
      setRequestTypes(requestBtns)
    } else if(userType === "Employee"){
      setEmpDetails(true)
      setCloud(false)
      setRequestTypes(requestBtns.slice(0,5))
    } else if(userType === "Job Applicant"){
      setEmpDetails(false)
      setCloud(false)
      setRequestTypes(requestBtns.slice(0,5))
    } else {
      setCloud(false)
      setEmpDetails(false)
      setRequestTypes(requestBtns)
    }
    setUserTypes(userBtns)
    setFormData({
      ...formData,
      userType: userType
    })
  }

  const handleRequestType = (requestType) => {
    setRequestTypeErr(false)
    if(formData.userType === "Employee" || formData.userType === "Job Applicant"){
      requestBtns.slice(0,5).forEach((element, index) => {
        if(element.name === requestType) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      setRequestTypes(requestBtns.slice(0,5))
    } else {
      requestBtns.forEach((element, index) => {
        if(element.name === requestType) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      setRequestTypes(requestBtns)
    }
    setFormData({
      ...formData,
      requestType: requestType
    })
  }

  const getUsers = async () => {
    const response = await getUserDetails();
  }

  const onSubmit = async (data) => {
    if(formData.userType === ""){
      setUserTypeErr(true)
    } else {
      setUserTypeErr(false)
    }
    if(formData.requestType === ""){
      setRequestTypeErr(true)
    } else {
      setRequestTypeErr(false)
    }

    let details = {
      entity_name: formData.entityName,
      user_type: formData.userType,
      cloud_type: formData.cloudType,
      country: formData.country,
      request_type: formData.requestType,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      jobtitle: formData.jobtitle,
      employment_start_date: formData.employmentStartDate,
      employment_end_date: formData.employmentEndDate,
      applied_for: "",
      request_details: formData.requestDetails,
      terms_aggred: formData.termsAggred,
      locale: "en",
      attachment: {},
    }
    if(formData.userType && formData.requestType){
      const response = await createNewUser(details)
      if(response){
        setSuccessMsg(true)
      } else {
        setFailureMsg(true)
      }
    }
  }

  useEffect(() => {
    setUserTypes(userBtns)
    setRequestTypes(requestBtns)
  },[])

  useEffect(() => {
    getUsers()
  },[])

  useEffect(() => {
    if(formData.userType && formData.requestType){
      setActiveBtn(true)
    } else {
      setActiveBtn(false)
    }
  },[formData])


  return(
    <Container className={styles.containerWrapper}>
      <Row>
        <Col>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["chooseEntity"]}</label>
            <select {...register("entityName", { required: "This field is required", onChange: (e) => setFormData({...formData, entityName: e.target.value }) })} className={styles.selectWrapper}>
              <option value="OneTrust">OneTrust</option>
              <option value="Convercent by OneTrust">Convercent by OneTrust</option>
              <option value="Planetly by OneTrust">Planetly by OneTrust</option>
              <option value="Tugboat logic by OneTrust">Tugboat logic by OneTrust</option>
              <option value="DataGuidance">DataGuidance</option>
            </select>
            {errors.entityName ? (
              <>
                {errors.entityName.type === "required" && (
                  <p style={{color: "red"}}>
                    {errors.entityName.message}
                  </p>
                )}
              </>
            ) : null}
          </Row>
          <Row className={styles.rowWrapper}>
            <Col>
              <Row>
                <Col>
                  <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["userType"]}</label>
                </Col>
              </Row>
              <Row>
                <div className={!userTypeErr ? styles.userTypeLayout : styles.userTypeErr}>
                  {userTypes?.map((button, index) => {
                    return(
                      <Button key={index} className={button.active ? styles.userTypeBtn : styles.userInActiveBtn} onClick={() => handleUserType(button.name)}>{button.name}</Button>
                    )
                  })}
                </div>
                {userTypeErr && <p className={styles.errMsg}>This field is required</p>}
              </Row>
            </Col>
          </Row>
          {showCloud && (
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>{localString["cloudType"]}</label>
              <select className={styles.selectWrapper} {...register("cloudType", { required: true, onChange: (e) => {setFormData({...formData, cloudType: e.target.value})} })}>
                <option value="Privacy & Data Governance Cloud">Privacy & Data Governance Cloud</option>
                <option value="GRC & Security Assurance Cloud">GRC & Security Assurance Cloud</option>
                <option value="Ethics & Compliance Cloud">Ethics & Compliance Cloud</option>
                <option value="ESG & Sustainability Cloud">ESG & Sustainability Cloud</option>
                <option value="OneTrust PreferenceChoice">OneTrust PreferenceChoice</option>
                <option value="OneTrust Ethics">OneTrust Ethics</option>
                <option value="OneTrust ESG">OneTrust ESG</option>
              </select>
            </Row>
          )}
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["country"]}</label>
            <select className={styles.selectWrapper} options={options} {...register("country", { required: "This field is required", onChange: (e) => setFormData({...formData, country: e.target.value }) })}>
              <>
                {countryLists?.map((country) => (
                  <option value={country.label}>{country.label}</option>
                ))}
              </>
            </select>
          </Row>
          <Row className={styles.rowWrapper}>
            <Col>
              <Row>
                <Col>
                  <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["requestType"]}</label>
                </Col>
              </Row>
              <Row>
                <div className={!requestTypeErr ? styles.userTypeLayout : styles.userTypeErr}>
                  {requestTypes?.map((button, index) => {
                    return(
                      <Button key={index} className={button.active ? styles.userTypeBtn : styles.userInActiveBtn} onClick={() => handleRequestType(button.name)}>{button.name}</Button>
                    )
                  })}
                </div>
                {requestTypeErr && <p className={styles.errMsg}>This field is required</p>}
              </Row>
            </Col>
          </Row>
          <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["firstName"]}</label>
              <input className={styles.inputField} type="text" placeholder="" {...register("firstName", {required: "First Name is required", onChange: (e) => setFormData({...formData, firstName: e.target.value }), maxLength: 80})} />
              {errors.firstName ? (
                <>
                  {errors.firstName.type === "required" && (
                    <p className={styles.errMsg}>
                      {errors.firstName.message}
                    </p>
                  )}
                </>
              ) : null}
          </Row>
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["lastName"]}</label>
            <input className={styles.inputField} type="text" placeholder="" {...register("lastName", {required: "Last Name is required", onChange: (e) => setFormData({...formData, lastName: e.target.value }), maxLength: 100})} />
            {errors.lastName ? (
              <>
                {errors.lastName.type === "required" && (
                  <p className={styles.errMsg}>
                    {errors.lastName.message}
                  </p>
                )}
              </>
            ) : null}
          </Row>
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["email"]}</label>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                onChange: (e) => setFormData({...formData, email: e.target.value }),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email is invalid"
                }
              })}
            />
            {errors.email ? (
              <>
                {errors.email.type === "required" && (
                  <p className={styles.errMsg}>
                    {errors.email.message}
                  </p>
                )}
                {errors.email.type === "pattern" && (
                  <p className={styles.errMsg}>
                    {errors.email.message}
                  </p>
                )}
              </>
            ) : null}

          </Row>
          {empDetails && (
            <>
              <Row className={styles.rowWrapper}>
                <label className={styles.labelWrapper}>{localString["jobtitle"]}</label>
                <input className={styles.inputField} type="text" placeholder="" {...register("Your Job Title or Position Applied For", { onChange: (e) => setFormData({...formData, jobtitle: e.target.value }) })} />
              </Row>
              <Row className={styles.rowWrapper}>
                <label className={styles.labelWrapper}>{localString["startDate"]}</label>
                <input className={styles.inputField} type="date" placeholder="" {...register("Your Employment Start Date", { onChange: (e) => setFormData({...formData, employmentStartDate: e.target.value }) })} />
              </Row>
              <Row className={styles.rowWrapper}>
                <label className={styles.labelWrapper}>{localString["endDate"]}</label>
                <input className={styles.inputField} type="date" placeholder="" {...register("Your Employment End Date", { onChange: (e) => setFormData({...formData, employmentEndDate: e.target.value }) })} />
              </Row>
            </>
          )}
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}><span className={styles.requiredField}>*</span>{localString["requestDetails"]}</label>
            <textarea className={styles.textInputField} placeholder="Request Details" {...register("Request Details", {required: true, onChange: (e) => setFormData({...formData, requestDetails: e.target.value }) })} />
          </Row>
          <Row>
            <FooterContent />
          </Row>
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}>Please confirm your understanding of the above before submitting your request</label>
            <select className={styles.selectWrapper} {...register("termsAggred", { required: true,  onChange: (e) => setFormData({...formData, termsAggred: e.target.value }) })}>
              <option value="true">I understand</option>
            </select>
          </Row>
          <Row>
            <div className={styles.recaptchaWrapper}>
              <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY || ""}
                  ref={captchaRef}
                  onChange={onCaptchaChange}
                  size="normal"
                />
            </div>
          </Row>
          <Row className={styles.rowWrapper}>
            <Col>
              <DragAndDrop/>
            </Col>
          </Row>
          <Row className={styles.submitBtnWrapper}>
            <input type="submit" className={activeBtn ? styles.submitActiveBtn : styles.submitBtn} />
          </Row>
          {successMsg && (
            <Row className={styles.successMsg}>
              <div style={{display: "contents"}}>*Form submitted successfully</div>
            </Row>
          )}
          {failureMsg && (
            <Row className={styles.failureMsg}>
              <div style={{display: "contents"}}>*Failed to submit form</div>
            </Row>
          )}

        </form>
        </Col>
      </Row>
    </Container>
  )
};

export default PrivacyForm;
