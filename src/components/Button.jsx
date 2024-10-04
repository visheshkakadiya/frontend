import React from 'react';

const Button = React.forwardRef(({ 
    children, 
    type = "button", 
    bgColor = "blue", 
    textColor = "text-white", 
    className = "", 
    ...props 
}, ref) => {
    return (
        <button
            ref={ref}  // Forward the ref to the button element
            type={type}
            className={`${className} ${bgColor} ${textColor} hover:scale-110 duration-100 ease-in`}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;
