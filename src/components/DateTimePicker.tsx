import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Appointment } from "@/types/Appointment";

const DateTimePicker = ({ appointments }: { appointments: Appointment[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const workingHours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const isDateDisabled = (date: Date) => {
    const formattedDate = format(date, "dd.MM.yyyy");
    const allWorkingHoursScheduled = appointments
      .filter((app) => app.appointmentDate === formattedDate)
      .map((app) => app.appointmentTime);
    return workingHours.some(
      (hour) => !allWorkingHoursScheduled.includes(hour)
    );
  };

  const getAvailableTimes = (date: Date) => {
    const formattedDate = format(date, "dd.MM.yyyy");
    const scheduledTimes = appointments
      .filter((app) => app.appointmentDate === formattedDate)
      .map((app) => app.appointmentTime);
    console.log(scheduledTimes);
    return workingHours.filter((hour) => !scheduledTimes.includes(hour));
  };

  useEffect(() => {
    if (selectedDate) {
      setSelectedTime("");
    }
  }, [selectedDate]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          filterDate={isDateDisabled}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select a date"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {selectedDate && (
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a time</option>
            {getAvailableTimes(selectedDate).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
