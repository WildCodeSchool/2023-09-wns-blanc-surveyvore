import { useState } from "react";
import Input from "./Input";
import Toggle from "./Toggle";

function DefaultQuestions() {
  const [lastname, setLastname] = useState(true);
  const [firstname, setFirstname] = useState(true);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);

  const onToggleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    set(e.target.checked);
  };

  const questions = [
    {
      inputName: "collecting-lastname",
      labelName: "Nom",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.checked);
      },
      checked: lastname,
    },
    {
      inputName: "collecting-firstname",
      labelName: "Prénom",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.checked);
      },
      checked: firstname,
    },
    {
      inputName: "collecting-email",
      labelName: "Email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.checked);
      },
      checked: email,
    },
    {
      inputName: "collecting-phone",
      labelName: "Téléphone",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.checked);
      },
      checked: phone,
    },
  ];
  return (
    <section className="survey-section">
      <p>Données utilisateur·rice</p>
      {/* TODO : voir si possible de remplacer cette div par un autre élément HTML */}
      <div className="default-questions-container">
        {questions.map((question) => (
          <div
            className="input-switch input-switch--sm"
            key={question.inputName}>
            <Toggle
              inputName={question.inputName}
              labelName={question.labelName}
              onChange={question.onChange}
              checked={question.checked}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DefaultQuestions;

