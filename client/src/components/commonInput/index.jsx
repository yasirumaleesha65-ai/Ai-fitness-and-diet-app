function CommonInput({
  label,
  type = "text",
  name,
  placeholder = "Enter value here",
  required = false,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-lg sm:text-xl font-semibold mb-2 text-gray-800"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full border-2 border-gray-400 h-12 sm:h-14 bg-white rounded-xl px-3 text-lg font-medium text-gray-800 focus:outline-none focus:border-blue-600 transition ${
          type === "file" ? "cursor-pointer" : ""
        }`}
      />
    </div>
  );
}

export default CommonInput;
