import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/cn";
import { useUserContext } from "@/providers/UserContextProvider";
import { updateAppointment } from "@/services/appointmentService";
import { Appointment, AppointmentStatus } from "@/types/Appointment";
import AppointmentField from "@/pages/Appointments/components/AppointmentField";
import EditAppointmentModal from "@/pages/Appointments/components/EditAppointmentModal";

function AppointmentCard({
  appointment,
  carPage,
}: {
  appointment: Appointment;
  carPage?: boolean;
}) {
  const { user } = useUserContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>(
    appointment?.appointmentStatus
  );
  const [originalStatus, setOriginalStatus] = useState<AppointmentStatus>(
    appointment?.appointmentStatus
  );

  const appointmentStatusClasses: Record<AppointmentStatus, string> = {
    UPCOMING: "text-yellow-500",
    FINISHED: "text-green-500",
    CANCELLED: "text-red-500",
    RESCHEDULED: "text-indigo-500",
  };

  const queryClient = useQueryClient();

  const updateAppointmentMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      toast.success("Successfully updated.");
    },
    onError: () => {
      toast.error("Something went wrong... Try again later!");
      setOriginalStatus(appointment?.appointmentStatus);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const handleSave = () => {
    if (originalStatus === newStatus) {
      setIsEditing(false);
      return;
    }
    updateAppointmentMutation.mutate({
      appointmentId: appointment.id,
      appointmentUpdateRequest: { appointmentStatus: newStatus },
    });

    setOriginalStatus(newStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewStatus(originalStatus);
  };

  const appointmentStatusClass =
    appointmentStatusClasses[
      originalStatus as keyof typeof appointmentStatusClasses
    ];

  return (
    <li className="shadow-xl py-8 px-4 md:flex md:justify-between md:items-center relative">
      <div className="md:w-2/3 mb-8 md:mb-0 space-y-2">
        <span
          className={cn(
            `text-xs absolute top-2 left-2`,
            appointmentStatusClass
          )}
        >
          {originalStatus}
        </span>

        <div className="grid grid-cols-2 gap-2">
          {!carPage && (
            <AppointmentField
              field="Car"
              content={`
              ${appointment?.car?.carBrand?.name} 
              ${appointment?.car?.model?.name} 
              ${appointment?.car?.version}
              (${appointment?.car?.year})
            `}
            />
          )}
          <AppointmentField
            field="Appointment time"
            content={`${appointment?.appointmentTime} / ${appointment?.appointmentDate}`}
          />
          <AppointmentField
            field="Created at"
            content={appointment?.createdAt}
          />
          <AppointmentField
            field="Last modified at"
            content={
              appointment?.lastModifiedDate
                ? appointment?.lastModifiedDate
                : "Not yet modified."
            }
          />
          {!carPage && (
            <AppointmentField
              field="Customer"
              content={
                appointment?.user?.firstName + " " + appointment?.user?.lastName
              }
            />
          )}
          {!carPage && (
            <AppointmentField
              field="Customer number"
              content={
                appointment?.user?.phoneNumber
                  ? appointment?.user?.phoneNumber
                  : "No phone added."
              }
            />
          )}
          <AppointmentField
            field="Description"
            content={appointment?.description}
            className={`${carPage && "col-span-2"}`}
          />
        </div>
      </div>

      {user?.userRole === "ADMIN" && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-secondary text-white rounded-3xl py-2 px-4 text-sm sm:px-6 sm:text-base hover:bg-secondaryHover"
        >
          Edit
        </button>
      )}

      {user && user.userRole === "ADMIN" && (
        <EditAppointmentModal
          isOpen={isEditing}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          onSave={handleSave}
          isPending={updateAppointmentMutation.isPending}
          onCancel={handleCancel}
        />
      )}
    </li>
  );
}

export default AppointmentCard;
