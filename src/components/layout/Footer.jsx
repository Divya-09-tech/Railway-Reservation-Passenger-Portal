import React from 'react';
import { ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-6 px-4 lg:px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1e3a8a]" />
          <span className="text-slate-900 font-bold">Railway Reservation & Management System</span>
          <span className="text-slate-400">• Official Passenger Portal</span>
        </div>

        {/* Center: Quick Contacts */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            <span>Railway Helpline: <strong className="text-slate-900">139</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Security Helpline: <strong className="text-slate-900">182</strong></span>
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="text-slate-500">
          <span>Frontend Passenger Portal</span>
        </div>
      </div>
    </footer>
  );
};
