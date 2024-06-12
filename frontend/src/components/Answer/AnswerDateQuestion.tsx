import { Question } from "@/types/question.type";
import { fr } from "date-fns/locale";
import { forwardRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Input from "../Input";

const CustomInput = forwardRef((props: any, ref) => {
  return <Input {...props} ref={ref} />;
});
CustomInput.displayName = 'CustomInput';

registerLocale('fr', fr);
function AnswerDateQuestion({ question }: { question: Question }) {
  let typeOfDate: string;
  question.answer && question.answer[0].content ? typeOfDate = question.answer[0].content : typeOfDate = "date";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(``);
  const onChangePeriod = (dates: any,) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onChangeDate = (date: any) => {
    const start = date;
    setStartDate(start);
  };
  return (
    <>
      <p>{typeOfDate}</p>
      <div>
        {typeOfDate === "période" ? <DatePicker
          selected={startDate}
          onChange={onChangePeriod}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="dd/MM/yyyy"
          locale="fr"
          placeholderText="Sélectionner une période"
          customInput={<CustomInput
            type="text"
            inputName={`input-date_${question.id}`}
            value={date}
            setValue={setDate}
          />}
        /> : <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          dateFormat="dd/MM/yyyy"
          locale="fr"
          placeholderText="Sélectionner une date"
          customInput={<CustomInput
            type="text"
            inputName={`input-date_${question.id}`}
            value={date}
            setValue={setDate}
          />}
        />}
      </div>
    </>
  )
}

export default AnswerDateQuestion;
