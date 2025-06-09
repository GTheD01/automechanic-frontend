import Modal from "@/components/common/Modal";
import { reportTypeList } from "@/types/Report";
import Spinner from "@/components/common/Spinner";
import useCreateReport from "@/hooks/useCreateReport";

const initialReportFormData = {
  reportType: "",
  description: "",
};

function CreateReportModal({
  paginationSize,
  currentPage,
  modalState,
  onClose,
}: {
  paginationSize: number;
  currentPage: number;
  modalState: boolean;
  onClose: () => void;
}) {
  const {
    reportFormData,
    setReportFormData,
    errors,
    setErrors,
    createReportHandler,
    createReportMutation,
  } = useCreateReport({
    onCloseModal: onClose,
    paginationSize,
    currentPage,
  });

  const onCloseHandler = () => {
    onClose();
    setReportFormData(initialReportFormData);
    setErrors({ description: "", reportType: "" });
  };

  return (
    <Modal open={modalState} onClose={onCloseHandler}>
      <h2 className="text-center font-semibold text-2xl mb-4">Create Report</h2>
      <form onSubmit={createReportHandler}>
        <div>
          <label htmlFor="reportType" className="block font-semibold">
            Report type
          </label>
          <select
            className="border p-2 w-full mb-2 outline-none"
            name="reportType"
            value={reportFormData.reportType}
            onChange={(e) =>
              setReportFormData((prevData) => ({
                ...prevData,
                reportType: e.target.value,
              }))
            }
          >
            <option>Select</option>
            {reportTypeList.map((reportType) => (
              <option key={reportType} value={reportType}>
                {reportType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            placeholder="Enter your message"
            className="w-full h-48 max-h-96 min-h-16 border p-2 outline-none"
            value={reportFormData.description}
            onChange={(e) =>
              setReportFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </div>
        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}
        {createReportMutation.isPending && (
          <div className="flex justify-center">
            <Spinner md />
          </div>
        )}
        {!createReportMutation.isPending && (
          <div className="text-center space-x-1">
            <button
              type="submit"
              className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
            >
              Submit
            </button>

            <button
              onClick={onClose}
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

export default CreateReportModal;
