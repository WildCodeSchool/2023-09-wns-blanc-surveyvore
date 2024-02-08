import { useEffect, useState } from "react";

function Input({
  type,
  inputName,
  textarea,
  placeholder,
  labelName,
}: {
  type: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  textarea?: boolean;
}): JSX.Element {
  const [value, setValue] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={inputName}>
      {labelName && <p>{labelName}</p>}
      {textarea ? (
        <textarea
          name={inputName}
          value={value}
          data-test-id={inputName}
          onChange={handleChange}
          placeholder={placeholder}></textarea>
      ) : (
        <input
          type={type}
          name={inputName}
          placeholder={placeholder}
          value={value}
          data-test-id={inputName}
          onChange={handleChange}
        />
      )}
    </label>
  );
}

export default Input;

