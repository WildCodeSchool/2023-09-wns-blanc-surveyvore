function Input({
  type,
  inputName,
  textarea,
  placeholder,
  labelName,
  inputClassName,
  labelClassName,
  value,
  setValue,
}: {
  type?: string;
  inputName: string;
  placeholder?: string;
  labelName?: string;
  inputClassName?: string;
  labelClassName?: string;
  textarea?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={inputName} className={labelClassName}>
      {labelName && <p>{labelName}</p>}
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
          onChange={handleChange}
        />
      )}
    </label>
  );
}

export default Input;

