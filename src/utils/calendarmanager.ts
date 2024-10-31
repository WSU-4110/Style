type TimeSlot = string;
type DateString = string;

// Singleton class for managing calendar slots
class CalendarManager {
  private static instance: CalendarManager;
  private availableSlots: Map<DateString, TimeSlot[]>;

  private constructor() {
    this.availableSlots = new Map<DateString, TimeSlot[]>();
    this.seedData(); // Initialize with some default data
  }

  // Create and return the Singleton instance
  public static getInstance(): CalendarManager {
    if (!CalendarManager.instance) {
      CalendarManager.instance = new CalendarManager();
    }
    return CalendarManager.instance;
  }

  // Initialize with sample data
  private seedData(): void {
    this.availableSlots.set("2024-10-30", this.generateTimeSlots(9, 22)); // Full day
    this.availableSlots.set("2024-11-01", this.generateTimeSlots(9, 22)); // Full day
  }

  // Generate time slots with 30-minute intervals for a given start and end hour
  private generateTimeSlots(startHour: number, endHour: number): TimeSlot[] {
    const slots: TimeSlot[] = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(this.formatTime(hour, 0));  // :00
      slots.push(this.formatTime(hour, 30)); // :30
    }

    return slots;
  }

  // Format time into 12-hour format with AM/PM
  private formatTime(hour: number, minutes: number): TimeSlot {
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const formattedMinutes = minutes === 0 ? '00' : '30';
    return `${adjustedHour}:${formattedMinutes} ${period}`;
  }

  // Get available slots for a specific date
  public getAvailableSlots(date: DateString): TimeSlot[] {
    return this.availableSlots.get(date) || [];
  }

  // Book a slot and remove it from available slots
  public bookSlot(date: DateString, time: TimeSlot): boolean {
    const slots = this.availableSlots.get(date);
    if (slots && slots.includes(time)) {
      this.availableSlots.set(
        date,
        slots.filter(slot => slot !== time)
      );
      return true; // Booking successful
    }
    return false; // Slot not available
  }

  // Add new available slots for a specific date and time range
  public addAvailableSlot(date: DateString, startHour: number, endHour: number): void {
    const slots = this.generateTimeSlots(startHour, endHour);
    this.availableSlots.set(date, slots);
  }
}

export default CalendarManager;
