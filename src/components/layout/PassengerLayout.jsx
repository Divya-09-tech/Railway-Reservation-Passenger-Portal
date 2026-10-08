import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PassengerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#172033] flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pb-12">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
