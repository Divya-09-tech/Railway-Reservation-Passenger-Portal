import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Clock, Info } from 'lucide-react';
import { mockAlerts } from '../data/mockData';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const AlertsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Alerts & Notifications
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Official notifications regarding your train bookings, platform updates, and journey schedules.
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5 hover:border-slate-300 transition-colors"
            >
              <div className="p-2 bg-blue-50 text-[#1e3a8a] rounded-lg shrink-0 mt-0.5">
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                  <span className="text-xs text-slate-500 font-medium">{alert.time}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{alert.message}</p>
              </div>
            </div>
          ))}

          {/* Additional Realistic Journey Notifications */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Payment Successfully Completed</h3>
                <span className="text-xs text-slate-500 font-medium"> Yesterday</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Payment of ₹510.45 received via UPI for booking PNR 8457291234. E-ticket sent to passenger.user@example.com.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
