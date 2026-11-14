import React from 'react';
import { cn } from '../lib/utils';

export function Card({ children, className = '', ...props }) {
    return (
        <div
            className={cn('bg-white rounded-xl border border-slate-200/80 shadow-xs p-6', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
    return (
        <div className={cn('flex items-center justify-between pb-4 border-b border-slate-100 mb-5', className)}>
            <div>
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
