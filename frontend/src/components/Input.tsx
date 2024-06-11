import { forwardRef, useEffect, useRef, useState } from "react";
import useCombinedRefs from '../lib/fixtures/useCombinedRefs';

interface InputProps {
    focus?: boolean;
    type?: string;
    inputName: string;
    placeholder?: string;
    labelName?: string;
    inputClassName?: string;
    labelClassName?: string;
    textarea?: boolean;
    value: string;
    width?: number;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onClick?: () => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
    focus,
    type,
    inputName,
    textarea,
    placeholder,
    labelName,
    inputClassName,
    labelClassName,
    value,
    width,
    setValue,
    onBlur,
    onClick,
}, ref) => {
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(ref, internalRef);
    const [widthDataDatepicker, setWidthDataDatePicker] = useState(0);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (focus && combinedRef.current) {
            combinedRef.current.focus();
        }
        if (inputName === "date-input" && combinedRef.current) {
            setWidthDataDatePicker(combinedRef.current.scrollWidth);
        }
    }, [focus, combinedRef, value, inputName]);

    return (
        <div className={`input-field ${width ? `field--${width}` : ""}`}>
            {labelName && (
                <label htmlFor={inputName} className={labelClassName}>
                    {labelName}
                </label>
            )}
            {textarea ? (
                <textarea
                    ref={combinedRef as React.RefObject<HTMLTextAreaElement>}
                    name={inputName}
                    value={value}
                    data-testid={inputName}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`textarea ${inputClassName || ""}`}
                    onBlur={onBlur}
                />
            ) : (
                <div className={`input ${inputClassName || ""}`}>
                    <input
                        ref={combinedRef as React.RefObject<HTMLInputElement>}
                        type={type}
                        name={inputName}
                        id={inputName}
                        placeholder={placeholder}
                        autoComplete={type === "password" ? "current-password" : ""}
                        value={value}
                        data-testid={inputName}
                        onChange={handleChange}
                        onBlur={onBlur}
                        onClick={onClick}
                        {...(inputName === "date-input" && { style: { width: `${widthDataDatepicker}px` } })}
                    />
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;