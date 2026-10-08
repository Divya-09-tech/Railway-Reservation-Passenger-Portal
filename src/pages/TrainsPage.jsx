import React, { useState } from 'react';
import {
  Search,
  Ticket,
  Train,
  Navigation,
  Calendar,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockPnrDatabase, mockPopularTrains } from '../data/mockData';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const TrainsPage = () => {
  const [activeTab, setActiveTab] = useState('pnr-enquiry');

  // PNR Search State
  const [pnrInput, setPnrInput] = useState('8457291234');
  const [pnrResult, setPnrResult] = useState(mockPnrDatabase['8457291234']);

  // Live Track State
  const [trackInput, setTrackInput] = useState('12124');
  const [trackedTrain, setTrackedTrain] = useState({
    number: "12124",
    name: "Deccan Queen Express",
    currentLocation: "Lonavala (LNL)",
    nextStation: "Kalyan Junction (KYN)",
    expectedArrival: "09:25 AM",
    statusText: "Running On Time",
    delayMinutes: 0
  });

  const handlePnrSearch = (e) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;
    const res = mockPnrDatabase[pnrInput.trim()] || {
      pnr: pnrInput,
      trainNumber: "12124",
      trainName: "Deccan Queen Express",
      from: "PUNE",
      to: "CSMT",
      doj: "15-10-2026",
      chartStatus: "Chart Not Prepared",
      passengers: [{ bookingStatus: "CNF / C1 / 32 / WINDOW", currentStatus: "CNF (Confirmed)" }]
    };
    setPnrResult(res);
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setTrackedTrain({
      number: trackInput || "12124",
      name: "Deccan Queen Express",
      currentLocation: "Lonavala (LNL)",
      nextStation: "Kalyan Junction (KYN)",
      expectedArrival: "09:25 AM",
      statusText: "Running On Time",
      delayMinutes: 0
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Railway Services & Enquiries
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Check live PNR status, view train timetables, track live running location, and request coach bookings.
        </p>
      </div>

      {/* Service Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 flex flex-wrap gap-2">
        {[
          { id: 'pnr-enquiry', label: 'PNR Status Enquiry', icon: Ticket },
          { id: 'train-schedule', label: 'Train Schedule', icon: Train },
          { id: 'track-train', label: 'Track Your Train', icon: Compass },
          { id: 'coach-booking', label: 'Coach Booking', icon: Navigation },
          { id: 'connecting-journey', label: 'Connecting Journey', icon: MapPin }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1e3a8a] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SERVICE 1: PNR ENQUIRY */}
      {activeTab === 'pnr-enquiry' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card title="Check 10-Digit PNR Status" subtitle="Instant status lookup for passenger reservations">
            <form onSubmit={handlePnrSearch} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Enter PNR Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pnrInput}
                    onChange={(e) => setPnrInput(e.target.value)}
                    placeholder="e.g. 8457291234"
                    maxLength={10}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-[#1e3a8a]"
                  />
                  <Button type="submit" variant="primary" icon={Search} className="font-bold">
                    Check Status
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {pnrResult && (
            <Card title={`PNR Summary: ${pnrResult.pnr}`} subtitle={`Train ${pnrResult.trainNumber} - ${pnrResult.trainName}`}>
              <div className="space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Route & Date</span>
                    <strong className="text-slate-900 font-bold">{pnrResult.from} → {pnrResult.to} ({pnrResult.doj})</strong>
                  </div>
                  <Badge variant="green">{pnrResult.chartStatus}</Badge>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-900 block">Passenger Booking Status</span>
                  {pnrResult.passengers.map((p, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Passenger {idx + 1}</span>
                      <strong className="text-emerald-700 font-bold">{p.bookingStatus}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* SERVICE 2: TRAIN SCHEDULE */}
      {activeTab === 'train-schedule' && (
        <Card title="Train Schedule & Timetable" subtitle="Complete route halts and timings for 12124 Deccan Queen">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-wrap justify-between text-xs">
              <div>
                <span className="font-extrabold text-[#1e3a8a]">12124 Deccan Queen Express</span>
                <p className="text-slate-600">Pune Junction (PUNE) → Mumbai CSMT (CSMT)</p>
              </div>
              <span className="font-semibold text-slate-700">Runs: Daily</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Station Name</th>
                    <th className="py-2.5 px-3">Arr. Time</th>
                    <th className="py-2.5 px-3">Dep. Time</th>
                    <th className="py-2.5 px-3">Halt</th>
                    <th className="py-2.5 px-3 text-right">Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { sr: 1, name: "Pune Junction (PUNE)", arr: "--", dep: "07:15 AM", halt: "--", dist: "0 km" },
                    { sr: 2, name: "Lonavala (LNL)", arr: "08:08 AM", dep: "08:10 AM", halt: "2 mins", dist: "64 km" },
                    { sr: 3, name: "Kalyan Junction (KYN)", arr: "09:23 AM", dep: "09:25 AM", halt: "2 mins", dist: "139 km" },
                    { sr: 4, name: "Dadar Central (DR)", arr: "10:03 AM", dep: "10:05 AM", halt: "2 mins", dist: "184 km" },
                    { sr: 5, name: "Mumbai CSMT (CSMT)", arr: "10:25 AM", dep: "--", halt: "--", dist: "192 km" }
                  ].map((row) => (
                    <tr key={row.sr} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-500">{row.sr}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{row.name}</td>
                      <td className="py-3 px-3 text-slate-700">{row.arr}</td>
                      <td className="py-3 px-3 text-slate-900 font-bold">{row.dep}</td>
                      <td className="py-3 px-3 text-slate-600">{row.halt}</td>
                      <td className="py-3 px-3 text-right text-slate-600 font-medium">{row.dist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* SERVICE 3: TRACK YOUR TRAIN */}
      {activeTab === 'track-train' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <Card title="Track Live Train Status" subtitle="Real-time GPS running location">
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="Enter Train Number or Name"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#1e3a8a]"
                />
                <Button type="submit" variant="primary" icon={Compass} className="font-bold">
                  Track Train
                </Button>
              </div>
            </form>

            {trackedTrain && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-[#1e3a8a]">{trackedTrain.number} - {trackedTrain.name}</span>
                    <p className="text-xs text-slate-700 mt-0.5">Current Location: <strong className="text-slate-900">{trackedTrain.currentLocation}</strong></p>
                  </div>
                  <Badge variant="green">{trackedTrain.statusText}</Badge>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Upcoming Station:</span>
                    <strong className="text-slate-900">{trackedTrain.nextStation}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Arrival Time:</span>
                    <strong className="text-slate-900">{trackedTrain.expectedArrival}</strong>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* SERVICE 4: COACH BOOKING */}
      {activeTab === 'coach-booking' && (
        <Card title="Coach & Charter Booking Request" subtitle="Book full coach or special train charter for group travel">
          <form onSubmit={(e) => { e.preventDefault(); alert("Coach booking request submitted."); }} className="space-y-4 max-w-xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Type of Booking</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900">
                <option value="Full Coach">Full AC Coach (72 Seats)</option>
                <option value="Sleeper Coach">Full Sleeper Coach (72 Seats)</option>
                <option value="Special Train">Full Special Train Charter</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">From Station</label>
                <input type="text" defaultValue="Pune Junction" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">To Station</label>
                <input type="text" defaultValue="Mumbai CSMT" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900" />
              </div>
            </div>

            <Button type="submit" variant="primary" className="font-bold">
              Submit Charter Request
            </Button>
          </form>
        </Card>
      )}

      {/* SERVICE 5: CONNECTING JOURNEY */}
      {activeTab === 'connecting-journey' && (
        <Card title="Connecting Journey Search" subtitle="Search multi-leg train routes when direct trains are unavailable">
          <div className="space-y-4 max-w-xl">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#1e3a8a]">Multi-Leg Route Assistant</span>
              <p className="text-slate-600">Find convenient connecting stations with guaranteed layover time windows.</p>
            </div>

            <Button variant="primary" onClick={() => alert("Searching connecting routes...")} className="font-bold">
              Find Connecting Routes
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
