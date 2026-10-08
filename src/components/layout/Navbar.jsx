import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Train, Bell, Menu, X } from 'lucide-react';
import { mockPassenger } from '../../data/mockData';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Tickets', path: '/book-tickets' },
    { name: 'My Account', path: '/account' },
    { name: 'Trains', path: '/trains' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="bg-[#1e3a8a] text-white p-2 rounded-lg shadow-xs group-hover:bg-[#1d4ed8] transition-colors">
                <Train className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-900 leading-tight">
                  Railway Reservation & Management System
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Passenger Portal</span>
              </div>
            </NavLink>
          </div>

          {/* Center: Desktop Horizontal Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#1e3a8a] font-semibold bg-blue-50/80 border-b-2 border-[#1e3a8a]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Notifications & User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
            </button>

            {/* Divya Profile Info */}
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e3a8a] font-extrabold text-xs">
                DT
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{mockPassenger.shortName}</p>
                <p className="text-[11px] text-slate-500">Account</p>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-[#1e3a8a] bg-blue-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
