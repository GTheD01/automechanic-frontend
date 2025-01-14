import { cn } from "@/lib/cn";
import { Appointment, AppointmentStatus } from "@/types/Appointment";

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const appointmentStatusClasses: Record<AppointmentStatus, string> = {
    UPCOMING: "text-yellow-500",
    FINISHED: "text-green-500",
    CANCELLED: "text-red-500",
    RESCHEDULED: "text-indigo-500",
  };

  const appointmentStatusClass =
    appointmentStatusClasses[
      appointment.appointmentStatus as keyof typeof appointmentStatusClasses
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
          {appointment.appointmentStatus}
        </span>

        <div>
          <p className="font-semibold">Appointment time:</p>
          <p className="font-light">
            {appointment.appointmentTime} / {appointment.appointmentDate}
          </p>
        </div>

        <div className="flex gap-14">
          <div>
            <p className="font-semibold">Created at:</p>
            <p>{appointment.createdDate}</p>
          </div>

          <div>
            <p className="font-semibold">Last modified at:</p>
            <p>
              {appointment.lastModifiedDate
                ? appointment.lastModifiedDate
                : "Not yet modified."}
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Customer:</p>
          <p>
            {appointment.user.firstName} {appointment.user.lastName}
          </p>
        </div>

        <div>
          <p className="font-semibold">Description:</p>
          <p>
            {appointment.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae unde similique dolores ipsa velit nostrum
            id ex tenetur natus ratione sequi voluptatibus impedit sit est
            consequatur provident, accusantium, commodi corporis doloribus
            facere dolorem! Voluptas nobis ipsa sit voluptatem animi eos
            voluptates saepe fuga velit quis sed iste, et ad autem.
          </p>
        </div>
      </div>
      <button className="bg-secondary text-white rounded-3xl py-2 px-4 text-sm sm:px-6 sm:text-base hover:bg-secondaryHover">
        Edit
      </button>
    </li>
  );
}

export default AppointmentCard;
