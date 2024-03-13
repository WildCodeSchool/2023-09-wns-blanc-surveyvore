import { IconName } from "@/types/IconName.type";
import Icon from "../Icon/Icon";

type RadioElement = {
    id: string;
    title: string;
    icon: IconName;
    description?: string;
    onClick: () => void;
};

export default function RadioGroup({ elements, name }: { elements: RadioElement[], name: string }) {
    return (
        <div className="radio-group">
            {elements.map((element) => (
                <div className="radio-element" key={element.id}>
                    <input
                        type="radio"
                        name={name}
                        id={element.id}
                        value={element.title}
                        onChange={element.onClick}
                    />
                    <label htmlFor={element.id}>
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
    );
}
