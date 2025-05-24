import Modal from "@/components/common/Modal";
import Spinner from "@/components/common/Spinner";
import { Appointment } from "@/types/Appointment";
import useCreateAppointment from "@/hooks/useCreateAppointment";
import DateTimePicker from "@/pages/Appointments/components/DateTimePicker";

function CreateAppointmentModal({
  appointments,
  modalState,
  onCloseModal,
}: {
  appointments: Appointment[];
  modalState: boolean;
  onCloseModal: () => void;
}) {
  const {
    appointmentData,
    setAppointmentData,
    onCloseCreateAppointmentModalHandler,
    userCars,
    createAppointmentHandler,
    errors,
    createAppointmentMutation,
  } = useCreateAppointment({ onCloseModal });

  return (
    <Modal onClose={onCloseCreateAppointmentModalHandler} open={modalState}>
      <h3 className="font-semibold text-center text-2xl mb-6">
        Create Appointment
      </h3>
      <form onSubmit={createAppointmentHandler} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="car">Car</label>
          <select
            className="border outline-none p-2"
            value={appointmentData.carId}
            onChange={(e) =>
              setAppointmentData((prevAppointmentData) => ({
                ...prevAppointmentData,
                carId: e.target.value,
              }))
            }
            name="car"
          >
            <option>Select</option>
            {userCars?.map((car) => (
              <option key={car.id} value={car.id}>
                {car.carBrand.name} {car.model.name} {car.version} ({car.year})
              </option>
            ))}
          </select>
        </div>
        <DateTimePicker
          appointments={appointments}
          selectedTime={appointmentData?.appointmentTime}
          setAppointmentData={setAppointmentData}
        />
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={appointmentData.description}
            onChange={(e) =>
              setAppointmentData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            className="resize-none border border-neutral outline-none p-2 h-40"
            maxLength={255}
          />
        </div>
        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}

        {createAppointmentMutation.isPending && (
          <div className="flex justify-center">
            <Spinner lg />
          </div>
        )}

        {!createAppointmentMutation.isPending && (
          <div className="text-center space-x-1">
            <button
              type="submit"
              className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
            >
              Submit
            </button>

            <button
              onClick={onCloseCreateAppointmentModalHandler}
              type="button"
              className="text-secondary rounded-3xl py-2 px-4 self-center sm:px-6 mb-2 text-sm lg:text-base mt-2 border hover:bg-black/10"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
}

export default CreateAppointmentModal;
