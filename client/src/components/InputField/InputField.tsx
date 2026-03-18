import './InputField.css';
import {type ChangeEvent, type ComponentType, type ElementType} from "react";

type InputFieldTypes = {
    type: string;
    value: string;
    placeholder: string;
    maxLength: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    Icon?: ComponentType
    IconOnClick?: () => void
}
const InputField = ({ type, value, placeholder, maxLength, onChange, Icon, IconOnClick }: InputFieldTypes) => {
    return (
        <div className='input-component-container'>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className='input-field'
            />
            {Icon && (
                <button
                    type='button'
                    className='input-button-action'
                    onClick={IconOnClick ? IconOnClick : undefined}
                >
                    <Icon/>
                </button>
            )}
        </div>
    )
}

export default InputField;