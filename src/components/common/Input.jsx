import React from 'react';

export const Input = ({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
      <div className="relative rounded-lg shadow-2xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          className={`block w-full rounded-lg bg-white border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-[#1e3a8a] focus:ring-blue-500/20'
          } ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-150 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
};
