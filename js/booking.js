/**
 * Service Appointment Booking Engine
 */
export class BookingManager {
  constructor() {
    this.bookings = this.loadBookings();
  }

  loadBookings() {
    try {
      const saved = localStorage.getItem('uae_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveBookings() {
    try {
      localStorage.setItem('uae_appointments', JSON.stringify(this.bookings));
    } catch (e) {
      console.warn('Could not save booking', e);
    }
  }

  createBooking(bookingData) {
    const confirmationCode = 'UAE-LA-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: confirmationCode,
      createdAt: new Date().toISOString(),
      ...bookingData,
      status: 'Confirmed'
    };

    this.bookings.push(newBooking);
    this.saveBookings();
    return newBooking;
  }

  getAvailableSlots(dateString) {
    // Standard shop business hours slots
    const allSlots = [
      '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:30 PM'
    ];

    const bookedSlotsForDate = this.bookings
      .filter(b => b.date === dateString)
      .map(b => b.timeSlot);

    return allSlots.map(time => ({
      time,
      available: !bookedSlotsForDate.includes(time)
    }));
  }
}
