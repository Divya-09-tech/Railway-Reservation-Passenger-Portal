export const mockPassenger = {
  id: "USR-98214",
  name: "Divya Thag",
  shortName: "Divya",
  email: "divyathag@gmail.com",
  phone: "+91 9876543210",
  city: "Pune",
  state: "Maharashtra",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  memberSince: "Jan 2023",
  upcomingBookingsCount: 1,
  completedTripsCount: 12
};

export const mockUpcomingTicket = {
  pnr: "8457291234",
  trainNumber: "12124",
  trainName: "Deccan Queen Express",
  from: "Pune Junction (PUNE)",
  to: "Mumbai CSMT (CSMT)",
  departureTime: "07:15 AM",
  arrivalTime: "10:25 AM",
  duration: "3h 10m",
  dateOfJourney: "15 October 2026",
  travelClass: "CC (AC Chair Car)",
  quota: "General (GN)",
  status: "CONFIRMED",
  statusColor: "green",
  coach: "C1",
  berth: "32",
  platform: "PF-4",
  passengers: [
    { name: "Divya Thag", age: 20, gender: "Female", status: "CNF / C1 / 32" }
  ]
};

export const mockRecentBookings = [
  {
    pnr: "8457291234",
    trainNumber: "12124",
    trainName: "Deccan Queen Express",
    route: "Pune → Mumbai CSMT",
    doj: "15 Oct 2026",
    class: "CC",
    status: "CONFIRMED",
    statusBadge: "green"
  },
  {
    pnr: "9102485712",
    trainNumber: "12002",
    trainName: "Shatabdi Express",
    route: "New Delhi → Bhopal",
    doj: "28 Sep 2026",
    class: "CC",
    status: "COMPLETED",
    statusBadge: "blue"
  },
  {
    pnr: "7492019482",
    trainNumber: "22436",
    trainName: "Vande Bharat Express",
    route: "New Delhi → Varanasi",
    doj: "10 Aug 2026",
    class: "EC",
    status: "COMPLETED",
    statusBadge: "blue"
  }
];

export const mockPopularTrains = [
  {
    number: "12124",
    name: "DECCAN QUEEN",
    from: "Pune Junction (PUNE)",
    to: "Mumbai CSMT (CSMT)",
    dep: "07:15 AM",
    arr: "10:25 AM",
    duration: "3h 10m",
    runsOn: ["Daily"],
    classes: [
      { code: "CC", price: 475, status: "AVAILABLE - 34" },
      { code: "2S", price: 165, status: "AVAILABLE - 88" }
    ]
  },
  {
    number: "12002",
    name: "SHATABDI EXPRESS",
    from: "New Delhi (NDLS)",
    to: "Bhopal (BPL)",
    dep: "06:00 AM",
    arr: "02:40 PM",
    duration: "8h 40m",
    runsOn: ["Daily"],
    classes: [
      { code: "CC", price: 1140, status: "AVAILABLE - 42" },
      { code: "EC", price: 2195, status: "AVAILABLE - 08" }
    ]
  },
  {
    number: "22436",
    name: "VANDE BHARAT EXPRESS",
    from: "New Delhi (NDLS)",
    to: "Varanasi (BSB)",
    dep: "06:00 AM",
    arr: "02:00 PM",
    duration: "8h 00m",
    runsOn: ["Ex. Thu"],
    classes: [
      { code: "CC", price: 1750, status: "AVAILABLE - 110" },
      { code: "EC", price: 3300, status: "RAC 04" }
    ]
  }
];

export const mockPnrDatabase = {
  "8457291234": {
    pnr: "8457291234",
    trainNumber: "12124",
    trainName: "Deccan Queen Express",
    from: "PUNE",
    to: "CSMT",
    doj: "15-10-2026",
    chartStatus: "Chart Not Prepared",
    passengers: [
      { bookingStatus: "CNF / C1 / 32 / WINDOW", currentStatus: "CNF (Confirmed)" }
    ]
  }
};

export const mockAlerts = [
  {
    id: 1,
    type: "info",
    title: "Schedule Update",
    message: "Train 12124 Deccan Queen departs from Platform 4 at Pune Junction.",
    time: "10 mins ago"
  },
  {
    id: 2,
    type: "success",
    title: "Booking Confirmed",
    message: "Your booking for PNR 8457291234 is confirmed in Coach C1, Seat 32 for Divya Thag.",
    time: "1 hour ago"
  },
  {
    id: 3,
    type: "warning",
    title: "Platform Notice",
    message: "Platform change notice for Train 12952 (Mumbai Rajdhani). Now departing from PF-16.",
    time: "3 hours ago"
  }
];
