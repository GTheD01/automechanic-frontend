import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useRef, useState } from "react";

import Spinner from "@/components/common/Spinner";
import SearchFilter from "@/components/common/SearchFilter";
import { Pagination } from "@/components/common/Pagination";
import { AppointmentFilters } from "@/types/Appointment";
import { fetchAllAppointments } from "@/services/appointmentService";
import AppointmentsList from "@/pages/Appointments/components/AppointmentsList";

function Appointments() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentFilters, setAppointmentFilters] =
    useState<AppointmentFilters>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointments", appointmentFilters, "2"],
    queryFn: fetchAllAppointments,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  const handleSearchFilter = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppointmentFilters((prevFilters) => ({
      ...prevFilters,
      search: searchRef?.current?.value,
    }));
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
      setAppointmentFilters((prevFilters) => ({
        ...prevFilters,
        page: el - 1,
      }));
    },
    [currentPage]
  );

  return (
    <section>
      <SearchFilter handleSearchFilter={handleSearchFilter} ref={searchRef} />

      {isLoading && <Spinner lg />}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching your appointments. Please try again later.
        </p>
      )}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">No appointments found.</p>
      )}
      {data && data.content && <AppointmentsList appointments={data.content} />}
      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </section>
  );
}

export default Appointments;
