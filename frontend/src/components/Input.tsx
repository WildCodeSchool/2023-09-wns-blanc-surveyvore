import { useEffect, useRef } from "react";

function Input({
  focus,
  type,
  inputName,
  textarea,
  placeholder,
  labelName,
  inputClassName,
  labelClassName,
  value,
  setValue,
  onBlur,
}: {
  focus?: boolean;
  type?: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  inputClassName?: string;
  labelClassName?: string;
  textarea?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: (e: React.FocusEvent) => void;
}): JSX.Element {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focus && ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <label htmlFor={inputName} className={labelClassName}>
      {labelName && <p>{labelName}</p>}
      {textarea ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          name={inputName}
          value={value ? value : ""}
          data-test-id={inputName}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClassName}
          onBlur={onBlur}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          className={inputClassName}
          type={type}
          name={inputName}
          id={inputName}
          placeholder={placeholder}
          value={value}
          data-test-id={inputName}
          onChange={handleChange}
          onBlur={onBlur}
        />
      )}
    </label>
  );
}

export default Input;

