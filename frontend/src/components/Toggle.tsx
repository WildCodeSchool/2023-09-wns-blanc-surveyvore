function Toggle({
  setToggle,
  checked,
  inputName,
  labelName,
  labelClassName,
  inputClassName,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  inputName: string;
  labelName?: string;
  labelClassName?: string;
  inputClassName?: string;
}) {
  const switchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(e.target.checked);
  };

  return (
    <label htmlFor={inputName} className={labelClassName}>
      <input
        className={inputClassName}
        type="checkbox"
        name={inputName}
        id={inputName}
        data-test-id={inputName}
        onChange={switchData}
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

