function Toggle({
  onChange,
  checked,
  inputName,
  labelName,
  labelClassName,
  inputClassName,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  inputName: string;
  labelName?: string;
  labelClassName?: string;
  inputClassName?: string;
}) {
  return (
    <label htmlFor={inputName} className={labelClassName}>
      <input
        className={inputClassName}
        type="checkbox"
        name={inputName}
        id={inputName}
        data-test-id={inputName}
        onChange={onChange}
        checked={checked}
      />

      <>
        <div className="toggle-switch"></div>
        <p>{labelName}</p>
      </>
    </label>
  );
}

export default Toggle;

