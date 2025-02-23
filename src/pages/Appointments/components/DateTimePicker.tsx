import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Appointment } from "@/types/Appointment";
import { AppointmentForm } from "@/pages/Appointments/components/CreateAppointmentModal";

import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  appointments: Appointment[];
  selectedTime: string;
  setAppointmentData: Dispatch<SetStateAction<AppointmentForm>>;
}

const DateTimePicker = ({
  appointments,
  selectedTime,
  setAppointmentData,
}: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    return (
      workingHours.some((hour) => !allWorkingHoursScheduled.includes(hour)) &&
      date.getDay() !== 0 &&
      new Date().toDateString() !== date.toDateString()
    );
  };

  const getAvailableTimes = (date: Date) => {
    const formattedDate = format(date, "dd.MM.yyyy");
    const scheduledTimes = appointments
      .filter((app) => app.appointmentDate === formattedDate)
      .map((app) => app.appointmentTime);
    return workingHours.filter((hour) => !scheduledTimes.includes(hour));
  };

  const saveSelectedDate = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = format(date!, "dd.MM.yyyy");
    setAppointmentData((prevData) => ({
      ...prevData,
      appointmentDate: formattedDate,
    }));
  };

  useEffect(() => {
    if (selectedDate) {
      setAppointmentData((prevData) => ({ ...prevData, appointmentTime: "" }));
    }
  }, [selectedDate]);

  return (
    <div className="max-w-2xl bg-white rounded-lg">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={saveSelectedDate}
          minDate={new Date()}
          filterDate={isDateDisabled}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select a date"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {selectedDate && (
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => {
              setAppointmentData((prevData) => ({
                ...prevData,
                appointmentTime: e.target.value,
              }));
            }}
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
