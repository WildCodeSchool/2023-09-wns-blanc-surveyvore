import { useEffect, useState } from "react";

function Input({
  type,
  inputName,
  textarea,
  placeholder,
  labelName,
  inputClassName,
  labelClassName,
  toggle
}: {
  type: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  textarea?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  toggle?: boolean;
}): JSX.Element {
  const [value, setValue] = useState("");
  const [collectingData, setCollectingData] = useState(false)

  const switchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectingData(e.target.checked)
    console.log(e.target.checked);
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={inputName} className={labelClassName}>
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
          id={inputName}
          placeholder={placeholder}
          value={value}
          data-test-id={inputName}
          onChange={toggle ? switchData : handleChange}
          className={inputClassName}
        />
      )}
      {toggle &&
        <div className="toggle-switch">
        </div>
      }
      {labelName && <p>{labelName}</p>}
    </label>
  );
}

export default Input;

