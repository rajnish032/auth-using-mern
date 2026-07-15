import React from 'react';

const Button = ({ children, isLoading, className = '', type = 'button', variant = 'primary', ...props }) => {
    const baseStyle = "flex justify-center items-center gap-2 py-3 px-4 transition-all duration-300 w-full outline-none disabled:opacity-50 disabled:cursor-not-allowed font-ui text-xs uppercase tracking-widest";
    
    const variants = {
        primary: "border border-accent text-accent hover:bg-accent hover:text-void focus:bg-accent focus:text-void",
        secondary: "border border-structure text-bone hover:bg-structure hover:text-void focus:bg-structure focus:text-void",
        danger: "border border-red-800 text-red-500 hover:bg-red-800 hover:text-bone focus:bg-red-800 focus:text-bone"
    };

    return (
        <button
            type={type}
            disabled={isLoading}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
