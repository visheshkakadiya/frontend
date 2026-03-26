import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    { label, type = "text", placeholder, className = "", ...props },
    ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1.5 pl-1 font-medium text-dark-200 text-sm tracking-wide" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`px-3 py-2.5 bg-dark-800/50 backdrop-blur-md text-white outline-none focus:bg-dark-800 transition-all duration-300 border border-dark-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg shadow-sm focus:shadow-glow w-full text-sm placeholder:text-dark-400 ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    );
});

export default Input;
