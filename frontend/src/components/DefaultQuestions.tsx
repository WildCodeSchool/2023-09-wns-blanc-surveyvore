import { useState } from "react";
import Input from "./Input";

function DefaultQuestions() {
  const [lastname, setLastname] = useState(true);
  const [firstname, setFirstname] = useState(true);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);

  console.log(lastname, firstname, email, phone);

  const questions = [
    {
      inputName: "collecting-lastname",
      labelName: "Nom",
      setToggle: setLastname,
      checked: lastname,
    },
    {
      inputName: "collecting-firstname",
      labelName: "Prénom",
      setToggle: setFirstname,
      checked: firstname,
    },
    {
      inputName: "collecting-email",
      labelName: "Email",
      setToggle: setEmail,
      checked: email,
    },
    {
      inputName: "collecting-phone",
      labelName: "Téléphone",
      setToggle: setPhone,
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
            <Input
              type="checkbox"
              inputName={question.inputName}
              labelName={question.labelName}
              toggle
              setToggle={question.setToggle}
              checked={question.checked}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DefaultQuestions;

