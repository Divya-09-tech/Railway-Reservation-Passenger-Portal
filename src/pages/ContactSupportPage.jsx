import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, HelpCircle, FileText, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockPassenger } from '../data/mockData';

export const ContactSupportPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: mockPassenger.name,
    email: 'passenger.user@example.com',
    pnr: '',
    category: 'Booking Support',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Us & Support
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Need help with your booking or journey? We're here to help.
        </p>
      </div>

      {/* HELPLINE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="p-2 bg-amber-50 text-amber-700 rounded-lg w-fit">
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Railway Helpline</span>
          <p className="text-2xl font-extrabold text-slate-900">139</p>
          <p className="text-[11px] text-slate-500">24x7 All-India Train Enquiry & Status</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="p-2 bg-blue-50 text-[#1e3a8a] rounded-lg w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Security Helpline</span>
          <p className="text-2xl font-extrabold text-slate-900">182</p>
          <p className="text-[11px] text-slate-500">Railway Protection Force Emergency</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg w-fit">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Booking Support</span>
          <p className="text-sm font-bold text-slate-900 mt-1">Ticket Assistance</p>
          <p className="text-[11px] text-slate-500">For ticket booking, cancellation and payment related assistance.</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-lg w-fit">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">TDR & Refunds</span>
          <p className="text-sm font-bold text-slate-900 mt-1">TDR Support Desk</p>
          <p className="text-[11px] text-slate-500">For filing and tracking TDR refund requests.</p>
        </div>
      </div>

      {/* SUPPORT REQUEST FORM */}
      <div className="max-w-2xl mx-auto">
        <Card title="Submit Support Request" subtitle="Send your query or issue details directly to our customer support desk">
          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Request Submitted Successfully</h3>
              <p className="text-xs text-slate-600">Reference ID: <strong>SUP-840192</strong>. A support officer will review and reply to your email within 4 hours.</p>
              <Button variant="secondary" size="sm" onClick={() => setFormSubmitted(false)}>Submit Another Request</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">PNR / Booking Reference (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 8457291234"
                    value={formData.pnr}
                    onChange={(e) => setFormData({ ...formData, pnr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Issue Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-900"
                  >
                    <option value="Booking Support">Booking & Ticket Assistance</option>
                    <option value="Cancellation">Cancellation & Refund Query</option>
                    <option value="TDR Support">TDR Refund Support</option>
                    <option value="Technical Issue">Website / Payment Technical Issue</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Your Message / Problem Description</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe how we can assist you..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900"
                  required
                />
              </div>

              <Button type="submit" variant="primary" icon={Send} className="font-bold px-6">
                Submit Support Request
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
