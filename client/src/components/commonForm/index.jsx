import CommonInput from "../commonInput";
// import CommonSelect from "../commonSelect";
// import CommonTextarea from "../commonTextArea";

const formTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

function CommonForm({ formControls = [], onHandleSubmit, buttonText }) {
  function renderFormElement(getCurrentElement) {
    switch (getCurrentElement?.componentType) {
      case formTypes.INPUT:
        return (
          <CommonInput
            label={getCurrentElement.label}
            name={getCurrentElement.name}
            type={getCurrentElement.type}
            placeholder={getCurrentElement.placeholder}
          />
        );

      case formTypes.TEXTAREA:
        return (
          <CommonTextarea
            label={getCurrentElement.label}
            name={getCurrentElement.name}
            placeholder={getCurrentElement.placeholder}
          />
        );

      case formTypes.SELECT:
        return (
          <CommonSelect
            label={getCurrentElement.label}
            name={getCurrentElement.name}
            options={getCurrentElement.options}
            placeholder={getCurrentElement.placeholder}
          />
        );

      default:
        return (
          <CommonInput
            label={getCurrentElement.label}
            name={getCurrentElement.name}
            type={getCurrentElement.type}
            placeholder={getCurrentElement.placeholder}
          />
        );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    onHandleSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full flex flex-col gap-5"
    >
      {/* Render all fields */}
      {formControls?.map((element, index) => (
        <div key={index}>{renderFormElement(element)}</div>
      ))}

      {/* Submit Button */}
      <div className="mt-3">
        <button
          type="submit"
          className="w-full py-4 text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-md hover:opacity-90 transition duration-300"
        >
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}

export default CommonForm;
