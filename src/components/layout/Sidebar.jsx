import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  User,
  Train,
  Bell,
  HelpCircle
} from 'lucide-react';

export const Sidebar = ({ isOpen, closeSidebar }) => {
  // Strictly the 6 specified passenger sections
  const navItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Book Tickets', path: '/book-tickets', icon: Ticket },
    { name: 'My Account', path: '/account', icon: User },
    { name: 'Trains', path: '/trains', icon: Train },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Contact Us', path: '/contact-us', icon: HelpCircle }
  ];

  return (
    <>
      {/* Backdrop for mobile view */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Section Header */}
          <div className="px-3 pt-2">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Passenger Navigation
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => closeSidebar && closeSidebar()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20 font-semibold shadow-inner'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Guidelines Notice Widget */}
          <div className="mx-2 p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Bell className="w-4 h-4 shrink-0" />
              <span>IRCTC Guidelines</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Always carry valid Original Photo ID proof (Aadhaar, Passport, PAN) during journey.
            </p>
          </div>
        </div>

        {/* Footer Brand Info */}
        <div className="p-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 font-medium">Railway Reservation System</p>
        </div>
      </aside>
    </>
  );
};
