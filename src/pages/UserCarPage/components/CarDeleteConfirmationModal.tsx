import Modal from "@/components/Modal";

interface CarDeleteConfirmationModalProps {
  deleteConfirmationModal: boolean;
  handleOnCloseDeleteCarModal: () => void;
  onDelete: () => void;
  bodyText: string;
}

function CarDeleteConfirmationModal({
  deleteConfirmationModal,
  handleOnCloseDeleteCarModal,
  onDelete,
  bodyText,
}: CarDeleteConfirmationModalProps) {
  return (
    <Modal
      open={deleteConfirmationModal}
      onClose={handleOnCloseDeleteCarModal}
      className="bg-primary"
    >
      <div className="text-center">
        <h5 className="text-2xl font-semibold text-white">
          Are you sure you want to delete this car?
        </h5>
        <p className="text-white">{bodyText}</p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            className="bg-secondary hover:bg-secondaryHover text-white py-2 w-14"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="bg-white hover:opacity-80 py-2 w-14"
            onClick={handleOnCloseDeleteCarModal}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CarDeleteConfirmationModal;
