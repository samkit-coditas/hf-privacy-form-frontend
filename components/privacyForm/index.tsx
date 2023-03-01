import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import styles from "./privacyForm.module.scss";
import { useForm, Resolver } from "react-hook-form";
import countryList from "react-select-country-list";
import NoteContent from "../noteContent";
import ReCAPTCHA from "react-google-recaptcha";
import DragAndDrop from "../dragAndDrop";
import { LanguageContext } from "../../hoc/languageProvider";
import {
  getUserDetails,
  createNewUser,
  uploadFile,
} from "../../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import {
  cloudTypeOptions,
  entityTypeOptions,
  countryOptions,
} from "constants/constants";
import FormButtonInput from "../../sharedComponents/formButtonInput/formButtonInput";
import FormLabels from "../../sharedComponents/formLabels/formLabels";
import FormInputs from "../../sharedComponents/formInputs/formInputs";
import FormSelect from "../../sharedComponents/formSelects/formSelects";
import { useRouter } from "next/navigation";

const PrivacyForm = ({refresh, URLlang}) => {
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
  };

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
  };

  const { localString, language } = useContext(LanguageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [formData, setFormData] = useState({
    entityName: "Hydrafacial",
    userType: "",
    // cloudType: "",
    country: "",
    requestType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobtitle: "",
    employmentStartDate: "",
    employmentEndDate: "",
    appliedFor: "",
    requestDetails: "",
    termsAggred: false,
    locale: "en",
    attachment: [],
  });
  const [countryLists, setCountryLists] = useState([]);
  const [captchaToken, setCaptchaToken] = useState("");
  const [userTypes, setUserTypes] = useState([]);
  const [userTypeErr, setUserTypeErr] = useState(false);
  const [requestTypes, setRequestTypes] = useState([]);
  const [requestTypeErr, setRequestTypeErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [failureMsg, setFailureMsg] = useState(false);
  // const [showCloud, setCloud] = useState(false);
  const [empDetails, setEmpDetails] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [jobApplicantFieldStatus, setJobApplicantFieldStatus] = useState(false);
  const options = useMemo(() => setCountryLists(countryList().getData()), []);
  const [sampleData, setSampleData] = useState({});
  const [isDataLoading, updateDataLoading] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [reload, setReload] = useState(false);
  const router = useRouter();

  useEffect(() => {
    clearErrors()
  },[refresh])

  //commenting code for future use
  // useEffect(() => {
  //   if(reload){
  //     setTimeout(() => {
  //       console.log("reloaded")
  //       window.location.reload(true)
  //     }, 1000)
  //   }
  // },[refresh])

  const userBtns = [
    // {
    //   id: 1,
    //   name: "jobApplicant",
    //   active: false,
    // },
    {
      id: 2,
      name: "employee",
      active: false,
    },
    {
      id: 3,
      name: "provider",
      active: false,
    },
    {
      id: 4,
      name: "esti",
      active: false,
    },
    {
      id: 5,
      name: "client",
      active: false,
    },
    {
      id: 6,
      name: "marketingRecipient",
      active: false,
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
      active: false,
    },
    {
      id: 3,
      name: "updateRequest",
      active: false,
    },
    {
      id: 4,
      name: "restrictionRequest",
      active: false,
    },
    {
      id: 5,
      name: "deletionRequest",
      active: false,
    },
    {
      id: 6,
      name: "fileComplaint",
      active: false,
    },
    {
      id: 7,
      name: "marketingUnsubscribe",
      active: false,
    },
  ];

  const onCaptchaChange = () => {
    const token = captchaRef.current?.getValue();
    if (token) setCaptchaToken(token as string);
  };

  const handleUserType = (userType: string) => {
    setUserTypeErr(false);
    userBtns.forEach((element, index) => {
      if (element.name === userType) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    if (userType === "jobApplicant") {
      // setCloud(true);
      setEmpDetails(false);
      setRequestTypes(requestBtns.slice(0, 6));
    } else if (userType === "employee") {
      setEmpDetails(true);
      // setCloud(false);
      setRequestTypes(requestBtns.slice(0, 6));
    } else if (userType === "provider") {
      setEmpDetails(false);
      // setCloud(false);
      setRequestTypes(requestBtns);
      setJobApplicantFieldStatus(true);
    } else {
      // setCloud(false);
      setEmpDetails(false);
      setRequestTypes(requestBtns);
      setJobApplicantFieldStatus(false);
    }
    setUserTypes(userBtns);
    setFormData({
      ...formData,
      userType: userType,
    });
  };

  const handleRequestType = (requestType: string) => {
    setRequestTypeErr(false);
    if (
      formData.userType === "employee" ||
      formData.userType === "jobApplicant"
    ) {
      requestBtns.slice(0, 6).forEach((element) => {
        if (element.name === requestType) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      setRequestTypes(requestBtns.slice(0, 6));
    } else {
      requestBtns.forEach((element, index) => {
        if (element.name === requestType) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
      setRequestTypes(requestBtns);
    }
    setFormData({
      ...formData,
      requestType: requestType,
    });
  };

  const getUsers = async () => {
    const response = await getUserDetails();
    // setSampleData(response?.data?.data[0]?.attributes)
  };

  const onSubmit = async (data: any) => {
    updateDataLoading(true);
    if (formData.userType === "") {
      setUserTypeErr(true);
    } else {
      setUserTypeErr(false);
    }
    if (formData.requestType === "") {
      setRequestTypeErr(true);
    } else {
      setRequestTypeErr(false);
    }
    let userFileData = new FormData();
    let userFormData = new FormData();

    let details = {
      entity_name: formData.entityName,
      user_type: formData.userType,
      // cloud_type: formData.cloudType,
      country: formData.country,
      request_type: formData.requestType,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      jobtitle: formData.jobtitle || "",
      employment_start_date: formData.employmentStartDate || null,
      employment_end_date: formData.employmentEndDate || null,
      applied_for: "",
      request_details: formData.requestDetails,
      terms_aggred: formData.termsAggred,
      locale: "en",
    };

    userFileData.append(`files.attachment`, formData.attachment);

    if (formData.userType && formData.requestType) {
      const response = await createNewUser(details, userFileData);
      updateDataLoading(false);
      if (response) {
        notifySuccess();
      } else {
        notifyFailure();
      }
    }
  };

  useEffect(() => {
    setUserTypes(userBtns);
    setRequestTypes(requestBtns);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (
      formData.userType !== "" &&
      formData.requestType !== "" &&
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      formData.requestDetails !== ""
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [formData]);

  return (
    <Container className={styles.containerWrapper}>
      <ToastContainer />
      <Row>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Row className={styles.rowWrapper}>
            <FormLabels
              labelName={localString["chooseEntity"]}
              required={true}
            />
            <FormSelect
              options={entityTypeOptions}
              fieldName={"entityName"}
              required={localString['requiredFieldError']}
              onChange={(e: any) => setFormData({...formData, entityName: e.target.value })}
            />
            {errors.entityName ? (
              <>
                {errors.entityName.type === "required" && (
                  <p style={{color: "red"}}>
                    {errors.entityName.message}
                  </p>
                )}
              </>
            ) : null}
          </Row> */}
            <Row className={styles.rowWrapper}>
              <Col>
                <Row>
                  <FormLabels
                    labelName={localString["userType"]}
                    required={true}
                  />
                </Row>
                <Row>
                  <FormButtonInput
                    buttonList={userTypes}
                    buttonErr={userTypeErr}
                    handleButtonChange={handleUserType}
                  />
                  {userTypeErr && (
                    <p className={styles.errMsg}>
                      {localString["requiredFieldError"]}
                    </p>
                  )}
                </Row>
              </Col>
            </Row>
            {/* {showCloud && (
              <Row className={styles.rowWrapper}>
                <FormLabels
                  labelName={localString["cloudType"]}
                  required={false}
                />
                <FormSelect
                  options={cloudTypeOptions}
                  fieldName={"cloudType"}
                  required={false}
                  onChange={(e: any) => {
                    setFormData({ ...formData, cloudType: e.target.value });
                  }}
                />
              </Row>
            )} */}
            <Row className={styles.rowWrapper}>
              <FormLabels labelName={localString["country"]} required={true} />
              <FormSelect
                options={countryOptions}
                fieldName={"country"}
                required={localString["requiredFieldError"]}
                onChange={(e: any) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                registerProps={register}
              />
              {errors.country ? (
                <>
                  {errors.country.type === "required" && (
                    <p className={styles.errMsg}>{errors.country.message}</p>
                  )}
                </>
              ) : null}
            </Row>
            <Row className={styles.rowWrapper}>
              <Col>
                <Row>
                  <FormLabels
                    labelName={localString["requestType"]}
                    required={true}
                  />
                </Row>
                <Row>
                  <FormButtonInput
                    buttonList={requestTypes}
                    buttonErr={requestTypeErr}
                    handleButtonChange={handleRequestType}
                  />
                  {requestTypeErr && (
                    <p className={styles.errMsg}>
                      {localString["requiredFieldError"]}
                    </p>
                  )}
                </Row>
              </Col>
            </Row>
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>
                {localString["firstName"]}
                <span className={styles.requiredField}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="text"
                placeholder=""
                {...register("firstName", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) =>
                    setFormData({ ...formData, firstName: e.target.value }),
                  maxLength: 80,
                })}
              />
              {errors.firstName ? (
                <>
                  {errors.firstName.type === "required" && (
                    <p className={styles.errMsg}>{errors.firstName.message}</p>
                  )}
                </>
              ) : null}
            </Row>
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>
                {localString["lastName"]}
                <span className={styles.requiredField}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="text"
                placeholder=""
                {...register("lastName", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) =>
                    setFormData({ ...formData, lastName: e.target.value }),
                  maxLength: 100,
                })}
              />
              {errors.lastName ? (
                <>
                  {errors.lastName.type === "required" && (
                    <p className={styles.errMsg}>{errors.lastName.message}</p>
                  )}
                </>
              ) : null}
            </Row>
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>
                {localString["email"]}
                <span className={styles.requiredField}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="email"
                placeholder=""
                {...register("email", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) =>
                    setFormData({ ...formData, email: e.target.value }),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: localString["invalidEmail"],
                  },
                })}
              />
              {errors.email ? (
                <>
                  {errors.email.type === "required" && (
                    <p className={styles.errMsg}>{errors.email.message}</p>
                  )}
                  {errors.email.type === "pattern" && (
                    <p className={styles.errMsg}>{errors.email.message}</p>
                  )}
                </>
              ) : null}
            </Row>
            <Row className={styles.rowWrapper}>
              <label className={styles.labelWrapper}>
                {localString["phone"]}
                <span className={styles.requiredField}>*</span>
              </label>
              <input
                className={styles.inputField}
                type="text"
                placeholder=""
                {...register("phone", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) =>
                    setFormData({ ...formData, phone: e.target.value }),
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                    message: localString["invalidPhone"]
                  }
                })}
              />
              {errors.phone ? (
                <>
                  {errors.phone.type === "required" && (
                    <p className={styles.errMsg}>{errors.phone.message}</p>
                  )}
                  {errors.phone.type === "pattern" && (
                    <p className={styles.errMsg}>{errors.phone.message}</p>
                  )}
                </>
              ) : null}
            </Row>
            {/* {(empDetails || jobApplicantFieldStatus) && (
              <Row className={styles.rowWrapper}>
                <FormLabels
                  labelName={localString["jobtitle"]}
                  required={false}
                />
                <FormInputs
                  type="text"
                  fieldName={"Your Job Title or Position Applied For"}
                  onChange={(e: any) =>
                    setFormData({ ...formData, jobtitle: e.target.value })
                  }
                />
              </Row>
            )} */}
            {/* {empDetails && (
              <>
                <Row className={styles.rowWrapper}>
                  <FormLabels
                    labelName={localString["startDate"]}
                    required={false}
                  />
                  <FormInputs
                    type="date"
                    fieldName={"Your Employment Start Date"}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        employmentStartDate: e.target.value,
                      })
                    }
                  />
                </Row>
                <Row className={styles.rowWrapper}>
                  <FormLabels
                    labelName={localString["endDate"]}
                    required={false}
                  />
                  <FormInputs
                    type="date"
                    fieldName={"Your Employment End Date"}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        employmentEndDate: e.target.value,
                      })
                    }
                  />
                </Row>
              </>
            )} */}
            <Row className={styles.rowWrapper}>
              <FormLabels
                labelName={localString["requestDetails"]}
                required={true}
              />
              <textarea
                className={styles.textInputField}
                {...register("requestDetails", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) =>
                    setFormData({
                      ...formData,
                      requestDetails: e.target.value,
                    }),
                })}
              />
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
              <NoteContent />
            </Row>
            <Row className={styles.rowWrapper}>
              <FormLabels
                labelName={localString["agreeTermsLabel"]}
                required={false}
              />
              <Form.Check
                type="checkbox"
                id={`default-checkbox`}
                label={localString["agreeTerms"]}
                className={styles.agreeTerms}
                {...register("termsAggred", {
                  required: localString["requiredFieldError"],
                  onChange: (e: any) => {
                    setFormData({
                      ...formData,
                      termsAggred: !formData.termsAggred,
                    });
                  },
                })}
              />
              {errors.termsAggred ? (
                <>
                  {errors.termsAggred.type === "required" && (
                    <p className={styles.errMsg}>
                      {errors.termsAggred.message}
                    </p>
                  )}
                </>
              ) : null}
            </Row>
            <Row>
              <div className={styles.recaptchaWrapper}>
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY || ""}
                  onChange={onCaptchaChange}
                  size="normal"
                  hl={language}
                />
              </div>
            </Row>
            <Row className={styles.rowWrapper}>
              <Col>
                <DragAndDrop formData={formData} setFormData={setFormData} />
              </Col>
            </Row>
            <Row className={styles.submitBtnWrapper}>
              <Button
                className={`${styles.submitActiveBtn} ${styles.ripple}`}
                type="submit"
                disabled={isDataLoading}
              >
                {isDataLoading
                  ? localString["pleaseWait"]
                  : localString["submit"]}
              </Button>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(PrivacyForm);
