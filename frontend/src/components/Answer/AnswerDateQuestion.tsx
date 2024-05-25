import { Question } from "@/types/question.type";
import { useState } from "react";
import DatePicker from "react-datepicker";

function AnswerDateQuestion({ question }: { question: Question }) {
  console.log(question)
  let typeOfDate: string;
  question.answer && question.answer[0].content ? typeOfDate = question.answer[0].content : typeOfDate = "date";
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChangePeriod = (dates: any) => {
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
      {typeOfDate === "période" ? <DatePicker
        selected={startDate}
        onChange={onChangePeriod}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="dd/MM/yyyy"
      /> : <DatePicker
        selected={startDate}
        onChange={onChangeDate}
        startDate={startDate}
        dateFormat="dd/MM/yyyy"
      />}
    </>
  )
}

export default AnswerDateQuestion;
