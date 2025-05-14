import Modal from "@/components/common/Modal";

interface CarDeleteConfirmationModalProps {
  modalState: boolean;
  handleOnCloseModal: () => void;
  onDelete: () => void;
  bodyText: string;
  headerText: string;
}

function DeleteConfirmationModal({
  modalState,
  handleOnCloseModal,
  onDelete,
  bodyText,
  headerText,
}: CarDeleteConfirmationModalProps) {
  return (
    <Modal
      open={modalState}
      onClose={handleOnCloseModal}
      className="bg-primary"
    >
      <div className="text-center">
        <h5 className="text-2xl font-semibold text-white">{headerText}</h5>
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
            onClick={handleOnCloseModal}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
