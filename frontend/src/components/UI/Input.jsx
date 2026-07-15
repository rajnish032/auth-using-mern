import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, id, error, icon, className = '', ...props }, ref) => {
    return (
        <div className="w-full mb-6">
            {label && (
                <label htmlFor={id} className="block font-ui text-xs uppercase tracking-widest text-muted mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={`w-full py-3 border border-faint focus:border-accent bg-transparent text-bone outline-none transition-colors duration-300 ${error ? 'border-red-500 text-red-400' : ''} ${icon ? 'pl-10 pr-4' : 'px-4'} ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-2 font-ui text-xs uppercase tracking-widest text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
