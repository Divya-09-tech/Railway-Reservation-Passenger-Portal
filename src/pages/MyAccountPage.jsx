import React, { useState } from 'react';
import {
  User,
  Users,
  Clock,
  FileText,
  AlertTriangle,
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { mockPassenger, mockRecentBookings } from '../data/mockData';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Master Passengers State
  const [passengersList, setPassengersList] = useState([
    { id: 1, name: 'Passenger User', age: 29, gender: 'Male', berthPref: 'Window' },
    { id: 2, name: 'Priya Sharma', age: 27, gender: 'Female', berthPref: 'Aisle' },
    { id: 3, name: 'Amit Sharma', age: 58, gender: 'Male', berthPref: 'Lower' }
  ]);
  const [showAddPassengerModal, setShowAddPassengerModal] = useState(false);
  const [newPassenger, setNewPassenger] = useState({ name: '', age: '', gender: 'Male', berthPref: 'Lower' });

  // TDR & Grievance State
  const [tdrSubmitted, setTdrSubmitted] = useState(false);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ ...mockPassenger });

  const handleAddPassenger = (e) => {
    e.preventDefault();
    if (!newPassenger.name || !newPassenger.age) return;
    setPassengersList([...passengersList, { ...newPassenger, id: Date.now() }]);
    setNewPassenger({ name: '', age: '', gender: 'Male', berthPref: 'Lower' });
    setShowAddPassengerModal(false);
  };

  const handleDeletePassenger = (id) => {
    setPassengersList(passengersList.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Account & Passenger Services
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Manage your passenger profile, saved master list, booking history, TDR filings, and grievances.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 flex flex-wrap gap-2">
        {[
          { id: 'profile', label: 'Profile Details', icon: User },
          { id: 'master-list', label: 'Passenger Master List', icon: Users },
          { id: 'booking-history', label: 'Booking History', icon: Clock },
          { id: 'tdr', label: 'File TDR', icon: FileText },
          { id: 'grievance', label: 'My Grievances', icon: AlertTriangle }
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

      {/* TAB 1: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <Card title="Passenger Profile" subtitle="Your official registration details">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-[#1e3a8a] text-white font-extrabold text-xl flex items-center justify-center">
                PU
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <h3 className="text-lg font-extrabold text-slate-900">{profileData.name}</h3>
                <p className="text-xs text-slate-500">Passenger Account • Member since {profileData.memberSince}</p>
                <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                  IRCTC Verified Passenger
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">Full Name</span>
                <span className="text-slate-900 font-bold text-sm">{profileData.name}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">Email Address</span>
                <span className="text-slate-900 font-bold text-sm">{profileData.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">Mobile Number</span>
                <span className="text-slate-900 font-bold text-sm">{profileData.phone}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">City & State</span>
                <span className="text-slate-900 font-bold text-sm">{profileData.city}, {profileData.state}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" icon={Edit2} onClick={() => alert("Profile edit modal opened")}>
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 2: PASSENGER MASTER LIST */}
      {activeTab === 'master-list' && (
        <Card
          title="Passenger Master List"
          subtitle="Saved passengers for instant one-click booking auto-fill"
          action={
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddPassengerModal(true)}>
              Add New Passenger
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Age</th>
                    <th className="py-2.5 px-3">Gender</th>
                    <th className="py-2.5 px-3">Berth Preference</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passengersList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{p.name}</td>
                      <td className="py-3 px-3 text-slate-700">{p.age} yrs</td>
                      <td className="py-3 px-3 text-slate-700">{p.gender}</td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{p.berthPref}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 text-slate-500 hover:text-[#1e3a8a]" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePassenger(p.id)}
                            className="p-1 text-slate-500 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: BOOKING HISTORY */}
      {activeTab === 'booking-history' && (
        <Card title="Booking History" subtitle="View and manage all past and upcoming e-tickets">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50">
                  <th className="py-2.5 px-3">PNR</th>
                  <th className="py-2.5 px-3">Train</th>
                  <th className="py-2.5 px-3">Journey</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
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
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => alert(`Viewing ticket details for PNR: ${b.pnr}`)}>
                          View Ticket
                        </Button>
                        {b.status === 'CONFIRMED' && (
                          <Button size="sm" variant="secondary" onClick={() => alert(`Cancel request for PNR: ${b.pnr}`)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 4: FILE TDR */}
      {activeTab === 'tdr' && (
        <Card title="File Ticket Deposit Receipt (TDR)" subtitle="Request refund for cancelled or delayed train journeys">
          {tdrSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">TDR Submitted Successfully</h3>
              <p className="text-xs text-slate-600">Reference Token: <strong>TDR-84920491</strong>. Refund will be processed as per railway refund rules.</p>
              <Button variant="secondary" size="sm" onClick={() => setTdrSubmitted(false)}>File Another TDR</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setTdrSubmitted(true); }} className="space-y-4 max-w-xl">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">PNR Number</label>
                <input
                  type="text"
                  placeholder="e.g. 8457291234"
                  maxLength={10}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono font-bold text-slate-900"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Reason for Filing TDR</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900" required>
                  <option value="">Select Reason</option>
                  <option value="1">Train Delayed More Than 3 Hours and Passenger Not Travelled</option>
                  <option value="2">AC Failure in Coach</option>
                  <option value="3">Passenger Not Travelled Due to Ticket Status RAC</option>
                  <option value="4">Difference of Fare in Lower Class Travel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Additional Remarks / Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide additional journey details..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900"
                />
              </div>

              <Button type="submit" variant="primary" className="font-bold">
                Submit TDR Request
              </Button>
            </form>
          )}
        </Card>
      )}

      {/* TAB 5: MY GRIEVANCES */}
      {activeTab === 'grievance' && (
        <Card title="Grievance Support" subtitle="Log complaints regarding cleanliness, delays, or service quality">
          {grievanceSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Grievance Logged</h3>
              <p className="text-xs text-slate-600">Ticket ID: <strong>GRV-940182</strong>. Our support desk will inspect and resolve your issue within 24 hours.</p>
              <Button variant="secondary" size="sm" onClick={() => setGrievanceSubmitted(false)}>Log New Complaint</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setGrievanceSubmitted(true); }} className="space-y-4 max-w-xl">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Issue Category</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900" required>
                  <option value="">Select Category</option>
                  <option value="Cleanliness">Coach Cleanliness & Sanitation</option>
                  <option value="Delay">Unscheduled Delay & Timetable Issue</option>
                  <option value="Staff">Staff Behavior / Ticket Checker Issue</option>
                  <option value="Refund">Payment & Refund Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">PNR / Booking Reference (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 8457291234"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Detailed Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="font-bold">
                Submit Grievance
              </Button>
            </form>
          )}
        </Card>
      )}

      {/* ADD PASSENGER MODAL */}
      {showAddPassengerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Add New Master Passenger</h3>
              <button onClick={() => setShowAddPassengerModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPassenger} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={newPassenger.name}
                  onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                  placeholder="Enter passenger name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Age</label>
                  <input
                    type="number"
                    value={newPassenger.age}
                    onChange={(e) => setNewPassenger({ ...newPassenger, age: e.target.value })}
                    placeholder="e.g. 30"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Gender</label>
                  <select
                    value={newPassenger.gender}
                    onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Berth Preference</label>
                <select
                  value={newPassenger.berthPref}
                  onChange={(e) => setNewPassenger({ ...newPassenger, berthPref: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                >
                  <option value="Lower">Lower Berth</option>
                  <option value="Middle">Middle Berth</option>
                  <option value="Upper">Upper Berth</option>
                  <option value="Side Lower">Side Lower</option>
                  <option value="Side Upper">Side Upper</option>
                  <option value="Window">Window Side (Chair Car)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddPassengerModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="font-bold">
                  Save Passenger
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
