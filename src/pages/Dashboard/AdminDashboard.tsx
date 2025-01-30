import { useQuery } from "@tanstack/react-query";

import { getAdminDashboard } from "@/services/dashboardService";
import AppointmentCard from "../Appointments/components/AppointmentCard";
import Spinner from "@/components/Spinner";

function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
    retry: 0,
  });

  return (
    <main>
      <h3 className="text-xl font-semibold ml-2 mb-4">Upcoming Appointment</h3>
      {isLoading && <Spinner md />}
      {isError && <p>Couldn't fetch the upcoming appointment</p>}
      {data && data.upcomingAppointment && data.upcomingAppointment.id ? (
        <AppointmentCard appointment={data?.upcomingAppointment} />
      ) : (
        <p className="ml-4">No upcoming appointments.</p>
      )}

      <div className="flex justify-around items-center mt-40">
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="bg-secondary text-white rounded-full inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 sm:text-xl md:text-2xl">
            {data?.totalAppointments}
          </p>
          <p className="text-sm md:text-base font-medium">Total Appointments</p>
        </div>
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="bg-secondary text-white rounded-full inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 sm:text-xl md:text-2xl">
            {data?.totalCars}
          </p>
          <p className="text-sm md:text-base font-medium">Total Cars</p>
        </div>
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="bg-secondary text-white rounded-full inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 sm:text-xl md:text-2xl">
            {data?.totalReports}
          </p>
          <p className="text-sm md:text-base font-medium">Total Reports</p>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
