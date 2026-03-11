import './InputField.css';
import { type ChangeEvent } from "react";

type InputFieldTypes = {
    inputType: string;
    inputValue: string;
    inputPlaceholder: string;
    inputMaxLength: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({ inputType, inputValue, inputPlaceholder, inputMaxLength, onChange }: InputFieldTypes) => {
    return (
        <input
            type={inputType}
            value={inputValue}
            onChange={onChange}
            placeholder={inputPlaceholder}
            maxLength={inputMaxLength}
            className='input-field'
        />
    )
}

export default InputField;