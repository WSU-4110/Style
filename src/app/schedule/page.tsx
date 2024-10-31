'use client';

import React, { useState, useEffect } from 'react';
import CalendarManager from '@/utils/calendarmanager';

const months = [
  { name: 'October 2024', year: 2024, month: 9 },
  { name: 'November 2024', year: 2024, month: 10 },
  { name: 'December 2024', year: 2024, month: 11 },
  { name: 'January 2025', year: 2025, month: 0 },
  { name: 'February 2025', year: 2025, month: 1 },
  { name: 'March 2025', year: 2025, month: 2 },
  { name: 'April 2025', year: 2025, month: 3 },
  { name: 'May 2025', year: 2025, month: 4 },
  { name: 'June 2025', year: 2025, month: 5 },
  { name: 'July 2025', year: 2025, month: 6 },
  { name: 'August 2025', year: 2025, month: 7 },
  { name: 'September 2025', year: 2025, month: 8 },
  { name: 'October 2025', year: 2025, month: 9 },
];

const CalendarPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  // Get the singleton instance
  const calendarManager = CalendarManager.getInstance();

  useEffect(() => {
    if (selectedDate && selectedPeriod) {
      setIsLoading(true);

      // Fetch available slots for the selected date
      const availableSlots = calendarManager.getAvailableSlots(selectedDate);

      // Filter slots based on the selected period
      const filteredTimes = filterTimesByPeriod(availableSlots, selectedPeriod);

      // Simulate loading delay
      setTimeout(() => {
        setAvailableTimes(filteredTimes);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate, selectedPeriod]);

  const handleMonthChange = (month: typeof selectedMonth) => {
    setSelectedMonth(month);
    resetSelection({ preserveDate: false });
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    resetSelection({ preserveDate: true });
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    resetSelection({ preserveDate: true, preserveTime: true });
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const success = calendarManager.bookSlot(selectedDate, selectedTime);
      if (success) {
        setIsConfirmed(true);
      } else {
        alert(`The slot on ${selectedDate} at ${selectedTime} is no longer available.`);
      }
    } else {
      alert('Please select a date, period, and time before confirming.');
    }
  };

  // Filter available slots based on the selected period
  const filterTimesByPeriod = (slots: string[], period: string): string[] => {
    let startHour = 0, endHour = 0;

    switch (period) {
      case 'Morning':
        startHour = 9;
        endHour = 12;
        break;
      case 'Afternoon':
        startHour = 13;
        endHour = 16;
        break;
      case 'Evening':
        startHour = 17;
        endHour = 22;
        break;
    }

    return slots.filter((time) => {
      const [hourStr, minutesStr, periodStr] = time.split(/:|\s/);
      let hour = parseInt(hourStr);
      if (periodStr === 'PM' && hour !== 12) {
        hour += 12;
      }

      return hour >= startHour && hour < endHour;
    });
  };

  // Reset selection with options to preserve state
  const resetSelection = ({
    preserveDate = false,
    preserveTime = false,
  } = {}) => {
    if (!preserveDate) setSelectedDate(null);
    if (!preserveTime) setSelectedTime(null);

    setAvailableTimes([]);
    setIsConfirmed(false);
  };

  const renderCalendarDates = () => {
    const { year, month } = selectedMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const formattedDate = date.toISOString().split('T')[0];

      return (
        <button
          key={i}
          className={`p-3 bg-gray-200 border border-gray-300 rounded-md text-center transition-colors duration-300 
            ${selectedDate === formattedDate ? 'bg-teal-600 text-white' : 'hover:bg-gray-300 focus:bg-teal-100'} 
            focus:ring-2 focus:ring-teal-500 outline-none`}
          onClick={() => handleDateChange(formattedDate)}
          aria-label={`Select ${formattedDate}`}
        >
          {date.getDate()}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col items-center p-5 animate-fade-in">
      <h1 className="text-2xl mb-5 text-gray-800 font-bold tracking-wide">Schedule Your Appointment</h1>

      {/* Month Selector */}
      <div className="mb-6 w-full max-w-md">
        <label htmlFor="month-select" className="block text-lg text-gray-700 mb-2 font-medium">
          Select a Month
        </label>
        <select
          id="month-select"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
          value={selectedMonth.name}
          onChange={(e) => handleMonthChange(months.find(m => m.name === e.target.value)!)}
        >
          {months.map((month) => (
            <option key={month.name} value={month.name}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 max-w-md mb-6">
        {renderCalendarDates()}
      </div>

      {selectedDate && (
        <div className="mb-6">
          <h2 className="text-xl mb-3 text-gray-700 font-medium">Select a Period</h2>
          <div className="flex gap-4">
            {['Morning', 'Afternoon', 'Evening'].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 bg-gray-200 border border-gray-300 rounded-md transition-all duration-300 
                  ${selectedPeriod === period ? 'bg-teal-600 text-white shadow-lg' : 'hover:bg-gray-300 focus:bg-teal-100'}
                  focus:ring-2 focus:ring-teal-500 outline-none`}
                onClick={() => handlePeriodChange(period)}
                aria-label={`Select ${period} period`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPeriod && !isLoading && availableTimes.length > 0 && (
        <div className="w-full max-w-lg mb-6">
          <h2 className="text-xl mb-3 text-gray-700 font-medium text-center">
            Available Times for {selectedDate} ({selectedPeriod})
          </h2>

          <div className="flex gap-2 flex-wrap justify-center">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 bg-gray-200 border border-gray-300 rounded-md transition-all duration-300 
                  ${selectedTime === time ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-gray-300 focus:bg-teal-100'} 
                  focus:ring-2 focus:ring-teal-500 outline-none`}
                onClick={() => handleTimeChange(time)}
                aria-label={`Select ${time}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-gray-500 text-center mb-6">Loading available times...</div>
      )}

      {selectedTime && (
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-teal-600 text-white rounded-md transition-transform duration-200 transform hover:scale-105 active:scale-95 focus:ring-4 focus:ring-teal-300 outline-none"
            disabled={isLoading}
            aria-label="Confirm appointment"
          >
            Confirm
          </button>
        </div>
      )}

      {isConfirmed && (
        <div className="mt-6 p-4 bg-teal-800 text-white rounded-md font-semibold shadow-lg">
          Appointment confirmed for {selectedDate} ({selectedPeriod}) at {selectedTime}.
        </div>
      )}
    </div>
  );
};

export default CalendarPage;