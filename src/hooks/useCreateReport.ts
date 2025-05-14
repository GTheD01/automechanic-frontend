import { z } from "zod";
import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Report } from "@/types/Report";
import {
  CreateReportForm,
  CreateReportSchema,
} from "@/validations/reportValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { PageableResponse } from "@/types/GlobalTypes";
import { createReport } from "@/services/reportService";

const initialReportFormData = {
  reportType: "",
  description: "",
};

/**
 *
 * @param onCloseModal - function to close the create report modal
 * @param paginationSize - number of items per page
 * @param currentPage - current page number
 * @returns - object containing report form data, error messages, and mutation functions
 */
function useCreateReport({
  onCloseModal,
  paginationSize,
  currentPage,
}: {
  onCloseModal: () => void;
  paginationSize: number;
  currentPage: number;
}) {
  const [reportFormData, setReportFormData] = useState<CreateReportForm>(
    initialReportFormData
  );
  const [errors, setErrors] = useState<CreateReportForm>({
    reportType: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const createReportMutation = useMutation({
    mutationKey: ["loggedUserReports", paginationSize, currentPage - 1],
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("Report created!");
      onCloseModal();
      setReportFormData(initialReportFormData);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["loggedUserReports", paginationSize, currentPage - 1],
      });

      const previousReports = queryClient.getQueryData([
        "loggedUserReports",
        paginationSize,
        currentPage - 1,
      ]);

      const now = new Date();
      const currTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const currDate = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, ".");

      queryClient.setQueryData(
        ["loggedUserReports", paginationSize, currentPage - 1],
        (reports: PageableResponse<Report[]>) => ({
          content: [
            ...(reports?.content || []),
            {
              id: uuidv4(),
              description: reportFormData.description,
              answer: null,
              reportType: reportFormData.reportType,
              createdAt: currTime + " / " + currDate,
            },
          ],
          page: reports?.page,
        })
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
  return {
    reportFormData,
    setReportFormData,
    errors,
    setErrors,
    createReportHandler,
    createReportMutation,
  };
}

export default useCreateReport;
