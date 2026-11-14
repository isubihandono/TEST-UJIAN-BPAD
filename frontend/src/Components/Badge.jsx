import React from 'react';
import { cn } from '../lib/utils';

export function Badge({ children, variant = 'primary', className = '' }) {
    const variants = {
        primary: 'bg-blue-50 text-blue-600 border-blue-200',
        success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        warning: 'bg-amber-50 text-amber-600 border-amber-200',
        danger: 'bg-rose-50 text-rose-600 border-rose-200',
        secondary: 'bg-slate-100 text-slate-600 border-slate-200',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                variants[variant] || variants.secondary,
                className
            )}
        >
            {children}
        </span>
    );
}
