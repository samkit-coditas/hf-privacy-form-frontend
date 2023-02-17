import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Container, Row, Col, Dropdown, DropdownButton, Button, ButtonGroup, Form } from "react-bootstrap";
import styles from "./privacyForm.module.scss";
import { useForm, Resolver } from 'react-hook-form';
import countryList from 'react-select-country-list';
import FooterContent from "../footerContent";
import ReCAPTCHA from "react-google-recaptcha";
import DragAndDrop from "../dragAndDrop";
import { LanguageContext } from '../../hoc/languageProvider';
import { getUserDetails, createNewUser, uploadFile } from "../../services/user.service";
 import { ToastContainer, toast } from 'react-toastify';

const PrivacyForm = () => {

  const notifySuccess = () => {
    toast.success("Form submitted successfully ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const notifyFailure = () => {
    toast.error("Failed to submit form", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const { localString, language } = useContext(LanguageContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ formData, setFormData ] = useState({
    entityName: "Hydrafacial",
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
    attachment: [],
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
  const [jobApplicantFieldStatus, setJobApplicantFieldStatus] = useState(false);
  const options = useMemo(() => setCountryLists(countryList().getData()), [])
  const [sampleData, setSampleData] = useState({})

  const captchaRef = useRef<ReCAPTCHA>(null);

  const userBtns = [
    {
      id: 1,
      name: "platformUser",
      active: false
    },
    {
      id: 2,
      name: "employee",
      active: false
    },
    {
      id: 3,
      name: "jobApplicant",
      active: false
    },
    {
      id: 4,
      name: "marketingRecipient",
      active: false
    },
    {
      id: 5,
      name: "authorizedAgent",
      active: false
    },
  ];

  const requestBtns = [
    {
      id: 1,
      name: "accessRequest",
      active: false,
    },
    {
      id: 2,
      name: "infoRequest",
      active: false
    },
    {
      id: 3,
      name: "updateRequest",
      active: false
    },
    {
      id: 4,
      name: "deletionRequest",
      active: false
    },
    {
      id: 5,
      name: "fileComplaint",
      active: false
    },
    {
      id: 6,
      name: "marketingUnsubscribe",
      active: false
    },
    {
      id: 7,
      name: "sharingData",
      active: false
    },
  ];

  const onCaptchaChange = () => {
    const token = captchaRef.current?.getValue();
    if (token) setCaptchaToken(token as string);
  };

  const handleUserType = (userType: string) => {
    setUserTypeErr(false)
    userBtns.forEach((element, index) => {
      if(element.name === userType) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    if(userType === "platformUser"){
      setCloud(true)
      setEmpDetails(false)
      setRequestTypes(requestBtns)
    } else if(userType === "employee"){
      setEmpDetails(true)
      setCloud(false)
      setRequestTypes(requestBtns.slice(0,5))
    } else if(userType === "jobApplicant"){
      setEmpDetails(false)
      setCloud(false)
      setRequestTypes(requestBtns.slice(0,5))
      setJobApplicantFieldStatus(true);
    } else {
      setCloud(false)
      setEmpDetails(false)
      setRequestTypes(requestBtns)
      setJobApplicantFieldStatus(false);
    }
    setUserTypes(userBtns)
    setFormData({
      ...formData,
      userType: userType
    })
  }

  const handleRequestType = (requestType: string) => {
    setRequestTypeErr(false)
    if(formData.userType === "employee" || formData.userType === "jobApplicant"){
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
    setSampleData(response?.data?.data[0]?.attributes)
  }

  const onSubmit = async (data: any) => {
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
    let userFileData = new FormData();
    let userFormData = new FormData();

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
    }

    userFileData.append(`files.attachment`, formData.attachment);

    if(formData.userType && formData.requestType){
      const response = await createNewUser(details, userFileData)
      if(response){
         notifySuccess()
      } else {
        notifyFailure()
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
    if(
      formData.userType !== "" &&
      formData.requestType !== "" &&
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      formData.requestDetails !== ""
    ){
      setActiveBtn(true)
    } else {
      setActiveBtn(false)
    }
  },[formData])


  return(
    <Container className={styles.containerWrapper}>
      <ToastContainer />
      <Row>
        <Col>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}>{localString["chooseEntity"]}<span className={styles.requiredField}>*</span></label>
            <select {...register("entityName", { required: localString['requiredFieldError'], onChange: (e: any) => setFormData({...formData, entityName: e.target.value }) })} className={styles.selectWrapper}>
              <option value="Hydrafacial">Hydrafacial</option>
              <option value="Convercent by Hydrafacial">Convercent by Hydrafacial</option>
              <option value="Planetly by Hydrafacial">Planetly by Hydrafacial</option>
              <option value="Tugboat logic by Hydrafacial">Tugboat logic by Hydrafacial</option>
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
                  <label className={styles.labelWrapper}>{localString["userType"]}<span className={styles.requiredField}>*</span></label>
                </Col>
              </Row>
              <Row>
                <div className={!userTypeErr ? styles.userTypeLayout : styles.userTypeErr}>
                  {userTypes?.map((button, index) => {
                    return(
                      <Button key={index} className={button.active ? styles.userTypeBtn : styles.userInActiveBtn} onClick={() => handleUserType(button.name)}>{localString[button.name] || ''}</Button>
                    )
                  })}
                </div>
                {userTypeErr && <p className={styles.errMsg}>{localString['requiredFieldError']}</p>}
              </Row>
            </Col>
          </Row>
          {showCloud && (
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>{localString["cloudType"]}</label>
              <select className={styles.selectWrapper} {...register("cloudType", { required: false, onChange: (e: any) => {setFormData({...formData, cloudType: e.target.value})} })}>
                <option></option>
                <option value="Privacy & Data Governance Cloud">Privacy & Data Governance Cloud</option>
                <option value="GRC & Security Assurance Cloud">GRC & Security Assurance Cloud</option>
                <option value="Ethics & Compliance Cloud">Ethics & Compliance Cloud</option>
                <option value="ESG & Sustainability Cloud">ESG & Sustainability Cloud</option>
                <option value="Hydrafacial PreferenceChoice">Hydrafacial PreferenceChoice</option>
                <option value="Hydrafacial Ethics">Hydrafacial Ethics</option>
                <option value="Hydrafacial ESG">Hydrafacial ESG</option>
              </select>
            </Row>
          )}
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}>{localString["country"]}<span className={styles.requiredField}>*</span></label>
            <select className={styles.selectWrapper} options={options} {...register("country", { required: localString['requiredFieldError'], onChange: (e: any) => setFormData({...formData, country: e.target.value }) })}>
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
                <label className={styles.labelWrapper}>{localString["requestType"]}<span className={styles.requiredField}>*</span></label>
              </Row>
              <Row>
                <div className={!requestTypeErr ? styles.userTypeLayout : styles.userTypeErr}>
                  {requestTypes?.map((button, index) => {
                    return(
                      <Button key={index} className={button.active ? styles.userTypeBtn : styles.userInActiveBtn} onClick={() => handleRequestType(button.name)}>{localString[button.name] || ''}</Button>
                    )
                  })}
                </div>
                {requestTypeErr && <p className={styles.errMsg}>{localString['requiredFieldError']}</p>}
              </Row>
            </Col>
          </Row>
          <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>{localString["firstName"]}<span className={styles.requiredField}>*</span></label>
              <input className={styles.inputField} type="text" placeholder="" {...register("firstName", {required: localString['requiredFieldError'], onChange: (e: any) => setFormData({...formData, firstName: e.target.value }), maxLength: 80})} />
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
            <label className={styles.labelWrapper}>{localString["lastName"]}<span className={styles.requiredField}>*</span></label>
            <input className={styles.inputField} type="text" placeholder="" {...register("lastName", {required: localString['requiredFieldError'], onChange: (e: any) => setFormData({...formData, lastName: e.target.value }), maxLength: 100})} />
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
            <label className={styles.labelWrapper}>{localString["email"]}<span className={styles.requiredField}>*</span></label>
            <input
              className={styles.inputField}
              type="text"
              placeholder=""
              {...register("email", {
                required: localString['requiredFieldError'],
                onChange: (e: any) => setFormData({...formData, email: e.target.value }),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: localString["invalidEmail"]
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
          {(empDetails || jobApplicantFieldStatus) && (<Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}>{localString["jobtitle"]}</label>
            <input className={styles.inputField} type="text" placeholder="" {...register("Your Job Title or Position Applied For", { onChange: (e: any) => setFormData({...formData, jobtitle: e.target.value }) })} />
          </Row>)}
          {empDetails &&
            <>
              <Row className={styles.rowWrapper}>
                <label className={styles.labelWrapper}>{localString["startDate"]}</label>
                <input className={styles.inputField} type="date" placeholder="" {...register("Your Employment Start Date", { onChange: (e: any) => setFormData({...formData, employmentStartDate: e.target.value }) })} />
              </Row>
              <Row className={styles.rowWrapper}>
                <label className={styles.labelWrapper}>{localString["endDate"]}</label>
                <input className={styles.inputField} type="date" placeholder="" {...register("Your Employment End Date", { onChange: (e: any) => setFormData({...formData, employmentEndDate: e.target.value }) })} />
              </Row>
            </>
          }
          <Row className={styles.rowWrapper}>
            <label className={styles.labelWrapper}>{localString["requestDetails"]}<span className={styles.requiredField}>*</span></label>
            <textarea className={styles.textInputField} {...register("requestDetails", {required: localString['requiredFieldError'], onChange: (e: any) => setFormData({...formData, requestDetails: e.target.value }) })} />
            {errors.requestDetails ? (
              <>
                {errors.requestDetails.type === "required" && (
                  <p className={styles.errMsg}>
                    {errors.requestDetails.message}
                  </p>
                )}
              </>
            ) : null}
          </Row>
          <Row>
            <FooterContent />
          </Row>
          <Row className={styles.rowWrapper}>
            {/* <label className={styles.labelWrapper}>Please confirm your understanding of the above before submitting your request</label> */}
            {/* <select className={styles.selectWrapper} {...register("termsAggred", { required: true,  onChange: (e: any) => setFormData({...formData, termsAggred: e.target.value }) })}>
              <option value="true">I understand</option>
            </select> */}
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label={localString['agreeTerms']}
              className={styles.agreeTerms}
              {...register("termsAggred", { required: true,  onChange: (e: any) => setFormData({...formData, termsAggred: true }) })}
            />
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
              <DragAndDrop
                formData={formData}
                setFormData={setFormData}
              />
            </Col>
          </Row>
          <Row className={styles.submitBtnWrapper}>
            <input type="submit"  className={styles.submitActiveBtn} />
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
