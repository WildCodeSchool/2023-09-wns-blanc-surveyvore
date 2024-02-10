import { useEffect, useState } from "react";

function Input({
  type,
  inputName,
  textarea,
  placeholder,
  labelName,
  inputClassName,
  labelClassName,
  toggle,
  setToggle,
  checked,
}: {
  type?: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  inputClassName?: string;
  labelClassName?: string;
  textarea?: boolean;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  checked?: boolean;
}): JSX.Element {
  const [value, setValue] = useState(placeholder);

  const switchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggle && setToggle(e.target.checked);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={inputName} className={labelClassName}>
      {labelName && !toggle && <p>{labelName}</p>}
      {textarea ? (
        <textarea
          name={inputName}
          value={value}
          data-test-id={inputName}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClassName}
        />
      ) : (
        <input
          className={inputClassName}
          type={type}
          name={inputName}
          id={inputName}
          placeholder={placeholder}
          value={value}
          data-test-id={inputName}
          onChange={toggle ? switchData : handleChange}
          checked={checked}
        />
      )}
      {toggle && (
        <>
          <div className="toggle-switch"></div>
          <p>{labelName}</p>
        </>
      )}
    </label>
  );
}

export default Input;

