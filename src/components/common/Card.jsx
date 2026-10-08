import React from 'react';

export const Card = ({ children, className = '', title, subtitle, action, hover = false }) => {
  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs transition-all duration-150 ${
        hover ? 'hover:border-slate-300 hover:shadow-md' : ''
      } ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
