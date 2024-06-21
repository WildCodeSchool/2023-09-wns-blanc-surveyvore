import { PasswordValidationProps } from "@/lib/tools/user.tools";
import Icon from "./Icon/Icon";

function PasswordValidationList({
  validations,
}: {
  validations: PasswordValidationProps[];
}) {
  return (
    <ul
      className={`password-validation ${
        validations.every((el) => el.isValid) && "validation-complete"
      }`}>
      {validations.map((validation, index) => (
        <li key={index} className={validation.isValid ? "valid" : "invalid"}>
          <Icon
            width={validation.isValid ? "16" : "14"}
            name={validation.isValid ? "check-circle" : "cross"}
          />
          {validation.message}
        </li>
      ))}
    </ul>
  );
}

export default PasswordValidationList;

