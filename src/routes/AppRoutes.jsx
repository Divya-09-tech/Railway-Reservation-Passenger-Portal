import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PassengerLayout } from '../components/layout/PassengerLayout';
import { PassengerDashboard } from '../pages/PassengerDashboard';
import { BookTicketsPage } from '../pages/BookTicketsPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TrainsPage } from '../pages/TrainsPage';
import { AlertsPage } from '../pages/AlertsPage';
import { ContactSupportPage } from '../pages/ContactSupportPage';

export const AppRoutes = () => {
  return (
    <PassengerLayout>
      <Routes>
        {/* Home Page - Kept exactly as designed */}
        <Route path="/" element={<PassengerDashboard />} />

        {/* Real Commercial Passenger Pages */}
        <Route path="/book-tickets" element={<BookTicketsPage />} />
        <Route path="/account" element={<MyAccountPage />} />
        <Route path="/trains" element={<TrainsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/contact-us" element={<ContactSupportPage />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PassengerLayout>
  );
};
