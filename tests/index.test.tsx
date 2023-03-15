import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageProvider } from "../hoc/languageProvider";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../test-utils/createMockRouter";
import Footer from "../components/footer";
import HeaderContent from "../components/headerContent";
import PageHeader from "../components/pageHeader";
import NoteContent from "../components/noteContent";
import DragAndDrop from "../components/dragAndDrop";
import FormButtons from "../sharedComponents/formButtons/formButtons";
import FormInputs from "../sharedComponents/formInputs/formInputs";
import FormLabels from "../sharedComponents/formLabels/formLabels";
import FormSelect from "../sharedComponents/formSelects/formSelects";
import FormButtonInput from "../sharedComponents/formButtonInput/formButtonInput";

describe("Header", () => {
  it("Renders a Header", () => {
    render(
      <LanguageProvider>
        <HeaderContent />
      </LanguageProvider>
    );
    expect(screen.getByTestId("contentTitle")).toBeInTheDocument();
    expect(screen.getByTestId("contentDescriptionOne")).toBeInTheDocument();
    expect(screen.getByTestId("contentDescriptionTwo")).toBeInTheDocument();
    expect(screen.getByTestId("contentFooter")).toBeInTheDocument();
  });
});
describe("Page Header", () => {
  it("Renders a Page Header", () => {
    render(
      <LanguageProvider>
        <PageHeader />
      </LanguageProvider>
    );
    expect(screen.getByTestId("brandingLogo")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("Renders a Footer", () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("brandingLogo")).toBeInTheDocument();
    expect(screen.getByTestId("footerTitle")).toBeInTheDocument();
    expect(screen.getByTestId("footerAddress")).toBeInTheDocument();
    expect(screen.getByTestId("contactUs")).toBeInTheDocument();
    expect(screen.getByTestId("footerLinks")).toBeInTheDocument();
  });
});

describe("Note", () => {
  it("Renders notes with content", () => {
    render(
      <LanguageProvider>
        <NoteContent />
      </LanguageProvider>
    );
    expect(screen.getByTestId("noteHeading")).toBeInTheDocument();
    expect(screen.getByTestId("noteDetails")).toBeInTheDocument();
    expect(screen.getByTestId("privacyPolicyLink")).toBeInTheDocument();
  });
});

describe("drag and Drop", () => {
  it("Renders Drag and Drop Component", () => {
    render(
      <LanguageProvider>
        <DragAndDrop formData={undefined} setFormData={undefined} />
      </LanguageProvider>
    );
    expect(screen.getByTestId("mainContainer")).toBeInTheDocument();
    expect(screen.getByTestId("dropZone")).toBeInTheDocument();
    expect(screen.getByTestId("fileSelect")).toBeInTheDocument();
    expect(screen.getByTestId("attachment")).toBeInTheDocument();
    expect(screen.getByTestId("uploadMessage")).toBeInTheDocument();
    expect(screen.getByTestId("filePreview")).toBeInTheDocument();
  });
});

describe("Form Buttons", () => {
  it("Renders a button", () => {
    render(
      <LanguageProvider>
        <FormButtons
          key={""}
          className={""}
          handleClick={() => {}}
          button={undefined}
          buttonName={""}
        />
      </LanguageProvider>
    );
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });
});

describe("Form Labels Required", () => {
  it("Renders a Form Label with required symbol", () => {
    render(
      <LanguageProvider>
        <FormLabels labelName={""} required={true} />
      </LanguageProvider>
    );
    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByTestId("required")).toBeInTheDocument();
  });
});

describe("Form Inputs", () => {
  it("Renders a Form Input", () => {
    render(
      <LanguageProvider>
        <FormInputs
          type={undefined}
          placeholder={undefined}
          fieldName={undefined}
          requiredText={undefined}
          onChange={undefined}
          maxLength={undefined}
          pattern={undefined}
        />
      </LanguageProvider>
    );
    expect(screen.getByTestId("formInput")).toBeInTheDocument();
  });
});

describe("Form Select", () => {
  it("Renders a Form Select", () => {
    render(
      <LanguageProvider>
        <FormSelect
          options={undefined}
          fieldName={undefined}
          required={undefined}
          onChange={undefined}
          registerProps={undefined}
          val={undefined}
        />
      </LanguageProvider>
    );
    expect(screen.getByTestId("select")).toBeInTheDocument();
    expect(screen.getByTestId("option")).toBeInTheDocument();
  });
});

describe("Form Button Inputs", () => {
  it("Renders a Form Buttons List", () => {
    render(
      <LanguageProvider>
        <FormButtonInput
          buttonList={undefined}
          buttonErr={false}
          handleButtonChange={() => {}}
        />
      </LanguageProvider>
    );
    expect(screen.getByTestId("formButtonsInput")).toBeInTheDocument();
  });
});
// describe("Footer", () => {
//   it("Renders a Footer", () => {
//     render(
//       <LanguageProvider>
//         <Footer />
//       </LanguageProvider>
//     );
//     // check if all components are rendered
//     expect(screen.getByTestId("brandLogo")).toBeInTheDocument();
//     expect(screen.getByTestId("policyLink")).toBeInTheDocument();
//     expect(screen.getByTestId("language")).toBeInTheDocument();
//     expect(screen.getByTestId("contentTitle")).toBeInTheDocument();
//     expect(screen.getByTestId("contentDescriptionOne")).toBeInTheDocument();
//     expect(screen.getByTestId("contentDescriptionTwo")).toBeInTheDocument();
//     expect(screen.getByTestId("contentFooter")).toBeInTheDocument();
//     expect(screen.getByTestId("form")).toBeInTheDocument();
//     expect(screen.getByTestId("userType")).toBeInTheDocument();
//     expect(screen.getByTestId("requestType")).toBeInTheDocument();
//     expect(screen.getByTestId("country")).toBeInTheDocument();
//     expect(screen.getByTestId("firstName")).toBeInTheDocument();
//     expect(screen.getByTestId("lastName")).toBeInTheDocument();
//     expect(screen.getByTestId("email")).toBeInTheDocument();
//     expect(screen.getByTestId("phone")).toBeInTheDocument();
//     expect(screen.getByTestId("requestDetails")).toBeInTheDocument();
//     expect(screen.getByTestId("agreeTermsLabel")).toBeInTheDocument();
//     expect(screen.getByTestId("reCaptcha")).toBeInTheDocument();
//     expect(screen.getByTestId("submitButton")).toBeInTheDocument();
//   });
// });
