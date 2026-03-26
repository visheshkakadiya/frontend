import React from 'react';

const Button = React.forwardRef(({ 
    children, 
    type = "button", 
    bgColor = "bg-primary-500 hover:bg-primary-600", 
    textColor = "text-white", 
    className = "", 
    ...props 
}, ref) => {
    return (
        <button
            ref={ref}  // Forward the ref to the button element
            type={type}
            className={`${className} ${bgColor} ${textColor} px-4 py-2 font-medium rounded-lg shadow-md hover:shadow-glow transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:scale-95`}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;
