import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import {
  CreateReportSchema,
  ReportForm,
} from "@/validations/reportValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { createReport } from "@/services/reportService";

const initialReportFormData = {
  description: "",
};

function CreateReportModal({
  modalState,
  onClose,
}: {
  modalState: boolean;
  onClose: () => void;
}) {
  const [reportFormData, setReportFormData] = useState<ReportForm>(
    initialReportFormData
  );
  const [errors, setErrors] = useState<ReportForm>({ description: "" });

  const createReportMutation = useMutation({
    mutationKey: ["reports"],
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("Report created!");
      onClose();
      setReportFormData(initialReportFormData);
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
      } else {
        toast.error("An unknown error occured. Please try again later.");
      }
    },
  });

  const createReportHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      CreateReportSchema.parse(reportFormData);
      createReportMutation.mutate(reportFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      }
    }
  };

  const onCloseHandler = () => {
    onClose();
    setReportFormData(initialReportFormData);
    setErrors({ description: "" });
  };

  return (
    <Modal open={modalState} onClose={onCloseHandler}>
      <h2 className="text-center font-semibold text-2xl mb-4">Create Report</h2>
      <form onSubmit={createReportHandler}>
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
