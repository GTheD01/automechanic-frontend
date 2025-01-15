import DateTimePicker from "@/components/DateTimePicker";
import { Appointment } from "@/types/Appointment";
import { Dispatch } from "react";

function CreateAppointmentModal({
  appointments,
  modalStateHandler,
}: {
  appointments: Appointment[];
  modalStateHandler: Dispatch<boolean>;
}) {
  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black/60 z-10"
        onClick={() => modalStateHandler(false)}
      ></div>
      <div className="bg-white p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-2/3 max-w-[500px]">
        <span
          onClick={() => modalStateHandler(false)}
          className="text-white absolute -top-6 -right-5 text-2xl hover:scale-110 cursor-pointer"
        >
          X
        </span>
        <h3 className="font-semibold text-center text-2xl">
          Create Appointment
        </h3>
        <DateTimePicker appointments={appointments} />
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="resize-none border border-neutral outline-none p-2 h-40"
            maxLength={255}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAppointmentModal;
