function Button({
  icon,
  type,
  alt,
  text,
  additionalText,
  handleClick,
  className,
}: {
  icon?: string;
  type: "submit" | "reset" | "button" | undefined;
  alt?: string;
  text: string;
  additionalText?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}) {
  return (
    <>
      <button
        type={type}
        className={className}
        value={text}
        onClick={handleClick}>
        {icon && <img src={icon} alt={alt ? alt : ""} />}
        {text}
        {additionalText && (
          <span className="additional-text">{additionalText}</span>
        )}
      </button>
    </>
  );
}

export default Button;

