import { useState } from "react";
import Icon from "../Icon/Icon";
import { Option } from "@/types/options.type";
import { SurveyState } from "@/types/surveyState.type";
import { IconName } from "@/types/iconName.type";
import { displayState } from "@/lib/tools/survey.tools";

function DropdownItem({
  options,
  icon,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[] | SurveyState[];
  icon: IconName;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function isSurveyState(option: any): option is SurveyState {
    return (
      option instanceof Object &&
      "id" in option &&
      "state" in option &&
      "color" in option
    );
  }

  function handleClick(option: any) {
    if (isSurveyState(option)) {
      setSelectedOption(option.state === selectedOption ? "" : option.state);
    } else {
      setSelectedOption(option.option === selectedOption ? "" : option.option);
    }

    setIsDropdownOpen(false);
  }

  return (
    <div className="filters-container">
      <button
        className="button-md-white-outline filter"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}>
        <Icon name={icon} height="1rem" width="1rem" />
        Filtrer
      </button>
      {isDropdownOpen && (
        <div className="dropdown-wrapper">
          {options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              className="dropdown-item">
              {isSurveyState(option) ? (
                <div className={`badge-lg-pale-${option.color}-square`}>
                  <span className="dot" /> <p>{displayState(option.state)}</p>
                </div>
              ) : (
                <div className="option">
                  <Icon name={option.icon} height="1rem" width="1rem" />
                  <p>{option.option}</p>
                </div>
              )}
              {(selectedOption === option.state ||
                selectedOption === option.option) && (
                <Icon
                  name="check-circle"
                  width="1rem"
                  height="1rem"
                  color="purple"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownItem;

