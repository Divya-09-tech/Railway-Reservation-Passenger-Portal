import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  ArrowLeftRight,
  Filter,
  Train,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  User,
  Plus,
  X,
  ChevronDown
} from 'lucide-react';
import { mockPassenger, mockPopularTrains } from '../data/mockData';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const BookTicketsPage = () => {
  // Search Form State
  const [fromStation, setFromStation] = useState('Pune Junction (PUNE)');
  const [toStation, setToStation] = useState('Mumbai CSMT (CSMT)');
  const [journeyDate, setJourneyDate] = useState('2026-10-15');
  const [travelClass, setTravelClass] = useState('ALL');
  const [quota, setQuota] = useState('GN');

  // Filter & Sort State
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('departure');

  // Selected Train for Booking Flow Modal
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Passengers & Prefs, 2: Payment, 3: Confirmation

  // Booking Flow Form State
  const [boardingStation, setBoardingStation] = useState('Pune Junction (PUNE)');
  const [passengerName, setPassengerName] = useState('Passenger User');
  const [passengerAge, setPassengerAge] = useState('29');
  const [passengerGender, setPassengerGender] = useState('Male');
  const [berthPreference, setBerthPreference] = useState('Window');
  const [contactEmail, setContactEmail] = useState('passenger.user@example.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [autoUpgradation, setAutoUpgradation] = useState(true);
  const [confirmOnly, setConfirmOnly] = useState(false);
  const [preferredCoach, setPreferredCoach] = useState('C1');
  const [travelInsurance, setTravelInsurance] = useState(true);
  const [paymentMode, setPaymentMode] = useState('UPI');

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const openBookingModal = (train) => {
    setSelectedTrain(train);
    setBookingStep(1);
  };

  const closeBookingModal = () => {
    setSelectedTrain(null);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setBookingStep(3);
    }
  };

  // Filtered & Sorted Trains
  let trainList = [...mockPopularTrains];
  if (selectedClassFilter !== 'ALL') {
    trainList = trainList.filter(t => t.classes.some(c => c.code === selectedClassFilter));
  }
  if (sortBy === 'departure') {
    trainList.sort((a, b) => a.dep.localeCompare(b.dep));
  } else if (sortBy === 'duration') {
    trainList.sort((a, b) => a.duration.localeCompare(b.duration));
  } else if (sortBy === 'fare') {
    trainList.sort((a, b) => a.classes[0].price - b.classes[0].price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Book Train Tickets
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Search train schedules, select your preferred seat class, and complete your reservation.
        </p>
      </div>

      {/* 1. SEARCH FORM PANEL */}
      <Card>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1e3a8a] border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                title="Swap Stations"
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

          {/* Quota & Class Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600">Travel Class:</label>
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

            <Button variant="primary" size="md" icon={Search} className="w-full sm:w-auto font-bold px-6">
              Search Trains
            </Button>
          </div>
        </form>
      </Card>

      {/* 2. FILTERS & SORTING BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#1e3a8a]" />
          <span className="text-xs font-bold text-slate-700">Filter Class:</span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', '1A', '2A', '3A', 'SL', 'CC'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClassFilter(cls)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedClassFilter === cls
                    ? 'bg-[#1e3a8a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1e3a8a]"
          >
            <option value="departure">Departure Time</option>
            <option value="duration">Travel Duration</option>
            <option value="fare">Lowest Fare</option>
          </select>
        </div>
      </div>

      {/* 3. TRAIN RESULTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Available Trains ({trainList.length} Found)
          </h2>
          <span className="text-xs text-slate-500">{fromStation} → {toStation}</span>
        </div>

        {trainList.map((train) => (
          <div
            key={train.number}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-[#1e3a8a]">{train.number}</span>
                  <span className="text-base font-bold text-slate-900">{train.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Runs On: {train.runsOn.join(', ')}</span>
                  <span>•</span>
                  <span>Classes: {train.classes.map(c => c.code).join(', ')}</span>
                </div>
              </div>

              {/* Timing & Duration */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12">
                <div className="text-left">
                  <p className="text-lg font-extrabold text-slate-900">{train.dep}</p>
                  <p className="text-xs font-medium text-slate-600">{train.from.split('(')[0]}</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-semibold text-slate-500">{train.duration}</span>
                  <div className="w-20 sm:w-28 h-0.5 bg-slate-300 relative my-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1e3a8a] rounded-full"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-extrabold text-slate-900">{train.arr}</p>
                  <p className="text-xs font-medium text-slate-600">{train.to.split('(')[0]}</p>
                </div>
              </div>
            </div>

            {/* Class Cards & Fares Grid */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                {train.classes.map((c) => (
                  <div
                    key={c.code}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:border-blue-300 transition-colors min-w-[130px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">{c.code}</span>
                      <span className="font-extrabold text-xs text-emerald-700">₹{c.price}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-600 mt-1">{c.status}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => openBookingModal(train)}
                className="w-full sm:w-auto font-bold shrink-0"
              >
                Select & Book
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. REALISTIC BOOKING FLOW MODAL */}
      {selectedTrain && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">Step {bookingStep} of 3</span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedTrain.number} - {selectedTrain.name}
                </h3>
              </div>
              <button
                onClick={closeBookingModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: Boarding & Passenger Details */}
            {bookingStep === 1 && (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Route Summary */}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{selectedTrain.from} → {selectedTrain.to}</span>
                    <p className="text-slate-600">{journeyDate} • Dep: {selectedTrain.dep}</p>
                  </div>
                  <Badge variant="blue">Class: CC</Badge>
                </div>

                {/* Boarding Station */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Boarding Station</label>
                  <select
                    value={boardingStation}
                    onChange={(e) => setBoardingStation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1e3a8a]"
                  >
                    <option value="Pune Junction (PUNE)">Pune Junction (PUNE) - 07:15 AM</option>
                    <option value="Lonavala (LNL)">Lonavala (LNL) - 08:10 AM</option>
                    <option value="Kalyan Junction (KYN)">Kalyan Junction (KYN) - 09:25 AM</option>
                  </select>
                </div>

                {/* Passenger Form */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Passenger 1 Details</span>
                    <span className="text-[11px] text-[#1e3a8a] font-semibold">Auto-filled from Master List</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
                      <input
                        type="text"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                        required
                      />
                    </div>
                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">Age</label>
                      <input
                        type="number"
                        value={passengerAge}
                        onChange={(e) => setPassengerAge(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                        required
                      />
                    </div>
                    <div className="sm:col-span-4 space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">Gender</label>
                      <select
                        value={passengerGender}
                        onChange={(e) => setPassengerGender(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Berth Preference</label>
                    <select
                      value={berthPreference}
                      onChange={(e) => setBerthPreference(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                    >
                      <option value="Window">Window Side</option>
                      <option value="Aisle">Aisle</option>
                      <option value="No Preference">No Preference</option>
                    </select>
                  </div>
                </div>

                {/* Booking Preferences Checklist */}
                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <span className="block font-bold text-slate-900">Booking Preferences</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoUpgradation}
                      onChange={(e) => setAutoUpgradation(e.target.checked)}
                      className="rounded text-[#1e3a8a]"
                    />
                    <span>Consider for Free Auto Upgradation</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmOnly}
                      onChange={(e) => setConfirmOnly(e.target.checked)}
                      className="rounded text-[#1e3a8a]"
                    />
                    <span>Book only if confirmed berths are allotted</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={travelInsurance}
                      onChange={(e) => setTravelInsurance(e.target.checked)}
                      className="rounded text-[#1e3a8a]"
                    />
                    <span>Opt for Travel Insurance (₹0.45 per passenger)</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <Button type="button" variant="outline" onClick={closeBookingModal}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="font-bold">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: Payment Gateway Selection */}
            {bookingStep === 2 && (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Base Ticket Fare</span>
                    <span className="font-bold text-slate-900">₹475.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Reservation Fee & GST</span>
                    <span className="font-bold text-slate-900">₹35.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Travel Insurance</span>
                    <span className="font-bold text-slate-900">₹0.45</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total Amount Payable</span>
                    <span className="text-[#1e3a8a]">₹510.45</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-900">Select Payment Method</label>
                  <div className="space-y-2">
                    {['UPI (GPay / PhonePe / Paytm)', 'Credit / Debit Card', 'NetBanking / Railway Wallet'].map((mode) => (
                      <label
                        key={mode}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          paymentMode === mode
                            ? 'bg-blue-50/80 border-[#1e3a8a] text-[#1e3a8a] font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMode === mode}
                            onChange={() => setPaymentMode(mode)}
                            className="text-[#1e3a8a]"
                          />
                          <span className="text-xs">{mode}</span>
                        </div>
                        <CreditCard className="w-4 h-4 text-slate-400" />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <Button type="button" variant="outline" onClick={() => setBookingStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="font-bold">
                    Pay ₹510.45 & Confirm
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: Reservation Confirmation */}
            {bookingStep === 3 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Booking Confirmed!</h4>
                  <p className="text-xs text-slate-600 mt-1">Your e-ticket has been generated successfully.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">PNR Number:</span>
                    <strong className="font-mono text-slate-900">8457291234</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Train:</span>
                    <span className="font-semibold text-slate-900">{selectedTrain.number} {selectedTrain.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passenger:</span>
                    <span className="font-semibold text-slate-900">{passengerName} ({passengerAge}, {passengerGender})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status & Seat:</span>
                    <strong className="text-emerald-700">CONFIRMED / Coach C1 / Seat 32</strong>
                  </div>
                </div>

                <Button variant="primary" onClick={closeBookingModal} className="px-8 font-bold">
                  Done & View Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
