import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import useCreateCarBrand from "@/hooks/useCreateCarBrand";

function AddCarBrandModal({
  onCloseModal,
  modalState,
}: {
  modalState: boolean;
  onCloseModal: () => void;
}) {
  const {
    addCarBrandHandler,
    brandName,
    errors,
    onCloseModalHandler,
    setBrandName,
  } = useCreateCarBrand({ onCloseModal });

  return (
    <Modal onClose={onCloseModalHandler} open={modalState} className="w-fit">
      <form onSubmit={addCarBrandHandler}>
        <Input
          label="Brand name"
          name="brandName"
          type="text"
          value={brandName}
          className="border border-black text-black"
          onChange={(e) => setBrandName(e.target.value)}
        />
        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}
        <div className="text-center space-x-1 mt-2">
          <Button className="rounded-3xl py-2 px-4 sm:px-6 hover:bg-secondaryHover text-sm lg:text-base">
            Submit
          </Button>
          <button
            onClick={onCloseModalHandler}
            type="button"
            className="text-secondary rounded-3xl py-2 px-4 self-center sm:px-6 mb-2 text-sm lg:text-base mt-2 border hover:bg-black/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddCarBrandModal;
