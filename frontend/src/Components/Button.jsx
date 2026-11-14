import React from 'react';
import { cn } from '../lib/utils';

export function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#1B84FF] hover:bg-[#056EE9] text-white focus:ring-[#1B84FF]',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-300',
        danger: 'bg-[#F8285A] hover:bg-[#D81A46] text-white focus:ring-[#F8285A]',
        outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-300',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
