import React, { useState } from 'react';
import {
  Train,
  Search,
  Calendar,
  MapPin,
  ArrowLeftRight,
  Ticket,
  Clock,
  Navigation,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight
} from 'lucide-react';
import {
  mockPassenger,
  mockUpcomingTicket,
  mockRecentBookings,
  mockPopularTrains,
  mockPnrDatabase,
  mockAlerts
} from '../data/mockData';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const PassengerDashboard = () => {
  const user = mockPassenger;

  // Search Panel State
  const [fromStation, setFromStation] = useState('Pune Junction (PUNE)');
  const [toStation, setToStation] = useState('Mumbai CSMT (CSMT)');
  const [journeyDate, setJourneyDate] = useState('2026-10-15');
  const [travelClass, setTravelClass] = useState('ALL');
  const [quota, setQuota] = useState('GN');

  // PNR Search State
  const [pnrInput, setPnrInput] = useState('');
  const [pnrResult, setPnrResult] = useState(null);

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Mock train search: ${fromStation} → ${toStation} on ${journeyDate} [Class: ${travelClass}, Quota: ${quota}]`);
  };

  const handlePnrCheck = (e) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;
    const found = mockPnrDatabase[pnrInput.trim()] || {
      pnr: pnrInput,
      trainNumber: "12124",
      trainName: "Deccan Queen Express",
      from: "PUNE",
      to: "CSMT",
      doj: "15-10-2026",
      chartStatus: "Chart Not Prepared",
      passengers: [{ bookingStatus: "CNF / C1 / 32 / WINDOW", currentStatus: "CNF (Confirmed)" }]
    };
    setPnrResult(found);
  };

  return (
    <div className="space-y-10">
      {/* 1. RAILWAY HERO SECTION WITH SEARCH PANEL */}
      <div className="relative">
        {/* Hero Background Banner */}
        <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">
          <img
            src="/train-hero.png"
            alt="Indian Railways Express Train"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/75 to-slate-900/60 flex items-center px-6 sm:px-12">
            <div className="max-w-2xl text-white space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-blue-100 border border-white/20">
                Official Passenger Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Book Your Train Journey
              </h1>
              <p className="text-sm sm:text-base text-slate-200">
                Search trains, check availability and manage your journey.
              </p>
            </div>
          </div>
        </div>

        {/* 2. TRAIN SEARCH PANEL (Overlapping Hero) */}
        <div className="max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-20">
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-200">
            <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#1e3a8a]" />
                <span>Search Train Tickets</span>
              </h2>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* FROM */}
                <div className="md:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#1e3a8a] focus-within:bg-white transition-all">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Station</span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-[#1e3a8a] shrink-0" />
                    <input
                      type="text"
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-slate-900 focus:outline-none"
                      placeholder="Departure Station"
                    />
                  </div>
                </div>

                {/* SWAP BUTTON */}
                <div className="md:col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={swapStations}
                    className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1e3a8a] border border-slate-200 transition-colors shadow-2xs"
                    title="Swap From / To Stations"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* TO */}
                <div className="md:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#1e3a8a] focus-within:bg-white transition-all">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Station</span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <input
                      type="text"
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-slate-900 focus:outline-none"
                      placeholder="Destination Station"
                    />
                  </div>
                </div>

                {/* JOURNEY DATE */}
                <div className="md:col-span-3 bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#1e3a8a] focus-within:bg-white transition-all">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Journey Date</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <input
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-slate-900 focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* FILTER ROW: CLASS, QUOTA & SEARCH BUTTON */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">Class:</label>
                    <select
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1e3a8a]"
                    >
                      <option value="ALL">All Classes</option>
                      <option value="1A">AC 1st Class (1A)</option>
                      <option value="2A">AC 2 Tier (2A)</option>
                      <option value="3A">AC 3 Tier (3A)</option>
                      <option value="SL">Sleeper (SL)</option>
                      <option value="CC">AC Chair Car (CC)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">Quota:</label>
                    <select
                      value={quota}
                      onChange={(e) => setQuota(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1e3a8a]"
                    >
                      <option value="GN">General (GN)</option>
                      <option value="TQ">Tatkal (TQ)</option>
                      <option value="PT">Premium Tatkal (PT)</option>
                      <option value="SS">Senior Citizen (SS)</option>
                      <option value="LD">Ladies (LD)</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" icon={Search} className="w-full sm:w-auto font-bold px-8">
                  Search Trains
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-10">
        {/* 3. QUICK RAILWAY SERVICES (Compact horizontal links) */}
        <section className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <a href="#pnr-check" className="flex items-center justify-center gap-2.5 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#1e3a8a] border border-slate-100 transition-colors font-semibold text-xs sm:text-sm">
              <Ticket className="w-4 h-4 text-[#1e3a8a]" />
              <span>PNR Enquiry</span>
            </a>

            <a href="#timetable" className="flex items-center justify-center gap-2.5 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#1e3a8a] border border-slate-100 transition-colors font-semibold text-xs sm:text-sm">
              <Train className="w-4 h-4 text-emerald-600" />
              <span>Train Schedule</span>
            </a>

            <a href="#live-track" className="flex items-center justify-center gap-2.5 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#1e3a8a] border border-slate-100 transition-colors font-semibold text-xs sm:text-sm">
              <Navigation className="w-4 h-4 text-amber-600" />
              <span>Track Your Train</span>
            </a>

            <a href="#recent-bookings" className="flex items-center justify-center gap-2.5 p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#1e3a8a] border border-slate-100 transition-colors font-semibold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Booking History</span>
            </a>
          </div>
        </section>

        {/* 4. UPCOMING JOURNEY & QUICK PNR SEARCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upcoming Journey Ticket Summary Card */}
          <div className="lg:col-span-7">
            <Card
              title="Upcoming Journey"
              subtitle="Confirmed e-ticket summary"
              action={<Badge variant="green">{mockUpcomingTicket.status}</Badge>}
            >
              <div className="space-y-4">
                {/* Train Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#1e3a8a]">{mockUpcomingTicket.trainNumber}</span>
                      <span className="text-sm font-bold text-slate-900">{mockUpcomingTicket.trainName}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">PNR: <strong className="text-slate-900 font-mono">{mockUpcomingTicket.pnr}</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Date of Journey</span>
                    <span className="text-xs font-bold text-amber-700">{mockUpcomingTicket.dateOfJourney}</span>
                  </div>
                </div>

                {/* Departure - Timeline - Arrival */}
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-left">
                    <p className="text-xl font-extrabold text-slate-900">{mockUpcomingTicket.departureTime}</p>
                    <p className="text-xs font-semibold text-slate-700">{mockUpcomingTicket.from}</p>
                    <span className="text-[11px] text-slate-500">{mockUpcomingTicket.platform}</span>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <span className="text-[11px] font-semibold text-slate-500">{mockUpcomingTicket.duration}</span>
                    <div className="w-24 sm:w-36 h-0.5 bg-slate-300 relative my-1.5">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1e3a8a] rounded-full"></div>
                      <Train className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#1e3a8a] bg-white p-0.5 rounded" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">Direct Train</span>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-extrabold text-slate-900">{mockUpcomingTicket.arrivalTime}</p>
                    <p className="text-xs font-semibold text-slate-700">{mockUpcomingTicket.to}</p>
                    <span className="text-[11px] text-emerald-700 font-bold">Confirmed</span>
                  </div>
                </div>

                {/* Seat / Coach Grid */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Class</span>
                    <span className="text-xs font-bold text-slate-900">{mockUpcomingTicket.travelClass}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Coach & Seat</span>
                    <span className="text-xs font-bold text-[#1e3a8a]">Coach {mockUpcomingTicket.coach} / Seat {mockUpcomingTicket.berth}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Passenger</span>
                    <span className="text-xs font-bold text-slate-900">{mockUpcomingTicket.passengers[0].name}</span>
                  </div>
                </div>

                {/* Ticket Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button size="sm" variant="outline">View Ticket</Button>
                  <Button size="sm" variant="secondary" icon={Navigation}>Track Train</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick PNR Status Search */}
          <div className="lg:col-span-5" id="pnr-check">
            <Card title="PNR Enquiry" subtitle="Instantly verify status of any 10-digit PNR">
              <form onSubmit={handlePnrCheck} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Enter 10-Digit PNR Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pnrInput}
                      onChange={(e) => setPnrInput(e.target.value)}
                      placeholder="e.g. 8457291234"
                      maxLength={10}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1e3a8a]"
                    />
                    <Button type="submit" size="sm" variant="primary">
                      Check PNR
                    </Button>
                  </div>
                </div>

                {/* PNR Search Output */}
                {pnrResult ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900">PNR: {pnrResult.pnr}</span>
                      <Badge variant="green">{pnrResult.chartStatus}</Badge>
                    </div>
                    <p className="text-slate-800 font-medium">{pnrResult.trainName} ({pnrResult.doj})</p>
                    <div className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600">Passenger Status:</span>
                      <span className="font-bold text-emerald-700">{pnrResult.passengers[0].bookingStatus}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-1">
                    <Ticket className="w-5 h-5 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-500">Test PNR Lookup with sample: <strong className="text-[#1e3a8a] font-mono">8457291234</strong></p>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>

        {/* 5. RECENT BOOKINGS TABLE & IMPORTANT ALERTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="recent-bookings">
          {/* Recent Bookings Table */}
          <div className="lg:col-span-8">
            <Card title="Recent Bookings" subtitle="Your recent reservation records">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                      <th className="py-2.5 px-3">PNR</th>
                      <th className="py-2.5 px-3">Train</th>
                      <th className="py-2.5 px-3">Journey</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockRecentBookings.map((b) => (
                      <tr key={b.pnr} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.pnr}</td>
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {b.trainNumber} - {b.trainName}
                        </td>
                        <td className="py-3 px-3 text-slate-600">{b.route}</td>
                        <td className="py-3 px-3 text-slate-700 font-medium">{b.doj}</td>
                        <td className="py-3 px-3">
                          <Badge variant={b.statusBadge}>{b.status}</Badge>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button className="text-xs font-semibold text-[#1e3a8a] hover:underline cursor-pointer">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Important Alerts */}
          <div className="lg:col-span-4">
            <Card title="Important Alerts" subtitle="Official journey updates & notifications">
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{alert.title}</span>
                      <span className="text-[10px] text-slate-400">{alert.time}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* 6. POPULAR TRAINS MOCK SCHEDULE */}
        <section id="timetable">
          <Card title="Popular Express Trains" subtitle="Popular Trains mock schedule & seat availability grid">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                    <th className="py-2.5 px-3">Train Info</th>
                    <th className="py-2.5 px-3">Route</th>
                    <th className="py-2.5 px-3">Timings</th>
                    <th className="py-2.5 px-3">Classes & Fares (Mock)</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockPopularTrains.map((train) => (
                    <tr key={train.number} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-extrabold text-[#1e3a8a] block">{train.number}</span>
                        <span className="font-bold text-slate-900">{train.name}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        <p className="font-medium">{train.from} → {train.to}</p>
                        <span className="text-[10px] text-slate-500">Duration: {train.duration}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-800">
                        <p><strong className="text-slate-900">{train.dep}</strong> Departure</p>
                        <span className="text-[10px] text-slate-500">{train.arr} Arrival</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1.5">
                          {train.classes.map((cls) => (
                            <div
                              key={cls.code}
                              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[11px]"
                            >
                              <span className="font-bold text-slate-900">{cls.code}: </span>
                              <span className="text-emerald-700 font-bold">₹{cls.price}</span>
                              <span className="text-[10px] text-slate-500 block">{cls.status}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button size="sm" variant="primary">
                          Book Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};
