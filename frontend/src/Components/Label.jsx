import React from 'react';
import { cn } from '../lib/utils';

export function Label({ children, className = '', htmlFor = undefined, required = false, ...props }) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn('block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5', className)}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
}
