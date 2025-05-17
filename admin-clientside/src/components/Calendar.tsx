import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles for the calendar

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  // Determine greeting based on the current time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Greeting and Real-Time Clock */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-teal-600">{getGreeting()}!</h1>
        <p className="text-sm text-gray-600 mt-1">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Calendar</h2>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
};

export default CalendarComponent;