import React from 'react';
import { cn } from '../lib/utils';

export function Input({
    type = 'text',
    className = '',
    error = null,
    ...props
}) {
    return (
        <div>
            <input
                type={type}
                className={cn(
                    'w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white transition-colors text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2',
                    error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-[#1B84FF] focus:ring-[#1B84FF]/20',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
