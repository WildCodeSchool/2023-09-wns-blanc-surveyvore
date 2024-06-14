import { IconName } from "@/types/iconName.type";
import Icon from "../Icon/Icon";

export type RadioElement = {
    id: string;
    title: string;
    icon: IconName;
    description?: string;
    onClick: () => void;
    isChecked: boolean;
};

export default function RadioGroup({
    elements,
    name,
    label,
}: {
    elements: RadioElement[];
    name: string;
    label?: string;
}) {
    return (
        <div className="radio-group">
            {label && <div className="label">{label}</div>}

            <div className="radio-group-container">
                {elements.map((element) => (
                    <div
                        className="radio-element"
                        key={name + "-" + element.id}
                    >
                        <input
                            type="radio"
                            name={name}
                            id={name + "-" + element.id}
                            value={element.title}
                            onChange={element.onClick}
                            checked={element.isChecked}
                        />
                        <label htmlFor={name + "-" + element.id}>
                            <div className="header">
                                <Icon
                                    name={element.icon}
                                    width="1rem"
                                    height="1rem"
                                />
                                <p className="title">{element.title}</p>
                            </div>
                            <p className="description">{element.description}</p>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
