import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import { Report } from "@/types/Report";
import Spinner from "@/components/Spinner";
import {
  AnswerReportForm,
  AnswerReportSchema,
} from "@/validations/reportValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { PageableResponse } from "@/types/GlobalTypes";
import { answerReport } from "@/services/reportService";

const initialAnswerReportFormData = {
  answer: "",
};

function AnswerReportModal({
  modalState,
  currentPage,
  pageSize,
  onClose,
  reportId,
}: {
  currentPage: number;
  pageSize: number;
  modalState: boolean;
  onClose: () => void;
  reportId: string;
}) {
  const [answerReportFormData, setAnswerReportFormData] =
    useState<AnswerReportForm>(initialAnswerReportFormData);
  const [errors, setErrors] = useState<AnswerReportForm>({ answer: "" });

  const queryClient = useQueryClient();

  const answerReportMutation = useMutation({
    mutationKey: ["reports", pageSize, currentPage - 1],
    mutationFn: answerReport,
    onSuccess: () => {
      toast.success("Report answered!");
      onClose();
      setAnswerReportFormData(initialAnswerReportFormData);
    },
    onMutate: async (reportAnswer) => {
      await queryClient.cancelQueries({
        queryKey: ["reports", pageSize, currentPage - 1],
      });

      const previousReports = queryClient.getQueryData([
        "reports",
        pageSize,
        currentPage - 1,
      ]);

      queryClient.setQueryData(
        ["reports", pageSize, currentPage - 1],
        (oldReports: PageableResponse<Report[]>) => {
          const reportIdx = oldReports.content.findIndex(
            (report) => report.id === reportAnswer.reportId
          );
          const editedReports = oldReports.content;
          if (reportIdx > -1) {
            const report = oldReports.content[reportIdx];
            const updatedReport = {
              ...report,
              answer: reportAnswer.answerReportFormData.answer,
            };
            editedReports[reportIdx] = updatedReport;
          }

          return {
            content: editedReports,
            page: oldReports.content,
          };
        }
      );

      return { previousReports };
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

  const answerReportHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      AnswerReportSchema.parse(answerReportFormData);
      answerReportMutation.mutate({ reportId, answerReportFormData });
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
    setAnswerReportFormData(initialAnswerReportFormData);
    setErrors({ answer: "" });
  };

  return (
    <Modal open={modalState} onClose={onCloseHandler}>
      <h2 className="text-center font-semibold text-2xl mb-4">Answer Report</h2>
      <form onSubmit={answerReportHandler}>
        <textarea
          placeholder="Enter your message"
          className="w-full h-48 max-h-96 min-h-16 border p-2 outline-none"
          value={answerReportFormData.answer}
          onChange={(e) =>
            setAnswerReportFormData((prevData) => ({
              ...prevData,
              answer: e.target.value,
            }))
          }
        />
        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}
        {answerReportMutation.isPending && (
          <div className="flex justify-center">
            <Spinner md />
          </div>
        )}
        {!answerReportMutation.isPending && (
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

export default AnswerReportModal;
