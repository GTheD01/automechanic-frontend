import { AppointmentStatus } from "@/types/Appointment";

type EditAppointmentModalProps = {
  isOpen: boolean;
  newStatus: AppointmentStatus;
  setNewStatus: (status: AppointmentStatus) => void;
  onSave: () => void;
  onCancel: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
};

function EditAppointmentModal({
  isOpen,
  newStatus,
  setNewStatus,
  onSave,
  onCancel,
  isDropdownOpen,
  setIsDropdownOpen,
}: EditAppointmentModalProps) {
  if (!isOpen) return null;

  const handleStatusChange = (status: AppointmentStatus) => {
    setNewStatus(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-800 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
        <div>
          <p className="block text-sm font-semibold mb-2">Select Status:</p>

          <div
            className="relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <div className="border border-gray-300 rounded-md p-2 cursor-pointer">
              <p className="text-sm text-gray-700">{newStatus}</p>
            </div>
            {isDropdownOpen && (
              <ul
                role="menu"
                className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
              >
                {["UPCOMING", "FINISHED", "CANCELLED", "RESCHEDULED"].map(
                  (status) => (
                    <li
                      key={status}
                      role="menuitem"
                      onClick={() =>
                        handleStatusChange(status as AppointmentStatus)
                      }
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                    >
                      {status}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAppointmentModal;
