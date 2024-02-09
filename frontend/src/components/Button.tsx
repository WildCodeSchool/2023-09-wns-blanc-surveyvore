import Image from "next/image";

function Button({
  icon,
  type,
  alt,
  text,
  set,
}: {
  icon?: string;
  type: "submit" | "reset" | "button" | undefined;
  alt: string;
  text: string;
  set: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    set(target.value);
    console.log(target.value);
  };

  return (
    <button
      type={type}
      className="button-xl-grey-outline"
      value={text}
      onClick={handleClick}>
      {icon && <Image src={icon} alt={alt} width={16} height={16} />}
      {text}
    </button>
  );
}

export default Button;

