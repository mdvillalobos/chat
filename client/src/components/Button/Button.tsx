import './Button.css'

type ButtonProps = {
    type: "submit" | "reset" | "button",
    value: string,
    onClick?: () => void,
    isSubmitting?: boolean,
}

const Button = ({ type, value, onClick, isSubmitting } : ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick ? onClick : undefined}
            className='button-component'
            disabled={isSubmitting}
        >
            {isSubmitting
                ? (
                    <div className="line-wobble"></div>
                )
                : value
            }
        </button>
    )
}

export default Button