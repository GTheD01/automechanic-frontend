import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/common/Spinner";
import { getAdminDashboard } from "@/services/dashboardService";
import AppointmentCard from "@/pages/Appointments/components/AppointmentCard";
import AppointmentsChart from "@/components/AppointmentsChart";
import ReportsChart from "@/components/ReportsChart";

function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
    retry: 0,
  });

  return (
    <section>
      <h3 className="text-xl font-semibold ml-2 mb-4">Upcoming Appointment</h3>
      {isLoading && <Spinner md />}
      {isError && <p>Couldn't fetch the upcoming appointment</p>}
      {data && data.upcomingAppointment && data.upcomingAppointment.id ? (
        <AppointmentCard appointment={data?.upcomingAppointment} />
      ) : (
        <p className="ml-4">No upcoming appointments.</p>
      )}

      <div className="lg:flex">
        <AppointmentsChart
          appointmentsPerYear={data && data.appointmentsPerYearCount}
          totalAppointments={(data && data.totalAppointments) || 0}
        />

        <ReportsChart
          reportsPerYear={data && data.reportsPerYearCount}
          totalReports={(data && data.totalReports) || 0}
        />
      </div>

      <div className="flex justify-around items-center mt-8">
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="bg-secondary text-white rounded-full inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 sm:text-xl md:text-2xl">
            {data?.totalCars}
          </p>
          <p className="text-sm md:text-base font-medium">Total Cars</p>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
